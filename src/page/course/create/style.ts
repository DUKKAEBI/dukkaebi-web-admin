import styled from "styled-components";

const COLORS = {
  primary: "#00b4b7",
  black: "#1d1d1d",
  white: "#ffffff",
  gray1: "#828282",
  gray2: "#bdbdbd",
  gray3: "#e0e0e0",
  gray4: "#ededed",
  gray5: "#f6f6f6",
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

export const KeywordInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const KeywordInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 50px 0 16px;
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

export const KeywordAddIcon = styled.div`
  position: absolute;
  right: 16px;
  font-size: 20px;
  color: ${COLORS.primary};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const KeywordTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray3};
  border-radius: 4px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: ${COLORS.black};
`;

export const KeywordRemove = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 18px;
  color: ${COLORS.gray2};
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.black};
  }
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
  width: fit-content;
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
  width: 80px;
  justify-content: space-between;

  &:hover {
    border-color: ${COLORS.primary};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
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

export const DifficultyDropdownArrowImage = styled.img`
  width: 16px;
  height: 16px;
  margin-left: auto;
`;

export const DifficultyDropdownMenu = styled.div`
  /* place dropdown in normal flow so it pushes content below it */
  position: relative;
  margin-top: 4px;
  width: 110px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.gray4};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const DifficultyDropdownItem = styled.div<{ isSelected?: boolean }>`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: ${COLORS.white};
  color: ${COLORS.black};
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
  position: relative;

  &:hover {
    background-color: ${COLORS.grayLight};
  }

  span {
    flex: 1;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

export const CancelButton = styled.button`
  padding: 8px 32px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
