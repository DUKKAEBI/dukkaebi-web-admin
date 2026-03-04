// 점수 입력 필드
import * as S from "../../../page/contests/problems/update/styles";

interface ScoreFieldProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ScoreField = ({ value, onChange }: ScoreFieldProps) => {
  return (
    <S.Field>
      <S.Label>점수</S.Label>
      <S.Input
        type="text"
        placeholder="100"
        value={value}
        onChange={onChange}
        $primaryBorder
      />
    </S.Field>
  );
};
