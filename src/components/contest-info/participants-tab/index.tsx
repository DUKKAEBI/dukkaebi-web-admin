import { useState } from "react";
import * as S from "./styles";

interface Participant {
  id: string;
  rank: string;
  name: string;
  submitted: number;
  solved: number;
}

interface ParticipantsTabProps {
  contestId?: string;
}

const MOCK_PARTICIPANTS: Participant[] = [
  { id: "1", rank: "01", name: "이윤하", submitted: 4, solved: 4 },
  { id: "2", rank: "02", name: "이윤하", submitted: 4, solved: 3 },
  { id: "3", rank: "03", name: "이윤하", submitted: 3, solved: 3 },
  { id: "4", rank: "04", name: "이윤하", submitted: 2, solved: 1 },
  { id: "5", rank: "05", name: "이윤하", submitted: 1, solved: 0 },
];

export const ParticipantsTab = ({ contestId }: ParticipantsTabProps) => {
  const [participants] = useState<Participant[]>(MOCK_PARTICIPANTS);

  return (
    <S.Container>
      <S.InfoText>총 참여 인원 : {participants.length}명</S.InfoText>
      <S.Table>
        <S.TableHeader>
          <S.HeaderCell>등수</S.HeaderCell>
          <S.HeaderCell>이름</S.HeaderCell>
          <S.HeaderCell $alignRight>제출한 문제 수</S.HeaderCell>
          <S.HeaderCell $alignRight>맞춘 문제 수</S.HeaderCell>
        </S.TableHeader>
        <S.TableBody>
          {participants.map((participant) => (
            <S.TableRow key={participant.id}>
              <S.RankCell>{participant.rank}</S.RankCell>
              <S.NameCell>{participant.name}</S.NameCell>
              <S.NumberCell $alignRight>{participant.submitted}</S.NumberCell>
              <S.NumberCell $alignRight>{participant.solved}</S.NumberCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Container>
  );
};

