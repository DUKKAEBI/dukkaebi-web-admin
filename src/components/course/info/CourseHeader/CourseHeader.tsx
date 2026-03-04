// CourseHeader.tsx
// 코스 제목, 설명, 키워드를 표시하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/info/style";
import * as CourseS from "../../../../page/course/style";

interface CourseHeaderProps {
  title: string | undefined;
  description: string | undefined;
  keywords: string[];
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <S.Title>{title}</S.Title>
      <S.Description>
        {description ? (
          description
            .split("\n")
            .map((line: string, i: number) => (
              <S.DescriptionLine key={i}>{line}</S.DescriptionLine>
            ))
        ) : (
          <>
            <S.DescriptionLine>
              코스 설명을 불러오는 중입니다.
            </S.DescriptionLine>
          </>
        )}

        <CourseS.KeywordContainer style={{ marginTop: 16 }}>
          {(keywords ?? []).map((kw, idx) => (
            <S.LocalKeyword key={idx}>{kw}</S.LocalKeyword>
          ))}
        </CourseS.KeywordContainer>
      </S.Description>
    </>
  );
};

export default CourseHeader;
