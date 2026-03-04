import { useNavigate } from "react-router-dom";
import * as S from "./styles";

interface SettingsTabProps {
  contestId?: string;
}

export const SettingsTab = ({ contestId }: SettingsTabProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // TODO: 대회 수정 로직
    console.log("대회 수정", contestId);
    if (contestId) {
      navigate(`/contests/update/${contestId}`);
    }
  };

  const handleEnd = () => {
    // TODO: 대회 종료 로직
    if (window.confirm("대회를 종료하시겠습니까?")) {
      console.log("대회 종료", contestId);
    }
  };

  const handleDelete = () => {
    // TODO: 대회 삭제 로직
    if (window.confirm("대회를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      console.log("대회 삭제", contestId);
    }
  };

  return (
    <S.Container>
      <S.ButtonGroup>
        <S.EditButton onClick={handleEdit}>대회 수정</S.EditButton>
        <S.EndButton onClick={handleEnd}>대회 종료</S.EndButton>
        <S.DeleteButton onClick={handleDelete}>대회 삭제</S.DeleteButton>
      </S.ButtonGroup>
    </S.Container>
  );
};

