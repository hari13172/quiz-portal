interface QuestionDisplayProps {
    question: {
        id: number
        text: string
        options: Array<{
            id: string
            text: string
        }>
    }
    currentQuestion: number
}

export function QuestionDisplay({ question, currentQuestion }: QuestionDisplayProps) {
    return (
        <div className="mb-6">
            <h3 className="font-bold mb-4">QUESTION {currentQuestion}</h3>
            <p className="mb-6 text-center">{question.text}</p>

            {question.options.map((option) => (
                <div key={option.id} className="mb-2 text-center">
                    <p className="mb-1">
                        {option.id}: {option.text}
                    </p>
                </div>
            ))}
        </div>
    )
}
