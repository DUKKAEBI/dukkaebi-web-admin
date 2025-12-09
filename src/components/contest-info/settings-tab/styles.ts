import styled from "styled-components";

export const Container = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  min-height: 400px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 200px;
`;

export const EditButton = styled.button`
  padding: 12px 24px;
  background-color: #00b4b7;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #009093;
  }
`;

export const EndButton = styled.button`
  padding: 12px 24px;
  background-color: #00b4b7;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #009093;
  }
`;

export const DeleteButton = styled.button`
  padding: 12px 24px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

