import { useMemo, useState } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import * as S from "./styles";

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

const UsersPage = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      MOCK_USERS.filter(
        (u) =>
          u.id.toLowerCase().includes(query.toLowerCase()) ||
          u.name.includes(query)
      ),
    [query]
  );

  const [page, setPage] = useState(1);
  const PER_PAGE = 14;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <S.Container>
      <Header />

      <S.Main>
        <S.SearchBar>
          <S.SearchInput
            placeholder="사용자를 검색하세요.."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <S.SearchIcon aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 4a7 7 0 105.292 11.708l3 3"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </S.SearchIcon>
        </S.SearchBar>

        <S.Filters>
          <S.FilterButton>
            선택 안함
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#828282" strokeWidth="2" />
            </svg>
          </S.FilterButton>
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
                <S.Cell style={{ width: 200 }}>{u.name}</S.Cell>
                <S.Cell
                  style={{
                    flex: 1,
                    textAlign: "right",
                    color: gradeColor(u.grade),
                  }}
                >
                  {u.grade}
                </S.Cell>
                <S.MoreWrapper>
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
                      <S.MenuItem role="menuitem">유저 정보 조회</S.MenuItem>
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
          <S.PageArrow
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14 7l-5 5 5 5" stroke="#BDBDBD" strokeLinecap="round" />
            </svg>
          </S.PageArrow>
          <S.PageNumbers>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1)
              .slice(Math.max(0, page - 3), Math.max(0, page - 3) + 5)
              .map((n) => (
                <S.PageNumber
                  key={n}
                  $active={n === page}
                  onClick={() => setPage(n)}
                >
                  {n}
                </S.PageNumber>
              ))}
          </S.PageNumbers>
          <S.PageArrow
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10 17l5-5-5-5" stroke="#BDBDBD" strokeLinecap="round" />
            </svg>
          </S.PageArrow>
        </S.Pagination>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default UsersPage;
