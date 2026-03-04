/**
 * Pagination 컴포넌트
 * 
 * 페이지네이션 UI를 제공하는 컴포넌트
 * - 이전/다음 페이지 화살표 버튼
 * - 페이지 번호 버튼
 * - 공지 생성 버튼 (오른쪽에 배치)
 * 
 * @param {number} currentPage - 현재 페이지 번호
 * @param {number} totalPages - 전체 페이지 수
 * @param {function} onPageChange - 페이지 변경 핸들러
 * @param {function} onCreateClick - 공지 생성 버튼 클릭 핸들러
 */

import arrowLeft from "../../assets/image/notifications/arrow-left.png";
import arrowRight from "../../assets/image/notifications/arrow-right.png";
import * as S from "../../page/notifications/style";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCreateClick: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onCreateClick,
}: PaginationProps) => {
  /**
   * 표시할 페이지 번호 배열 생성
   * 현재 페이지를 중심으로 최대 5개 페이지 표시
   */
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
    <S.PaginationWrapper>
      {/* 가운데 페이지네이션 */}
      <S.PaginationCenter>
        <S.Pagination>
          {/* 이전 페이지 버튼 */}
          <S.ArrowButton
            direction="left"
            onClick={() => onPageChange(currentPage - 1)}
            style={{
              cursor: currentPage > 0 ? "pointer" : "default",
              opacity: currentPage > 0 ? 1 : 0.5,
            }}
          >
            <img src={arrowLeft} alt="prev" />
          </S.ArrowButton>

          {/* 페이지 번호 버튼들 */}
          <S.Pages>
            {getPageNumbers().map((page) => (
              <S.PageButton
                key={page}
                active={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page + 1}
              </S.PageButton>
            ))}
          </S.Pages>

          {/* 다음 페이지 버튼 */}
          <S.ArrowButton
            direction="right"
            onClick={() => onPageChange(currentPage + 1)}
            style={{
              cursor: currentPage < totalPages - 1 ? "pointer" : "default",
              opacity: currentPage < totalPages - 1 ? 1 : 0.5,
            }}
          >
            <img src={arrowRight} alt="next" />
          </S.ArrowButton>
        </S.Pagination>
      </S.PaginationCenter>

      {/* 오른쪽 공지 생성 버튼 */}
      <S.CreateButton onClick={onCreateClick}>공지 생성</S.CreateButton>
    </S.PaginationWrapper>
  );
};
