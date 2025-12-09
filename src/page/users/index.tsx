import { useMemo, useState, useEffect, useRef } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

import * as S from "./styles";
import SearchIcon from "../../assets/image/problems/search.png";
import ArrowDownIcon from "../../assets/image/problems/arrow-down.png";
import { useNavigate } from "react-router-dom";
//왼쪽
import ArrowLeftIcon from "../../assets/image/problems/arrow-left.png";
//오른쪽
import ArrowRightIcon from "../../assets/image/problems/arrow-right.png";

interface UserRow {
  id: string;
  name: string;
  grade: "은깨비" | "금깨비" | "옥깨비" | "신깨비" | "동깨비" | "철깨비";
}

const MOCK_USERS: UserRow[] = [
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "철깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "은깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "금깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "옥깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "신깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
  { id: "yoonha2017", name: "이윤하", grade: "동깨비" },
];

const gradeColor = (g: UserRow["grade"]) => {
  switch (g) {
    case "은깨비":
      return "#b4b7c2";
    case "금깨비":
      return "#e0a74e";
    case "옥깨비":
      return "#00B4B7";
    case "신깨비":
      return "#af56ff";
    case "철깨비":
      return "#58596c";
    case "동깨비":
    default:
      return "#986b52";
  }
};

const gradeOrder: Record<UserRow["grade"], number> = {
  신깨비: 1,
  옥깨비: 2,
  금깨비: 3,
  은깨비: 4,
  철깨비: 5,
  동깨비: 6,
};

type SortOption = "none" | "name" | "id" | "grade";

const UsersPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("none");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let result = MOCK_USERS.filter(
      (u) =>
        u.id.toLowerCase().includes(query.toLowerCase()) ||
        u.name.includes(query)
    );

    // 정렬 적용
    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "id") {
      result = [...result].sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortBy === "grade") {
      result = [...result].sort(
        (a, b) => gradeOrder[a.grade] - gradeOrder[b.grade]
      );
    }

    return result;
  }, [query, sortBy]);

  const [page, setPage] = useState(1);
  const PER_PAGE = 14;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };

    if (menuOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };

    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // if (value.trim()) { // api 연결시 구현
    //   fetchSearchProblems(value);
    // } else {
    //   fetchProblems();
    // }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "name":
        return "이름 순";
      case "id":
        return "아이디 순";
      case "grade":
        return "등급 순";
      default:
        return "선택 안함";
    }
  };

  const handleSortSelect = (option: SortOption) => {
    setSortBy(option);
    setFilterOpen(false);
    setPage(1);
  };

  return (
    <S.Container>
      <Header />

      <S.Main>
        <S.SearchBox>
          <S.SearchInput
            type="text"
            placeholder="문제 이름을 검색하세요"
            value={searchTerm}
            onChange={handleSearch}
          />
          <S.SearchIconContainer>
            <img src={SearchIcon} alt="검색" />
          </S.SearchIconContainer>
        </S.SearchBox>

        <S.Filters ref={filterRef}>
          <S.FilterButton onClick={() => setFilterOpen(!filterOpen)}>
            {getSortLabel()}
            <img src={ArrowDownIcon} alt="검색" />
          </S.FilterButton>
          {filterOpen && (
            <S.FilterMenu>
              <S.FilterMenuItem
                $active={sortBy === "none"}
                onClick={() => handleSortSelect("none")}
              >
                선택 안함
              </S.FilterMenuItem>
              <S.FilterMenuItem
                $active={sortBy === "name"}
                onClick={() => handleSortSelect("name")}
              >
                이름 순
              </S.FilterMenuItem>
              <S.FilterMenuItem
                $active={sortBy === "id"}
                onClick={() => handleSortSelect("id")}
              >
                아이디 순
              </S.FilterMenuItem>
              <S.FilterMenuItem
                $active={sortBy === "grade"}
                onClick={() => handleSortSelect("grade")}
              >
                등급 순
              </S.FilterMenuItem>
            </S.FilterMenu>
          )}
        </S.Filters>

        <S.Table>
          <S.TableHead>
            <S.HeadCell style={{ width: 200 }}>아이디</S.HeadCell>
            <S.HeadCell style={{ width: 200 }}>이름</S.HeadCell>
            <S.HeadCell
              style={{ flex: 1, textAlign: "right", paddingRight: 52 }}
            >
              등급
            </S.HeadCell>
          </S.TableHead>
          <S.TableBody>
            {pageItems.map((u, i) => (
              <S.Row key={`${u.id}-${i}`}>
                <S.Cell style={{ width: 200 }}>{u.id}</S.Cell>
                <S.Cell style={{ width: 100 }}>{u.name}</S.Cell>
                <S.Cell
                  style={{
                    textAlign: "right",
                    color: gradeColor(u.grade),
                    width: 415,
                    marginRight: 38,
                  }}
                >
                  {u.grade}
                </S.Cell>
                <S.MoreWrapper ref={menuOpen === i ? menuRef : null}>
                  <S.MoreButton
                    aria-label="more"
                    onClick={() => setMenuOpen(menuOpen === i ? null : i)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                    </svg>
                  </S.MoreButton>
                  {menuOpen === i && (
                    <S.ContextMenu role="menu">
                      <S.MenuItem
                        role="menuitem"
                        onClick={() => navigate(`/user/${u.id}`)}
                      >
                        유저 정보 조회
                      </S.MenuItem>
                      <S.MenuItem role="menuitem" $danger>
                        유저 삭제
                      </S.MenuItem>
                    </S.ContextMenu>
                  )}
                </S.MoreWrapper>
              </S.Row>
            ))}
          </S.TableBody>
        </S.Table>

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
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default UsersPage;
