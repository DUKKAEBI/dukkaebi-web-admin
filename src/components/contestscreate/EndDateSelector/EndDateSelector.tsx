// 대회 종료 날짜 선택 컴포넌트
import * as S from "../../../page/contests/create/styles";

interface EndDateSelectorProps {
  endDateType: "unlimited" | "specific";
  endDate: string;
  endTime: string;
  onRadioChange: (type: "start" | "end", value: "unlimited" | "specific") => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EndDateSelector = ({
  endDateType,
  endDate,
  endTime,
  onRadioChange,
  onChange,
}: EndDateSelectorProps) => {
  return (
    <S.Group>
      <S.Label>대회 종료 날짜</S.Label>
      <S.RadioGroup>
        <S.RadioLabel>
          <S.RadioInput
            type="radio"
            name="endDateType"
            checked={endDateType === "unlimited"}
            onChange={() => onRadioChange("end", "unlimited")}
          />
          제한 없음
        </S.RadioLabel>
        <S.RadioLabel>
          <S.RadioInput
            type="radio"
            name="endDateType"
            checked={endDateType === "specific"}
            onChange={() => onRadioChange("end", "specific")}
          />
          특정 시각
        </S.RadioLabel>
      </S.RadioGroup>
      {endDateType === "specific" && (
        <S.DateTimeRow>
          <S.DateInput
            name="endDate"
            type="date"
            value={endDate}
            onChange={onChange}
          />
          <S.TimeInput
            name="endTime"
            type="time"
            value={endTime}
            onChange={onChange}
            placeholder="오후 8:00"
          />
        </S.DateTimeRow>
      )}
    </S.Group>
  );
};
