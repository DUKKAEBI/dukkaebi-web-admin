// 입력 조건 필드
import * as S from "../../../page/contests/problems/create/styles";

interface InputCondFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCondField = ({ value, onChange }: InputCondFieldProps) => {
  return (
    <S.Field>
      <S.Label>입력 조건</S.Label>
      <S.Input
        placeholder="한 줄, 두 정수 P와 F (0 ≤ P, F ≤ 10,000)"
        value={value}
        onChange={onChange}
      />
    </S.Field>
  );
};
