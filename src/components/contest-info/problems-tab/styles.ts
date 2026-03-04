import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 24px;
  min-height: 400px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  border-bottom: 1px solid #e0e0e0;
`;

export const HeaderCell = styled.th`
  padding: 12px 0;
  text-align: left;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1d;
  border-bottom: 1px solid #e0e0e0;

  &:first-child {
    width: 80px;
  }

  &:last-child {
    width: 40px;
    text-align: right;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const NumberCell = styled.td`
  padding: 16px 0;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #00b4b7;
`;

export const TitleCell = styled.td`
  padding: 16px 0;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1d;
`;

export const ActionCell = styled.td`
  padding: 16px 0;
  text-align: right;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const AddButton = styled.button`
  position: absolute;
  bottom: 24px;
  right: 24px;
  padding: 10px 24px;
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

