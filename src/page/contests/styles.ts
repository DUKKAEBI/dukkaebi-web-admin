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
`;

export const CardImageWrapper = styled.div`
  position: relative;
  width: 183px;
  height: 128px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  z-index: 1;
`;

export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardBody = styled.div`
  background: var(--gray-5);
  border: 1px solid var(--gray-4);
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 12px 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CardTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #000;
  margin: 0;
`;

export const CardMeta = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: var(--gray-2);
  margin: 0;
`;

export const BottomBar = styled.div`
  width: 100vw;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center; // 중앙 정렬
  position: relative; // absolute 기준점
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
  position: relative;
`;

export const MoreButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

export const ContestMenu = styled.div`
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

export const ContestMenuItem = styled.button<{ $danger?: boolean }>`
  background: transparent;
  border: none;
  text-align: left;
  padding: 10px 16px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${(p) => (p.$danger ? "#EB5757" : "#000000")};
  cursor: pointer;

  &:hover {
    background: var(--gray-5);
  }
`;
