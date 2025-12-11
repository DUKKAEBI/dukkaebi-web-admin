import React, { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./style";
import * as CourseS from "../style";

const initialRows = [
  { no: "1", title: "문자열과 알파벳 쿼리" },
  { no: "2", title: "문자열과 알파벳 쿼리" },
  { no: "3", title: "문자열과 알파벳 쿼리" },
  { no: "4", title: "문자열과 알파벳 쿼리" },
];

const demoKeywords = ["#기초", "#알고리즘", "#기본문법"];

const CourseInfo = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [rows, setRows] = useState(initialRows);
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
      | { id: string | number; title: string }[]
      | undefined;
    if (selected && selected.length > 0) {
      setRows((prev) => [
        ...prev,
        ...selected.map((s, i) => ({ no: String(prev.length + i + 1), title: s.title })),
      ]);
      // clear state to avoid duplicate adds on re-mount / back
      try {
        history.replaceState({}, document.title, window.location.pathname + window.location.search);
      } catch (e) {
        // ignore
      }
    }
  }, [location.state]);

  return (
    <S.Page onMouseDown={() => setOpenMenuId(null)}>
      <Header />

      <S.Section>
        <S.Title>기초 100제</S.Title>
        <S.Description>
          <S.DescriptionLine>
            기초 100제 코스는 알고리즘 학습을 처음 시작하시는 분들이 기본기를
            탄탄하게 다지실 수 있도록 구성된 입문용 문제 모음입니다.
          </S.DescriptionLine>
          <S.DescriptionLine>
            이 코스에서는 변수, 조건문, 반복문과 같은 프로그래밍의 기초 문법부터
            배열, 문자열, 정렬, 탐색 등 핵심 알고리즘 개념까지 자연스럽게 익히실
            수 있도록 문제들이 단계별로 배치되어 있습니다.
          </S.DescriptionLine>
          <S.DescriptionLine>
            총 100개의 문제를 풀어가시면서 입력을 분석하고 해결 로직을 설계하며,
            이를 코드로 구현하는 전 과정을 반복적으로 경험하시게 되기 때문에
            문제 해결 역량이 안정적으로 향상되실 것입니다.
          </S.DescriptionLine>

          <CourseS.KeywordContainer style={{ marginTop: 16 }}>
            {demoKeywords.map((kw, idx) => (
              <S.LocalKeyword key={idx}>{kw}</S.LocalKeyword>
            ))}
          </CourseS.KeywordContainer>
        </S.Description>
      </S.Section>

      <S.Content>
        <S.Table>
          <S.TableHead>
            <S.ColNo>번호</S.ColNo>
            <S.ColTitle>제목</S.ColTitle>
          </S.TableHead>
          {rows.length === 0 ? (
            <S.EmptyRow>아직 문제가 없습니다.</S.EmptyRow>
          ) : (
            rows.map((r) => (
              <S.Row key={r.no}>
                <S.CellNo>{r.no}</S.CellNo>
                <S.CellTitle>{r.title}</S.CellTitle>
                <S.MoreWrapper onMouseDown={(e: MouseEvent) => e.stopPropagation()}>
                  <S.MoreBtn
                    aria-label="more"
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === r.no ? null : r.no);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                    </svg>
                  </S.MoreBtn>
                  {openMenuId === r.no && (
                    <S.Dropdown>
                      <S.DropdownItem
                        onClick={() => {
                          setOpenMenuId(null);
                          navigate(`/course/problems/update/${r.no}`);
                        }}
                      >
                        문제 수정
                      </S.DropdownItem>
                      <S.DropdownItem
                        onClick={() => {
                          setOpenMenuId(null);
                          // confirm and remove
                          if (confirm("정말로 이 문제를 삭제하시겠습니까?")) {
                            setRows((prev) => prev.filter((p) => p.no !== r.no));
                          }
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
          onClick={() => navigate(`/problems?pickerFor=course&returnTo=/course/${courseId}`)}
        >
          문제 추가
        </S.AddButton>
      </S.Content>
      
      
    </S.Page>
  );
};

export default CourseInfo;
