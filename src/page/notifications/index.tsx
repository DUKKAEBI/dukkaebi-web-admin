// todo : api연결, pagination 부분에 페이지 버튼 동적으로 변경
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const data = await noticeApi.getNotices();
        setNotices(data.content || data || []);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const data = await noticeApi.getNotices();
      setNotices(data.content || data || []);
      return;
    }

    try {
      const data = await noticeApi.searchNotices(searchQuery);
      setNotices(data.content || data || []);
    } catch (error) {
      console.error("Failed to search notices:", error);
    }
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
            <img src={search} alt="search" onClick={handleSearch} style={{ cursor: "pointer" }} />
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
                key={notice.id}
                isLast={index === notices.length - 1}
                onClick={() => navigate(`/notifications/${notice.id}`)}
              >
                <span>{notice.id}</span>
                <span>{notice.title}</span>
                <span>{notice.author}</span>
                <span>{notice.date}</span>
                <span>{notice.views}</span>
              </TableRow>
            ))}
          </NoticeTable>

          {/* Pagination */}
          <PaginationWrapper>
            {/* 가운데 페이지네이션 */}
            <PaginationCenter>
              <Pagination>
                <ArrowButton direction="left">
                  <img src={arrowLeft} alt="prev" />
                </ArrowButton>

                <Pages>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <PageButton
                      key={page}
                      active={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PageButton>
                  ))}
                </Pages>

                <ArrowButton direction="right">
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
