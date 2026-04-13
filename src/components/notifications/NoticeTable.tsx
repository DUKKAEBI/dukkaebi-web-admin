/**
 * NoticeTable 컴포넌트
 * 
 * 공지사항 목록을 테이블 형태로 표시하는 컴포넌트
 * - 테이블 헤더 (번호, 제목, 작성자, 등록일, 조회)
 * - 공지사항 행 (클릭 시 상세 페이지로 이동)
 * 
 * @param {Array} notices - 공지사항 배열
 * @param {function} onRowClick - 행 클릭 핸들러
 */

import * as S from "../../page/notifications/style";

interface Notice {
  noticeId: number;
  title: string;
  writer: string;
  date: string;
  hits: number;
}

interface NoticeTableProps {
  notices: Notice[];
  onRowClick: (noticeId: number) => void;
}

export const NoticeTable = ({ notices, onRowClick }: NoticeTableProps) => {
  return (
    <S.NoticeTable>
      <S.TableHeader>
        <span>번호</span>
        <span>제목</span>
        <span>작성자</span>
        <span>등록일</span>
        <span>조회</span>
      </S.TableHeader>

      {notices.map((notice, index) => (
        <S.TableRow
          key={notice.noticeId}
          isLast={index === notices.length - 1}
          onClick={() => onRowClick(notice.noticeId)}
        >
          <span>{notice.noticeId}</span>
          <span>{notice.title}</span>
          <span>{notice.writer}</span>
          <span>{notice.date}</span>
          <span>{notice.hits}</span>
        </S.TableRow>
      ))}
    </S.NoticeTable>
  );
};
