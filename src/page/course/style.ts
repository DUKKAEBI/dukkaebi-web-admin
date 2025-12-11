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
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  min-height: 90vh;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const TopBar = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const SearchBar = styled.div`
  width: 100%;
  max-width: 794px;
  height: 46px;
  border: 1px solid var(--gray-4);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--gray-5);
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

export const Grid = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(4, 183px);
  gap: 20px 20px;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, 183px);
  }
`;

export const Card = styled.div`
  width: 183px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: var(--gray-5);
  border: 1px solid var(--gray-4);
  border-radius: 8px;
  padding: 16px;
  position: relative;
  min-height: 210px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
`;

export const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Keyword = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #666;
  padding: 6px 10px;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
`;

export const LevelBadge = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: var(--primary);
`;

export const CardTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #000;
  margin: 0;
`;

export const BottomBar = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
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
`;

export const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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

export const CreateButton = styled.button`
  position: absolute;
  right: 0;
  transform: translateX(-104px);
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
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

export const MoreButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const MoreButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  padding: 0;

  svg {
    opacity: 0.7;
  }

  &:hover svg {
    opacity: 1;
  }
`;

export const CourseMenu = styled.div`
  width: 90px;
  position: absolute;
  top: 32px;
  right: 12px;
  background: #ffffff;
  border: 1px solid var(--gray-4);
  border-radius: 8px;
  padding: 8px 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CourseMenuItem = styled.button<{ $danger?: boolean }>`
  background: transparent;
  border: none;
  text-align: left;
  padding: 10px 16px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${(p) => (p.$danger ? "#EB5757" : "#000000")};
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-5);
  }
`;
