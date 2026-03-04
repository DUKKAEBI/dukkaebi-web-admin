// Actions.tsx
// 대회 수정 취소 및 수정 버튼을 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/contests/update/styles";

interface ActionsProps {
  loading: boolean;
  onCancel: () => void;
}

const Actions: React.FC<ActionsProps> = ({ loading, onCancel }) => {
  return (
    <S.Actions>
      <S.CancelButton type="button" onClick={onCancel}>
        대회 수정 취소하기
      </S.CancelButton>
      <S.SubmitButton type="submit" disabled={loading}>
        대회 수정하기
      </S.SubmitButton>
    </S.Actions>
  );
};

export default Actions;
