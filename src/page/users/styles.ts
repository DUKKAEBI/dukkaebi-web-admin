import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: var(--gray-5);
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const SearchBar = styled.div`
  width: 100%;
  max-width: 795px;
  background: #ffffff;
  border: 1px solid var(--gray-4);
  border-radius: 8px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--black);

  &::placeholder {
    color: var(--gray-3);
  }
`;

export const SearchIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Filters = styled.div`
  width: 100%;
  max-width: 795px;
  display: flex;
  align-items: center;
`;

export const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid var(--gray-4);
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--black);
`;

export const Table = styled.div`
  width: 100%;
  max-width: 795px;
`;

export const TableHead = styled.div`
  background: #ffffff;
  border: 1px solid var(--gray-4);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeadCell = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--gray-1);
`;

export const TableBody = styled.div`
  background: #ffffff;
  border: 1px solid var(--gray-4);
  border-top: none;
  border-radius: 0 0 8px 8px;
`;

export const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-top: 1px solid var(--gray-4);

  &:first-child {
    border-top: none;
  }
`;

export const Cell = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--black);
`;

export const MoreWrapper = styled.div`
  position: absolute;
  right: 12px;
`;

export const MoreButton = styled.button`
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContextMenu = styled.div`
  position: absolute;
  right: 0;
  top: 22px;
  background: #ffffff;
  border: 1px solid var(--gray-4);
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 140px;
  z-index: 10;
`;

export const MenuItem = styled.button<{ $danger?: boolean }>`
  background: transparent;
  border: none;
  text-align: left;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${(p) => (p.$danger ? "#EB5757" : "var(--black)")};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const PageArrow = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled svg path {
    stroke: var(--gray-2);
  }
`;

export const PageNumbers = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const PageNumber = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  padding: 0;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: ${(p) => (p.$active ? "#828282" : "#BDBDBD")};
`;
