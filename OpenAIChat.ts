import "dotenv/config"
import { log } from "node:console"
import OpenAI from "openai"

const { OPENAI_API_KEY} = process.env

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
})

const completions = await openai.chat.completions.create({
    model: "gpt-6-luna",
    messages: [
        { role: "system", content: "You are a helpful assistant."},
        {
            role: "user",
            content: "ChatGPT와 대화할 때 주의할 점을 100자 미만으로 알려줘"
        }
    ]
})

console.log(completions.choices[0].message)