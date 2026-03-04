// 출력 조건 필드
import * as S from "../../../page/contests/problems/update/styles";

interface OutputCondFieldProps {
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OutputCondField = ({
  value,
  disabled,
  onChange,
}: OutputCondFieldProps) => {
  return (
    <S.Field>
      <S.Label>출력 조건</S.Label>
      <S.Input
        disabled={disabled}
        placeholder="한 줄, 최단 거리(걸음 수)를 출력"
        value={value}
        onChange={onChange}
        $primaryBorder
      />
    </S.Field>
  );
};
