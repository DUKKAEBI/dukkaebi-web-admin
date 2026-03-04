// DifficultyField.tsx
// 난이도 선택 드롭다운을 담당하는 컴포넌트

import React from "react";
import * as S from "../../../../page/course/update/style";
import ArrowDownIcon from "../../../../assets/image/course/simple-line-icons_arrow-down.png";
import ArrowUpIcon from "../../../../assets/image/course/simple-line-icons_arrow-up.png";

interface DifficultyFieldProps {
  difficulty: string;
  openDifficultyDropdown: boolean;
  onToggleDropdown: () => void;
  onDifficultyChange: (difficulty: string) => void;
}

const DifficultyField: React.FC<DifficultyFieldProps> = ({
  difficulty,
  openDifficultyDropdown,
  onToggleDropdown,
  onDifficultyChange,
}) => {
  return (
    <S.Group>
      <S.DifficultyLabel>난이도</S.DifficultyLabel>
      <S.DifficultyDropdownContainer>
        <S.DifficultyDropdownButton
          type="button"
          onClick={onToggleDropdown}
        >
          {difficulty}
          <S.DifficultyDropdownArrowImage
            src={openDifficultyDropdown ? ArrowUpIcon : ArrowDownIcon}
            alt="화살표"
          />
        </S.DifficultyDropdownButton>
        {openDifficultyDropdown && (
          <S.DifficultyDropdownMenu>
            {["하", "중", "상"].map((level) => (
              <S.DifficultyDropdownItem
                key={level}
                isSelected={difficulty === level}
                onClick={() => onDifficultyChange(level)}
              >
                <span>{level}</span>
              </S.DifficultyDropdownItem>
            ))}
          </S.DifficultyDropdownMenu>
        )}
      </S.DifficultyDropdownContainer>
    </S.Group>
  );
};

export default DifficultyField;