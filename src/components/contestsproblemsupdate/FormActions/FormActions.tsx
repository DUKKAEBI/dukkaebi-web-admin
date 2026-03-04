// 폼 액션 버튼들
import * as S from "../../../page/contests/problems/update/styles";

interface FormActionsProps {
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormActions = ({ onCancel, onSubmit }: FormActionsProps) => {
  return (
    <S.Actions>
      <S.SecondaryButton onClick={onCancel}>
        문제 수정 취소하기
      </S.SecondaryButton>
      <S.PrimaryButton onClick={onSubmit}>문제 수정하기</S.PrimaryButton>
    </S.Actions>
  );
};
