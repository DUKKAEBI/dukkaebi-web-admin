// 출력 조건 필드
import * as S from "../../../page/contests/problems/create/styles";

interface OutputCondFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OutputCondField = ({ value, onChange }: OutputCondFieldProps) => {
  return (
    <S.Field>
      <S.Label>출력 조건</S.Label>
      <S.Input
        placeholder="한 줄, 최단 거리(걸음 수)를 출력"
        value={value}
        onChange={onChange}
        $primaryBorder
      />
    </S.Field>
  );
};
