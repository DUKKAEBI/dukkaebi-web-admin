import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import * as S from "./styles";

interface ContestItem {
  id: string;
  title: string;
  dDay: number;
  participants: number;
  image: string;
}

const IMAGE = "https://i.ibb.co/Rp6GC0LG/dgsw.png";

const MOCK: ContestItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: `contest-${i + 1}`,
  title: "DGSW 프로그래밍 대회",
  dDay: 2,
  participants: 100,
  image: IMAGE,
}));

const ContestsPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = useMemo(
    () =>
      MOCK.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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

        <S.Grid>
          {pageItems.map((c) => (
            <S.Card key={c.id}>
              <S.CardImageWrapper>
                <S.CardImage src={c.image} alt={c.title} />
                <S.MoreButton aria-label="more">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                    <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                    <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                  </svg>
                </S.MoreButton>
              </S.CardImageWrapper>
              <S.CardBody>
                <S.CardTitle>{c.title}</S.CardTitle>
                <S.CardMeta>
                  종료까지 D-{c.dDay} ・ {c.participants}명 참여중
                </S.CardMeta>
              </S.CardBody>
            </S.Card>
          ))}
        </S.Grid>

        <S.BottomBar>
          <S.Pagination>
            <S.PageArrow
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 7l-5 5 5 5"
                  stroke="#BDBDBD"
                  strokeLinecap="round"
                />
              </svg>
            </S.PageArrow>
            <S.PageNumbers>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
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
                <path
                  d="M10 17l5-5-5-5"
                  stroke="#BDBDBD"
                  strokeLinecap="round"
                />
              </svg>
            </S.PageArrow>
          </S.Pagination>

          <S.CreateButton onClick={() => navigate("/contests/create")}>
            대회 생성
          </S.CreateButton>
        </S.BottomBar>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default ContestsPage;

//대회 조회 패이지
