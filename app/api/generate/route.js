import {NextResponse} from 'next/server'
import OpenAI from 'openai'

const SYSTEM_PROMPT = `
You are a flashcards creator
Return in the following JSON format
{
    "flashcards": [
        {
            "front":str,
            "back":str
        }
    ]
}
`

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completion.create({
        messages: [
            {role: "system", content: SYSTEM_PROMPT},
            {role: "user", content: data},
        ],
        model: "gpt-4o",
        response_format:{type: 'json_object'}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcard)
}