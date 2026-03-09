// users 페이지의 유저 목록 테이블(UI) 영역을 분리한 컴포넌트입니다.
import type { Dispatch, RefObject, SetStateAction } from "react";
import * as S from "../../../page/users/styles";

type UserGrade =
  | "은깨비"
  | "금깨비"
  | "옥깨비"
  | "신깨비"
  | "동깨비"
  | "철깨비"
  | "도깨비불";

type UsersTableUser = {
  id: string;
  loginId: string;
  name: string;
  grade: UserGrade;
};

type UsersTableProps = {
  // 페이지에서 계산한 현재 페이지 유저 목록과 관련 핸들러들을 그대로 전달받습니다.
  pageItems: UsersTableUser[];
  navigateToUser: (id: string) => void;
  gradeColor: (g: UserGrade) => string;
  menuOpen: number | null;
  setMenuOpen: (value: number | null) => void;
  menuRef: RefObject<HTMLDivElement>;
  setUsers: Dispatch<SetStateAction<UsersTableUser[]>>;
};

export function UsersTable({
  pageItems,
  navigateToUser,
  gradeColor,
  menuOpen,
  setMenuOpen,
  menuRef,
  setUsers,
}: UsersTableProps) {
  return (
    <S.Table>
      <S.TableHead>
        <S.HeadCell style={{ width: 200 }}>아이디</S.HeadCell>
        <S.HeadCell style={{ width: 200 }}>이름</S.HeadCell>
        <S.HeadCell style={{ flex: 1, textAlign: "right", paddingRight: 52 }}>
          등급
        </S.HeadCell>
      </S.TableHead>
      <S.TableBody>
        {pageItems.map((u, i) => (
          <S.Row
            key={`${u.id}-${i}`}
            onClick={() => {
              navigateToUser(u.id);
            }}
          >
            <S.Cell style={{ width: 200 }}>{u.loginId}</S.Cell>
            <S.Cell style={{ width: 100 }}>{u.name}</S.Cell>
            <S.Cell
              style={{
                textAlign: "right",
                color: gradeColor(u.grade),
                width: 415,
                marginRight: 38,
              }}
            >
              {u.grade}
            </S.Cell>
            <S.MoreWrapper ref={menuOpen === i ? menuRef : null}>
              <S.MoreButton
                aria-label="more"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === i ? null : i);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="5" r="1.5" fill="#BDBDBD" />
                  <circle cx="12" cy="12" r="1.5" fill="#BDBDBD" />
                  <circle cx="12" cy="19" r="1.5" fill="#BDBDBD" />
                </svg>
              </S.MoreButton>
              {menuOpen === i && (
                <S.ContextMenu
                  role="menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <S.MenuItem
                    role="menuitem"
                    onClick={() => navigateToUser(u.id)}
                  >
                    유저 정보 조회
                  </S.MenuItem>
                  <S.MenuItem
                    role="menuitem"
                    $danger
                    onClick={async () => {
                      if (!confirm("해당 유저를 삭제하시겠습니까?")) return;
                      try {
                        const { default: userApi } = await import(
                          "../../../api/userApi"
                        );
                        await userApi.deleteUser(u.id);

                        // refetch
                        const response = await userApi.getUsers();
                        const data = Array.isArray(response)
                          ? response
                          : response?.content || response?.data || [];

                        const growthToGrade: Record<string, UserGrade> = {
                          WISP: "도깨비불",
                          COPPER: "동깨비",
                          IRON: "철깨비",
                          SILVER: "은깨비",
                          GOLD: "금깨비",
                          JADE: "옥깨비",
                          GOD: "신깨비",
                        };

                        if (Array.isArray(data)) {
                          const mappedUsers = data.map((it: any) => {
                            const rawGrowth = (
                              it.growth ?? "COPPER"
                            ).toUpperCase();
                            const grade =
                              growthToGrade[rawGrowth] ?? "동깨비";

                            return {
                              id: String(it.id ?? ""),
                              loginId: String(it.loginId ?? ""),
                              name:
                                it.nickname ??
                                it.name ??
                                it.loginId ??
                                "이름 없음",
                              grade,
                            };
                          });
                          setUsers(mappedUsers);
                          alert("유저가 삭제되었습니다.");
                          setMenuOpen(null);
                        }
                      } catch (err) {
                        console.error("User delete failed:", err);
                        alert("유저 삭제 중 오류가 발생했습니다.");
                      }
                    }}
                  >
                    유저 삭제
                  </S.MenuItem>
                </S.ContextMenu>
              )}
            </S.MoreWrapper>
          </S.Row>
        ))}
      </S.TableBody>
    </S.Table>
  );
}

