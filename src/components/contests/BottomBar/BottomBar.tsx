// BottomBar.tsx
// 페이지네이션과 대회 생성 버튼을 담당하는 컴포넌트

import React from "react";
import * as S from "../../../page/contests/styles";
import ArrowLeftIcon from "../../../assets/image/problems/arrow-left.png";
import ArrowRightIcon from "../../../assets/image/problems/arrow-right.png";

interface BottomBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCreateClick: () => void;
  getPageNumbers: () => number[];
}

const BottomBar: React.FC<BottomBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onCreateClick,
  getPageNumbers,
}) => {
  return (
    <S.BottomBar>
      <S.Pagination>
        <S.PaginationContainer>
          <S.PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            style={{
              cursor: currentPage > 0 ? "pointer" : "default",
              opacity: currentPage > 0 ? 1 : 0.5,
            }}
          >
            <S.ArrowIcon src={ArrowLeftIcon} alt="이전" />
          </S.PaginationButton>
          <S.PaginationNumbers>
            {getPageNumbers().map((page) => (
              <S.PaginationNumber
                key={page}
                data-is-active={currentPage === page}
                onClick={() => onPageChange(page)}
                style={{ cursor: "pointer" }}
              >
                {page + 1}
              </S.PaginationNumber>
            ))}
          </S.PaginationNumbers>
          <S.PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            style={{
              cursor: currentPage < totalPages - 1 ? "pointer" : "default",
              opacity: currentPage < totalPages - 1 ? 1 : 0.5,
            }}
          >
            <S.ArrowIcon src={ArrowRightIcon} alt="다음" />
          </S.PaginationButton>
        </S.PaginationContainer>
      </S.Pagination>
      <S.CreateButton onClick={onCreateClick}>대회 생성</S.CreateButton>
    </S.BottomBar>
  );
};

export default BottomBar;
