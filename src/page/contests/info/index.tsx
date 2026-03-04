import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import {
  ContestHeader,
  ProblemsTab,
  ParticipantsTab,
  SettingsTab,
} from "../../../components/contestsinfo";
import * as S from "./styles";
import contestApi from "../../../api/contestApi";

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

  const deleteProblem = async (contestId: string, problemId: number) => {
    try {
      contestApi.deleteContestProblem(contestId, problemId);

      alert("문제가 삭제되었습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };
  return (
    <S.Page onMouseDown={() => setOpenMenuId(null)}>
      <Header />

      <ContestHeader
        title={contest?.title}
        description={contest?.description}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "problems" ? (
        <ProblemsTab
          problems={contest?.problems}
          contestsId={contestsId!}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          deleteProblem={deleteProblem}
        />
      ) : activeTab === "participants" ? (
        <ParticipantsTab
          participantCount={contest?.participantCount}
          participants={participants}
          contestsId={contestsId!}
          expandedParticipantId={expandedParticipantId}
          setExpandedParticipantId={setExpandedParticipantId}
          setParticipants={setParticipants}
        />
      ) : (
        <SettingsTab contestsId={contestsId} contestCode={contest?.code} />
      )}
    </S.Page>
  );
};

export default ContestInfo;
