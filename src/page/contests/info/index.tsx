import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./styles";
import contestApi from "../../../api/contestApi";
import ArrowDown from "../../../assets/image/course/simple-line-icons_arrow-down.png";
import ArrowUp from "../../../assets/image/course/simple-line-icons_arrow-up.png";

type Tab = "problems" | "participants" | "settings";

type problem = {
  problemId: number;
  name: string;
  difficulty: string;
  solvedCount: number;
  correctRate: number;
  solvedResult: string;
  addedAt: string;
};

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

const ContestInfo = () => {
  const [activeTab, setActiveTab] = useState<Tab>("problems");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [expandedParticipantId, setExpandedParticipantId] = useState<
    number | null
  >(null);
  const navigate = useNavigate();
  const { contestsId } = useParams<{
    contestsId: string;
  }>();
  const [contest, setContest] = useState<any | null>({
    title: "DGSW 프로그래밍 대회",
    description:
      "DGSW 프로그래밍 대회는 교육봉사 동아리 '두카미'에서 진행하는 알고리즘 대회 입니다.",
    code: "CONTEST123",
    participantCount: 5,
    problems: [
      {
        problemId: 1,
        name: "A+B",
        difficulty: "EASY",
        solvedCount: 150,
        correctRate: 85.5,
        solvedResult: "SOLVED",
        addedAt: "2025-12-01",
      },
      {
        problemId: 2,
        name: "두 수 비교하기",
        difficulty: "EASY",
        solvedCount: 120,
        correctRate: 75.2,
        solvedResult: "SOLVED",
        addedAt: "2025-12-01",
      },
      {
        problemId: 3,
        name: "별 찍기",
        difficulty: "MEDIUM",
        solvedCount: 90,
        correctRate: 65.8,
        solvedResult: "UNSOLVED",
        addedAt: "2025-12-02",
      },
      {
        problemId: 4,
        name: "피보나치 수",
        difficulty: "MEDIUM",
        solvedCount: 70,
        correctRate: 55.4,
        solvedResult: "UNSOLVED",
        addedAt: "2025-12-02",
      },
      {
        problemId: 5,
        name: "최단 경로",
        difficulty: "HARD",
        solvedCount: 45,
        correctRate: 35.2,
        solvedResult: "UNSOLVED",
        addedAt: "2025-12-03",
      },
    ],
  });
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const onDocClick = () => setOpenMenuId(null);
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      if (!contestsId) return;
      try {
        const data = await contestApi.getContest(contestsId);
        if (!mounted) return;
        setContest(data);

        // 참여자 목록 조회
        const participantsData = await contestApi.getParticipants(contestsId);
        if (!mounted) return;
        setParticipants(participantsData || []);
      } catch (err) {
        console.error("Failed to load contest:", err);
      }
    };

    fetch();
    return () => {
      mounted = false;
    };
  }, [contestsId]);
  return (
    <S.Page onMouseDown={() => setOpenMenuId(null)}>
      <Header />

      <S.Section>
        <S.Title>{contest?.title}</S.Title>
        <S.Description>{contest?.description}</S.Description>

        <S.Tabs>
          <S.Tab
            $active={activeTab === "problems"}
            onClick={() => setActiveTab("problems")}
          >
            문제
          </S.Tab>
          <S.Tab
            $active={activeTab === "participants"}
            onClick={() => setActiveTab("participants")}
          >
            참여 인원
          </S.Tab>
          <S.Tab
            $active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          >
            대회 설정
          </S.Tab>
        </S.Tabs>
      </S.Section>

      {activeTab === "problems" ? (
        <S.Content>
          <S.Table>
            <S.TableHead>
              <S.ColNo>번호</S.ColNo>
              <S.ColTitle>제목</S.ColTitle>
            </S.TableHead>
            {contest?.problems?.map((r: problem, index: number) => (
              <S.Row
                key={r.problemId}
                onClick={() =>
                  navigate(`/contests/${contestsId}/solve/${r.problemId}`)
                }
              >
                <S.CellNo>{index + 1}</S.CellNo>
                <S.CellTitle>{r.name}</S.CellTitle>
                <S.MoreWrapper onMouseDown={(e) => e.stopPropagation()}>
                  <S.MoreBtn
                    aria-label="more"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === String(r.problemId)
                          ? null
                          : String(r.problemId)
                      );
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                    </svg>
                  </S.MoreBtn>
                  {openMenuId === String(r.problemId) && (
                    <S.Dropdown>
                      <S.DropdownItem
                        onClick={() => {
                          setOpenMenuId(null);
                          navigate(`/contests/problems/update/${r.problemId}`);
                        }}
                      >
                        문제 수정
                      </S.DropdownItem>
                    </S.Dropdown>
                  )}
                </S.MoreWrapper>
              </S.Row>
            ))}
          </S.Table>
          <S.AddButton
            onClick={() => navigate(`/contests/problems/create/${contestsId}`)}
          >
            문제 추가
          </S.AddButton>
        </S.Content>
      ) : activeTab === "participants" ? (
        <S.ParticipantsWrapper>
          <S.ParticipantsTotal>
            총 참여 인원 : {contest?.participantCount ?? 0}명
          </S.ParticipantsTotal>
          <S.ParticipantsTable>
            <S.ParticipantsTableHead>
              <span>등수</span>
              <span>이름</span>
              <span style={{ justifySelf: "end" }}>소요 시간</span>
              <span style={{ justifySelf: "end" }}>총 점수</span>
            </S.ParticipantsTableHead>
            {participants.map((participant: Participant) => (
              <S.ParticipantRowWrapper key={participant.userId}>
                <S.ParticipantsRow
                  onClick={() =>
                    setExpandedParticipantId(
                      expandedParticipantId === participant.userId
                        ? null
                        : participant.userId
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <S.ParticipantsRank>
                    {participant.rank < 10
                      ? `0${participant.rank}`
                      : participant.rank}
                  </S.ParticipantsRank>
                  <S.ParticipantsName>
                    {participant.nickname}
                  </S.ParticipantsName>
                  <S.ParticipantsStat>
                    {participant.totalTime}
                  </S.ParticipantsStat>
                  <S.ParticipantsStat>
                    {participant.totalScore}
                  </S.ParticipantsStat>
                  <S.ExpandIcon
                    $expanded={expandedParticipantId === participant.userId}
                  >
                    <img
                      src={
                        expandedParticipantId === participant.userId
                          ? ArrowUp
                          : ArrowDown
                      }
                      alt={
                        expandedParticipantId === participant.userId
                          ? "닫기"
                          : "열기"
                      }
                    />
                  </S.ExpandIcon>
                </S.ParticipantsRow>
                {expandedParticipantId === participant.userId && (
                  <S.ExpandedContent>
                    <S.ProblemsTable>
                      <S.ProblemsHeaderRow>
                        {participant.problemScores.map((score, index) => (
                          <S.ProblemNumberCell
                            key={`header-${score.problemId}`}
                          >
                            {index + 1}번
                          </S.ProblemNumberCell>
                        ))}
                      </S.ProblemsHeaderRow>
                      <S.ProblemsScoreRow>
                        {participant.problemScores.map((score, index) => (
                          <S.ScoreCell key={`score-${score.problemId}`}>
                            <S.ScoreText>
                              <strong>{score.earnedScore}</strong>/
                              {score.maxScore}
                            </S.ScoreText>
                            <S.ViewCodeButton
                              onClick={() => {
                                navigate(
                                  `/contests/${contestsId}/solve/${score.problemId}?userId=${participant.userId}`
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
            ))}
          </S.ParticipantsTable>
        </S.ParticipantsWrapper>
      ) : (
        <S.SettingsWrapper>
          <div
            style={{ marginBottom: "20px", fontSize: "14px", color: "#666" }}
          >
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
                if (!contest?.code) {
                  alert("대회 코드를 찾을 수 없습니다.");
                  return;
                }
                await contestApi.endContest(contest.code);
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
                if (!contest?.code) {
                  alert("대회 코드를 찾을 수 없습니다.");
                  return;
                }
                await contestApi.deleteContest(contest.code);
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
      )}
    </S.Page>
  );
};

export default ContestInfo;
