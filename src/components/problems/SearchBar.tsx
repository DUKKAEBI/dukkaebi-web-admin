/**
 * SearchBar 컴포넌트
 * 
 * 문제 검색 기능을 제공하는 컴포넌트
 * - 문제 제목 검색
 * - 실시간 검색 지원
 * 
 * @param {string} value - 현재 검색어 값
 * @param {function} onChange - 검색어 변경 핸들러
 */

import * as S from "../../page/problems/style";
import SearchIcon from "../../assets/image/problems/search.png";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <S.SearchBox>
      <S.SearchInput
        type="text"
        placeholder="문제 이름을 검색하세요."
        value={value}
        onChange={onChange}
      />
      <S.SearchIconContainer>
        <img src={SearchIcon} alt="검색" />
      </S.SearchIconContainer>
    </S.SearchBox>
  );
};
