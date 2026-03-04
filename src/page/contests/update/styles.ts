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

  &::placeholder {
    color: ${COLORS.gray2};
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

  &::placeholder {
    color: ${COLORS.gray2};
  }
`;

// Date input looks white with slightly darker border in the design
export const DateInput = styled.input`
  width: 202px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${COLORS.gray3};
  border-radius: 8px;
  background: ${COLORS.white};
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  color: ${COLORS.black};
  box-sizing: border-box;

  &::placeholder {
    color: ${COLORS.gray2};
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.black};
  cursor: pointer;
`;

export const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  appearance: none;
  border: 2px solid ${COLORS.gray3};
  border-radius: 50%;
  position: relative;
  background: ${COLORS.white};
  transition: all 0.2s;

  &:checked {
    border-color: ${COLORS.primary};
    background: ${COLORS.primary};
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${COLORS.white};
  }
`;

export const TimeInput = styled.input`
  width: 168px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${COLORS.gray3};
  border-radius: 8px;
  background: ${COLORS.white};
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  color: ${COLORS.black};
  box-sizing: border-box;

  &::placeholder {
    color: ${COLORS.gray2};
  }
`;

export const DateTimeRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 4px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
