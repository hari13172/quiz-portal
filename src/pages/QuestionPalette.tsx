"use client"

import { Button } from "@/components/ui/button"
import type { QuestionStatus } from "./QuizInterface"

interface QuestionPaletteProps {
    totalQuestions: number
    currentQuestion: number
    questionStatus: Record<number, QuestionStatus>
    countByStatus: (status: QuestionStatus) => number
    getStatusColor: (status: QuestionStatus) => string
    onQuestionClick: (questionNumber: number) => void
    onSubmit: () => void
}

export function QuestionPalette({
    totalQuestions,
    currentQuestion,
    questionStatus,
    countByStatus,
    getStatusColor,
    onQuestionClick,
    onSubmit,
}: QuestionPaletteProps) {
    return (
        <div className="w-80 p-4 bg-gray-50 border-l">
            <div className="space-y-4">
                {/* Status indicators */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                        {countByStatus("not-visited")}
                    </div>
                    <span className="text-sm">Not Visited</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">
                        {countByStatus("not-answered")}
                    </div>
                    <span className="text-sm">Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                        {countByStatus("answered")}
                    </div>
                    <span className="text-sm">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">
                        {countByStatus("marked-review")}
                    </div>
                    <span className="text-sm">Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">
                        {countByStatus("answered-marked-review")}
                    </div>
                    <div>
                        <span className="text-sm">Answered & Marked for Review</span>
                        <p className="text-xs text-gray-500">(will be considered for evaluation)</p>
                    </div>
                </div>

                {/* Question numbers */}
                <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">QUESTIONS 1/35</h3>
                    <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: totalQuestions }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${i + 1 === currentQuestion
                                    ? "ring-2 ring-blue-500 " + getStatusColor(questionStatus[i + 1])
                                    : getStatusColor(questionStatus[i + 1])
                                    }`}
                                onClick={() => onQuestionClick(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit button */}
                <div className="mt-6">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={onSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}
