import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ProblemCreatePage = () => {
  const navigate = useNavigate();
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

      await axiosInstance.post("/problems", payload);
      alert("문제가 생성되었습니다.");
      navigate("/problems");
    } catch (error) {
      console.error("Failed to create problem:", error);
      alert("문제 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.FormContainer>
          <S.Title>문제 생성</S.Title>

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
                문제 생성 취소하기
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                문제 생성하기
              </S.SubmitButton>
            </S.Actions>
          </S.Form>
        </S.FormContainer>
      </S.Main>
    </S.Container>
  );
};

export default ProblemCreatePage;
