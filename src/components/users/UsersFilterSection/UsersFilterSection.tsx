// users 페이지의 정렬 필터 드롭다운(UI) 영역을 분리한 컴포넌트입니다.
import type { RefObject } from "react";
import * as S from "../../../page/users/styles";

// 정렬 옵션 타입은 페이지에서 사용 중인 구조를 그대로 복사합니다.
type SortOption = "none" | "name" | "id" | "grade";

type UsersFilterSectionProps = {
  // 드롭다운 열림 상태와 정렬 상태를 그대로 props로 전달받습니다.
  dropdownRef: RefObject<HTMLDivElement>;
  openDropdown: string | null;
  setOpenDropdown: (value: string | null) => void;
  sortBy: SortOption;
  sortLabel: string | null;
  handleSortSelect: (option: SortOption, label: string | null) => void;
  arrowDownIconSrc: string;
};

export function UsersFilterSection({
  dropdownRef,
  openDropdown,
  setOpenDropdown,
  sortBy,
  sortLabel,
  handleSortSelect,
  arrowDownIconSrc,
}: UsersFilterSectionProps) {
  return (
    <S.FilterSection ref={dropdownRef}>
      <S.FilterButtonsWrapper>
        <S.FilterButtonGroup>
          <S.FilterButton
            isActive={openDropdown === "sort" || sortBy !== "none"}
            onClick={() =>
              setOpenDropdown(openDropdown === "sort" ? null : "sort")
            }
          >
            {sortLabel || "정렬"}
            <S.ArrowIcon src={arrowDownIconSrc} alt="드롭다운" />
          </S.FilterButton>

          {/* Dropdown Menu - Sort */}
          {openDropdown === "sort" && (
            <S.DropdownMenu>
              <S.DropdownItem
                isSelected={sortBy === "none"}
                onClick={() => handleSortSelect("none", null)}
              >
                선택 안함
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={sortBy === "name"}
                onClick={() => handleSortSelect("name", "이름 순")}
              >
                이름 순
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={sortBy === "id"}
                onClick={() => handleSortSelect("id", "아이디 순")}
              >
                아이디 순
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={sortBy === "grade"}
                onClick={() => handleSortSelect("grade", "등급 순")}
              >
                등급 순
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.FilterButtonGroup>
      </S.FilterButtonsWrapper>
    </S.FilterSection>
  );
}

