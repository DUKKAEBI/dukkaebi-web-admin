import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
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
`;

export const CardImageWrapper = styled.div`
  position: relative;
  width: 183px;
  height: 128px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`;

export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MoreButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
`;
