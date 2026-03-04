// 설정 탭 컴포넌트
import { useNavigate } from "react-router-dom";
import * as S from "../../../page/contests/info/styles";
import contestApi from "../../../api/contestApi";

interface SettingsTabProps {
  contestsId?: string;
  contestCode?: string;
}

export const SettingsTab = ({ contestsId, contestCode }: SettingsTabProps) => {
  const navigate = useNavigate();

  return (
    <S.SettingsWrapper>
      <div style={{ marginBottom: "20px", fontSize: "14px", color: "#666" }}>
        <S.SettingsActionButton style={{ width: "200px" }}>
          대회 참여 코드: {contestsId}
        </S.SettingsActionButton>
      </div>
      <S.SettingsActionButton
        $variant="primary"
        onClick={() => navigate(`/contests/update/${contestsId}`)}
      >
        대회 수정
      </S.SettingsActionButton>
      <S.SettingsActionButton
        $variant="primary"
        onClick={async () => {
          try {
            if (!contestCode) {
              alert("대회 코드를 찾을 수 없습니다.");
              return;
            }
            await contestApi.endContest(contestCode);
            alert("대회가 종료되었습니다.");
            navigate("/contests");
          } catch (err) {
            console.error("Failed to end contest:", err);
            alert("대회 종료에 실패했습니다.");
          }
        }}
      >
        대회 종료
      </S.SettingsActionButton>
      <S.SettingsActionButton
        $variant="error"
        onClick={async () => {
          if (!confirm("정말로 대회를 삭제하시겠습니까?")) return;
          try {
            if (!contestCode) {
              alert("대회 코드를 찾을 수 없습니다.");
              return;
            }
            await contestApi.deleteContest(contestCode);
            alert("대회가 삭제되었습니다.");
            navigate("/contests");
          } catch (err) {
            console.error("Failed to delete contest:", err);
            alert("대회 삭제에 실패했습니다.");
          }
        }}
      >
        대회 삭제
      </S.SettingsActionButton>
    </S.SettingsWrapper>
  );
};
