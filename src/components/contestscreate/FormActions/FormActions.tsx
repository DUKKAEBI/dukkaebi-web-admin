// 폼 액션 버튼 컴포넌트
import * as S from "../../../page/contests/create/styles";

interface FormActionsProps {
  loading: boolean;
  onCancel: () => void;
}

export const FormActions = ({ loading, onCancel }: FormActionsProps) => {
  return (
    <S.Actions>
      <S.CancelButton type="button" onClick={onCancel}>
        대회 생성 취소하기
      </S.CancelButton>
      <S.SubmitButton type="submit" disabled={loading}>
        대회 생성하기
      </S.SubmitButton>
    </S.Actions>
  );
};
