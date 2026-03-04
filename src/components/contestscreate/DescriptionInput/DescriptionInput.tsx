// 대회 설명 입력 컴포넌트
import * as S from "../../../page/contests/create/styles";

interface DescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
  return (
    <S.Group>
      <S.Label htmlFor="description">대회 설명</S.Label>
      <S.TextArea
        id="description"
        name="description"
        placeholder=""
        value={value}
        onChange={onChange}
      />
    </S.Group>
  );
};
