// 대회 제목 입력 컴포넌트
import * as S from "../../../page/contests/create/styles";

interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TitleInput = ({ value, onChange }: TitleInputProps) => {
  return (
    <S.Group>
      <S.Label htmlFor="title">대회 제목</S.Label>
      <S.Input
        id="title"
        name="title"
        placeholder=""
        value={value}
        onChange={onChange}
      />
    </S.Group>
  );
};
