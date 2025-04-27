"use client"

import { Button } from "@/components/ui/button"
import { QuizHeader } from "./QuizHeader"

interface ResultsSummaryProps {
    submittedAnswers: Record<number, string>
    questions: Array<{
        id: number
        text: string
        answers: Array<{
            id: string
            value: string[] | string
        }>
    }>
    totalQuestions: number
    onReturn: () => void
}

export function ResultsSummary({ submittedAnswers, questions, totalQuestions, onReturn }: ResultsSummaryProps) {
    return (
        <div className="min-h-screen bg-white">
            <QuizHeader />

            <div className="max-w-4xl mx-auto py-8 px-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Quiz Submission Summary</h2>
                    <Button variant="outline" onClick={onReturn}>
                        Return to Quiz
                    </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Your Submitted Answers</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        You answered {Object.keys(submittedAnswers).length} out of {totalQuestions} questions.
                    </p>

                    <div className="space-y-6">
                        {Object.entries(submittedAnswers).map(([questionId, answerId]) => {
                            const questionNumber = Number.parseInt(questionId)
                            const question = questions[questionNumber - 1]
                            const answer = question.answers.find((a) => a.id === answerId)

                            return (
                                <div key={questionId} className="border-b pb-4">
                                    <div className="flex justify-between">
                                        <h4 className="font-medium">Question {questionId}</h4>
                                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Answered</span>
                                    </div>
                                    <p className="my-2 text-sm">{question.text}</p>
                                    <div className="bg-blue-50 p-3 rounded mt-2">
                                        <p className="text-sm font-medium">Your answer: {answerId}</p>
                                        <p className="text-sm text-gray-600">
                                            {Array.isArray(answer?.value) ? answer?.value.join(", ") : answer?.value}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button variant="outline" onClick={onReturn}>
                        Return to Quiz
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600">Finish Exam</Button>
                </div>
            </div>
        </div>
    )
}
