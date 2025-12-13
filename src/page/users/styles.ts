import styled from "styled-components";

// Colors
const COLORS = {
  primary: "#00b4b7",
  primaryLight: "rgba(0, 180, 183, 0.2)",
  black: "#1d1d1d",
  white: "#ffffff",
  grayLight: "#f6f6f6",
  grayBorder: "#ededed",
  grayText: "#828282",
  grayText2: "#bdbdbd",
  grayText3: "#e0e0e0",
};

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: var(--gray-5);
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 150vh;
`;

export const SearchBox = styled.div`
  width: 100%;
  height: 46px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.white};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 30px;
`;

export const SearchInput = styled.input`
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

export const SearchIconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SearchIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// export const FilterButton = styled.button`
//   display: inline-flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 8px;
//   padding: 8px 16px;
//   border-radius: 6px;
//   background: #ffffff;
//   border: 1px solid var(--gray-4);
//   font-family: "Pretendard", sans-serif;
//   font-weight: 500;
//   font-size: 14px;
//   color: var(--black);
//   min-width: 120px;
//   width: 115px;
//   cursor: pointer;
// `;

export const Filters = styled.div`
  position: relative;
  width: 100%;
  max-width: 795px;
  display: flex;
  align-items: center;
  margin-bottom: -16px;
`;

export const FilterMenu = styled.div`
  width: 15%;
  position: absolute;
  top: 42px;
  left: 0;
  background: #ffffff;
  border: 1px solid var(--gray-4);
  border-radius: 8px;
  padding: 12px 0;
  z-index: 10;
`;

export const FilterMenuItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
  padding: 8px 20px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${(p) => (p.$active ? "#00B4B7" : "var(--black)")};
  cursor: pointer;

  &:hover {
    background: var(--gray-5);
  }
`;

// Filter Section
export const FilterSection = styled.div`
  width: 795px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow: visible;
  z-index: 10;
  margin-bottom: 20px;
`;

export const Table = styled.div`
  width: 100%;
  max-width: 795px;
`;

export const FilterButtonsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const FilterButtonGroup = styled.div`
  position: relative;
`;

interface FilterButtonProps {
  isActive?: boolean;
}

export const FilterButton = styled.button<FilterButtonProps>`
  background-color: ${(props) =>
    props.isActive ? COLORS.primaryLight : COLORS.white};
  border: 1px solid
    ${(props) => (props.isActive ? COLORS.primary : COLORS.grayBorder)};
  border-radius: 6px;
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: ${(props) => (props.isActive ? 600 : 500)};
  color: ${(props) => (props.isActive ? COLORS.primary : COLORS.black)};

  &:hover {
    opacity: 0.8;
  }
`;

// Dropdown Menu
export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.grayBorder};
  border-radius: 6px;
  overflow: hidden;
  z-index: 100;
  min-width: 150px;
  margin-top: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

interface DropdownItemProps {
  isSelected?: boolean;
}

export const DropdownItem = styled.div<DropdownItemProps>`
  padding: 12px 16px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.isSelected ? COLORS.primary : COLORS.black)};
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? COLORS.primaryLight : "transparent"};

  &:hover {
    background-color: ${COLORS.grayLight};
  }
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
  padding: 16px 20px;
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

export const PaginationContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

export const PaginationButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
`;

export const PaginationNumbers = styled.div`
  display: flex;
  gap: 12px;
`;

interface PaginationNumberProps {
  isActive?: boolean;
}

export const PaginationNumber = styled.button<PaginationNumberProps>`
  width: auto;
  min-width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.isActive ? COLORS.grayText : COLORS.grayText2)};
  cursor: pointer;

  &:hover {
    color: ${COLORS.grayText};
  }
`;
