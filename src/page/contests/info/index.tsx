import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
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

const ContestInfo = () => {
  const [activeTab, setActiveTab] = useState<Tab>("problems");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { contestsId, contestCode } = useParams<{
    contestsId: string;
    contestCode: string;
  }>();
  const [contest, setContest] = useState<any | null>(null);

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
          <S.AddButton>문제 추가</S.AddButton>
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
              <span style={{ justifySelf: "end" }}>제출한 문제 수</span>
              <span style={{ justifySelf: "end" }}>맞춘 문제 수</span>
            </S.ParticipantsTableHead>
            {contest?.problems?.map((p: problem, idx: number) => (
              <S.ParticipantsRow key={p.problemId}>
                <S.ParticipantsRank>{idx + 1}</S.ParticipantsRank>
                <S.ParticipantsName>{p.name}</S.ParticipantsName>
                <S.ParticipantsStat>{p.solvedCount}</S.ParticipantsStat>
                <S.ParticipantsStat>
                  {p.solvedResult === "SOLVED" ? 1 : 0}
                </S.ParticipantsStat>
              </S.ParticipantsRow>
            ))}
          </S.ParticipantsTable>
        </S.ParticipantsWrapper>
      ) : (
        <S.SettingsWrapper>
          <S.SettingsActionButton $variant="primary">
            대회 수정
          </S.SettingsActionButton>
          <S.SettingsActionButton $variant="primary">
            대회 종료
          </S.SettingsActionButton>
          <S.SettingsActionButton $variant="error">
            대회 삭제
          </S.SettingsActionButton>
        </S.SettingsWrapper>
      )}
    </S.Page>
  );
};

export default ContestInfo;
