import React, { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./style";
import * as CourseS from "../style";
import courseApi from "../../../api/courseApi";

const CourseInfo = () => {
  const [activeTab, setActiveTab] = useState<
    "problems" | "participants" | "settings"
  >("problems");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [rows, setRows] = useState<
    { no: string; title: string; problemId: string }[]
  >([]);
  const [course, setCourse] = useState<any | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    const onDocClick = () => setOpenMenuId(null);
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // If navigated back from Problems picker with selectedProblems state, add them
  useEffect(() => {
    const selected = (location.state as any)?.selectedProblems as
      | { id: string | number; title: string; problemId: string }[]
      | undefined;
    if (selected && selected.length > 0) {
      setRows((prev) => [
        ...prev,
        ...selected.map((s, i) => ({
          no: String(prev.length + i + 1),
          title: s.title,
          problemId: String(s.id ?? s.problemId),
        })),
      ]);
      // clear state to avoid duplicate adds on re-mount / back
      try {
        history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search,
        );
      } catch (e) {
        // ignore
      }
    }
  }, [location.state]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      if (!courseId) return;
      try {
        const data = await courseApi.getCourse(courseId);
        console.debug("courseApi.getCourse raw:", data);
        if (!mounted) return;
        setCourse(data);

        // map problems if provided
        if (Array.isArray(data.problems)) {
          setRows(
            data.problems.map((p: any, idx: number) => ({
              no: String(idx + 1),
              title: p.title ?? p.name ?? String(p.problemId),
              problemId: String(p.problemId),
            })),
          );
        }

        if (Array.isArray(data.keywords) && data.keywords.length > 0) {
          setKeywords(data.keywords);
        }
      } catch (err) {
        console.error("Failed to load course:", err);
      }
    };

    fetch();
    return () => {
      mounted = false;
    };
  }, [courseId]);

  const deleteProblem = async (r: {
    no: string;
    title: string;
    problemId: string;
  }) => {
    try {
      await courseApi.deleteProblemToCourse(
        Number(courseId),
        Number(r.problemId),
      );
      alert("문제가 삭제되었습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <S.Page onMouseDown={() => setOpenMenuId(null)}>
      <Header />

      <S.Section>
        <S.Title>{course?.title}</S.Title>
        <S.Description>
          {course?.description ? (
            course.description
              .split("\n")
              .map((line: string, i: number) => (
                <S.DescriptionLine key={i}>{line}</S.DescriptionLine>
              ))
          ) : (
            <>
              <S.DescriptionLine>
                코스 설명을 불러오는 중입니다.
              </S.DescriptionLine>
            </>
          )}

          <CourseS.KeywordContainer style={{ marginTop: 16 }}>
            {(keywords ?? []).map((kw, idx) => (
              <S.LocalKeyword key={idx}>{kw}</S.LocalKeyword>
            ))}
          </CourseS.KeywordContainer>
        </S.Description>

        <S.Tabs>
          <S.Tab
            $active={activeTab === "problems"}
            onClick={() => setActiveTab("problems")}
          >
            코스
          </S.Tab>
          <S.Tab
            $active={activeTab === "participants"}
            onClick={() => setActiveTab("participants")}
          >
            참여 인원
          </S.Tab>
          <S.Tab
            $active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          >
            코스 설정
          </S.Tab>
        </S.Tabs>
      </S.Section>

      {activeTab === "problems" ? (
        <S.Content>
          <S.Table>
            <S.TableHead>
              <S.ColNo>번호</S.ColNo>
              <S.ColTitle>제목</S.ColTitle>
            </S.TableHead>
            {rows.length === 0 ? (
              <S.EmptyRow>문제를 불러오는 중입니다.</S.EmptyRow>
            ) : (
              rows.map((r) => (
                <S.Row
                  key={r.no}
                  onClick={() =>
                    navigate(`/courses/${courseId}/solve/${r.problemId}`)
                  }
                >
                  <S.CellNo>{r.no}</S.CellNo>
                  <S.CellTitle>{r.title}</S.CellTitle>
                  <S.MoreWrapper
                    onMouseDown={(e: MouseEvent) => e.stopPropagation()}
                  >
                    <S.MoreBtn
                      aria-label="more"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === r.no ? null : r.no);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                        <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                        <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                      </svg>
                    </S.MoreBtn>
                    {openMenuId === r.no && (
                      <S.Dropdown>
                        <S.DropdownItem
                          onClick={(e) => {
                            setOpenMenuId(null);
                            e.stopPropagation();
                            e.preventDefault();
                            navigate(`/course/problems/update/${r.no}`);
                          }}
                        >
                          문제 수정
                        </S.DropdownItem>
                        <S.DropdownItem
                          onClick={(e) => {
                            setOpenMenuId(null);
                            e.stopPropagation();
                            e.preventDefault();
                            deleteProblem(r);
                          }}
                        >
                          문제 삭제
                        </S.DropdownItem>
                      </S.Dropdown>
                    )}
                  </S.MoreWrapper>
                </S.Row>
              ))
            )}
          </S.Table>
          <S.AddButton
            onClick={() =>
              navigate(
                `/problems?pickerFor=course&returnTo=/course/${courseId}`,
              )
            }
          >
            문제 설정
          </S.AddButton>
        </S.Content>
      ) : activeTab === "participants" ? (
        <S.ParticipantsWrapper>
          <S.ParticipantsTotal>
            총 참여 인원 : {course?.participantCount ?? 0}명
          </S.ParticipantsTotal>
          <S.ParticipantsTable>
            <S.ParticipantsTableHead>
              <span>등수</span>
              <span>이름</span>
              <span style={{ justifySelf: "end" }}>제출한 문제 수</span>
              <span style={{ justifySelf: "end" }}>맞춘 문제 수</span>
            </S.ParticipantsTableHead>
            {course?.problems?.map((p: any, idx: number) => (
              <S.ParticipantsRow key={p.problemId}>
                <S.ParticipantsRank>{idx + 1}</S.ParticipantsRank>
                <S.ParticipantsName>{p.name}</S.ParticipantsName>
                <S.ParticipantsStat>{p.solvedCount}</S.ParticipantsStat>
                <S.ParticipantsStat>
                  {p.solvedResult === "SOLVED" ? 1 : 0}
                </S.ParticipantsStat>
              </S.ParticipantsRow>
            ))}
          </S.ParticipantsTable>
        </S.ParticipantsWrapper>
      ) : (
        <S.SettingsWrapper>
          <S.SettingsActionButton
            $variant="primary"
            onClick={() => navigate(`/course/update/${courseId}`)}
          >
            코스 수정
          </S.SettingsActionButton>
          <S.SettingsActionButton
            $variant="primary"
            onClick={async () => {
              try {
                if (!course?.courseId) {
                  alert("코스 코드를 찾을 수 없습니다.");
                  return;
                }
                await courseApi.endCourse(course.courseId);
                alert("코스가 종료되었습니다.");
                navigate("/course");
              } catch (err) {
                console.error("Failed to end course:", err);
                alert("코스 종료에 실패했습니다.");
              }
            }}
          >
            코스 종료
          </S.SettingsActionButton>
          <S.SettingsActionButton
            $variant="error"
            onClick={async () => {
              if (!confirm("정말로 코스를 삭제하시겠습니까?")) return;
              try {
                if (!course?.courseId) {
                  alert("코스 코드를 찾을 수 없습니다.");
                  return;
                }
                await courseApi.deleteCourse(course.courseId);
                alert("코스가 삭제되었습니다.");
                navigate("/course");
              } catch (err) {
                console.error("Failed to delete course:", err);
                alert("코스 삭제에 실패했습니다.");
              }
            }}
          >
            코스 삭제
          </S.SettingsActionButton>
        </S.SettingsWrapper>
      )}
    </S.Page>
  );
};

export default CourseInfo;
