/**
 * SearchBar 컴포넌트
 * 
 * 공지사항 검색 기능을 제공하는 컴포넌트
 * - 검색어 입력
 * - 엔터키 또는 검색 아이콘 클릭으로 검색 실행
 * 
 * @param {string} value - 현재 검색어 값
 * @param {function} onChange - 검색어 변경 핸들러
 * @param {function} onSearch - 검색 실행 핸들러
 */

import search from "../../assets/image/notifications/search.png";
import * as S from "../../page/notifications/style";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <S.SearchBar>
      <input
        type="text"
        placeholder="공지사항을 검색하세요.."
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <img
        src={search}
        alt="search"
        onClick={onSearch}
        style={{ cursor: "pointer" }}
      />
    </S.SearchBar>
  );
};
