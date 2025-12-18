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
  loginId: string;
  name: string;
  grade:
    | "은깨비"
    | "금깨비"
    | "옥깨비"
    | "신깨비"
    | "동깨비"
    | "철깨비"
    | "도깨비불";
}

const MOCK_USERS: UserRow[] = [];

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
      return "#986b52";
    case "도깨비불":
    default:
      return "#0191F8";
  }
};

const gradeOrder: Record<UserRow["grade"], number> = {
  신깨비: 1,
  옥깨비: 2,
  금깨비: 3,
  은깨비: 4,
  철깨비: 5,
  동깨비: 6,
  도깨비불: 7,
};

type SortOption = "none" | "name" | "id" | "grade";

const UsersPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("none");
  const [sortLabel, setSortLabel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [users, setUsers] = useState<UserRow[]>(MOCK_USERS);

  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let result = users.filter(
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
  }, [query, sortBy, users]);

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
    let mounted = true;
    const fetchUsers = async () => {
      try {
        const { default: userApi } = await import("../../api/userApi");
        const response = await userApi.getUsers();
        console.log("User list API response:", response);
        if (!mounted) return;

        // 응답이 배열이거나 data 필드에 배열이 있는 경우 처리
        const data = Array.isArray(response) ? response : response?.data || [];
        console.log("Processed data array:", data);

        // 영어 growth 값을 한글 등급으로 매핑
        const growthToGrade: Record<string, UserRow["grade"]> = {
          WISP: "도깨비불",
          COPPER: "동깨비",
          IRON: "철깨비",
          SILVER: "은깨비",
          GOLD: "금깨비",
          JADE: "옥깨비",
          GOD: "신깨비",
        };

        if (Array.isArray(data) && data.length > 0) {
          const mappedUsers = data.map((it: any) => {
            // growth 필드에서 영어 값을 읽어서 한글로 변환
            const rawGrowth = (it.growth ?? "COPPER").toUpperCase();
            const grade = growthToGrade[rawGrowth] ?? "동깨비";

            return {
              id: String(it.id ?? ""),
              loginId: String(it.loginId ?? ""),
              name: it.nickname ?? it.name ?? it.loginId ?? "이름 없음",
              grade,
            };
          });
          console.log("Mapped users:", mappedUsers);
          setUsers(mappedUsers);
        } else {
          console.log("No users data or empty array");
          setUsers([]);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        alert("사용자 목록을 불러오는데 실패했습니다.");
        setUsers([]);
      }
    };

    fetchUsers();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setQuery(value);
  };

  const handleSortSelect = (option: SortOption, label: string | null) => {
    setSortBy(option);
    setSortLabel(label);
    setOpenDropdown(null);
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

        {/* Filter Section */}
        <S.FilterSection ref={dropdownRef}>
          <S.FilterButtonsWrapper>
            <S.FilterButtonGroup>
              <S.FilterButton
                isActive={openDropdown === "sort" || sortBy !== "none"}
                onClick={() =>
                  setOpenDropdown(openDropdown === "sort" ? null : "sort")
                }
              >
                {sortLabel || "정렬"}
                <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
              </S.FilterButton>

              {/* Dropdown Menu - Sort */}
              {openDropdown === "sort" && (
                <S.DropdownMenu>
                  <S.DropdownItem
                    isSelected={sortBy === "none"}
                    onClick={() => handleSortSelect("none", null)}
                  >
                    선택 안함
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={sortBy === "name"}
                    onClick={() => handleSortSelect("name", "이름 순")}
                  >
                    이름 순
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={sortBy === "id"}
                    onClick={() => handleSortSelect("id", "아이디 순")}
                  >
                    아이디 순
                  </S.DropdownItem>
                  <S.DropdownItem
                    isSelected={sortBy === "grade"}
                    onClick={() => handleSortSelect("grade", "등급 순")}
                  >
                    등급 순
                  </S.DropdownItem>
                </S.DropdownMenu>
              )}
            </S.FilterButtonGroup>
          </S.FilterButtonsWrapper>
        </S.FilterSection>

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
                <S.Cell style={{ width: 200 }}>{u.loginId}</S.Cell>
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
                      <S.MenuItem
                        role="menuitem"
                        $danger
                        onClick={async () => {
                          if (!confirm("해당 유저를 삭제하시겠습니까?")) return;
                          try {
                            const { default: userApi } = await import(
                              "../../api/userApi"
                            );
                            await userApi.deleteUser(u.id);
                            console.log(`User ${u.id} deleted successfully`);

                            // refetch
                            const response = await userApi.getUsers();
                            const data = Array.isArray(response)
                              ? response
                              : response?.data || [];
                            console.log("Refetch data after delete:", data);

                            // 영어 growth 값을 한글 등급으로 매핑
                            const growthToGrade: Record<
                              string,
                              UserRow["grade"]
                            > = {
                              WISP: "도깨비불",
                              COPPER: "동깨비",
                              IRON: "철깨비",
                              SILVER: "은깨비",
                              GOLD: "금깨비",
                              JADE: "옥깨비",
                              GOD: "신깨비",
                            };

                            if (Array.isArray(data)) {
                              const mappedUsers = data.map((it: any) => {
                                const rawGrowth = (
                                  it.growth ?? "COPPER"
                                ).toUpperCase();
                                const grade =
                                  growthToGrade[rawGrowth] ?? "동깨비";

                                return {
                                  id: String(it.id ?? ""),
                                  loginId: String(it.loginId ?? ""),
                                  name:
                                    it.nickname ??
                                    it.name ??
                                    it.loginId ??
                                    "이름 없음",
                                  grade,
                                };
                              });
                              setUsers(mappedUsers);
                              alert("유저가 삭제되었습니다.");
                              setMenuOpen(null);
                            }
                          } catch (err) {
                            console.error("User delete failed:", err);
                            alert("유저 삭제 중 오류가 발생했습니다.");
                          }
                        }}
                      >
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
