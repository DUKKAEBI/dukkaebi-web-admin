import { useState, useEffect } from "react";
import * as S from "./styles";
import contestApi from "../../../api/contestApi";

interface ProblemScore {
  problemId: number;
  earnedScore: number;
  maxScore: number;
}

interface Participant {
  rank: number;
  userId: number;
  nickname: string;
  totalScore: number;
  totalTime: string;
  problemScores: ProblemScore[];
}

interface ParticipantsTabProps {
  contestId?: string;
  onViewCode?: (userId: number, problemId: number) => void;
}

export const ParticipantsTab = ({ contestId, onViewCode }: ParticipantsTabProps) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [problemCount, setProblemCount] = useState(0);

  useEffect(() => {
    if (!contestId) return;

    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const data = await contestApi.getParticipants(contestId);
        const list = Array.isArray(data) ? data : [];
        setParticipants(list);
        if (list.length > 0 && list[0].problemScores) {
          setProblemCount(list[0].problemScores.length);
        }
      } catch (error) {
        console.error("Failed to fetch participants:", error);
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [contestId]);

  const handleViewCode = (userId: number, problemId: number) => {
    if (onViewCode) {
      onViewCode(userId, problemId);
    } else {
      alert(`유저 ${userId}의 문제 ${problemId} 제출 코드 보기`);
    }
  };

  return (
    <S.Container>
      <S.InfoText>총 참여 인원 : {participants.length}명</S.InfoText>
      <S.Table>
        <S.TableHeader>
          <tr>
            <S.HeaderCell>등수</S.HeaderCell>
            <S.HeaderCell>이름</S.HeaderCell>
            {Array.from({ length: problemCount }, (_, i) => (
              <S.HeaderCell key={i} style={{ textAlign: "center" }}>
                {i + 1}번
              </S.HeaderCell>
            ))}
          </tr>
        </S.TableHeader>
        <S.TableBody>
          {loading ? (
            <S.TableRow>
              <S.NameCell colSpan={2 + problemCount}>로딩 중...</S.NameCell>
            </S.TableRow>
          ) : (
            participants.map((participant) => (
              <S.TableRow key={participant.userId}>
                <S.RankCell>{String(participant.rank).padStart(2, "0")}</S.RankCell>
                <S.NameCell>{participant.nickname}</S.NameCell>
                {participant.problemScores.map((ps) => (
                  <S.ProblemScoreCell key={ps.problemId}>
                    <S.ScoreWrapper>
                      <S.ScoreText>
                        {ps.earnedScore}/{ps.maxScore} ✏️
                      </S.ScoreText>
                      <S.ViewCodeButton
                        onClick={() => handleViewCode(participant.userId, ps.problemId)}
                      >
                        제출코드 보기
                      </S.ViewCodeButton>
                    </S.ScoreWrapper>
                  </S.ProblemScoreCell>
                ))}
              </S.TableRow>
            ))
          )}
        </S.TableBody>
      </S.Table>
    </S.Container>
  );
};

