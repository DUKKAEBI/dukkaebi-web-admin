import React, { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import { CourseHeader, TabNav, ProblemsTab, ParticipantsTab, SettingsTab } from "../../../components/course/info";
import * as S from "./style";
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
        <CourseHeader
          title={course?.title}
          description={course?.description}
          keywords={keywords}
        />

        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      </S.Section>

      {activeTab === "problems" ? (
        <ProblemsTab
          rows={rows}
          openMenuId={openMenuId}
          courseId={courseId}
          onRowClick={(problemId) =>
            navigate(`/courses/${courseId}/solve/${problemId}`)
          }
          onMoreClick={(e: MouseEvent, rowNo: string) => {
            e.stopPropagation();
            setOpenMenuId(openMenuId === rowNo ? null : rowNo);
          }}
          onEditClick={(e: MouseEvent, rowNo: string) => {
            setOpenMenuId(null);
            e.stopPropagation();
            e.preventDefault();
            navigate(`/course/problems/update/${rowNo}`);
          }}
          onDeleteClick={(e: MouseEvent, r) => {
            setOpenMenuId(null);
            e.stopPropagation();
            e.preventDefault();
            deleteProblem(r);
          }}
          onAddProblemClick={() =>
            navigate(`/problems?pickerFor=course&returnTo=/course/${courseId}`)
          }
        />
      ) : activeTab === "participants" ? (
        <ParticipantsTab
          participantCount={course?.participantCount ?? 0}
          problems={course?.problems ?? []}
        />
      ) : (
        <SettingsTab
          onEditClick={() => navigate(`/course/update/${courseId}`)}
          onEndClick={async () => {
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
          onDeleteClick={async () => {
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
        />
      )}
    </S.Page>
  );
};

export default CourseInfo;
