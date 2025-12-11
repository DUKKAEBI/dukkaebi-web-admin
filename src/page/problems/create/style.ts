import styled, { css } from "styled-components";

// Shared tokens (align with contests/page styles)
const COLORS = {
  primary: "#00b4b7",
  black: "#1d1d1d",
  white: "#ffffff",
  gray1: "#828282", // label text
  gray2: "#bdbdbd", // placeholder
  gray3: "#e0e0e0", // light border
  gray4: "#ededed", // default border
  gray5: "#f6f6f6", // input bg
  grayLight: "#f6f6f6",
};

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 794px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
`;

export const PageTitle = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #000;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--gray-1);
`;

const baseBox = css`
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--gray-4);
  background: var(--gray-5);
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--black);
`;

export const Input = styled.input<{ $primaryBorder?: boolean }>`
  ${baseBox};
  height: 40px;
  padding: 0 20px;
  outline: none;
  border-color: ${(p) =>
    p.$primaryBorder ? "var(--primary)" : "var(--gray-4)"};
  background: ${(p) => (p.$primaryBorder ? "#fff" : "var(--gray-5)")};
`;

export const TextArea = styled.textarea`
  ${baseBox};
  padding: 20px;
  outline: none;
  background: #f7f7f7;
`;

export const TestCaseTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TestCaseHead = styled.div`
  display: flex;
`;

export const HeadCell = styled.div<{ $right?: boolean }>`
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--gray-1);
  background: var(--gray-5);
  border: 1px solid var(--gray-3);
  border-bottom: none;
  border-right: ${(p) => (p.$right ? "1px solid var(--gray-3)" : "0")};
  border-left: 1px solid var(--gray-3);
  border-top-left-radius: 8px;
  border-top-right-radius: ${(p) => (p.$right ? "8px" : "0")};
`;

export const TestCaseRow = styled.div`
  display: flex;
`;

export const CaseInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 20px;
  border: 1px solid var(--gray-3);
  background: #fff;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--black);
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-left: 1px solid var(--gray-3);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const AddRow = styled.button`
  height: 40px;
  width: 100%;
  border: 1px solid var(--gray-3);
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

export const SecondaryButton = styled.button`
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: var(--gray-2);
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
`;

export const PrimaryButton = styled.button`
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
`;

export const DifficultyDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: max-content;
  min-width: 120px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.gray4};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
`;

export const DifficultyDropdownArrow = styled.span`
  margin-left: auto;
  font-size: 10px;
  color: ${COLORS.gray1};
  font-family: "simple-line-icons" !important;
  font-style: normal;
  font-weight: normal;
  display: inline-block;
  text-decoration: inherit;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const DifficultyDropdownButton = styled.button`
  width: auto;
  min-width: 60px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid ${COLORS.gray4};
  border-radius: 6px;
  background: ${COLORS.white};
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: ${COLORS.black};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${COLORS.primary};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

export const DifficultyDropdownItem = styled.div<{ isSelected?: boolean }>`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? "rgba(0, 180, 183, 0.1)" : COLORS.white};
  color: ${(props) => (props.isSelected ? COLORS.primary : COLORS.black)};
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: ${(props) => (props.isSelected ? 600 : 500)};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.grayLight};
  }

  span {
    flex: 1;
  }
`;

export const DifficultyIconSmall = styled.img`
  width: 16px;
  height: 16px;
`;

export const DifficultyDropdownContainer = styled.div`
  position: relative;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DifficultyLabel = styled.label`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.gray1};
  margin-bottom: 8px;
`;
