// KeywordField.tsx
// 키워드 입력 및 목록 표시를 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/update/style";

interface KeywordFieldProps {
  keywords: string[];
  keywordInput: string;
  onKeywordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeywordKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddKeyword: () => void;
  onRemoveKeyword: (keyword: string) => void;
}

const KeywordField: React.FC<KeywordFieldProps> = ({
  keywords,
  keywordInput,
  onKeywordInputChange,
  onKeywordKeyPress,
  onAddKeyword,
  onRemoveKeyword,
}) => {
  return (
    <S.Group>
      <S.Label>키워드</S.Label>
      <S.KeywordInputContainer>
        <S.KeywordInput
          value={keywordInput}
          onChange={onKeywordInputChange}
          onKeyPress={onKeywordKeyPress}
        />
        <S.KeywordAddIcon onClick={onAddKeyword}>+</S.KeywordAddIcon>
      </S.KeywordInputContainer>
      {keywords.length > 0 && (
        <S.KeywordList>
          {keywords.map((keyword) => (
            <S.KeywordTag key={keyword}>
              {keyword}
              <S.KeywordRemove onClick={() => onRemoveKeyword(keyword)}>
                ×
              </S.KeywordRemove>
            </S.KeywordTag>
          ))}
        </S.KeywordList>
      )}
    </S.Group>
  );
};

export default KeywordField;