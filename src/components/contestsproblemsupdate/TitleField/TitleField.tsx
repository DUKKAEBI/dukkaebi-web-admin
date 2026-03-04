// 문제 제목 입력 필드
import * as S from "../../../page/contests/problems/update/styles";

interface TitleFieldProps {
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TitleField = ({ value, disabled, onChange }: TitleFieldProps) => {
  return (
    <S.Field>
      <S.Label>문제 제목</S.Label>
      <S.Input
        placeholder="학교 복도 최단거리"
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </S.Field>
  );
};
