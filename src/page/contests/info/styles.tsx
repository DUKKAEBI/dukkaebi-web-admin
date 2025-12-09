import styled from "styled-components";

const COLORS = {
  primary: "#00b4b7",
  white: "#ffffff",
  gray1: "#828282",
  gray3: "#e0e0e0",
  gray4: "#ededed",
  gray5: "#f6f6f6",
  black: "#1d1d1d",
};

export const Page = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${COLORS.gray5};
`;

export const Section = styled.section`
  width: 100%;
  padding: 40px 80px 24px;
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.gray4};
`;

export const Title = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.black};
  margin: 0 0 20px 0;
`;

export const Description = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.gray1};
  margin: 0;
`;

export const Tabs = styled.nav`
  display: flex;
  gap: 60px;
  margin-top: 40px;
  max-width: 832px;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  padding: 0;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: ${(p) => (p.$active ? 600 : 500)};
  color: ${(p) => (p.$active ? COLORS.primary : COLORS.gray1)};
  cursor: pointer;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;
  margin-top: 66px;
`;

export const Table = styled.div`
  width: 100%;
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  overflow: hidden;
  background: ${COLORS.white};
`;

export const TableHead = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.gray4};
  color: ${COLORS.gray1};
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export const ColNo = styled.span`
  width: 64px; /* enough for 2 digits */
`;

export const ColTitle = styled.span`
  flex: 1;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr 16px; /* number space, title, more */
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-top: 1px solid ${COLORS.gray4};

  &:first-of-type {
    border-top: none;
  }
`;

export const CellNo = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.primary};
`;

export const CellTitle = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.black};
`;

export const MoreBtn = styled.button`
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const MoreWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  width: 120px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 6px 0;
  z-index: 10;
`;

export const DropdownItem = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
  padding: 10px 12px;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.black};
  cursor: pointer;

  &:hover {
    background: ${COLORS.gray5};
  }
`;

export const AddButton = styled.button`
  padding: 8px 24px;
  background: ${COLORS.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

// Participants tab
export const ParticipantsWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 80px 80px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ParticipantsTotal = styled.p`
  max-width: 1120px;
  width: 100%;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.black};
  margin: 0;
`;

export const ParticipantsTable = styled.div`
  width: 100%;
  max-width: 1120px;
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  overflow: hidden;
  background: ${COLORS.white};
`;

export const ParticipantsTableHead = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr 120px 120px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${COLORS.gray4};
  color: ${COLORS.gray1};
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export const ParticipantsRow = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr 120px 120px;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-top: 1px solid ${COLORS.gray4};

  &:first-of-type {
    border-top: none;
  }
`;

export const ParticipantsRank = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.primary};
`;

export const ParticipantsName = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.black};
`;

export const ParticipantsStat = styled.span`
  justify-self: end;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.black};
`;

// Settings tab
export const SettingsWrapper = styled.div`
  max-width: 1120px;
  margin: 20px 0 0 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 66px;
`;

export const SettingsActionButton = styled.button<{
  $variant?: "primary" | "error";
}>`
  width: 108px;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: ${(p) => (p.$variant === "error" ? "#eb5757" : COLORS.primary)};
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
