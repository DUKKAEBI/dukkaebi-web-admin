import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import arrowLeft from "../../assets/image/notifications/arrow-left.png";
import arrowRight from "../../assets/image/notifications/arrow-right.png";
import search from "../../assets/image/notifications/search.png";
import noticeApi from "../../api/noticeApi";

import {
  Page,
  Main,
  Container,
  SearchBar,
  NoticeTable,
  TableHeader,
  TableRow,
  Left,
  Right,
  PaginationWrapper,
  Pagination,
  ArrowButton,
  Pages,
  PageButton,
  CreateButton,
  PaginationCenter,
} from "./style";

export default function NoticesPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;

  const fetchNotices = async (page: number) => {
    setLoading(true);
    try {
      const data = await noticeApi.getNotices(page, PAGE_SIZE);
      setNotices([...(data.content || [])].reverse());
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
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

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, startPage + 4);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Page>
      <Header />

      <Main>
        <Container>
          {/* Search */}
          <SearchBar>
            <input
              type="text"
              placeholder="공지사항을 검색하세요.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <img
              src={search}
              alt="search"
              onClick={handleSearch}
              style={{ cursor: "pointer" }}
            />
          </SearchBar>

          {/* Table */}
          <NoticeTable>
            <TableHeader>
              <span>번호</span>
              <span>제목</span>
              <span>작성자</span>
              <span>등록일</span>
              <span>조회</span>
            </TableHeader>

            {notices.map((notice, index) => (
              <TableRow
                key={notice.noticeId}
                isLast={index === notices.length - 1}
                onClick={() => navigate(`/notifications/${notice.noticeId}`)}
              >
                <span>{notice.noticeId}</span>
                <span>{notice.title}</span>
                <span>{notice.writer}</span>
                <span>{notice.date}</span>
                <span>{notice.hits}</span>
              </TableRow>
            ))}
          </NoticeTable>

          {/* Pagination */}
          <PaginationWrapper>
            {/* 가운데 페이지네이션 */}
            <PaginationCenter>
              <Pagination>
                <ArrowButton
                  direction="left"
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{
                    cursor: currentPage > 0 ? "pointer" : "default",
                    opacity: currentPage > 0 ? 1 : 0.5,
                  }}
                >
                  <img src={arrowLeft} alt="prev" />
                </ArrowButton>

                <Pages>
                  {getPageNumbers().map((page) => (
                    <PageButton
                      key={page}
                      active={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page + 1}
                    </PageButton>
                  ))}
                </Pages>

                <ArrowButton
                  direction="right"
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{
                    cursor:
                      currentPage < totalPages - 1 ? "pointer" : "default",
                    opacity: currentPage < totalPages - 1 ? 1 : 0.5,
                  }}
                >
                  <img src={arrowRight} alt="next" />
                </ArrowButton>
              </Pagination>
            </PaginationCenter>

            {/* 오른쪽 공지 생성 버튼 */}
            <CreateButton onClick={() => navigate("/notifications/create")}>
              공지 생성
            </CreateButton>
          </PaginationWrapper>
        </Container>
      </Main>

      <Footer />
    </Page>
  );
}
