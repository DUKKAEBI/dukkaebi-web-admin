import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
  width: 100%;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 1;
  color: #444444;
  margin: 0 0 20px 0;
`;

export const Subtitle = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  color: #828282;
  margin: 0 0 40px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 30px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-family: "Pretendard", sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: #888888;
  display: block;
  margin-bottom: 12px;
`;

export const Input = styled.input`
  width: 100%;
  height: 67px;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  color: #000000;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #00b4b7;
    box-shadow: 0 0 0 3px rgba(0, 180, 183, 0.1);
  }

  &::placeholder {
    color: #bdbdbd;
  }

  &[type="datetime-local"] {
    color-scheme: light;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  color: #000000;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #00b4b7;
    box-shadow: 0 0 0 3px rgba(0, 180, 183, 0.1);
  }

  &::placeholder {
    color: #bdbdbd;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  min-width: 150px;
  height: 66px;
  background-color: #00b4b7;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #009093;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

export const CancelButton = styled.button`
  min-width: 150px;
  height: 66px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #828282;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #bdbdbd;
  }

  &:active {
    transform: scale(0.98);
  }
`;
