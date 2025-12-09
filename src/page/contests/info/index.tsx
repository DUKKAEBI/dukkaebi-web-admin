import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./styles";

const rows = [
  { no: "1", title: "문자열과 알파벳 쿼리" },
  { no: "2", title: "문자열과 알파벳 쿼리" },
  { no: "3", title: "문자열과 알파벳 쿼리" },
  { no: "4", title: "문자열과 알파벳 쿼리" },
];

type Tab = "problems" | "participants" | "settings";

const participants = [
  { rank: "01", name: "이윤하", submitted: 4, solved: 4 },
  { rank: "02", name: "이윤하", submitted: 4, solved: 3 },
  { rank: "03", name: "이윤하", submitted: 3, solved: 3 },
  { rank: "04", name: "이윤하", submitted: 2, solved: 1 },
  { rank: "05", name: "이윤하", submitted: 1, solved: 0 },
];

const ContestInfo = () => {
  const [activeTab, setActiveTab] = useState<Tab>("problems");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { contestsId } = useParams<{ contestsId: string }>();

  useEffect(() => {
    const onDocClick = () => setOpenMenuId(null);
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);
  return (
    <S.Page onMouseDown={() => setOpenMenuId(null)}>
      <Header />

      <S.Section>
        <S.Title>DGSW 프로그래밍 대회</S.Title>
        <S.Description>
          DGSW 프로그래밍 대회는 교육봉사 동아리 ‘두카미'에서 진행하는 알고리즘
          대회 입니다.
        </S.Description>

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
            {rows.map((r) => (
              <S.Row key={r.no}>
                <S.CellNo>{r.no}</S.CellNo>
                <S.CellTitle>{r.title}</S.CellTitle>
                <S.MoreWrapper onMouseDown={(e) => e.stopPropagation()}>
                  <S.MoreBtn
                    aria-label="more"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === r.no ? null : r.no);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                      <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                    </svg>
                  </S.MoreBtn>
                  {openMenuId === r.no && (
                    <S.Dropdown>
                      <S.DropdownItem
                        onClick={() => {
                          setOpenMenuId(null);
                          navigate(`/contests/problems/update/${r.no}`);
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
            onClick={() =>
              navigate(`/contests/problems/create/${contestsId ?? "new"}`)
            }
          >
            문제 추가
          </S.AddButton>
        </S.Content>
      ) : activeTab === "participants" ? (
        <S.ParticipantsWrapper>
          <S.ParticipantsTotal>총 참여 인원 : 5명</S.ParticipantsTotal>
          <S.ParticipantsTable>
            <S.ParticipantsTableHead>
              <span>등수</span>
              <span>이름</span>
              <span style={{ justifySelf: "end" }}>제출한 문제 수</span>
              <span style={{ justifySelf: "end" }}>맞춘 문제 수</span>
            </S.ParticipantsTableHead>
            {participants.map((p) => (
              <S.ParticipantsRow key={p.rank}>
                <S.ParticipantsRank>{p.rank}</S.ParticipantsRank>
                <S.ParticipantsName>{p.name}</S.ParticipantsName>
                <S.ParticipantsStat>{p.submitted}</S.ParticipantsStat>
                <S.ParticipantsStat>{p.solved}</S.ParticipantsStat>
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
