"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import logo from '../assets/react.svg'

// Sample quiz data
const quizData = {
    title: "Aptitude",
    totalQuestions: 35,
    timeInSeconds: 7200, // 2 hours
    questions: Array.from({ length: 35 }, (_, i) => ({
        id: i + 1,
        text: "Lorem ipsum dolor sit amet consectetur. Vulputate tincidunt at sollicitudin et ultrices eget volutpat gravida. Massa lorem lectus faucibus ut sed morbi turpis risus sociis. Duis ornare condimentum bibendum mauris.",
        options: [
            { id: "I", text: "Lorem ipsum dolor sit amet consectetur" },
            {
                id: "II",
                text: "Lorem ipsum dolor sit amet consectetur. Vulputate tincidunt at sollicitudin et ultrices eget volutpat gravida.",
            },
            { id: "III", text: "Lorem ipsum dolor sit amet consectetur" },
            { id: "IV", text: "Lorem ipsum dolor sit amet consectetur" },
            { id: "V", text: "Lorem ipsum dolor sit amet consectetur" },
        ],
        answers: [
            { id: "A", value: ["I", "II", "V"] },
            { id: "B", value: ["I", "V"] },
            { id: "C", value: ["III", "IV"] },
            { id: "D", value: "All of the above" },
        ],
    })),
}

type QuestionStatus = "not-visited" | "not-answered" | "answered" | "marked-review" | "answered-marked-review"

export default function QuizInterface() {
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [questionStatus, setQuestionStatus] = useState<Record<number, QuestionStatus>>(
        Object.fromEntries(
            Array.from({ length: quizData.totalQuestions }, (_, i) => [i + 1, i === 0 ? "not-answered" : "not-visited"]),
        ),
    )
    const [remainingTime, setRemainingTime] = useState(quizData.timeInSeconds)

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
        setSelectedAnswer(null)

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
        setQuestionStatus((prev) => ({
            ...prev,
            [currentQuestion]: "answered",
        }))
    }

    // Handle action buttons
    const handleAction = (action: "save" | "clear" | "mark" | "save-mark") => {
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
        }
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

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b py-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="" />
                    <h1 className="text-lg font-medium">Succeedex Placement Portal</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        <div>
                            <p className="text-sm font-medium">PrithviRaj</p>
                            <p className="text-sm font-medium">Registration No.</p>
                            <p className="text-xs">B.E CSE</p>
                        </div>
                    </div>
                </div>
            </header>

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

                    {/* Question */}
                    <div className="mb-6">
                        <h3 className="font-bold mb-4">QUESTION {currentQuestion}</h3>
                        <p className="mb-6 text-center">{quizData.questions[currentQuestion - 1].text}</p>

                        {quizData.questions[currentQuestion - 1].options.map((option, index) => (
                            <div key={option.id} className="mb-2 text-center">
                                <p className="mb-1">
                                    {option.id}: {option.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Answer options */}
                    <RadioGroup value={selectedAnswer || ""} className="space-y-2 mb-6">
                        {quizData.questions[currentQuestion - 1].answers.map((answer) => (
                            <div
                                key={answer.id}
                                className={`border rounded-md p-4 ${selectedAnswer === answer.id ? "bg-blue-700 text-white" : "bg-gray-50 hover:bg-gray-100"
                                    }`}
                                onClick={() => handleAnswerSelect(answer.id)}
                            >
                                <RadioGroupItem value={answer.id} id={`answer-${answer.id}`} className="sr-only" />
                                <Label
                                    htmlFor={`answer-${answer.id}`}
                                    className={`flex items-center gap-2 cursor-pointer ${selectedAnswer === answer.id ? "text-white" : ""
                                        }`}
                                >
                                    <span className="font-medium">{answer.id}</span>
                                    <span>{Array.isArray(answer.value) ? answer.value.join(", ") : answer.value}</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 justify-between mt-8">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => goToQuestion(currentQuestion - 1)}
                                disabled={currentQuestion === 1}
                            >
                                <ChevronLeft className="h-4 w-4" /> Previous
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleAction("save")}>
                                SAVE & NEXT
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAction("clear")}>
                                CLEAR
                            </Button>
                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => handleAction("save-mark")}>
                                SAVE & MARK FOR REVIEW
                            </Button>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => handleAction("mark")}>
                                MARK FOR REVIEW & NEXT
                            </Button>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => goToQuestion(currentQuestion + 1)}
                                disabled={currentQuestion === quizData.totalQuestions}
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Question palette */}
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
                                {Array.from({ length: quizData.totalQuestions }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${i + 1 === currentQuestion
                                            ? "ring-2 ring-blue-500 " + getStatusColor(questionStatus[i + 1])
                                            : getStatusColor(questionStatus[i + 1])
                                            }`}
                                        onClick={() => goToQuestion(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="mt-6">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600">Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
