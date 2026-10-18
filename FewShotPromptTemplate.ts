import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts"
import { ChatOpenAI } from "@langchain/openai"
import "dotenv/config"
import { StringOutputParser } from "@langchain/core/output_parsers"

const examplePrompt = PromptTemplate.fromTemplate(
    "문장: {sentence}\n평가: {evaluation}"
)

const examples = [
    {
        sentence: "오늘 날씨가 참 좋습니다.",
        evaluation: "좋은 문장입니다. 문법적으로 올바르고 표현이 자연스럽습니다.",
    },
    {
        sentence: "날씨 오늘 참 좋다.",
        evaluation: "개선이 필요합니다. 문장이 어색하므로 '오늘 날씨가 참 좋다.'로 수정하면 더 좋습니다.",
    },
    {
        sentence: "친환경, 인체 무해한 소독제는 불법제품! 사용하면 안돼요.",
        evaluation: "개선이 필요합니다. 앞 뒤의 문맥이 맞지 않습니다.",
    },
]

const prompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    suffix: "문장: {input}",
    inputVariables: ["input"],
})

const formatted = await prompt.format({
    input: "쾌적한 항구 조성과 소음방지 예방을 위하여 폭죽 사용을 금지합니다.",
})

const model = new ChatOpenAI({ model: "gpt-6-luna" })
const result = await model.invoke(formatted)
console.log(result)