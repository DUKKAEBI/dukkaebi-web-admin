// 문제 제목 입력 필드
import * as S from "../../../page/contests/problems/create/styles";

interface TitleFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TitleField = ({ value, onChange }: TitleFieldProps) => {
  return (
    <S.Field>
      <S.Label>문제 제목</S.Label>
      <S.Input
        placeholder="학교 복도 최단거리"
        value={value}
        onChange={onChange}
      />
    </S.Field>
  );
};
