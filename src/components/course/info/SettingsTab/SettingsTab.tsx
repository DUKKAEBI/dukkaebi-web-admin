// SettingsTab.tsx
// 코스 설정(수정, 종료, 삭제)을 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/info/style";

interface SettingsTabProps {
  onEditClick: () => void;
  onEndClick: () => void;
  onDeleteClick: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  onEditClick,
  onEndClick,
  onDeleteClick,
}) => {
  return (
    <S.SettingsWrapper>
      <S.SettingsActionButton $variant="primary" onClick={onEditClick}>
        코스 수정
      </S.SettingsActionButton>
      <S.SettingsActionButton $variant="primary" onClick={onEndClick}>
        코스 종료
      </S.SettingsActionButton>
      <S.SettingsActionButton $variant="error" onClick={onDeleteClick}>
        코스 삭제
      </S.SettingsActionButton>
    </S.SettingsWrapper>
  );
};

export default SettingsTab;
