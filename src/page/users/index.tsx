import { useMemo, useState, useEffect, useRef } from "react";
import type { RefObject } from "react";
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
import {
  UsersFilterSection,
  UsersPagination,
  UsersSearchBox,
  UsersTable,
} from "../../components/users";

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
        if (!mounted) return;

        // 응답이 배열이거나 content/data 필드에 배열이 있는 경우 처리
        const data = Array.isArray(response)
          ? response
          : response?.content || response?.data || [];

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
          setUsers(mappedUsers);
        } else {
          setUsers([]);
        }
      } catch (err) {
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

  const navigateToUser = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <S.Container>
      <Header />

      <S.Main>
        <UsersSearchBox
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          searchIconSrc={SearchIcon}
        />

        <UsersFilterSection
          dropdownRef={dropdownRef as RefObject<HTMLDivElement>}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          sortBy={sortBy}
          sortLabel={sortLabel}
          handleSortSelect={handleSortSelect}
          arrowDownIconSrc={ArrowDownIcon}
        />

        <UsersTable
          pageItems={pageItems}
          navigateToUser={navigateToUser}
          gradeColor={gradeColor}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          menuRef={menuRef as RefObject<HTMLDivElement>}
          setUsers={setUsers}
        />

        <UsersPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          arrowLeftIconSrc={ArrowLeftIcon}
          arrowRightIconSrc={ArrowRightIcon}
        />
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default UsersPage;
