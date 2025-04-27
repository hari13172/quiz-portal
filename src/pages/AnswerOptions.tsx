"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface AnswerOptionsProps {
    answers: Array<{
        id: string
        value: string[] | string
    }>
    selectedAnswer: string | null
    onSelectAnswer: (answerId: string) => void
}

export function AnswerOptions({ answers, selectedAnswer, onSelectAnswer }: AnswerOptionsProps) {
    return (
        <RadioGroup value={selectedAnswer || ""} className="space-y-2 mb-6">
            {answers.map((answer) => (
                <div
                    key={answer.id}
                    className={`border rounded-md p-4 ${selectedAnswer === answer.id ? "bg-blue-700 text-white" : "bg-gray-50 hover:bg-gray-100"
                        }`}
                    onClick={() => onSelectAnswer(answer.id)}
                >
                    <RadioGroupItem value={answer.id} id={`answer-${answer.id}`} className="sr-only" />
                    <Label
                        htmlFor={`answer-${answer.id}`}
                        className={`flex items-center gap-2 cursor-pointer ${selectedAnswer === answer.id ? "text-white" : ""}`}
                    >
                        <span className="font-medium">{answer.id}</span>
                        <span>{Array.isArray(answer.value) ? answer.value.join(", ") : answer.value}</span>
                    </Label>
                </div>
            ))}
        </RadioGroup>
    )
}
