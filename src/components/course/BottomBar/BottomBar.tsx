// BottomBar.tsx
// 페이지네이션과 코스 생성 버튼을 담당하는 컴포넌트

import React from "react";
import * as S from "../../../page/course/style";
import ArrowLeftIcon from "../../../assets/image/problems/arrow-left.png";
import ArrowRightIcon from "../../../assets/image/problems/arrow-right.png";

interface BottomBarProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageClick: (num: number) => void;
  onCreateClick: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({
  currentPage,
  totalPages,
  pageNumbers,
  onPrevClick,
  onNextClick,
  onPageClick,
  onCreateClick,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <S.BottomBar>
      <S.Pagination>
        <S.PaginationContainer>
          <S.PaginationButton
            onClick={onPrevClick}
            disabled={isPrevDisabled}
          >
            <S.ArrowIcon src={ArrowLeftIcon} alt="이전" />
          </S.PaginationButton>

          <S.PaginationNumbers>
            {pageNumbers.map((num) => (
              <S.PaginationNumber
                key={num}
                data-is-active={currentPage === num}
                onClick={() => onPageClick(num)}
              >
                {num}
              </S.PaginationNumber>
            ))}
          </S.PaginationNumbers>

          <S.PaginationButton
            onClick={onNextClick}
            disabled={isNextDisabled}
          >
            <S.ArrowIcon src={ArrowRightIcon} alt="다음" />
          </S.PaginationButton>
        </S.PaginationContainer>
      </S.Pagination>
      <S.CreateButton onClick={onCreateClick}>
        코스 생성
      </S.CreateButton>
    </S.BottomBar>
  );
};

export default BottomBar;
