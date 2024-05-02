import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Question from "../../components/question";
import Options from "../../components/options";
import { QUESTIONS } from "../../lib/questions";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col  w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      <Head>
        <title>Quiz App</title>
      </Head>
      {/* {QUESTIONS.map((value, index) => (
        <Question />
      ))} */}
      <Question q={QUESTIONS[0].question} />
      <Options answerOptions={QUESTIONS[0].answerOptions} />

      <div className="flex justify-between w-full mt-4 text-white">
        <button className="w-[49%] py-3 bg-indigo-600 rounded-lg">
          Previous
        </button>
        <button className="w-[49%] py-3 bg-indigo-600 rounded-lg">Next</button>
      </div>
    </div>
  );
}
