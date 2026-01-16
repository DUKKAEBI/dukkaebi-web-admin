import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import * as S from "./styles";
import SearchIcon from "../../assets/image/problems/search.png";
//왼쪽
import ArrowLeftIcon from "../../assets/image/problems/arrow-left.png";
//오른쪽
import ArrowRightIcon from "../../assets/image/problems/arrow-right.png";

import { contestApi } from "../../api/contestApi";

interface ContestItem {
  code: string;
  title: string;
  imageUrl: string;
  dDay: string;
  participantCount: number;
  status: string;
}

const DEFAULT_IMAGE = "https://i.ibb.co/Rp6GC0LG/dgsw.png";

const ContestsPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [contests, setContests] = useState<ContestItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchContests = async (page: number) => {
    setLoading(true);
    try {
      const data = await contestApi.getContests(page, 12);
      setContests(data.content || []);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.currentPage || 0);
    } catch (err) {
      console.error("Failed to fetch contests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests(0);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      fetchContests(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, startPage + 4);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const filteredContests = contests.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

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
            }}
          />
          <S.SearchIcon aria-hidden>
            <img src={SearchIcon} alt="검색" />
          </S.SearchIcon>
        </S.SearchBar>

        <S.Grid>
          {filteredContests.map((c) => (
            <S.Card
              key={c.code}
              onClick={() => navigate(`/contests/${c.code}`)}
            >
              <S.CardImageWrapper>
                <S.CardImage src={c.imageUrl || DEFAULT_IMAGE} alt={c.title} />
              </S.CardImageWrapper>
              <S.CardBody>
                <S.CardTitle>{c.title}</S.CardTitle>
                <S.CardMeta>
                  {c.dDay} ・ {c.participantCount}명 참여중
                </S.CardMeta>
              </S.CardBody>
            </S.Card>
          ))}
        </S.Grid>

        <S.BottomBar>
          <S.Pagination>
            <S.PaginationContainer>
              <S.PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ cursor: currentPage > 0 ? "pointer" : "default", opacity: currentPage > 0 ? 1 : 0.5 }}
              >
                <S.ArrowIcon src={ArrowLeftIcon} alt="이전" />
              </S.PaginationButton>
              <S.PaginationNumbers>
                {getPageNumbers().map((page) => (
                  <S.PaginationNumber
                    key={page}
                    data-is-active={currentPage === page}
                    onClick={() => handlePageChange(page)}
                    style={{ cursor: "pointer" }}
                  >
                    {page + 1}
                  </S.PaginationNumber>
                ))}
              </S.PaginationNumbers>
              <S.PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ cursor: currentPage < totalPages - 1 ? "pointer" : "default", opacity: currentPage < totalPages - 1 ? 1 : 0.5 }}
              >
                <S.ArrowIcon src={ArrowRightIcon} alt="다음" />
              </S.PaginationButton>
            </S.PaginationContainer>
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
