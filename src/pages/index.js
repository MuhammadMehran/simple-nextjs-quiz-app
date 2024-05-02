import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Question from "../../components/question";
import Options from "../../components/options";
import { QUESTIONS } from "../../lib/questions";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < QUESTIONS.length && setCurrentQuestion(nextQues);
  };

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };
  return (
    <div className="flex flex-col  w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      <Head>
        <title>Quiz App</title>
      </Head>

      <Question
        q={QUESTIONS[currentQuestion].question}
        currentQuestion={currentQuestion + 1}
        totalQuestions={QUESTIONS.length}
      />
      <Options
        answerOptions={QUESTIONS[currentQuestion].answerOptions}
        handleAnswerOption={handleAnswerOption}
        selectedOptions={selectedOptions}
        currentQuestion={currentQuestion}
      />

      <div className="flex justify-between w-full mt-4 text-white">
        <button
          className="w-[49%] py-3 bg-indigo-600 rounded-lg"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="w-[49%] py-3 bg-indigo-600 rounded-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
