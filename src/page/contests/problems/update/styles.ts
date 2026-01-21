import styled, { css } from "styled-components";

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

export const Label = styled.label`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--gray-1);
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  ${Label} {
    font-size: 20px;
    align-self: flex-end;
  }
`;

export const PageTitle = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 26px;
  color: #000;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  position: relative;

  &:hover > button {
    opacity: 1;
  }
`;

export const CaseTextArea = styled.textarea`
  width: 100%;
  min-height: 40px;
  padding: 8px;
  resize: none; /* 수동 리사이즈 제거 */
  overflow: hidden; /* 스크롤 안 보이게 */
  font-family: monospace;
  line-height: 1.5;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    border-color: #4f46e5;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: -36px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #999;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.2s,
    color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #e53935;
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
