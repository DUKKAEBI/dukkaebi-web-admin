import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header/index";
import axiosInstance from "../../../api/axiosInstance";
import * as S from "./style";
import GoldIcon from "../../../assets/image/problems/difficulty/gold.png";
import SilverIcon from "../../../assets/image/problems/difficulty/silver.png";
import CopperIcon from "../../../assets/image/problems/difficulty/copper.png";
import IronIcon from "../../../assets/image/problems/difficulty/iron.png";
import JadeIcon from "../../../assets/image/problems/difficulty/jade.png";

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

const ProblemUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [openDifficultyDropdown, setOpenDifficultyDropdown] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    inputRange: "",
    outputRange: "",
    difficulty: 3,
    testCases: [{ input: "", output: "" }],
  });

  // 예시 문제 데이터
  const SAMPLE_PROBLEM_DETAILS: Record<string, any> = {
    "1": {
      name: "숫자야구",
      description: "1부터 9까지의 서로 다른 숫자 3개로 이루어진 정답을 맞추는 게임입니다. 입력한 숫자와 정답을 비교하여 스트라이크와 볼의 개수를 출력하세요.",
      inputRange: "첫 번째 줄에 3자리 숫자가 입력됩니다.",
      outputRange: "스트라이크와 볼의 개수를 'XS YB' 형식으로 출력합니다.",
      difficulty: 2,
      testCases: [
        { input: "123", output: "0S 2B" },
        { input: "456", output: "1S 1B" },
      ],
    },
    "2": {
      name: "문자열과 알파벳 쿼리",
      description: "주어진 문자열에서 특정 알파벳의 개수를 세는 프로그램을 작성하세요.",
      inputRange: "첫 번째 줄에 문자열, 두 번째 줄에 찾을 알파벳이 입력됩니다.",
      outputRange: "해당 알파벳의 개수를 출력합니다.",
      difficulty: 1,
      testCases: [
        { input: "hello\\ne", output: "1" },
        { input: "programming\\ng", output: "2" },
      ],
    },
    "3": {
      name: "정렬과 탐색 기초",
      description: "N개의 정수가 주어졌을 때, 이를 오름차순으로 정렬하고 특정 값이 존재하는지 확인하세요.",
      inputRange: "첫 번째 줄에 N, 두 번째 줄에 N개의 정수, 세 번째 줄에 찾을 값이 입력됩니다.",
      outputRange: "정렬된 배열과 값의 존재 여부(YES/NO)를 출력합니다.",
      difficulty: 3,
      testCases: [
        { input: "5\\n3 1 4 1 5\\n4", output: "1 1 3 4 5\\nYES" },
        { input: "3\\n9 7 8\\n6", output: "7 8 9\\nNO" },
      ],
    },
    "4": {
      name: "그래프 경로 찾기",
      description: "방향 그래프가 주어졌을 때, 시작 정점에서 도착 정점까지의 경로가 존재하는지 확인하세요.",
      inputRange: "첫 번째 줄에 정점의 개수 N, 간선의 개수 M, 두 번째 줄부터 M개의 간선 정보가 입력됩니다.",
      outputRange: "경로가 존재하면 YES, 없으면 NO를 출력합니다.",
      difficulty: 4,
      testCases: [
        { input: "4 4\\n1 2\\n2 3\\n3 4\\n1 4", output: "YES" },
        { input: "3 2\\n1 2\\n2 3\\n1 3", output: "YES" },
      ],
    },
    "5": {
      name: "동적 계획법 연습",
      description: "N번째 피보나치 수를 구하는 프로그램을 동적 계획법을 사용하여 작성하세요.",
      inputRange: "첫 번째 줄에 N(1 ≤ N ≤ 90)이 입력됩니다.",
      outputRange: "N번째 피보나치 수를 출력합니다.",
      difficulty: 5,
      testCases: [
        { input: "10", output: "55" },
        { input: "20", output: "6765" },
      ],
    },
  };

  useEffect(() => {
    if (id) {
      fetchProblem(id);
    }
  }, [id]);

  const fetchProblem = async (problemId: string) => {
    try {
      // 먼저 샘플 데이터 확인
      if (SAMPLE_PROBLEM_DETAILS[problemId]) {
        const data = SAMPLE_PROBLEM_DETAILS[problemId];
        setForm({
          title: data.name || "",
          description: data.description || "",
          inputRange: data.inputRange || "",
          outputRange: data.outputRange || "",
          difficulty: data.difficulty || 3,
          testCases: data.testCases && data.testCases.length > 0 
            ? data.testCases 
            : [{ input: "", output: "" }],
        });
        return;
      }

      // 샘플 데이터가 없으면 API 호출
      const response = await axiosInstance.get(`/problems/${problemId}`);
      const data = response.data;
      setForm({
        title: data.name || "",
        description: data.description || "",
        inputRange: data.inputRange || "",
        outputRange: data.outputRange || "",
        difficulty: data.difficulty || 3,
        testCases: data.testCases && data.testCases.length > 0 
          ? data.testCases 
          : [{ input: "", output: "" }],
      });
    } catch (error) {
      console.error("Failed to fetch problem:", error);
      alert("문제 정보를 불러오는데 실패했습니다.");
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onDifficultyChange = (difficulty: number) => {
    setForm((p) => ({ ...p, difficulty }));
    setOpenDifficultyDropdown(false);
  };

  const onTestCaseChange = (
    index: number,
    field: "input" | "output",
    value: string
  ) => {
    setForm((p) => ({
      ...p,
      testCases: p.testCases.map((tc, i) =>
        i === index ? { ...tc, [field]: value } : tc
      ),
    }));
  };

  const addTestCase = () => {
    setForm((p) => ({
      ...p,
      testCases: [...p.testCases, { input: "", output: "" }],
    }));
  };

  const onCancel = () => navigate("/problems");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const payload = {
        name: form.title || "제목 없음",
        description: form.description || "",
        difficulty: form.difficulty,
        inputRange: form.inputRange || "",
        outputRange: form.outputRange || "",
        testCases: form.testCases.filter(tc => tc.input || tc.output),
      };

      await axiosInstance.put(`/problems/${id}`, payload);
      alert("문제가 수정되었습니다.");
      navigate("/problems");
    } catch (error) {
      console.error("Failed to update problem:", error);
      alert("문제 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.FormContainer>
          <S.Title>문제 수정</S.Title>

          <S.Form onSubmit={onSubmit}>
            <S.Group>
              <S.Label htmlFor="title">문제 제목</S.Label>
              <S.Input
                id="title"
                name="title"
                placeholder=""
                value={form.title}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label htmlFor="description">문제 설명</S.Label>
              <S.TextArea
                id="description"
                name="description"
                placeholder=""
                value={form.description}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label>입력 조건</S.Label>
              <S.Input
                name="inputRange"
                placeholder=""
                value={form.inputRange}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label>출력 조건</S.Label>
              <S.Input
                name="outputRange"
                placeholder=""
                value={form.outputRange}
                onChange={onChange}
              />
            </S.Group>

            <S.Group>
              <S.Label>테스트 케이스</S.Label>
              <S.TestCaseSection>
                <S.TestCaseHeader>
                  <S.TestCaseLabel>입력</S.TestCaseLabel>
                  <S.TestCaseLabel>출력</S.TestCaseLabel>
                </S.TestCaseHeader>
                {form.testCases.map((testCase, index) => (
                  <S.TestCaseRow key={index}>
                    <S.TestCaseCell>
                      <S.TestCaseInput
                        value={testCase.input}
                        onChange={(e) =>
                          onTestCaseChange(index, "input", e.target.value)
                        }
                        placeholder=""
                      />
                    </S.TestCaseCell>
                    <S.TestCaseCell>
                      <S.TestCaseInput
                        value={testCase.output}
                        onChange={(e) =>
                          onTestCaseChange(index, "output", e.target.value)
                        }
                        placeholder=""
                      />
                    </S.TestCaseCell>
                  </S.TestCaseRow>
                ))}
                <S.AddTestCaseButton type="button" onClick={addTestCase}>
                  +
                </S.AddTestCaseButton>
              </S.TestCaseSection>
            </S.Group>

            <S.Group>
              <S.DifficultyLabel>난이도</S.DifficultyLabel>
              <S.DifficultyDropdownContainer>
                <S.DifficultyDropdownButton 
                  type="button"
                  onClick={() => setOpenDifficultyDropdown(!openDifficultyDropdown)}
                >
                  <S.DifficultyIconSmall src={
                    [
                      { value: 1, icon: GoldIcon },
                      { value: 2, icon: SilverIcon },
                      { value: 3, icon: CopperIcon },
                      { value: 4, icon: IronIcon },
                      { value: 5, icon: JadeIcon },
                    ].find(d => d.value === form.difficulty)?.icon || CopperIcon
                  } alt="난이도" />
                  <S.DifficultyDropdownArrow className={openDifficultyDropdown ? "icon-arrow-up" : "icon-arrow-down"} />
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
              <S.CancelButton type="button" onClick={onCancel}>
                문제 수정 취소하기
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                문제 수정하기
              </S.SubmitButton>
            </S.Actions>
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default ProblemUpdatePage;
