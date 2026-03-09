// solve 페이지의 상단 헤더(UI) 영역을 분리한 컴포넌트입니다.
import type { ChangeEvent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Style from "../../../page/solve/style";

type ProblemDetail = {
  name: string;
  description: string;
  input: string;
  output: string;
  exampleInput: string;
  exampleOutput: string;
};

type LanguageOption = {
  value: string;
  label: string;
  monaco: string;
};

// solve 페이지에서 헤더가 필요로 하는 props만 그대로 전달받습니다.
type SolveHeaderProps = {
  problem: ProblemDetail | null;
  problemStatus: "idle" | "loading" | "success" | "error";
  language: string;
  handleLanguageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleExitSolvePage: () => void;
  LANGUAGE_OPTIONS: LanguageOption[];
};

export function SolveHeader({
  problem,
  problemStatus,
  language,
  handleLanguageChange,
  handleExitSolvePage,
  LANGUAGE_OPTIONS,
}: SolveHeaderProps) {
  return (
    <>
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
          <Style.LanguageSelect value={language} onChange={handleLanguageChange}>
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Style.LanguageSelect>
        </Style.HeaderActions>
      </Style.Header>
    </>
  );
}

