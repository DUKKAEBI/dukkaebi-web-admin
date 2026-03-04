import styled from "styled-components";

export const Container = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  min-height: 400px;
`;

export const InfoText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1d;
  margin: 0 0 24px 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  border-bottom: 1px solid #e0e0e0;
`;

export const HeaderCell = styled.th<{ $alignRight?: boolean }>`
  padding: 12px 0;
  text-align: ${(props) => (props.$alignRight ? "right" : "left")};
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1d;
  border-bottom: 1px solid #e0e0e0;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const RankCell = styled.td`
  padding: 16px 0;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #00b4b7;
`;

export const NameCell = styled.td`
  padding: 16px 0;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1d;
`;

export const NumberCell = styled.td<{ $alignRight?: boolean }>`
  padding: 16px 0;
  text-align: ${(props) => (props.$alignRight ? "right" : "left")};
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1d;
`;

