// TitleField.tsx
// 코스 제목 입력 필드를 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/create/style";

interface TitleFieldProps {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TitleField: React.FC<TitleFieldProps> = ({ title, onChange }) => {
  return (
    <S.Group>
      <S.Label htmlFor="title">코스 제목</S.Label>
      <S.Input
        id="title"
        name="title"
        value={title}
        onChange={onChange}
      />
    </S.Group>
  );
};

export default TitleField;
