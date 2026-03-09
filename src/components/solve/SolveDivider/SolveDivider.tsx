// solve 페이지의 좌/우 패널 사이 분할선(UI) 영역을 분리한 컴포넌트입니다.
import * as Style from "../../../page/solve/style";

type SolveDividerProps = {
  isResizing: boolean;
  setIsResizing: (next: boolean) => void;
};

export function SolveDivider({ isResizing, setIsResizing }: SolveDividerProps) {
  return (
    <Style.Divider
      onMouseDown={() => setIsResizing(true)}
      $isResizing={isResizing}
    />
  );
}

