import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import * as S from "./style";
import SearchIcon from "../../assets/image/problems/search.png";
//왼쪽
import ArrowLeftIcon from "../../assets/image/problems/arrow-left.png";
//오른쪽
import ArrowRightIcon from "../../assets/image/problems/arrow-right.png";

interface CourseItem {
  id?: number | string;
  title?: string;
  level?: string;
  keywords?: string[];
}

const CoursePage = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const fetchCourses = async () => {
      try {
        const { default: courseApi } = await import("../../api/courseApi");
        const data = await courseApi.getCourses();
        if (!mounted) return;
        if (Array.isArray(data)) {
          console.debug("courseApi.getCourses raw:", data);
          const mapped = data.map((it: any) => ({
            id:
              it.id ??
              it.code ??
              it.courseId ??
              it._id ??
              it.identifier ??
              null,
            title: it.title ?? it.name ?? it.subject ?? "",
            level: it.level ?? it.difficulty ?? "",
            keywords: it.keywords ?? it.tags ?? it.labels ?? [],
            _raw: it,
          }));
          console.debug("course list mapped:", mapped);
          setCourses(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      courses.filter((c) =>
        (c.title ?? "").toLowerCase().includes(query.toLowerCase())
      ),
    [courses, query]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <S.Container>
      <Header />

      <S.Main>
        <S.SearchBar>
          <S.SearchInput
            placeholder="대회 이름을 검색하세요..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <S.SearchIcon aria-hidden>
            <img src={SearchIcon} alt="검색" />
          </S.SearchIcon>
        </S.SearchBar>

        <S.Grid>
          {pageItems.map((c, idx) => {
            const itemKey = `${page}-${idx}-${String(c.id ?? "")}`;
            return (
              <S.Card key={itemKey} onClick={() => navigate(`/course/${c.id}`)}>
                <S.CardContent>
                  <S.LevelBadge>난이도 : {c.level}</S.LevelBadge>
                  <S.CardTitle>{c.title}</S.CardTitle>
                  <S.KeywordContainer>
                    {(c.keywords ?? []).map((keyword, idx) => (
                      <S.Keyword key={idx}>{keyword}</S.Keyword>
                    ))}
                  </S.KeywordContainer>
                </S.CardContent>
                <S.MoreButtonWrapper
                  ref={openMenuId === itemKey ? menuRef : null}
                >
                  <S.MoreButton
                    aria-label="more"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === itemKey ? null : itemKey);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                    </svg>
                  </S.MoreButton>
                  {openMenuId === itemKey && (
                    <S.CourseMenu>
                      <S.CourseMenuItem
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          navigate(`/course/update/${c.id}`);
                        }}
                      >
                        코스 수정
                      </S.CourseMenuItem>
                      <S.CourseMenuItem
                        $danger
                        onClick={async (
                          e: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          e.stopPropagation();
                          if (!window.confirm("정말 삭제하시겠습니까?")) {
                            setOpenMenuId(null);
                            return;
                          }
                          try {
                            const { default: courseApi } = await import(
                              "../../api/courseApi"
                            );
                            await courseApi.deleteCourse(
                              c.id as string | number
                            );
                            const data = await courseApi.getCourses();
                            if (Array.isArray(data)) {
                              setCourses(
                                data.map((it: any) => ({
                                  id: it.id ?? it.code,
                                  title: it.title ?? it.name,
                                  level: it.level ?? it.difficulty ?? "",
                                  keywords: it.keywords ?? it.tags ?? [],
                                }))
                              );
                            }
                          } catch (err) {
                            console.error("Course delete failed:", err);
                            alert("코스 삭제 중 오류가 발생했습니다.");
                          }
                          setOpenMenuId(null);
                        }}
                      >
                        코스 삭제
                      </S.CourseMenuItem>
                    </S.CourseMenu>
                  )}
                </S.MoreButtonWrapper>
              </S.Card>
            );
          })}
        </S.Grid>

        <S.BottomBar>
          <S.Pagination>
            <S.PaginationContainer>
              <S.PaginationButton>
                <S.ArrowIcon src={ArrowLeftIcon} alt="이전" />
              </S.PaginationButton>
              <S.PaginationNumbers>
                <S.PaginationNumber data-is-active={true}>1</S.PaginationNumber>
                <S.PaginationNumber>2</S.PaginationNumber>
                <S.PaginationNumber>3</S.PaginationNumber>
                <S.PaginationNumber>4</S.PaginationNumber>
                <S.PaginationNumber>5</S.PaginationNumber>
              </S.PaginationNumbers>
              <S.PaginationButton>
                <S.ArrowIcon src={ArrowRightIcon} alt="다음" />
              </S.PaginationButton>
            </S.PaginationContainer>
          </S.Pagination>
          <S.CreateButton onClick={() => navigate("/course/create")}>
            코스 생성
          </S.CreateButton>
        </S.BottomBar>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default CoursePage;
