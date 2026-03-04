// 대회 시작 날짜 선택 컴포넌트
import * as S from "../../../page/contests/create/styles";

interface StartDateSelectorProps {
  startDateType: "unlimited" | "specific";
  startDate: string;
  startTime: string;
  onRadioChange: (type: "start" | "end", value: "unlimited" | "specific") => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StartDateSelector = ({
  startDateType,
  startDate,
  startTime,
  onRadioChange,
  onChange,
}: StartDateSelectorProps) => {
  return (
    <S.Group>
      <S.Label>대회 시작 날짜</S.Label>
      <S.RadioGroup>
        <S.RadioLabel>
          <S.RadioInput
            type="radio"
            name="startDateType"
            checked={startDateType === "unlimited"}
            onChange={() => onRadioChange("start", "unlimited")}
          />
          제한 없음
        </S.RadioLabel>
        <S.RadioLabel>
          <S.RadioInput
            type="radio"
            name="startDateType"
            checked={startDateType === "specific"}
            onChange={() => onRadioChange("start", "specific")}
          />
          특정 시각
        </S.RadioLabel>
      </S.RadioGroup>
      {startDateType === "specific" && (
        <S.DateTimeRow>
          <S.DateInput
            name="startDate"
            type="date"
            value={startDate}
            onChange={onChange}
          />
          <S.TimeInput
            name="startTime"
            type="time"
            value={startTime}
            onChange={onChange}
            placeholder="오후 8:00"
          />
        </S.DateTimeRow>
      )}
    </S.Group>
  );
};
