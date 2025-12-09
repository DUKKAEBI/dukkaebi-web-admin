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
  width: 100%;
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
