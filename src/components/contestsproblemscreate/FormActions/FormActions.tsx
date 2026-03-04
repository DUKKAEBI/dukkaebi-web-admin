// 폼 액션 버튼들
import * as S from "../../../page/contests/problems/create/styles";

interface FormActionsProps {
  contestsId?: string;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormActions = ({
  contestsId,
  onCancel,
  onSubmit,
}: FormActionsProps) => {
  return (
    <S.Actions>
      <S.SecondaryButton onClick={onCancel}>
        문제 추가 취소하기
      </S.SecondaryButton>
      <S.PrimaryButton onClick={onSubmit}>문제 추가하기</S.PrimaryButton>
    </S.Actions>
  );
};
