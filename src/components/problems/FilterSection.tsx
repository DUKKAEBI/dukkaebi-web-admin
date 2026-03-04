/**
 * FilterSection 컴포넌트
 * 
 * 문제 필터링 기능을 제공하는 컴포넌트
 * - 난이도 필터 (금, 은, 동, 철, 옥)
 * - 시간 정렬 (최신순, 오래된순)
 * - 정답률 정렬 (낮은 순, 높은 순)
 * 
 * @param {string | null} openDropdown - 현재 열려있는 드롭다운
 * @param {function} setOpenDropdown - 드롭다운 상태 변경 핸들러
 * @param {number | null} difficultyFilter - 선택된 난이도
 * @param {string | null} difficultyLabel - 난이도 표시 라벨
 * @param {function} onDifficultySelect - 난이도 선택 핸들러
 * @param {string | null} sortBy - 시간 정렬 기준
 * @param {string | null} timeLabel - 시간 표시 라벨
 * @param {function} onTimeSelect - 시간 정렬 선택 핸들러
 * @param {string | null} successRateFilter - 정답률 정렬 기준
 * @param {string | null} successRateLabel - 정답률 표시 라벨
 * @param {function} onSuccessRateSelect - 정답률 정렬 선택 핸들러
 * @param {React.RefObject} dropdownRef - 드롭다운 외부 클릭 감지용 ref
 */

import * as S from "../../page/problems/style";
import ArrowDownIcon from "../../assets/image/problems/arrow-down.png";

interface FilterSectionProps {
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
  difficultyFilter: number | null;
  difficultyLabel: string | null;
  onDifficultySelect: (level: number | null, label: string | null) => void;
  sortBy: string | null;
  timeLabel: string | null;
  onTimeSelect: (time: string | null, label: string | null) => void;
  successRateFilter: "asc" | "desc" | null;
  successRateLabel: string | null;
  onSuccessRateSelect: (
    order: "asc" | "desc" | null,
    label: string | null
  ) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const FilterSection = ({
  openDropdown,
  setOpenDropdown,
  difficultyFilter,
  difficultyLabel,
  onDifficultySelect,
  sortBy,
  timeLabel,
  onTimeSelect,
  successRateFilter,
  successRateLabel,
  onSuccessRateSelect,
  dropdownRef,
}: FilterSectionProps) => {
  return (
    <S.FilterSection ref={dropdownRef}>
      <S.FilterButtonsWrapper>
        {/* 난이도 필터 */}
        <S.FilterButtonGroup>
          <S.FilterButton
            isActive={openDropdown === "difficulty" || difficultyFilter !== null}
            onClick={() =>
              setOpenDropdown(openDropdown === "difficulty" ? null : "difficulty")
            }
          >
            {difficultyLabel || "난이도"}
            <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
          </S.FilterButton>

          {openDropdown === "difficulty" && (
            <S.DropdownMenu>
              <S.DropdownItem
                isSelected={difficultyFilter === null}
                onClick={() => onDifficultySelect(null, null)}
              >
                선택 안함
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 1}
                onClick={() => onDifficultySelect(1, "금")}
              >
                금
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 2}
                onClick={() => onDifficultySelect(2, "은")}
              >
                은
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 3}
                onClick={() => onDifficultySelect(3, "동")}
              >
                동
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 4}
                onClick={() => onDifficultySelect(4, "철")}
              >
                철
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 5}
                onClick={() => onDifficultySelect(5, "옥")}
              >
                옥
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.FilterButtonGroup>

        {/* 시간 정렬 */}
        <S.FilterButtonGroup>
          <S.FilterButton
            isActive={openDropdown === "time" || sortBy !== null}
            onClick={() =>
              setOpenDropdown(openDropdown === "time" ? null : "time")
            }
          >
            {timeLabel || "시간"}
            <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
          </S.FilterButton>

          {openDropdown === "time" && (
            <S.DropdownMenu>
              <S.DropdownItem
                isSelected={sortBy === null}
                onClick={() => onTimeSelect(null, null)}
              >
                선택 안함
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={sortBy === "recent"}
                onClick={() => onTimeSelect("recent", "최신순")}
              >
                최신순
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={sortBy === "old"}
                onClick={() => onTimeSelect("old", "오래된순")}
              >
                오래된순
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.FilterButtonGroup>

        {/* 정답률 정렬 */}
        <S.FilterButtonGroup>
          <S.FilterButton
            isActive={
              openDropdown === "successRate" || successRateFilter !== null
            }
            onClick={() =>
              setOpenDropdown(
                openDropdown === "successRate" ? null : "successRate"
              )
            }
          >
            {successRateLabel || "정답률"}
            <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
          </S.FilterButton>

          {openDropdown === "successRate" && (
            <S.DropdownMenu>
              <S.DropdownItem
                isSelected={successRateFilter === null}
                onClick={() => onSuccessRateSelect(null, null)}
              >
                선택 안함
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={successRateFilter === "asc"}
                onClick={() => onSuccessRateSelect("asc", "정답률 낮은 순")}
              >
                정답률 낮은 순
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={successRateFilter === "desc"}
                onClick={() => onSuccessRateSelect("desc", "정답률 높은 순")}
              >
                정답률 높은 순
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.FilterButtonGroup>
      </S.FilterButtonsWrapper>
    </S.FilterSection>
  );
};
