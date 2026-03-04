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

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileButton = styled.label`
  padding: 8px 24px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray3};
  background: ${COLORS.gray5};
  color: ${COLORS.black};
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${COLORS.gray4};
  }
`;

export const FileItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-top: 8px;
  border: 1px solid ${COLORS.gray3};
  border-radius: 8px;
  background: ${COLORS.gray5};
  width: fit-content;
`;

export const FileIcon = styled.span`
  font-size: 16px;
  flex-shrink: 0;
`;

export const FileName = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: ${COLORS.black};
`;

export const FileRemove = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${COLORS.gray1};
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.black};
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
