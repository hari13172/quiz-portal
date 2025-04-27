"use client"

import { useState, useEffect } from "react"
import { QuizHeader } from "./QuizHeader"
import { QuestionDisplay } from "./QuestionDisplay"
import { AnswerOptions } from "./AnswerOptions"
import { ActionButtons } from "./ActionButton"
import { QuestionPalette } from "./QuestionPalette"
import { ConfirmationDialog } from "./ConfirmationDialog"
import { ResultsSummary } from "./ResultSummary"
import { quizData } from "./Data/QuizData"

export type QuestionStatus = "not-visited" | "not-answered" | "answered" | "marked-review" | "answered-marked-review"

export default function QuizInterface() {
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [questionStatus, setQuestionStatus] = useState<Record<number, QuestionStatus>>(
        Object.fromEntries(
            Array.from({ length: quizData.totalQuestions }, (_, i) => [i + 1, i === 0 ? "not-answered" : "not-visited"]),
        ),
    )
    const [remainingTime, setRemainingTime] = useState(quizData.timeInSeconds)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, string>>({})
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Format time as HH:MM:SS
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    // Count questions by status
    const countByStatus = (status: QuestionStatus) => {
        return Object.values(questionStatus).filter((s) => s === status).length
    }

    // Handle navigation
    const goToQuestion = (questionNumber: number) => {
        if (questionNumber < 1 || questionNumber > quizData.totalQuestions) return

        setCurrentQuestion(questionNumber)
        setSelectedAnswer(submittedAnswers[questionNumber] || null)

        // Update status if it was not visited
        if (questionStatus[questionNumber] === "not-visited") {
            setQuestionStatus((prev) => ({
                ...prev,
                [questionNumber]: "not-answered",
            }))
        }
    }

    // Handle answer selection
    const handleAnswerSelect = (answerId: string) => {
        setSelectedAnswer(answerId)
        setSubmittedAnswers((prev) => ({
            ...prev,
            [currentQuestion]: answerId,
        }))
        setQuestionStatus((prev) => ({
            ...prev,
            [currentQuestion]: "answered",
        }))
    }

    // Handle action buttons
    const handleAction = (action: "save" | "clear" | "mark" | "save-mark" | "submit") => {
        switch (action) {
            case "save":
                if (selectedAnswer) {
                    setQuestionStatus((prev) => ({
                        ...prev,
                        [currentQuestion]: "answered",
                    }))
                    goToQuestion(currentQuestion + 1)
                }
                break
            case "clear":
                setSelectedAnswer(null)
                setSubmittedAnswers((prev) => {
                    const newAnswers = { ...prev }
                    delete newAnswers[currentQuestion]
                    return newAnswers
                })
                setQuestionStatus((prev) => ({
                    ...prev,
                    [currentQuestion]: "not-answered",
                }))
                break
            case "mark":
                setQuestionStatus((prev) => ({
                    ...prev,
                    [currentQuestion]: "marked-review",
                }))
                goToQuestion(currentQuestion + 1)
                break
            case "save-mark":
                if (selectedAnswer) {
                    setQuestionStatus((prev) => ({
                        ...prev,
                        [currentQuestion]: "answered-marked-review",
                    }))
                    goToQuestion(currentQuestion + 1)
                }
                break
            case "submit":
                setShowConfirmDialog(true)
                break
        }
    }

    // Handle confirm submission
    const handleConfirmSubmit = () => {
        setShowConfirmDialog(false)
        setIsSubmitted(true)
    }

    // Get status color
    const getStatusColor = (status: QuestionStatus) => {
        switch (status) {
            case "not-answered":
                return "bg-orange-500 text-white"
            case "answered":
                return "bg-green-500 text-white"
            case "marked-review":
                return "bg-purple-500 text-white"
            case "answered-marked-review":
                return "bg-purple-500 text-white"
            default:
                return "bg-gray-200 text-gray-700"
        }
    }

    // Get submission stats
    const getSubmissionStats = () => {
        const answeredCount = Object.keys(submittedAnswers).length
        const notAnsweredCount = quizData.totalQuestions - answeredCount
        const answeredPercentage = Math.round((answeredCount / quizData.totalQuestions) * 100)

        return {
            answeredCount,
            notAnsweredCount,
            answeredPercentage,
        }
    }

    if (!isSubmitted) {
        return (
            <div className="min-h-screen bg-white">
                <QuizHeader />

                <div className="flex">
                    {/* Main content */}
                    <div className="flex-1 px-6 py-4">
                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold">{quizData.title}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Remaining time</span>
                                <span className="bg-orange-500 text-white px-3 py-1 rounded-md">{formatTime(remainingTime)}</span>
                            </div>
                        </div>

                        <QuestionDisplay question={quizData.questions[currentQuestion - 1]} currentQuestion={currentQuestion} />

                        <AnswerOptions
                            answers={quizData.questions[currentQuestion - 1].answers}
                            selectedAnswer={selectedAnswer}
                            onSelectAnswer={handleAnswerSelect}
                        />

                        <ActionButtons
                            currentQuestion={currentQuestion}
                            totalQuestions={quizData.totalQuestions}
                            selectedAnswer={selectedAnswer}
                            onAction={handleAction}
                            onNavigate={goToQuestion}
                        />
                    </div>

                    <QuestionPalette
                        totalQuestions={quizData.totalQuestions}
                        currentQuestion={currentQuestion}
                        questionStatus={questionStatus}
                        countByStatus={countByStatus}
                        getStatusColor={getStatusColor}
                        onQuestionClick={goToQuestion}
                        onSubmit={() => handleAction("submit")}
                    />
                </div>

                <ConfirmationDialog
                    open={showConfirmDialog}
                    onOpenChange={setShowConfirmDialog}
                    stats={getSubmissionStats()}
                    totalQuestions={quizData.totalQuestions}
                    onConfirm={handleConfirmSubmit}
                />
            </div>
        )
    } else {
        return (
            <ResultsSummary
                submittedAnswers={submittedAnswers}
                questions={quizData.questions}
                totalQuestions={quizData.totalQuestions}
                onReturn={() => setIsSubmitted(false)}
            />
        )
    }
}
