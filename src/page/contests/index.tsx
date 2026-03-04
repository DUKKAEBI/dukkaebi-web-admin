import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { SearchBar, ContestGrid, BottomBar } from "../../components/contests";
import * as S from "./styles";

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
    c.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <S.Container>
      <Header />

      <S.Main>
        <SearchBar
          query={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
        />

        <ContestGrid
          contests={filteredContests}
          defaultImage={DEFAULT_IMAGE}
          onCardClick={(code) => navigate(`/contests/${code}`)}
        />

        <BottomBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onCreateClick={() => navigate("/contests/create")}
          getPageNumbers={getPageNumbers}
        />
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default ContestsPage;

//대회 조회 패이지
