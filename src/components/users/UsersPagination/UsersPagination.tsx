// users 페이지의 하단 페이지네이션(UI) 영역을 분리한 컴포넌트입니다.
import * as S from "../../../page/users/styles";

type UsersPaginationProps = {
  page: number;
  totalPages: number;
  setPage: (next: number) => void;
  arrowLeftIconSrc: string;
  arrowRightIconSrc: string;
};

export function UsersPagination({
  page,
  totalPages,
  setPage,
  arrowLeftIconSrc,
  arrowRightIconSrc,
}: UsersPaginationProps) {
  return (
    <S.Pagination>
      <S.PaginationContainer>
        <S.PaginationButton
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
          disabled={page === 1}
        >
          <S.ArrowIcon src={arrowLeftIconSrc} alt="이전" />
        </S.PaginationButton>
        <S.PaginationNumbers>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const startPage = Math.max(
              1,
              Math.min(page - 2, totalPages - 4)
            );
            const pageNum = startPage + i;
            if (pageNum > totalPages) return null;
            return (
              <S.PaginationNumber
                key={pageNum}
                data-is-active={pageNum === page}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </S.PaginationNumber>
            );
          })}
        </S.PaginationNumbers>
        <S.PaginationButton
          onClick={() => {
            if (page < totalPages) setPage(page + 1);
          }}
          disabled={page >= totalPages}
        >
          <S.ArrowIcon src={arrowRightIconSrc} alt="다음" />
        </S.PaginationButton>
      </S.PaginationContainer>
    </S.Pagination>
  );
}

