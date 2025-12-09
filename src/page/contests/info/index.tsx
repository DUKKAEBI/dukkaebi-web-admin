import { useState } from "react";
import { useParams } from "react-router-dom";
import { AdminHeader } from "../../../components/admin-header";
import { ProblemsTab } from "../../../components/contest-info/problems-tab";
import { ParticipantsTab } from "../../../components/contest-info/participants-tab";
import { SettingsTab } from "../../../components/contest-info/settings-tab";
import * as S from "./styles";

type TabType = "problems" | "participants" | "settings";

const ContestInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("problems");

  // TODO: 실제 대회 데이터를 API에서 가져오기
  const contestData = {
    title: "DGSW 프로그래밍 대회",
    description:
      "DGSW 프로그래밍 대회는 교육봉사 동아리 '두카미'에서 진행하는 알고리즘 대회 입니다.",
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: "problems", label: "문제" },
    { key: "participants", label: "참여 인원" },
    { key: "settings", label: "대회 설정" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "problems":
        return <ProblemsTab contestId={id} />;
      case "participants":
        return <ParticipantsTab contestId={id} />;
      case "settings":
        return <SettingsTab contestId={id} />;
      default:
        return <ProblemsTab contestId={id} />;
    }
  };

  return (
    <S.Container>
      <AdminHeader />
      <S.Main>
        <S.Content>
          <S.Title>{contestData.title}</S.Title>
          <S.Description>{contestData.description}</S.Description>

          <S.Tabs>
            {tabs.map((tab) => (
              <S.Tab
                key={tab.key}
                $active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </S.Tab>
            ))}
          </S.Tabs>

          <S.TabContent>{renderTabContent()}</S.TabContent>
        </S.Content>
      </S.Main>
    </S.Container>
  );
};

export default ContestInfo;
