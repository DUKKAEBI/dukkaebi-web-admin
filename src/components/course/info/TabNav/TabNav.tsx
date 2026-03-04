// TabNav.tsx
// 탭 네비게이션을 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/info/style";

interface TabNavProps {
  activeTab: "problems" | "participants" | "settings";
  onTabChange: (tab: "problems" | "participants" | "settings") => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <S.Tabs>
      <S.Tab
        $active={activeTab === "problems"}
        onClick={() => onTabChange("problems")}
      >
        코스
      </S.Tab>
      <S.Tab
        $active={activeTab === "participants"}
        onClick={() => onTabChange("participants")}
      >
        참여 인원
      </S.Tab>
      <S.Tab
        $active={activeTab === "settings"}
        onClick={() => onTabChange("settings")}
      >
        코스 설정
      </S.Tab>
    </S.Tabs>
  );
};

export default TabNav;
