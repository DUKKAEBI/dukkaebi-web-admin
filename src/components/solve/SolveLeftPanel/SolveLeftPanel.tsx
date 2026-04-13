// solve 페이지의 왼쪽 문제 정보 패널(UI) 영역을 분리한 컴포넌트입니다.
import type { RefObject } from "react";
import * as Style from "../../../page/solve/style";

type SolveLeftPanelProps = {
  statusMessage: string;
  problemStatus: "idle" | "loading" | "success" | "error";
  problemSections: Array<{ title: string; content: string }>;
  sampleInput: string;
  sampleOutput: string;
  exampleInputRef: RefObject<HTMLTextAreaElement | null>;
};

export function SolveLeftPanel({
  statusMessage,
  problemStatus,
  problemSections,
  sampleInput,
  sampleOutput,
  exampleInputRef,
}: SolveLeftPanelProps) {
  return (
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
  );
}

