// 대회 헤더 컴포넌트 (제목, 설명, 탭)
import * as S from "../../../page/contests/info/styles";

type Tab = "problems" | "participants" | "settings";

interface ContestHeaderProps {
  title?: string;
  description?: string;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const ContestHeader = ({
  title,
  description,
  activeTab,
  setActiveTab,
}: ContestHeaderProps) => {
  return (
    <S.Section>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>

      <S.Tabs>
        <S.Tab
          $active={activeTab === "problems"}
          onClick={() => setActiveTab("problems")}
        >
          문제
        </S.Tab>
        <S.Tab
          $active={activeTab === "participants"}
          onClick={() => setActiveTab("participants")}
        >
          참여 인원
        </S.Tab>
        <S.Tab
          $active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        >
          대회 설정
        </S.Tab>
      </S.Tabs>
    </S.Section>
  );
};
