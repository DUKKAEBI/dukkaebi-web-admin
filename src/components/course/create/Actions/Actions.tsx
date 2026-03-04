// Actions.tsx
// 코스 생성/취소 버튼을 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/create/style";

interface ActionsProps {
  loading: boolean;
  onCancel: () => void;
}

const Actions: React.FC<ActionsProps> = ({ loading, onCancel }) => {
  return (
    <S.Actions>
      <S.CancelButton type="button" onClick={onCancel}>
        코스 생성 취소하기
      </S.CancelButton>
      <S.SubmitButton type="submit" disabled={loading}>
        코스 생성하기
      </S.SubmitButton>
    </S.Actions>
  );
};

export default Actions;
