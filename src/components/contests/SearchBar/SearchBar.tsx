// SearchBar.tsx
// 대회 검색 입력 필드를 담당하는 컴포넌트

import React from "react";
import * as S from "../../../page/contests/styles";
import SearchIcon from "../../../assets/image/problems/search.png";

interface SearchBarProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <S.SearchBar>
      <S.SearchInput
        placeholder="대회 이름을 검색하세요..."
        value={query}
        onChange={onChange}
      />
      <S.SearchIcon aria-hidden>
        <img src={SearchIcon} alt="검색" />
      </S.SearchIcon>
    </S.SearchBar>
  );
};

export default SearchBar;
