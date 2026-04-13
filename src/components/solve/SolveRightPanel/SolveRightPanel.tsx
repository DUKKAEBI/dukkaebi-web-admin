// solve 페이지의 오른쪽 에디터/실행결과 패널(UI) 영역을 분리한 컴포넌트입니다.
import type { RefObject } from "react";
import type * as monacoEditor from "monaco-editor";
import Editor from "@monaco-editor/react";
import * as Style from "../../../page/solve/style";

type CurrentLanguageOption = {
  monaco: string;
};

type SolveRightPanelProps = {
  rightPanelWidth: number;
  currentLanguageOption: CurrentLanguageOption;
  code: string;
  setCode: (next: string) => void;
  handleEditorBeforeMount: (monaco: typeof monacoEditor) => void;
  activeResultTab: "result" | "tests";
  setActiveResultTab: (next: "result" | "tests") => void;
  terminalRef: RefObject<HTMLDivElement | null>;
  terminalHeight: number;
  terminalOutput: string;
  gradingDetails: Array<{
    testCaseNumber?: number;
    passed?: boolean;
    input?: string;
    expectedOutput?: string;
    actualOutput?: string;
  }>;
  handleSubmitCode: () => void;
  isSubmitting: boolean;
  problemId?: string;
};

export function SolveRightPanel({
  rightPanelWidth,
  currentLanguageOption,
  code,
  setCode,
  handleEditorBeforeMount,
  activeResultTab,
  setActiveResultTab,
  terminalRef,
  terminalHeight,
  terminalOutput,
  gradingDetails,
  handleSubmitCode,
  isSubmitting,
  problemId,
}: SolveRightPanelProps) {
  return (
    <Style.RightPanel $width={rightPanelWidth}>
      <Style.EditorContainer>
        <Editor
          height="100%"
          width="100%"
          language={currentLanguageOption.monaco}
          value={code}
          onChange={(value) => setCode(value || "")}
          beforeMount={handleEditorBeforeMount}
          theme="dukkaebi-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 1.6,
            wordWrap: "on",
            tabSize: 2,
            scrollBeyondLastLine: false,
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
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            color: "#9fb1bc",
                            width: "20%",
                          }}
                        >
                          {String(d.testCaseNumber ?? idx + 1).padStart(
                            2,
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
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
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
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
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
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
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
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

        <Style.SubmitWrapper>
          <Style.SubmitButton
            onClick={handleSubmitCode}
            disabled={isSubmitting || !problemId}
          >
            {isSubmitting ? "채점 중..." : "제출 후 채점하기"}
          </Style.SubmitButton>
        </Style.SubmitWrapper>
      </Style.ResultContainer>
    </Style.RightPanel>
  );
}

