import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Question from "../../components/question";
import Options from "../../components/options";
import { QUESTIONS } from "../../lib/questions";
import { useState, useEffect } from "react";
import { useSteps } from "@chakra-ui/react";
import { Box, Progress, Skeleton, Stack } from "@chakra-ui/react";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: QUESTIONS.length,
  });
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const max = allQuestions.length;
  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
    setActiveStep(prevQues >= 0 && prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < max && setCurrentQuestion(nextQues);
    setActiveStep(nextQues < max && nextQues);
  };

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < max; i++) {
      if (allQuestions[i].correctAnswer === selectedOptions[i]?.answerByUser) {
        newScore += 1;
      }
    }
    setScore(newScore);
    setShowScore(true);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);

      try {
        const result = await axios.get(
          "https://the-trivia-api.com/v2/questions"
        );
        sleep(10000);
        setAllQuestions(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, []);

  const progressPercent = (activeStep / (max - 1)) * 100;

  return (
    <>
      <div className="flex flex-col  w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
        <Head>
          <title>Quiz App</title>
        </Head>

        {showScore ? (
          <h1 className="text-3xl font-semibold text-center text-white">
            You scored {score} out of {allQuestions.length}
          </h1>
        ) : (
          <>
            <Box position="fixed" top="0" left="0" right="0" zIndex="999">
              <Progress value={progressPercent} size="xs" colorScheme="teal" />
            </Box>
            {loading ? (
              <div className="flex flex-col items-start w-full">
                <Skeleton width="20%" height="20px" my="2" />
                <Skeleton width="50%" height="20px" my="2" />
                <Skeleton width="100%" height="40px" my="5" />
                <Skeleton width="100%" height="40px" my="5" />
                <Skeleton width="100%" height="40px" my="5" />
                <Skeleton width="100%" height="40px" my="5" />
              </div>
            ) : (
              <>
                <Question
                  q={allQuestions[currentQuestion].question.text}
                  currentQuestion={currentQuestion + 1}
                  totalQuestions={max}
                />
                <Options
                  answerOptions={[
                    ...allQuestions[currentQuestion].incorrectAnswers,
                    allQuestions[currentQuestion].correctAnswer,
                  ]}
                  handleAnswerOption={handleAnswerOption}
                  selectedOptions={selectedOptions}
                  currentQuestion={currentQuestion}
                />
                <div className="flex justify-between w-full mt-4 text-white">
                  <button
                    className="w-[49%] py-3 bg-teal-600 rounded-lg"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button
                    className="w-[49%] py-3 bg-teal-600 rounded-lg"
                    onClick={
                      currentQuestion + 1 === max
                        ? handleSubmitButton
                        : handleNext
                    }
                  >
                    {currentQuestion + 1 === max ? "Submit" : "Next"}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
