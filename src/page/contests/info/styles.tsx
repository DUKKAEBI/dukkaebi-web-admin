import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #1d1d1d;
  margin: 0;
`;

export const Description = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #828282;
  margin: 0;
  line-height: 1.5;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid #e0e0e0;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: ${(props) =>
    props.$active ? "3px solid #00b4b7" : "3px solid transparent"};
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  color: ${(props) => (props.$active ? "#1d1d1d" : "#828282")};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -1px;

  &:hover {
    color: #1d1d1d;
  }
`;

export const TabContent = styled.div`
  width: 100%;
`;
