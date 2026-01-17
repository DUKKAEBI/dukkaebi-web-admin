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

export const ProblemScoreCell = styled.td`
  padding: 16px 8px;
  text-align: center;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1d;
`;

export const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const ScoreText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const EditIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  color: #888;
  font-size: 12px;

  &:hover {
    color: #00b4b7;
  }
`;

export const ViewCodeButton = styled.button`
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #e8e8e8;
  }
`;

