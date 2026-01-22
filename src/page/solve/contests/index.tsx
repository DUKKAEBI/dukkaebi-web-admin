import { useState, useRef, useEffect, type ChangeEvent } from "react";
import type * as monacoEditor from "monaco-editor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "@monaco-editor/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as Style from "./style";
import axiosInstance from "../../../api/axiosInstance";
import contestApi from "../../../api/contestApi";

type ProblemDetail = {
  name: string;
  description: string;
  input: string;
  output: string;
  exampleInput: string;
  exampleOutput: string;
};

type CourseProblemItem = {
  problemId: number;
  name: string;
  difficulty?: string;
  solvedResult?: string;
};

type CourseDetail = {
  courseId: number;
  title: string;
  problems: CourseProblemItem[];
};

type ContestInfo = {
  startDate?: string;
  endDate?: string;
  status?: string;
};

type ChatMessage = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

type CodeSnapshot = {
  savedCode: string;
  savedLanguage: string;
  currentCode: string;
  currentLanguage: string;
};

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: "bot",
    text: "모르는 개념이 있다면 저 두비에게 물어보세요!",
  },
];

const API_BASE_URL = (() => {
  const raw = import.meta.env.VITE_API_URL;
  if (!raw || typeof raw !== "string") return "";
  return raw.trim().replace(/\/?$/, "/");
})();

type LanguageOption = {
  value: string;
  label: string;
  monaco: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "python", label: "Python", monaco: "python" },
  { value: "cpp", label: "C++", monaco: "cpp" },
  { value: "java", label: "Java", monaco: "java" },
];

export default function SolvePage() {
  const { contestCode, problemId } = useParams<{
    contestCode?: string;
    problemId?: string;
  }>();
  const [searchParams] = useSearchParams();
  const viewUserId = searchParams.get("userId");
  const isViewMode = !!viewUserId;
  const navigate = useNavigate();
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [terminalOutput, setTerminalOutput] =
    useState("실행 결과가 이곳에 표시됩니다.");
  const [code, setCode] = useState(``);
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);
  const [rightPanelWidth, setRightPanelWidth] = useState(65);
  const [isResizing, setIsResizing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(
    INITIAL_CHAT_MESSAGES,
  );
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [problemStatus, setProblemStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [problemError, setProblemError] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courseProblems, setCourseProblems] = useState<CourseProblemItem[]>([]);
  const [courseLoading, setCourseLoading] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<"result" | "tests">(
    "result",
  );
  const [gradingDetails, setGradingDetails] = useState<
    Array<{
      testCaseNumber?: number;
      passed?: boolean;
      input?: string;
      expectedOutput?: string;
      actualOutput?: string;
    }>
  >([]);
  const [gradingCacheByProblem, setGradingCacheByProblem] = useState<
    Record<
      string,
      Array<{
        testCaseNumber?: number;
        passed?: boolean;
        input?: string;
        expectedOutput?: string;
        actualOutput?: string;
      }>
    >
  >({});
  const [contestInfo, setContestInfo] = useState<ContestInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messageIdRef = useRef(INITIAL_CHAT_MESSAGES.length);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const exampleInputRef = useRef<HTMLTextAreaElement | null>(null);
  const currentLanguageOption =
    LANGUAGE_OPTIONS.find((option) => option.value === language) ||
    LANGUAGE_OPTIONS[0];
  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };
  const getLocalCodeKey = (contestCode?: string) =>
    contestCode ? `dukkaebi_codes_${contestCode}` : "";
  const getLocalTimeKey = (contestCode?: string) =>
    contestCode ? `dukkaebi_timeSpent_${contestCode}` : "";
  const getSubmittedKey = (contestCode?: string) =>
    contestCode ? `dukkaebi_submitted_${contestCode}` : "";

  //코드 저장 여부
  const [codeStateByProblem, setCodeStateByProblem] = useState<
    Record<string, CodeSnapshot>
  >({});
  //코드 제출 여부
  const [submittedProblems, setSubmittedProblems] = useState<Set<string>>(
    new Set(),
  );
  // 문제별 누적 시간
  const [timeSpentByProblem, setTimeSpentByProblem] = useState<
    Record<string, number>
  >({});

  //문제별 저장 여부 확인 (사이드바 표시용도)
  const isProblemDirty = (pid: string | number) => {
    const s = codeStateByProblem[pid];
    if (!s) return false;

    return (
      s.currentCode !== s.savedCode || s.currentLanguage !== s.savedLanguage
    );
  };
  // 문제별 저장 완료 여부(사이드바 표시용도)
  const isProblemSaved = (pid: string | number) => {
    const s = codeStateByProblem[pid];
    if (!s) return false;

    const hasSaved = s.savedCode.trim().length > 0;
    const isDirty =
      s.currentCode !== s.savedCode || s.currentLanguage !== s.savedLanguage;

    return hasSaved && !isDirty;
  };

  // Terminal (floating) size & resize state
  const [terminalHeight, setTerminalHeight] = useState(200); // px
  const terminalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;

      const MIN_LEFT_WIDTH = 400;

      const MAX_LEFT_WIDTH = rect.width * 0.8;
      const clampedX = Math.max(
        MIN_LEFT_WIDTH,
        Math.min(MAX_LEFT_WIDTH, relativeX),
      );

      const rightWidthPercent = ((rect.width - clampedX) / rect.width) * 100;
      setRightPanelWidth(rightWidthPercent);
    };

    const stopResizing = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  useEffect(() => {
    const updateTerminalHeight = () => {
      if (!containerRef.current) return;
      const { height } = containerRef.current.getBoundingClientRect();
      const desiredHeight = Math.max(180, Math.min(height * 0.3, height - 160));
      setTerminalHeight(desiredHeight);
    };

    updateTerminalHeight();
    window.addEventListener("resize", updateTerminalHeight);
    return () => window.removeEventListener("resize", updateTerminalHeight);
  }, []);

  useEffect(() => {
    if (!problemId) {
      setProblem(null);
      setProblemStatus("error");
      setProblemError("문제를 불러오기 위해 problemId가 필요합니다.");
      setSampleInput("");
      setSampleOutput("");
      return;
    }

    if (!API_BASE_URL) {
      setProblem(null);
      setProblemStatus("error");
      setProblemError(
        "서버 주소가 설정되어 있지 않습니다. .env의 VITE_API_URL 값을 확인하세요.",
      );
      return;
    }

    const controller = new AbortController();
    const fetchProblem = async () => {
      setProblemStatus("loading");
      setProblemError("");
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance(
          `${API_BASE_URL}problems/${problemId}`,
          {
            signal: controller.signal,
            headers: accessToken
              ? {
                  Authorization: `Bearer ${accessToken}`,
                }
              : undefined,
          },
        );
        const data: ProblemDetail = response.data;
        setProblem(data);
        setProblemStatus("success");
      } catch (error) {
        if (controller.signal.aborted) return;
        setProblem(null);
        setProblemStatus("error");
        setProblemError(
          error instanceof Error
            ? error.message
            : "문제 정보를 가져오는 중 오류가 발생했습니다.",
        );
        setSampleInput("");
        setSampleOutput("");
      }
    };

    fetchProblem();
    return () => controller.abort();
  }, [problemId]);

  // Restore cached grading details when switching problems (or clear if none)
  useEffect(() => {
    const key = String(problemId ?? "");
    if (!key) {
      setGradingDetails([]);
      return;
    }
    setGradingDetails(gradingCacheByProblem[key] ?? []);
  }, [problemId, gradingCacheByProblem]);

  // Fetch course problems for sidebar
  useEffect(() => {
    if (!contestCode || !API_BASE_URL) return;
    const controller = new AbortController();
    const fetchCourse = async () => {
      try {
        setCourseLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        const res = await axiosInstance(
          `${API_BASE_URL}contest/${contestCode}`,
          {
            signal: controller.signal,
            headers: accessToken
              ? { Authorization: `Bearer ${accessToken}` }
              : undefined,
          },
        );

        const data: any = await res.data;
        // store contest timing/status info if provided
        setContestInfo({
          startDate: data?.startDate,
          endDate: data?.endDate,
          status: data?.status,
        });

        const courseData: CourseDetail = {
          courseId: data?.courseId ?? 0,
          title: data?.title ?? "",
          problems: Array.isArray(data?.problems) ? data.problems : [],
        };
        const items = Array.isArray(courseData.problems)
          ? (courseData.problems as any[]).map((p, idx) => ({
              problemId: p?.problemId ?? idx + 1,
              name: p?.name ?? `문제 ${idx + 1}`,
              difficulty: p?.difficulty,
              solvedResult: p?.solvedResult,
            }))
          : [];
        setCourseProblems(items);
      } catch (e) {
        if (!controller.signal.aborted) {
          // keep silent on sidebar errors
          setCourseProblems([]);
        }
      } finally {
        setCourseLoading(false);
      }
    };
    fetchCourse();
    return () => controller.abort();
  }, [contestCode]);

  // Fetch user submission code for view mode
  useEffect(() => {
    if (!isViewMode || !contestCode || !problemId || !viewUserId) return;

    const fetchSubmission = async () => {
      try {
        const data = await contestApi.getUserSubmission(
          contestCode,
          problemId,
          viewUserId,
        );

        if (data?.submittedCode) {
          setCode(data.submittedCode);
        } else if (data?.code) {
          setCode(data.code);
        }
        if (data?.language) {
          const langOption = LANGUAGE_OPTIONS.find(
            (opt) => opt.value === data.language,
          );
          if (langOption) {
            setLanguage(langOption.value);
          }
        }
        if (data?.terminalOutput) {
          setTerminalOutput(data.terminalOutput);
        }
        if (data?.gradingDetails && Array.isArray(data.gradingDetails)) {
          setGradingDetails(data.gradingDetails);
        }
      } catch (error) {
        console.error("Failed to fetch submission:", error);
        // 제출 코드를 불러오지 못하면 빈 상태로 유지
      }
    };

    fetchSubmission();
  }, [isViewMode, contestCode, problemId, viewUserId]);

  // Live update remaining time (start/end)
  useEffect(() => {
    if (!contestInfo) {
      setTimeLeft("");
      return;
    }
    const compute = () => {
      const now = new Date();
      const start = contestInfo.startDate
        ? new Date(contestInfo.startDate)
        : null;
      const end = contestInfo.endDate ? new Date(contestInfo.endDate) : null;
      const status = contestInfo.status;

      if (status === "ENDED" || (end && now > end)) {
        return "종료됨";
      }
      const fmt = (ms: number) => {
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const d = Math.floor(totalSec / 86400);
        const h = Math.floor((totalSec % 86400) / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        const ss = String(s).padStart(2, "0");
        return d > 0 ? `D-${d} ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`;
      };
      if (start && now < start) {
        return `시작까지 ${fmt(start.getTime() - now.getTime())}`;
      }
      if (end && now < end) {
        return `종료까지 ${fmt(end.getTime() - now.getTime())}`;
      }
      return "";
    };
    setTimeLeft(compute());
    const id = window.setInterval(() => setTimeLeft(compute()), 1000);
    return () => window.clearInterval(id);
  }, [contestInfo]);

  useEffect(() => {
    if (!contestCode) return;

    const key = getSubmittedKey(contestCode);
    const raw = localStorage.getItem(key);
    if (raw) {
      setSubmittedProblems(new Set(JSON.parse(raw)));
    }
  }, [contestCode]);

  useEffect(() => {
    if (!problem) return;
    setSampleInput(problem.exampleInput || "");
    setSampleOutput(problem.exampleOutput || "");
  }, [problem]);

  useEffect(() => {
    if (!exampleInputRef.current) return;
    const textarea = exampleInputRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [sampleInput]);

  const formatGradingResult = (result: {
    status?: string;
    passedTestCases?: number;
    totalTestCases?: number;
    executionTime?: number;
    errorMessage?: string | null;
    details?: Array<{
      testCaseNumber?: number;
      passed?: boolean;
      input?: string;
      expectedOutput?: string;
      actualOutput?: string;
    }>;
  }) => {
    if (!result) return "채점 결과를 불러오지 못했습니다.";

    const statusText = (result.status ?? "").toUpperCase();
    const isAccepted = statusText === "ACCEPTED";
    const lines: string[] = [
      isAccepted ? "정답입니다." : "오답입니다.",
      "",
      `채점 결과: ${statusText || "알 수 없음"}`,
      `통과한 테스트: ${result.passedTestCases ?? 0} / ${
        result.totalTestCases ?? 0
      }`,
      `실행 시간: ${result.executionTime ?? "-"}ms`,
    ];

    if (result.errorMessage) {
      lines.push("", `오류 메시지: ${result.errorMessage}`);
    }

    if (result.details && result.details.length > 0) {
      const detail = result.details[0];
      lines.push(
        "",
        `테스트 케이스 ${detail.testCaseNumber ?? "?"} : ${
          detail.passed ? "통과" : "실패"
        }`,
      );
      lines.push(`입력값: ${(detail.input ?? "X").replace(/\s+$/, "") || "X"}`);
      if (detail.expectedOutput !== undefined) {
        lines.push(
          `기댓값: ${(detail.expectedOutput ?? "").replace(/\s+$/, "") || "X"}`,
        );
      }
      lines.push(
        `실제값: ${(detail.actualOutput ?? "").replace(/\s+$/, "") || "X"}`,
      );
    }

    return lines.join("\n");
  };

  //결과 문자열 만들어주는 함수
  const formatJudgeResult = (data: any) => {
    const lines: string[] = [];

    // 1. 상단 요약
    lines.push("오답입니다.", "");
    lines.push(`채점 결과: ${data.status}`);
    lines.push(
      `통과한 테스트: ${data.passedTestCases} / ${data.totalTestCases}`,
    );
    lines.push(`실행 시간: ${data.executionTime}ms`, "");

    // 2. 오류 메시지
    if (data.errorMessage) {
      lines.push("오류 메시지:");
      lines.push(data.errorMessage.trim(), "");
    }

    // 3. 테스트 케이스 상세
    if (Array.isArray(data.details)) {
      data.details.forEach((tc: any) => {
        lines.push(
          `테스트 케이스 ${tc.testCaseNumber} : ${tc.passed ? "성공" : "실패"}`,
        );
        lines.push(`입력값: ${tc.input || "X"}`);
        lines.push(`기댓값: ${tc.expectedOutput}`);
        lines.push(
          `실제값: ${tc.actualOutput || data.errorMessage?.trim() || ""}`,
        );
        lines.push("");
      });
    }

    return lines.join("\n");
  };

  const handleSubmitCode = async () => {
    if (!problemId || !API_BASE_URL) return;
    if (!code.trim()) {
      toast.error("제출할 코드를 작성해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const timeSpent = timeSpentByProblem[String(problemId)] ?? 0;

      const res = await fetch(`${API_BASE_URL}solve/grading`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          problemId: Number(problemId),
          code,
          language,
          timeSpentSeconds: timeSpent,
        }),
      });

      //코드 저장
      await axiosInstance.post(
        `${API_BASE_URL}solve/save`,
        {
          problemId: Number(problemId),
          code,
          language,
        },
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        },
      );

      const data = await res.json();

      if (data.errorMessage || data.status !== "ACCEPTED") {
        setTerminalOutput(formatJudgeResult(data));
        toast.warning("제출이 완료되었습니다.");
      } else if (data.status === "ACCEPTED") {
        toast.success("제출이 완료되었습니다.");
      }

      setSubmittedProblems((prev) => {
        const next = new Set(prev);
        next.add(String(problemId));
        localStorage.setItem(
          getSubmittedKey(contestCode),
          JSON.stringify([...next]),
        );
        return next;
      });

      // 제출 성공 시 저장도 자동으로 수행
      setCodeStateByProblem((prev) => ({
        ...prev,
        [problemId]: {
          savedCode: code,
          savedLanguage: language,
          currentCode: code,
          currentLanguage: language,
        },
      }));

      // localStorage에서 미저장 코드 제거
      if (contestCode) {
        const key = getLocalCodeKey(contestCode);
        if (key) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            delete parsed[String(problemId)];
            localStorage.setItem(key, JSON.stringify(parsed));
          }
        }
      }

      setTerminalOutput("채점이 완료되었습니다.");
      setGradingDetails(data.details ?? []);

      setGradingCacheByProblem((prev) => ({
        ...prev,
        [String(problemId)]: data.details ?? [],
      }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "제출 중 오류 발생");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestCode = async () => {
    if (!problemId || !API_BASE_URL) return;
    if (!code.trim()) {
      toast.error("테스트할 코드를 작성해 주세요.");
      return;
    }
    setIsTesting(true);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch(`${API_BASE_URL}solve/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          problemId: Number(problemId),
          code,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();

      // 에러 메시지가 있으면 실행 결과에 바로 출력
      if (data.errorMessage) {
        toast.error("실행에 실패하였습니다.");
        setTerminalOutput(formatJudgeResult(data));
        setActiveResultTab("result");
        // 테스트 케이스 탭에도 결과 저장
        if (data.details && Array.isArray(data.details)) {
          setGradingDetails(data.details);
          setGradingCacheByProblem((prev) => ({
            ...prev,
            [String(problemId)]: data.details,
          }));
        }
        return;
      }

      // 정상일 때
      setTerminalOutput("테스트가 완료되었습니다.");
      setGradingDetails(data.details ?? []);

      setGradingDetails(data.details ?? []);
      setGradingCacheByProblem((prev) => ({
        ...prev,
        [String(problemId)]: data.details ?? [],
      }));
      toast.success("테스트가 완료되었습니다");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "테스트 중 오류 발생");
    } finally {
      setIsTesting(false);
    }
  };

  const handleEditorBeforeMount = (monaco: typeof monacoEditor) => {
    monaco.editor.defineTheme("dukkaebi-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#263238",
        "editor.lineHighlightBackground": "#2f3a40",
      },
    });
  };

  useEffect(() => {
    if (!isChatOpen) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);

  const getNextMessageId = () => {
    messageIdRef.current += 1;
    return messageIdRef.current;
  };

  const appendMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const appendUserMessage = (text: string) => {
    const id = getNextMessageId();
    appendMessage({ id, sender: "user", text });
  };

  const appendBotMessage = (text: string) => {
    const id = getNextMessageId();
    appendMessage({ id, sender: "bot", text });
    return id;
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim() || isChatLoading) return;
    const trimmed = chatInput.trim();
    appendUserMessage(trimmed);
    setChatInput("");

    // AI 기능이 제거되었음을 알리는 메시지
    appendBotMessage("죄송합니다. AI 챗봇 기능은 현재 사용할 수 없습니다.");
  };

  const problemSections = problem
    ? [
        { title: "문제 설명", content: problem.description },
        { title: "입력", content: problem.input },
        { title: "출력", content: problem.output },
      ]
    : [];

  const statusMessage =
    problemStatus === "loading"
      ? "문제를 불러오는 중입니다..."
      : problemStatus === "error"
        ? problemError || "문제를 불러오지 못했습니다."
        : "";

  const handleExitSolvePage = () => {
    navigate(`/contests/${contestCode}`);
  };

  const handleSidebarItemClick = (pid: number) => {
    if (!contestCode) return;
    if (isViewMode && viewUserId) {
      navigate(`/contests/${contestCode}/solve/${pid}?userId=${viewUserId}`);
    } else {
      navigate(`/contests/${contestCode}/solve/${pid}`);
    }
  };

  //이후 문제로 가는 함수
  const handleNextProblem = () => {
    const currentIndex = courseProblems.findIndex(
      (p) => String(p.problemId) === String(problemId),
    );
    const isLastProblem = currentIndex === courseProblems.length - 1;

    if (!isLastProblem && currentIndex !== -1 && contestCode) {
      const nextProblem = courseProblems[currentIndex + 1];
      navigate(
        `/contests/${contestCode}/solve/${nextProblem.problemId}?userId=${viewUserId}`,
      );
    }
  };

  // 이전 문제로 가는 함수
  const handlePrevProblem = () => {
    const currentIndex = courseProblems.findIndex(
      (p) => String(p.problemId) === String(problemId),
    );
    const isFirstProblem = currentIndex === 0;

    if (!isFirstProblem && currentIndex !== -1 && contestCode) {
      const prevProblem = courseProblems[currentIndex - 1];
      navigate(
        `/contests/${contestCode}/solve/${prevProblem.problemId}?userId=${viewUserId}`,
      );
    }
  };

  const handleEndTest = () => {
    const hasAnyDirty = Object.values(codeStateByProblem).some(
      (s) =>
        s.currentCode !== s.savedCode || s.currentLanguage !== s.savedLanguage,
    );

    if (hasAnyDirty) {
      const ok = window.confirm(
        "저장되지 않은 코드가 있습니다.\n정말 종료하시겠습니까?",
      );

      if (!ok) return;
    }

    navigate(`/contests/${contestCode}`);
  };

  const handleSaveTest = async () => {
    if (!problemId || !API_BASE_URL || !contestCode) return;

    try {
      const accessToken = localStorage.getItem("accessToken");

      await axiosInstance.post(
        `${API_BASE_URL}solve/save`,
        {
          problemId: Number(problemId),
          code,
          language,
        },
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        },
      );

      // 저장 성공 → saved 상태 갱신
      setCodeStateByProblem((prev) => ({
        ...prev,
        [problemId]: {
          savedCode: code,
          savedLanguage: language,
          currentCode: code,
          currentLanguage: language,
        },
      }));

      const key = getLocalCodeKey(contestCode);
      if (key) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          delete parsed[String(problemId)];
          localStorage.setItem(key, JSON.stringify(parsed));
        }
      }

      toast.success("코드가 저장되었습니다.");
    } catch (error) {
      console.error("코드 저장 실패:", error);
      toast.error("코드 저장에 실패했습니다.");
    }
  };

  return (
    <Style.SolveContainer ref={containerRef}>
      <ToastContainer
        position="top-right"
        theme="dark"
        newestOnTop
        closeOnClick
      />
      <Style.Header>
        <Style.BackButton
          type="button"
          aria-label="문제 풀고 나가기"
          onClick={handleExitSolvePage}
        >
          ‹
        </Style.BackButton>
        <Style.HeaderTitle>
          {problem?.name ??
            (problemStatus === "loading"
              ? "문제를 불러오는 중..."
              : "문제 정보 없음")}
        </Style.HeaderTitle>
        <Style.HeaderActions>
          {isViewMode && (
            <span
              style={{
                color: "#fbbf24",
                marginRight: 12,
                padding: "4px 10px",
                backgroundColor: "rgba(251, 191, 36, 0.15)",
                borderRadius: 4,
                fontSize: 13,
              }}
            >
              학생 제출 코드 보기 (읽기 전용)
            </span>
          )}
          {timeLeft && (
            <span style={{ color: "#9fb1bc", marginRight: 12 }}>
              {timeLeft}
            </span>
          )}
          <Style.LanguageSelect
            value={language}
            onChange={handleLanguageChange}
            disabled={isViewMode}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Style.LanguageSelect>
          <Style.MenuButton
            type="button"
            aria-label="문제 목록 열기/닫기"
            onClick={toggleSidebar}
          >
            ☰
          </Style.MenuButton>
        </Style.HeaderActions>
      </Style.Header>

      <Style.PageContent
        style={{ paddingRight: isSidebarOpen ? "250px" : "0" }}
      >
        <Style.LeftPanel>
          <Style.LeftPanelContent>
            {statusMessage && (
              <Style.Section>
                <Style.SectionTitle>알림</Style.SectionTitle>
                <Style.ProblemStatus
                  $variant={problemStatus === "error" ? "error" : "info"}
                >
                  {statusMessage}
                </Style.ProblemStatus>
              </Style.Section>
            )}
            {problemSections.map(({ title, content }) => (
              <Style.Section key={title}>
                <Style.SectionTitle>{title}</Style.SectionTitle>
                <Style.SectionText>{content}</Style.SectionText>
              </Style.Section>
            ))}

            <Style.Section>
              <Style.SectionTitle>예시 입력:</Style.SectionTitle>
              <Style.ExampleTextarea
                readOnly
                tabIndex={-1}
                aria-readonly="true"
                ref={exampleInputRef}
                value={sampleInput}
              />
            </Style.Section>

            <Style.Section>
              <Style.SectionTitle>예시 출력:</Style.SectionTitle>
              <Style.ExampleOutput>{sampleOutput}</Style.ExampleOutput>
            </Style.Section>
          </Style.LeftPanelContent>
        </Style.LeftPanel>

        <Style.Divider
          onMouseDown={() => setIsResizing(true)}
          $isResizing={isResizing}
        />

        <Style.RightPanel $width={rightPanelWidth}>
          <Style.EditorContainer>
            <Editor
              height="100%"
              width="100%"
              language={currentLanguageOption.monaco}
              value={code}
              onChange={(value) => !isViewMode && setCode(value || "")}
              beforeMount={handleEditorBeforeMount}
              theme="dukkaebi-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 1.6,
                wordWrap: "on",
                tabSize: 2,
                scrollBeyondLastLine: false,
                readOnly: isViewMode,
              }}
            />
          </Style.EditorContainer>

          <Style.ResultContainer>
            <Style.ResultTabs>
              <Style.ResultTab
                type="button"
                $active={activeResultTab === "result"}
                onClick={() => setActiveResultTab("result")}
              >
                실행 결과
              </Style.ResultTab>
              <Style.ResultTab
                type="button"
                $active={activeResultTab === "tests"}
                onClick={() => setActiveResultTab("tests")}
              >
                테스트 케이스
              </Style.ResultTab>
            </Style.ResultTabs>

            {activeResultTab === "result" ? (
              <Style.Terminal ref={terminalRef} $height={terminalHeight}>
                <Style.TerminalHandle />
                <Style.TerminalOutput>{terminalOutput}</Style.TerminalOutput>
              </Style.Terminal>
            ) : (
              <Style.Terminal ref={terminalRef} $height={terminalHeight}>
                <Style.TerminalHandle />
                <Style.TerminalOutput>
                  {gradingDetails.length === 0 ? (
                    <div style={{ color: "#a0aec0" }}>
                      테스트 케이스가 없습니다. 제출 후 다시 확인하세요.
                    </div>
                  ) : (
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: 14,
                        tableLayout: "fixed",
                      }}
                    >
                      <thead>
                        <tr style={{ color: "#a0aec0", textAlign: "left" }}>
                          <th
                            style={{
                              padding: "8px 10px",
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                              width: "20%",
                            }}
                          >
                            번호
                          </th>
                          <th
                            style={{
                              padding: "8px 10px",
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                              width: "20%",
                            }}
                          >
                            입력값
                          </th>
                          <th
                            style={{
                              padding: "8px 10px",
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                              width: "20%",
                            }}
                          >
                            출력값
                          </th>
                          <th
                            style={{
                              padding: "8px 10px",
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                              width: "20%",
                            }}
                          >
                            예상 출력값
                          </th>
                          <th
                            style={{
                              padding: "8px 10px",
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                              width: "20%",
                            }}
                          >
                            실행결과
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {gradingDetails.map((d, idx) => (
                          <tr key={`${d.testCaseNumber ?? idx}-row`}>
                            <td
                              style={{
                                padding: "10px",
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.06)",
                                color: "#9fb1bc",
                                width: "20%",
                              }}
                            >
                              {String(d.testCaseNumber ?? idx + 1).padStart(
                                2,
                                "0",
                              )}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.06)",
                                width: "20%",
                              }}
                            >
                              {d.input !== undefined ? (
                                <pre
                                  style={{
                                    margin: 0,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {(d.input ?? "").replace(/\s+$/, "")}
                                </pre>
                              ) : (
                                <span style={{ color: "#6b7280" }}>-</span>
                              )}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.06)",
                                width: "20%",
                              }}
                            >
                              <pre
                                style={{
                                  margin: 0,
                                  whiteSpace: "pre-wrap",
                                  wordBreak: "break-word",
                                }}
                              >
                                {(d.actualOutput ?? "").replace(/\s+$/, "")}
                              </pre>
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.06)",
                                width: "20%",
                              }}
                            >
                              <pre
                                style={{
                                  margin: 0,
                                  whiteSpace: "pre-wrap",
                                  wordBreak: "break-word",
                                }}
                              >
                                {(d.expectedOutput ?? "").replace(/\s+$/, "")}
                              </pre>
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.06)",
                                fontWeight: 700,
                                color: d.passed ? "#4ade80" : "#fca5a5",
                                width: "20%",
                              }}
                            >
                              {d.passed ? "통과" : "실패"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </Style.TerminalOutput>
              </Style.Terminal>
            )}

            <Style.SubmitWrapper style={{ marginRight: 0 }}>
              <div style={{ display: "flex", gap: "24px" }}>
                <Style.SubmitButton
                  onClick={handleEndTest}
                  disabled={!problemId}
                  style={{
                    backgroundColor: "#35454E",
                    border: "1px solid #495D68",
                  }}
                >
                  테스트 끝내기
                </Style.SubmitButton>

                <Style.SubmitButton
                  onClick={handlePrevProblem}
                  disabled={
                    !problemId ||
                    courseProblems.findIndex(
                      (p) => String(p.problemId) === String(problemId),
                    ) === 0
                  }
                >
                  {"이전 문제"}
                </Style.SubmitButton>
                <Style.SubmitButton
                  onClick={handleNextProblem}
                  disabled={
                    !problemId ||
                    courseProblems.findIndex(
                      (p) => String(p.problemId) === String(problemId),
                    ) ===
                      courseProblems.length - 1
                  }
                >
                  {"다음 문제"}
                </Style.SubmitButton>
                <Style.SaveButton
                  onClick={handleSaveTest}
                  disabled={!problemId}
                  style={{ border: "1px solid #495D68" }}
                >
                  코드 저장하기
                </Style.SaveButton>
                <Style.SubmitButton
                  onClick={handleTestCode}
                  disabled={!problemId || isTesting}
                  style={{
                    backgroundColor: "#3E5C7A",
                    border: "1px solid #4A6B8F",
                  }}
                >
                  {isTesting ? "테스트 중..." : "테스트"}
                </Style.SubmitButton>
                <Style.SubmitButton
                  onClick={handleSubmitCode}
                  disabled={!problemId || isSubmitting}
                >
                  {isSubmitting ? "제출 중..." : "제출"}
                </Style.SubmitButton>
              </div>
            </Style.SubmitWrapper>
          </Style.ResultContainer>
        </Style.RightPanel>
        {isSidebarOpen && (
          <>
            <Style.ThinDivider />
            <Style.RightSidebar ref={sidebarRef}>
              <Style.SidebarHeader>문제 목록</Style.SidebarHeader>
              <Style.SidebarList>
                {courseLoading
                  ? null
                  : courseProblems.map((p, idx) => {
                      const isSubmitted = submittedProblems.has(
                        String(p.problemId),
                      );

                      const active =
                        String(p.problemId) === String(problemId ?? "");

                      return (
                        <Style.SidebarItem
                          key={p.problemId}
                          $active={active}
                          onClick={() => handleSidebarItemClick(p.problemId)}
                        >
                          <Style.SidebarItemIndex>
                            {String(idx + 1).padStart(2, "0")}
                          </Style.SidebarItemIndex>

                          <Style.SidebarItemTitle>
                            {p.name}
                          </Style.SidebarItemTitle>
                        </Style.SidebarItem>
                      );
                    })}
              </Style.SidebarList>
            </Style.RightSidebar>
          </>
        )}
      </Style.PageContent>
    </Style.SolveContainer>
  );
}
