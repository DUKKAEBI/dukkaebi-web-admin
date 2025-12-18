import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import courseApi from "../../api/courseApi";
import {
  getProblems,
  filterProblems,
  searchProblems,
  deleteProblem,
} from "../../api/problemApi";
import * as S from "./style";
import SearchIcon from "../../assets/image/problems/search.png";
import ArrowDownIcon from "../../assets/image/problems/arrow-down.png";
//왼쪽
import ArrowLeftIcon from "../../assets/image/problems/arrow-left.png";
//오른쪽
import ArrowRightIcon from "../../assets/image/problems/arrow-right.png";
// (status icons removed from table)
//난이도 이미지
import GoldIcon from "../../assets/image/problems/difficulty/gold.svg";
import SilverIcon from "../../assets/image/problems/difficulty/silver.svg";
import CopperIcon from "../../assets/image/problems/difficulty/copper.svg";
import JadeIcon from "../../assets/image/problems/difficulty/jade.svg";
import IronIcon from "../../assets/image/problems/difficulty/iron.svg";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

interface Problem {
  id: number;
  title: string;
  difficulty: number;
  completedCount: number;
  successRate: number;
  solved: boolean;
  failed: boolean;
}

export default function Problems() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPicker = (searchParams.get("pickerFor") || "") === "course";
  const returnTo = searchParams.get("returnTo") || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [difficultyLabel, setDifficultyLabel] = useState<string | null>(null);
  const [successRateFilter, setSuccessRateFilter] = useState<
    "asc" | "desc" | null
  >(null);
  const [successRateLabel, setSuccessRateLabel] = useState<string | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [timeLabel, setTimeLabel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Close action menu when clicking outside
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If click is outside both the inline action container and the portal menu, close
      if (
        !target.closest("[data-action-container]") &&
        !target.closest("[data-portal-action-menu]")
      ) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  // Preselect problems already in the course when in picker mode
  useEffect(() => {
    if (!isPicker) return;
    const match = (returnTo || "").match(/\/course\/(\d+)/);
    const courseId = match ? match[1] : null;
    if (!courseId) return;

    (async () => {
      try {
        const course = await courseApi.getCourse(courseId);
        const problemIds: number[] = Array.isArray(course?.problems)
          ? course.problems
              .map((p: any) => p?.problemId)
              .filter((v: any) => typeof v === "number")
          : [];
        setSelectedIds(new Set(problemIds));
      } catch (err) {
        console.error("Failed to fetch course for preselect:", err);
      }
    })();
  }, [isPicker, returnTo]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (difficultyFilter !== null || successRateFilter || sortBy) {
      fetchFilteredProblems();
    }
  }, [difficultyFilter, successRateFilter, sortBy]);

  const difficultyMap: Record<string, number> = {
    GOLD: 1,
    SILVER: 2,
    SLIVER: 2,
    COPPER: 3,
    IRON: 4,
    JADE: 5,
  };

  const difficultyReverseMap: Record<number, string> = {
    1: "GOLD",
    2: "SILVER",
    3: "COPPER",
    4: "IRON",
    5: "JADE",
  };

  const solvedStatusMap: Record<string, { solved: boolean; failed: boolean }> =
    {
      SOLVED: { solved: true, failed: false },
      FAILED: { solved: false, failed: true },
      NOT_SOLVED: { solved: false, failed: false },
    };

  useEffect(() => {
    fetchProblems();
  }, []);

  const extractProblemList = (payload: any): any[] => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
  };

  const fetchProblems = async () => {
    setIsLoading(true);
    try {
      const response = await getProblems();
      const list = extractProblemList(response.data);
      mapProblems(list);
    } catch (error) {
      console.error("Failed to fetch problems:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredProblems = async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string> = {};
      if (difficultyFilter !== null) {
        params.difficulty = difficultyReverseMap[difficultyFilter];
      }
      if (successRateFilter) {
        params.correctRate = successRateFilter === "asc" ? "low" : "high";
      }
      if (sortBy) {
        params.time = sortBy;
      }

      const response = await filterProblems(params);
      const list = extractProblemList(response.data);
      mapProblems(list);
    } catch (error) {
      console.error("Failed to fetch filtered problems:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchProblems = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await searchProblems(query);
      const list = extractProblemList(response.data);
      mapProblems(list);
    } catch (error) {
      console.error("Failed to search problems:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapProblems = (apiProblems: any[]) => {
    if (!Array.isArray(apiProblems) || apiProblems.length === 0) {
      console.log(apiProblems);
      setProblems(apiProblems);
      return;
    }
    const mapped = apiProblems.map((p) => ({
      id: p.problemId,
      title: p.name,
      difficulty: difficultyMap[p.difficulty],
      completedCount: p.solvedCount,
      successRate: p.correctRate,
      ...solvedStatusMap[p.solvedResult || "NOT_SOLVED"],
    }));
    setProblems(mapped.length ? mapped : []);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      fetchSearchProblems(value);
    } else {
      fetchProblems();
    }
  };

  const handleDifficultySelect = (
    level: number | null,
    label: string | null
  ) => {
    setDifficultyFilter(level);
    setDifficultyLabel(label);
    setOpenDropdown(null);
  };

  const handleActionToggle = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setOpenActionId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(`/problems/update/${id}`);
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm("정말로 이 문제를 삭제하시겠습니까?")) return;
    try {
      await deleteProblem(id);
      // remove locally
      setProblems((prev) => prev.filter((p) => p.id !== id));
      setOpenActionId(null);
    } catch (error) {
      console.error("Failed to delete problem:", error);
      alert("문제 삭제에 실패했습니다.");
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTimeSelect = (time: string | null, label: string | null) => {
    setSortBy(time);
    setTimeLabel(label); // 추가
    setOpenDropdown(null);
  };

  const handleSuccessRateSelect = (
    order: "asc" | "desc" | null,
    label: string | null
  ) => {
    setSuccessRateFilter(order);
    setSuccessRateLabel(label);
    setOpenDropdown(null);
  };

  let filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (difficultyFilter !== null) {
    filteredProblems = filteredProblems.filter(
      (problem) => problem.difficulty === difficultyFilter
    );
  }

  if (successRateFilter === "asc") {
    filteredProblems = [...filteredProblems].sort(
      (a, b) => a.successRate - b.successRate
    );
  } else if (successRateFilter === "desc") {
    filteredProblems = [...filteredProblems].sort(
      (a, b) => b.successRate - a.successRate
    );
  }

  const difficultyLabels: Record<number, string> = {
    1: "금",
    2: "은",
    3: "동",
    4: "철",
    5: "옥",
  };

  const difficultyImages: Record<number, string> = {
    1: GoldIcon,
    2: SilverIcon,
    3: CopperIcon,
    4: IronIcon,
    5: JadeIcon,
  };

  return (
    <S.ProblemsContainer>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <S.MainContent>
        {/* Search Bar */}
        <S.SearchBox>
          <S.SearchInput
            type="text"
            placeholder="문제 이름을 검색하세요."
            value={searchTerm}
            onChange={handleSearch}
          />
          <S.SearchIconContainer>
            <img src={SearchIcon} alt="검색" />
          </S.SearchIconContainer>
        </S.SearchBox>

        {/* Filter Section */}
        <S.FilterSection ref={dropdownRef}>
          <S.FilterButtonsWrapper>
            <S.FilterButtonGroup>
              <S.FilterButton
                isActive={
                  openDropdown === "difficulty" || difficultyFilter !== null
                }
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "difficulty" ? null : "difficulty"
                  )
                }
              >
                {difficultyLabel || "난이도"}
                <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
              </S.FilterButton>

              {/* Dropdown Menu - Difficulty */}
              {openDropdown === "difficulty" && (
                <S.DropdownMenu>
                  <S.DropdownItem
                    isSelected={difficultyFilter === null}
                    onClick={() => handleDifficultySelect(null, null)}
                  >
                    선택 안함
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={difficultyFilter === 1}
                    onClick={() => handleDifficultySelect(1, "금")}
                  >
                    금
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={difficultyFilter === 2}
                    onClick={() => handleDifficultySelect(2, "은")}
                  >
                    은
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={difficultyFilter === 3}
                    onClick={() => handleDifficultySelect(3, "동")}
                  >
                    동
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={difficultyFilter === 4}
                    onClick={() => handleDifficultySelect(4, "철")}
                  >
                    철
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={difficultyFilter === 5}
                    onClick={() => handleDifficultySelect(5, "옥")}
                  >
                    옥
                  </S.DropdownItem>
                </S.DropdownMenu>
              )}
            </S.FilterButtonGroup>

            <S.FilterButtonGroup>
              <S.FilterButton
                isActive={openDropdown === "time" || sortBy !== null}
                onClick={() =>
                  setOpenDropdown(openDropdown === "time" ? null : "time")
                }
              >
                {timeLabel || "시간"}
                <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
              </S.FilterButton>

              {/* Dropdown Menu - Time */}
              {openDropdown === "time" && (
                <S.DropdownMenu>
                  <S.DropdownItem
                    isSelected={sortBy === null}
                    onClick={() => handleTimeSelect(null, null)}
                  >
                    선택 안함
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={sortBy === "recent"}
                    onClick={() => handleTimeSelect("recent", "최신순")}
                  >
                    최신순
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={sortBy === "old"}
                    onClick={() => handleTimeSelect("old", "오래된순")}
                  >
                    오래된순
                  </S.DropdownItem>
                </S.DropdownMenu>
              )}
            </S.FilterButtonGroup>

            <S.FilterButtonGroup>
              <S.FilterButton
                isActive={
                  openDropdown === "successRate" || successRateFilter !== null
                }
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "successRate" ? null : "successRate"
                  )
                }
              >
                {successRateLabel || "정답률"}
                <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
              </S.FilterButton>

              {/* Dropdown Menu - Success Rate */}
              {openDropdown === "successRate" && (
                <S.DropdownMenu>
                  <S.DropdownItem
                    isSelected={successRateFilter === null}
                    onClick={() => handleSuccessRateSelect(null, null)}
                  >
                    선택 안함
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={successRateFilter === "asc"}
                    onClick={() =>
                      handleSuccessRateSelect("asc", "정답률 낮은 순")
                    }
                  >
                    정답률 낮은 순
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={successRateFilter === "desc"}
                    onClick={() =>
                      handleSuccessRateSelect("desc", "정답률 높은 순")
                    }
                  >
                    정답률 높은 순
                  </S.DropdownItem>
                </S.DropdownMenu>
              )}
            </S.FilterButtonGroup>
          </S.FilterButtonsWrapper>
        </S.FilterSection>

        {/* Problems Table */}
        <S.TableContainer>
          {/* Table Header */}

          <S.TableHeader $picker={isPicker}>
            {isPicker && (
              <S.TableHeaderCell style={{ width: 48 }}>선택</S.TableHeaderCell>
            )}
            <S.TableHeaderCell>제목</S.TableHeaderCell>
            <S.TableHeaderCellCenter>난이도</S.TableHeaderCellCenter>
            <S.TableHeaderCellRight>완료한 사람</S.TableHeaderCellRight>
            <S.TableHeaderCellRight>정답률</S.TableHeaderCellRight>
          </S.TableHeader>

          {/* Table Body */}
          <S.TableBody>
            {filteredProblems.map((problem, index) => (
              <S.TableRow
                $picker={isPicker}
                $selected={isPicker && selectedIds.has(problem.id)}
                key={problem.id}
                isLast={index === filteredProblems.length - 1}
                onClick={() => {
                  if (isPicker) toggleSelect(problem.id);
                  else navigate(`/solve/${problem.id}`);
                }}
              >
                {isPicker && (
                  <S.TableCell style={{ width: 48 }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(problem.id)}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => toggleSelect(problem.id)}
                      aria-label={`문제 선택 ${problem.title}`}
                    />
                  </S.TableCell>
                )}
                <S.TableCell>{problem.title}</S.TableCell>
                <S.TableCellCenter>
                  <S.DifficultyImage
                    src={difficultyImages[problem.difficulty]}
                    alt={difficultyLabels[problem.difficulty]}
                  />
                </S.TableCellCenter>
                <S.TableCellRight>{problem.completedCount}명</S.TableCellRight>
                <S.TableCellRight>{problem.successRate}%</S.TableCellRight>
                <S.TableCellRight>
                  <S.ActionContainer data-action-container>
                    <S.ActionButton
                      ref={(el) => {
                        buttonRefs.current[problem.id] = el;
                      }}
                      onClick={(e) => handleActionToggle(e, problem.id)}
                      aria-haspopup="true"
                      aria-expanded={openActionId === problem.id}
                      aria-label="액션 메뉴"
                    >
                      ⋮
                    </S.ActionButton>

                    {/* Render menu via portal to avoid clipping/overflow issues */}
                    {openActionId === problem.id &&
                      buttonRefs.current[problem.id] &&
                      createPortal(
                        <div data-portal-action-menu>
                          <S.ActionMenu
                            style={(() => {
                              try {
                                const btn = buttonRefs.current[problem.id];
                                if (!btn) return {};
                                const rect = btn.getBoundingClientRect();
                                const menuWidth = 96; // matches ActionMenu min-width
                                // compute left so menu's right edge aligns with button's right, with an 8px gap
                                const computedLeft =
                                  rect.right + window.scrollX - menuWidth - 8;
                                const left = Math.max(
                                  16,
                                  Math.min(
                                    computedLeft,
                                    window.innerWidth - menuWidth - 16
                                  )
                                );
                                // slightly lower than center to match design
                                const top =
                                  rect.top +
                                  window.scrollY +
                                  rect.height / 2 +
                                  6;
                                return {
                                  position: "absolute",
                                  top: `${top}px`,
                                  left: `${left}px`,
                                  transform: "translateY(-50%)",
                                  zIndex: 1000,
                                } as React.CSSProperties;
                              } catch (err) {
                                return {};
                              }
                            })()}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <S.ActionMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(e, problem.id);
                              }}
                            >
                              문제 수정
                            </S.ActionMenuItem>
                            <S.ActionMenuItemDanger
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(e, problem.id);
                              }}
                            >
                              문제 삭제
                            </S.ActionMenuItemDanger>
                          </S.ActionMenu>
                        </div>,
                        document.body
                      )}
                  </S.ActionContainer>
                </S.TableCellRight>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.TableContainer>

        {/* Pagination */}
        <S.FooterControls>
          <S.PaginationContainer>
            <S.PaginationButton>
              <S.ArrowIcon src={ArrowLeftIcon} alt="이전" />
            </S.PaginationButton>
            <S.PaginationNumbers>
              <S.PaginationNumber isActive={true}>1</S.PaginationNumber>
              <S.PaginationNumber>2</S.PaginationNumber>
              <S.PaginationNumber>3</S.PaginationNumber>
              <S.PaginationNumber>4</S.PaginationNumber>
              <S.PaginationNumber>5</S.PaginationNumber>
            </S.PaginationNumbers>
            <S.PaginationButton>
              <S.ArrowIcon src={ArrowRightIcon} alt="다음" />
            </S.PaginationButton>
          </S.PaginationContainer>
          <S.CreateButton
            onClick={async () => {
              if (isPicker) {
                const match = (returnTo || "").match(/\/course\/(\d+)/);
                const courseId = match ? match[1] : null;
                if (!courseId) {
                  alert("코스 ID를 찾을 수 없습니다.");
                  return;
                }
                const ids = Array.from(selectedIds);
                if (ids.length === 0) {
                  alert("추가할 문제를 선택하세요.");
                  return;
                }
                try {
                  await courseApi.addProblemsToCourse(courseId, {
                    problemIds: ids,
                  });
                  navigate(returnTo || "/problems");
                } catch (err) {
                  console.error("Failed to add problems to course:", err);
                  alert("문제 추가 중 오류가 발생했습니다.");
                }
              } else {
                navigate(`/problems/create`);
              }
            }}
          >
            {isPicker ? "문제 설정" : "문제 생성"}
          </S.CreateButton>
        </S.FooterControls>
      </S.MainContent>

      {/* Footer */}
      <Footer />
    </S.ProblemsContainer>
  );
}
