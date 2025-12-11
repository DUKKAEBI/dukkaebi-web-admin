import styled from "styled-components";

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
  background: ${COLORS.white};
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
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 794px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const Title = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-size: 26px;
  font-weight: 600;
  line-height: 1;
  color: #000000;
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.gray1};
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  background: ${COLORS.gray5};
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  color: ${COLORS.black};
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${COLORS.gray2};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px 16px;
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  background: ${COLORS.gray5};
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  color: ${COLORS.black};
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${COLORS.gray2};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

export const RangeContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const RangeInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  background: ${COLORS.gray5};
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  color: ${COLORS.black};
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${COLORS.gray2};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

export const TestCaseSection = styled.div`
  border: 1px solid ${COLORS.gray3};
  border-radius: 8px;
  overflow: hidden;
`;

export const TestCaseHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 0;
  background-color: ${COLORS.gray5};
  border-bottom: 1px solid ${COLORS.gray3};
  font-family: "Pretendard", sans-serif;
`;

export const TestCaseLabel = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.gray1};
  padding: 12px 16px;
  border-right: 1px solid ${COLORS.gray3};

  &:last-child {
    border-right: none;
  }
`;

export const TestCaseRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 0;
  border-bottom: 1px solid ${COLORS.gray3};
  background-color: ${COLORS.white};

  &:last-of-type {
    border-bottom: 1px solid ${COLORS.gray3};
  }
`;

export const TestCaseCell = styled.div`
  padding: 12px 16px;
  background-color: ${COLORS.white};
  border-right: 1px solid ${COLORS.gray3};

  &:last-child {
    border-right: none;
  }
`;

export const TestCaseInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 0;
  background: transparent;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  color: ${COLORS.black};
  box-sizing: border-box;
  transition: background-color 0.2s;

  &::placeholder {
    color: ${COLORS.gray2};
  }

  &:focus {
    outline: none;
    background-color: rgba(0, 180, 183, 0.05);
  }
`;

export const AddTestCaseButton = styled.button`
  height: 40px;
  border: none;
  border-top: 1px solid ${COLORS.gray3};
  background: ${COLORS.white};
  color: ${COLORS.gray2};
  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 300;
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.gray5};
  }
`;

export const DifficultyGroup = styled.div`
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

export const DifficultyDropdownContainer = styled.div`
  position: relative;
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

export const DifficultyIconSmall = styled.img`
  width: 16px;
  height: 16px;
`;

export const DifficultyDropdownArrow = styled.span`
  margin-left: auto;
  font-size: 10px;
  color: ${COLORS.gray1};
  font-family: 'simple-line-icons' !important;
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

export const DifficultyOptions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const DifficultyOption = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: 2px solid ${(props) => (props.isSelected ? COLORS.primary : COLORS.gray3)};
    border-radius: 8px;
    background-color: ${(props) => (props.isSelected ? "rgba(0, 180, 183, 0.1)" : COLORS.white)};
    transition: all 0.2s;

    &:hover {
      border-color: ${COLORS.primary};
    }
  }
`;

export const DifficultyIcon = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: #bdbdbd;
  color: #ffffff;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #a8a8a8;
  }
`;

export const SubmitButton = styled.button`
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: ${COLORS.primary};
  color: #ffffff;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:disabled {
    background: ${COLORS.gray2};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #00a0a3;
  }
`;
