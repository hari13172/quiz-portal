"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ActionButtonsProps {
    currentQuestion: number
    totalQuestions: number
    selectedAnswer: string | null
    onAction: (action: "save" | "clear" | "mark" | "save-mark" | "submit") => void
    onNavigate: (questionNumber: number) => void
}

export function ActionButtons({
    currentQuestion,
    totalQuestions,
    selectedAnswer,
    onAction,
    onNavigate,
}: ActionButtonsProps) {
    return (
        <div className="flex flex-wrap gap-2 justify-between mt-8">
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => onNavigate(currentQuestion - 1)}
                    disabled={currentQuestion === 1}
                >
                    <ChevronLeft className="h-4 w-4" /> Previous
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => onAction("save")}>
                    SAVE & NEXT
                </Button>
                <Button variant="outline" size="sm" onClick={() => onAction("clear")}>
                    CLEAR
                </Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => onAction("save-mark")}>
                    SAVE & MARK FOR REVIEW
                </Button>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => onAction("mark")}>
                    MARK FOR REVIEW & NEXT
                </Button>
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => onNavigate(currentQuestion + 1)}
                    disabled={currentQuestion === totalQuestions}
                >
                    Next <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
