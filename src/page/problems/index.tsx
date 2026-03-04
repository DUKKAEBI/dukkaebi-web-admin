import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import courseApi from "../../api/courseApi";
import {
  getProblems,
  filterProblems,
  searchProblems,
  deleteProblem,
} from "../../api/problemApi";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import {
  SearchBar,
  FilterSection,
  ProblemsTable,
  Pagination,
} from "../../components/problems";
import * as S from "./style";

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [difficultyLabel, setDifficultyLabel] = useState<string | null>(null);
  const [successRateFilter, setSuccessRateFilter] = useState<"asc" | "desc" | null>(null);
  const [successRateLabel, setSuccessRateLabel] = useState<string | null>(null);
  const [timeLabel, setTimeLabel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 10;

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

  const solvedStatusMap: Record<string, { solved: boolean; failed: boolean }> = {
    SOLVED: { solved: true, failed: false },
    FAILED: { solved: false, failed: true },
    NOT_SOLVED: { solved: false, failed: false },
  };

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

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    if (difficultyFilter !== null || successRateFilter || sortBy) {
      fetchFilteredProblems();
    }
  }, [difficultyFilter, successRateFilter, sortBy]);

  const extractProblemList = (payload: any): any[] => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
  };

  const mapProblems = (apiProblems: any[]) => {
    if (!Array.isArray(apiProblems) || apiProblems.length === 0) {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      fetchSearchProblems(value);
    } else {
      fetchProblems();
    }
  };

  const handleDifficultySelect = (level: number | null, label: string | null) => {
    setDifficultyFilter(level);
    setDifficultyLabel(label);
  };

  const handleTimeSelect = (time: string | null, label: string | null) => {
    setSortBy(time);
    setTimeLabel(label);
  };

  const handleSuccessRateSelect = (order: "asc" | "desc" | null, label: string | null) => {
    setSuccessRateFilter(order);
    setSuccessRateLabel(label);
  };

  const handleActionToggle = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setOpenActionId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(`/problems/update/${id}`);
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm("정말로 이 문제를 삭제하시겠습니까?")) return;
    deleteProblem(id)
      .then(() => {
        setProblems((prev) => prev.filter((p) => p.id !== id));
        setOpenActionId(null);
      })
      .catch((error) => {
        console.error("Failed to delete problem:", error);
        alert("문제 삭제에 실패했습니다.");
      });
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleProblemClick = (id: number) => {
    if (isPicker) {
      toggleSelect(id);
    } else {
      navigate(`/solve/${id}`);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      fetchProblems(page);
    }
  };

  const handleButtonClick = () => {
    if (isPicker) {
      if (selectedIds.size === 0) {
        alert("하나 이상의 문제를 선택해주세요.");
        return;
      }
      const idsArray = Array.from(selectedIds);
      const encoded = encodeURIComponent(JSON.stringify(idsArray));
      navigate(`${returnTo}?selectedProblems=${encoded}`);
    } else {
      navigate("/problems/create");
    }
  };

  return (
    <S.ProblemsContainer>
      <Header />
      <S.MainContent>
        <SearchBar value={searchTerm} onChange={handleSearchChange} />

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
          problems={problems}
          isPicker={isPicker}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onRowClick={handleProblemClick}
          openActionId={openActionId}
          onActionToggle={handleActionToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          buttonRefs={buttonRefs}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isPicker={isPicker}
          onButtonClick={handleButtonClick}
        />
      </S.MainContent>
      <Footer />
    </S.ProblemsContainer>
  );
}
