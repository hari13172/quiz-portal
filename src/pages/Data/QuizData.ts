// Sample quiz data
export const quizData = {
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
  