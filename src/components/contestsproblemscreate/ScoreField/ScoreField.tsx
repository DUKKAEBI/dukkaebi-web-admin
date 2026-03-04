// 배점 입력 필드
import * as S from "../../../page/contests/problems/create/styles";

interface ScoreFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ScoreField = ({ value, onChange }: ScoreFieldProps) => {
  return (
    <S.Field>
      <S.Label>배점</S.Label>
      <S.Input
        type="number"
        placeholder="10"
        value={value}
        onChange={onChange}
      />
    </S.Field>
  );
};
