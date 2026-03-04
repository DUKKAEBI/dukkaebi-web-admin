// 문제 설명 입력 필드
import * as S from "../../../page/contests/problems/update/styles";

interface DescriptionFieldProps {
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const DescriptionField = ({
  value,
  disabled,
  onChange,
}: DescriptionFieldProps) => {
  return (
    <S.Field>
      <S.Label>문제 설명</S.Label>
      <S.TextArea
        disabled={disabled}
        placeholder={
          "당신은 쉬는 시간에 친구의 과자를 뺏으러 친구에게 가려고 한다.\n하지만 복도가 너무 길어서 몇 걸음 걸어야 하는지 계산해야 한다.\n\n입력으로 현재 위치 P와 친구 위치 F가 주어질 때,\n두 값의 차이의 절댓값을 출력하시오.\n(걸음 수 = 거리)"
        }
        value={value}
        onChange={onChange}
        rows={6}
      />
    </S.Field>
  );
};
