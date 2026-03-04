import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import courseApi from "../../api/courseApi";
import contestApi from "../../api/contestApi";
import {
  getProblems,
  filterProblems,
  searchProblems,
  deleteProblem,
} from "../../api/problemApi";
import * as S from "./style";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import {
  SearchBar,
  FilterSection,
  ProblemsTable,
  Pagination,
} from "../../components/problems";

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
  const pickerFor = searchParams.get("pickerFor") || "";
  const isPicker = pickerFor === "course" || pickerFor === "contest";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 10;

  // Close action menu when clicking outside
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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

  // Preselect problems already in the course/contest when in picker mode
  useEffect(() => {
    if (!isPicker) return;

    const match = (returnTo || "").match(/\/(course|contest)s?\/([^/]+)/);
    const entityType = match ? match[1] : null;
    const entityId = match ? match[2] : null;

    if (!entityId || !entityType) return;

    (async () => {
      try {
        if (entityType === "course") {
          const course = await courseApi.getCourse(entityId);
          const problemIds: number[] = Array.isArray(course?.problems)
            ? course.problems
                .map((p: any) => p?.problemId)
                .filter((v: any) => typeof v === "number")
            : [];
          setSelectedIds(new Set(problemIds));
        } else if (entityType === "contest") {
          const contest = await contestApi.getContest(entityId);
          const problemIds: number[] = Array.isArray(contest?.problems)
            ? contest.problems
                .map((p: any) => p?.problemId)
                .filter((v: any) => typeof v === "number")
            : [];
          setSelectedIds(new Set(problemIds));
        }
      } catch (err) {
        console.error(`Failed to fetch ${entityType} for preselect:`, err);
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
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
  };

  const fetchProblems = async (page: number = 0) => {
    setIsLoading(true);
    try {
      const response = await getProblems({ page, size: PAGE_SIZE });
      const data = response.data;
      const list = extractProblemList(data);
      mapProblems(list);
      setCurrentPage(data.currentPage ?? page);
      setTotalPages(data.totalPages ?? 1);
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
    label: string | null,
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
    setTimeLabel(label);
    setOpenDropdown(null);
  };

  const handleSuccessRateSelect = (
    order: "asc" | "desc" | null,
    label: string | null,
  ) => {
    setSuccessRateFilter(order);
    setSuccessRateLabel(label);
    setOpenDropdown(null);
  };

  const handleRowClick = (id: number) => {
    if (isPicker) {
      toggleSelect(id);
    } else {
      navigate(`/solve/${id}`);
    }
  };

  const handleCreateOrSetButton = async () => {
    if (isPicker) {
      let entityType: "course" | "contest" | null = null;
      let entityId: string | null = null;

      if (pickerFor === "course") {
        entityType = "course";
        const match = returnTo.match(/\/courses?\/([^/]+)/);
        entityId = match ? match[1] : null;
      } else if (pickerFor === "contest") {
        entityType = "contest";
        const match = returnTo.match(/\/contests?\/([^/]+)/);
        entityId = match ? match[1] : null;
      }

      if (!entityType || !entityId) {
        alert("코스 또는 대회 ID를 찾을 수 없습니다.");
        return;
      }

      const ids = Array.from(selectedIds);
      if (ids.length === 0) {
        alert("추가할 문제를 선택하세요.");
        return;
      }

      try {
        if (entityType === "course") {
          await courseApi.addProblemsToCourse(entityId, {
            problemIds: ids,
          });
        } else if (entityType === "contest") {
          await contestApi.addProblemsToContest(entityId, {
            problemIds: ids,
          });
        }

        navigate(returnTo || "/problems");
      } catch (err) {
        console.error(`Failed to add problems to ${entityType}:`, err);
        alert("문제 추가 중 오류가 발생했습니다.");
      }
    } else {
      navigate(`/problems/create`);
    }
  };

  let filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (difficultyFilter !== null) {
    filteredProblems = filteredProblems.filter(
      (problem) => problem.difficulty === difficultyFilter,
    );
  }

  if (successRateFilter === "asc") {
    filteredProblems = [...filteredProblems].sort(
      (a, b) => a.successRate - b.successRate,
    );
  } else if (successRateFilter === "desc") {
    filteredProblems = [...filteredProblems].sort(
      (a, b) => b.successRate - a.successRate,
    );
  }

  return (
    <S.ProblemsContainer>
      <Header />

      <S.MainContent>
        <SearchBar value={searchTerm} onChange={handleSearch} />

        <FilterSection
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          difficultyFilter={difficultyFilter}
          difficultyLabel={difficultyLabel}
          onDifficultySelect={handleDifficultySelect}
          sortBy={sortBy}
          timeLabel={timeLabel}
          onTimeSelect={handleTimeSelect}
          successRateFilter={successRateFilter}
          successRateLabel={successRateLabel}
          onSuccessRateSelect={handleSuccessRateSelect}
          dropdownRef={dropdownRef}
        />

        <ProblemsTable
          problems={filteredProblems}
          isPicker={isPicker}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onRowClick={handleRowClick}
          openActionId={openActionId}
          onActionToggle={handleActionToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          buttonRefs={buttonRefs}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={fetchProblems}
          isPicker={isPicker}
          onButtonClick={handleCreateOrSetButton}
        />
      </S.MainContent>

      <Footer />
    </S.ProblemsContainer>
  );
}
