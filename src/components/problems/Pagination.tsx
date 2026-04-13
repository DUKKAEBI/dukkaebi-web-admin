/**
 * Pagination 컴포넌트
 * 
 * 페이지네이션과 문제 생성/설정 버튼을 제공하는 컴포넌트
 * - 페이지 번호 표시 (최대 5개)
 * - 이전/다음 페이지 이동
 * - Picker 모드: "문제 설정" 버튼
 * - 일반 모드: "문제 생성" 버튼
 * 
 * @param {number} currentPage - 현재 페이지 (0부터 시작)
 * @param {number} totalPages - 전체 페이지 수
 * @param {function} onPageChange - 페이지 변경 핸들러
 * @param {boolean} isPicker - Picker 모드 여부
 * @param {function} onButtonClick - 생성/설정 버튼 클릭 핸들러
 */

import * as S from "../../page/problems/style";
import ArrowLeftIcon from "../../assets/image/problems/arrow-left.png";
import ArrowRightIcon from "../../assets/image/problems/arrow-right.png";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPicker: boolean;
  onButtonClick: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isPicker,
  onButtonClick,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const maxVisible = 5;
    const startPage = Math.max(0, Math.min(currentPage - 2, totalPages - 5));
    const pages: number[] = [];

    for (let i = 0; i < Math.min(maxVisible, totalPages); i++) {
      const pageNum = startPage + i;
      if (pageNum < totalPages) {
        pages.push(pageNum);
      }
    }

    return pages;
  };

  return (
    <S.FooterControls>
      <S.PaginationContainer>
        <S.PaginationButton
          onClick={() => {
            if (currentPage > 0) onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 0}
        >
          <S.ArrowIcon src={ArrowLeftIcon} alt="이전" />
        </S.PaginationButton>

        <S.PaginationNumbers>
          {getPageNumbers().map((pageNum) => (
            <S.PaginationNumber
              key={pageNum}
              isActive={pageNum === currentPage}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum + 1}
            </S.PaginationNumber>
          ))}
        </S.PaginationNumbers>

        <S.PaginationButton
          onClick={() => {
            if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
          }}
          disabled={currentPage >= totalPages - 1}
        >
          <S.ArrowIcon src={ArrowRightIcon} alt="다음" />
        </S.PaginationButton>
      </S.PaginationContainer>

      <S.CreateButton onClick={onButtonClick}>
        {isPicker ? "문제 설정" : "문제 생성"}
      </S.CreateButton>
    </S.FooterControls>
  );
};
