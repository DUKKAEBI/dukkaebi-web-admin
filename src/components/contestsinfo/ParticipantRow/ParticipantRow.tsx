// 참여자 행 컴포넌트 (확장 가능)
import { useNavigate } from "react-router-dom";
import * as S from "../../../page/contests/info/styles";
import ArrowDown from "../../../assets/image/course/simple-line-icons_arrow-down.png";
import ArrowUp from "../../../assets/image/course/simple-line-icons_arrow-up.png";
import EditIcon from "../../../assets/image/auth/edit.png";
import contestApi from "../../../api/contestApi";

type Participant = {
  rank: number;
  userId: number;
  nickname: string;
  totalScore: number;
  totalTime: string;
  problemScores: {
    problemId: number;
    earnedScore: number;
    maxScore: number;
  }[];
};

interface ParticipantRowProps {
  participant: Participant;
  contestsId: string;
  expandedParticipantId: number | null;
  setExpandedParticipantId: (id: number | null) => void;
  setParticipants: (participants: Participant[]) => void;
}

export const ParticipantRow = ({
  participant,
  contestsId,
  expandedParticipantId,
  setExpandedParticipantId,
  setParticipants,
}: ParticipantRowProps) => {
  const navigate = useNavigate();

  return (
    <S.ParticipantRowWrapper>
      <S.ParticipantsRow
        onClick={() =>
          setExpandedParticipantId(
            expandedParticipantId === participant.userId
              ? null
              : participant.userId,
          )
        }
        style={{ cursor: "pointer" }}
      >
        <S.ParticipantsRank>
          {participant.rank < 10 ? `0${participant.rank}` : participant.rank}
        </S.ParticipantsRank>
        <S.ParticipantsName>{participant.nickname}</S.ParticipantsName>
        <S.ParticipantsStat>{participant.totalTime}</S.ParticipantsStat>
        <S.ParticipantsStat>{participant.totalScore}</S.ParticipantsStat>
        <S.ExpandIcon $expanded={expandedParticipantId === participant.userId}>
          <img
            src={
              expandedParticipantId === participant.userId
                ? ArrowUp
                : ArrowDown
            }
            alt={expandedParticipantId === participant.userId ? "닫기" : "열기"}
          />
        </S.ExpandIcon>
      </S.ParticipantsRow>
      {expandedParticipantId === participant.userId && (
        <S.ExpandedContent>
          <S.ProblemsTable>
            <S.ProblemsHeaderRow>
              {participant.problemScores.map((score, index) => (
                <S.ProblemNumberCell key={`header-${score.problemId}`}>
                  {index + 1}번
                </S.ProblemNumberCell>
              ))}
            </S.ProblemsHeaderRow>
            <S.ProblemsScoreRow>
              {participant.problemScores.map((score, index) => (
                <S.ScoreCell key={`score-${score.problemId}`}>
                  <S.ScoreText>
                    <strong>{score.earnedScore}</strong>/{score.maxScore}
                    <S.EditIcon
                      onClick={async () => {
                        const newScore = prompt(
                          `${index + 1}번 문제 점수 입력 (최대: ${score.maxScore}점)`,
                          score.earnedScore.toString(),
                        );
                        if (newScore === null) return;

                        const earnedScore = parseInt(newScore);
                        if (
                          isNaN(earnedScore) ||
                          earnedScore < 0 ||
                          earnedScore > score.maxScore
                        ) {
                          alert("올바른 점수를 입력해주세요.");
                          return;
                        }

                        try {
                          await contestApi.updateParticipantScore(
                            contestsId!,
                            participant.userId,
                            {
                              problemId: score.problemId,
                              earnedScore: earnedScore,
                            },
                          );
                          alert("점수가 수정되었습니다.");
                          // 참여자 목록 재조회
                          const participantsData =
                            await contestApi.getParticipants(contestsId!);
                          setParticipants(participantsData || []);
                        } catch (error) {
                          console.error("Failed to update score:", error);
                          alert("점수 수정에 실패했습니다.");
                        }
                      }}
                    >
                      <img src={EditIcon} alt="수정" />
                    </S.EditIcon>
                  </S.ScoreText>

                  <S.ViewCodeButton
                    onClick={() => {
                      navigate(
                        `/contests/${contestsId}/solve/${score.problemId}?userId=${participant.userId}`,
                      );
                    }}
                  >
                    제출코드 보기
                  </S.ViewCodeButton>
                </S.ScoreCell>
              ))}
            </S.ProblemsScoreRow>
          </S.ProblemsTable>
        </S.ExpandedContent>
      )}
    </S.ParticipantRowWrapper>
  );
};
