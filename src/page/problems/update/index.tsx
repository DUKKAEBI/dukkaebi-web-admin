import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import * as S from "./style";
import problemApi from "../../../api/problemApi";
import GoldIcon from "../../../assets/image/problems/difficulty/gold.svg";
import SilverIcon from "../../../assets/image/problems/difficulty/silver.svg";
import CopperIcon from "../../../assets/image/problems/difficulty/copper.svg";
import IronIcon from "../../../assets/image/problems/difficulty/iron.svg";
import JadeIcon from "../../../assets/image/problems/difficulty/jade.svg";
import { Footer } from "../../../components/footer";

interface TestCase {
  input: string;
  output: string;
}

interface FormData {
  title: string;
  description: string;
  inputRange: string;
  outputRange: string;
  difficulty: number;
  testCases: TestCase[];
}

const ProblemCreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputCond, setInputCond] = useState("");
  const [outputCond, setOutputCond] = useState("");
  const [openDifficultyDropdown, setOpenDifficultyDropdown] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    inputRange: "",
    outputRange: "",
    difficulty: 3,
    testCases: [{ input: "", output: "" }],
  });
  const [cases, setCases] = useState<TestCase[]>([
    { input: "2 7", output: "5" },
  ]);

  const onDifficultyChange = (difficulty: number) => {
    setForm((p) => ({ ...p, difficulty }));
    setOpenDifficultyDropdown(false);
  };

  // const onChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setForm((p) => ({ ...p, [name]: value }));
  // };

  const addCase = () =>
    setCases((prev) => [...prev, { input: "", output: "" }]);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      if (!id) return;
      try {
        const res = await problemApi.getProblem(Number(id));
        const data: any = (res as any)?.data ?? (res as any);
        console.log("Loaded problem data:", data);
        if (!mounted) return;

        // 제목, 설명 설정
        setTitle(data.title ?? data.name ?? "");
        setDescription(data.description ?? "");

        // 입력/출력 조건 설정 (API는 input, output 필드 사용)
        setInputCond(data.input ?? data.inputRange ?? data.inputCond ?? "");
        setOutputCond(data.output ?? data.outputRange ?? data.outputCond ?? "");

        // 테스트 케이스 설정
        if (Array.isArray(data.testCases) && data.testCases.length > 0) {
          setCases(data.testCases);
        }

        // 난이도 설정 (문자열 -> 숫자로 역매핑)
        const reverseDifficultyMap: Record<string, number> = {
          COPPER: 3,
          IRON: 4,
          SILVER: 2,
          GOLD: 1,
          JADE: 5,
        };
        if (data.difficulty) {
          const difficultyValue = reverseDifficultyMap[data.difficulty] ?? 3;
          setForm((prev) => ({ ...prev, difficulty: difficultyValue }));
        }
      } catch (err) {
        console.error("Failed to load problem:", err);
      }
    };
    fetch();
    return () => {
      mounted = false;
    };
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      const difficultyMap: Record<
        number,
        "COPPER" | "IRON" | "SILVER" | "GOLD" | "JADE"
      > = {
        3: "COPPER", // 구리
        4: "IRON", // 철
        2: "SILVER", // 은
        1: "GOLD", // 금
        5: "JADE", // 옥
      };
      const payload = {
        name: title,
        description,
        input: inputCond,
        output: outputCond,
        difficulty: difficultyMap[form.difficulty] ?? "COPPER",
        testCases: cases,
      };
      console.log("Updating problem with payload:", payload);
      await problemApi.updateProblem(Number(id), payload);
      navigate("/problems");
    } catch (err) {
      console.error("Failed to update problem:", err);
      alert("문제 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.Container>
      <Header />

      <S.Main>
        <S.Content>
          <S.PageTitle>문제 수정</S.PageTitle>

          <S.Field>
            <S.Label>문제 제목</S.Label>
            <S.Input
              placeholder="학교 복도 최단거리"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </S.Field>

          <S.Field>
            <S.Label>문제 설명</S.Label>
            <S.TextArea
              placeholder={
                "당신은 쉬는 시간에 친구의 과자를 뺏으러 친구에게 가려고 한다.\n하지만 복도가 너무 길어서 몇 걸음 걸어야 하는지 계산해야 한다.\n\n입력으로 현재 위치 P와 친구 위치 F가 주어질 때,\n두 값의 차이의 절댓값을 출력하시오.\n(걸음 수 = 거리)"
              }
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              rows={6}
            />
          </S.Field>

          <S.Field>
            <S.Label>입력 조건</S.Label>
            <S.Input
              placeholder="한 줄, 두 정수 P와 F (0 ≤ P, F ≤ 10,000)"
              value={inputCond}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputCond(e.target.value)
              }
            />
          </S.Field>

          <S.Field>
            <S.Label>출력 조건</S.Label>
            <S.Input
              placeholder="한 줄, 최단 거리(걸음 수)를 출력"
              value={outputCond}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOutputCond(e.target.value)
              }
              $primaryBorder
            />
          </S.Field>

          <S.Field>
            <S.Label>테스트 케이스</S.Label>
            <S.TestCaseTable>
              <S.TestCaseHead>
                <S.HeadCell>입력</S.HeadCell>
                <S.HeadCell $right>출력</S.HeadCell>
              </S.TestCaseHead>
              {cases.map((c, idx) => (
                <S.TestCaseRow key={idx}>
                  <S.CaseInput
                    placeholder="예) 2 7"
                    value={c.input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = e.target.value;
                      setCases((prev) =>
                        prev.map((x, i) => (i === idx ? { ...x, input: v } : x))
                      );
                    }}
                  />
                  <S.CaseInput
                    placeholder="예) 5"
                    value={c.output}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = e.target.value;
                      setCases((prev) =>
                        prev.map((x, i) =>
                          i === idx ? { ...x, output: v } : x
                        )
                      );
                    }}
                  />
                </S.TestCaseRow>
              ))}
              <S.AddRow onClick={addCase}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </S.AddRow>
            </S.TestCaseTable>
          </S.Field>

          <S.Group>
            <S.DifficultyLabel>난이도</S.DifficultyLabel>
            <S.DifficultyDropdownContainer>
              <S.DifficultyDropdownButton
                type="button"
                onClick={() =>
                  setOpenDifficultyDropdown(!openDifficultyDropdown)
                }
              >
                <S.DifficultyIconSmall
                  src={
                    [
                      { value: 1, icon: GoldIcon },
                      { value: 2, icon: SilverIcon },
                      { value: 3, icon: CopperIcon },
                      { value: 4, icon: IronIcon },
                      { value: 5, icon: JadeIcon },
                    ].find((d) => d.value === form.difficulty)?.icon ||
                    CopperIcon
                  }
                  alt="난이도"
                />
                <S.DifficultyDropdownArrow
                  className={
                    openDifficultyDropdown ? "icon-arrow-up" : "icon-arrow-down"
                  }
                />
              </S.DifficultyDropdownButton>
              {openDifficultyDropdown && (
                <S.DifficultyDropdownMenu>
                  {[
                    { value: 3, icon: CopperIcon, label: "구리" },
                    { value: 4, icon: IronIcon, label: "철" },
                    { value: 2, icon: SilverIcon, label: "은" },
                    { value: 1, icon: GoldIcon, label: "금" },
                    { value: 5, icon: JadeIcon, label: "옥" },
                  ].map((item) => (
                    <S.DifficultyDropdownItem
                      key={item.value}
                      isSelected={form.difficulty === item.value}
                      onClick={() => onDifficultyChange(item.value)}
                    >
                      <S.DifficultyIconSmall src={item.icon} alt={item.label} />
                      <span>{item.label}</span>
                    </S.DifficultyDropdownItem>
                  ))}
                </S.DifficultyDropdownMenu>
              )}
            </S.DifficultyDropdownContainer>
          </S.Group>

          <S.Actions>
            <S.SecondaryButton onClick={() => navigate("/problems")}>
              문제 수정 취소하기
            </S.SecondaryButton>
            <S.PrimaryButton onClick={onSubmit}>문제 수정하기</S.PrimaryButton>
          </S.Actions>
        </S.Content>
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default ProblemCreatePage;
