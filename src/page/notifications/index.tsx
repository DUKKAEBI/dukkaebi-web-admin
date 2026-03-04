import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { SearchBar, NoticeTable, Pagination } from "../../components/notifications";
import noticeApi from "../../api/noticeApi";
import { Page, Main, Container } from "./style";

export default function NoticesPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async (page: number) => {
    setLoading(true);
    try {
      const data = await noticeApi.getNotices(page, 10);
      setNotices(data.content || []);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.currentPage || 0);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(0);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      fetchNotices(page);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchNotices(0);
      return;
    }

    try {
      const data = await noticeApi.searchNotices(searchQuery);
      setNotices(data.content || data || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(0);
    } catch (error) {
      console.error("Failed to search notices:", error);
    }
  };

  const handleNoticeClick = (noticeId: number) => {
    navigate(`/notifications/${noticeId}`);
  };

  const handleCreateClick = () => {
    navigate("/notifications/create");
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Page>
      <Header />
      <Main>
        <Container>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchInputChange}
            onSearch={handleSearch}
          />
          
          <NoticeTable
            notices={notices}
            onRowClick={handleNoticeClick}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onCreateClick={handleCreateClick}
          />
        </Container>
      </Main>
      <Footer />
    </Page>
  );
}
