// users 페이지의 상단 검색 영역(UI)을 분리한 컴포넌트입니다.
import type { ChangeEvent } from "react";
import * as S from "../../../page/users/styles";

type UsersSearchBoxProps = {
  // 검색어 입력 값과 변경 핸들러를 그대로 props로 전달받습니다.
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchIconSrc: string;
};

export function UsersSearchBox({
  searchTerm,
  onSearchChange,
  searchIconSrc,
}: UsersSearchBoxProps) {
  return (
    <S.SearchBox>
      <S.SearchInput
        type="text"
        placeholder="문제 이름을 검색하세요"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <S.SearchIconContainer>
        <img src={searchIconSrc} alt="검색" />
      </S.SearchIconContainer>
    </S.SearchBox>
  );
}

