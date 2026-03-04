// DescriptionField.tsx
// 코스 설명 입력 필드를 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/create/style";

interface DescriptionFieldProps {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({ description, onChange }) => {
  return (
    <S.Group>
      <S.Label htmlFor="description">코스 설명</S.Label>
      <S.TextArea
        id="description"
        name="description"
        value={description}
        onChange={onChange}
      />
    </S.Group>
  );
};

export default DescriptionField;
