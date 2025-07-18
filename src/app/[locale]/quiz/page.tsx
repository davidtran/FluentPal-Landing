"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Head from "next/head";

// Import constants
import {
  supportedLanguages,
  learningDurations,
  learningGoals,
  speakingFocusedQuestions,
  IQuizOption,
} from "@/constants/quizConstants";
import { getProficiencyLevelsForLanguage } from "@/constants/languageLevels";

const QuizPage = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [quizStage, setQuizStage] = useState("language"); // language, duration, level, goal, questions
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [learningDuration, setLearningDuration] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: IQuizOption | IQuizOption[];
  }>({});
  const [progress, setProgress] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<IQuizOption[]>([]);
  const [proficiencyLevels, setProficiencyLevels] = useState(
    getProficiencyLevelsForLanguage("")
  );
  const [currentSpeakingQuestionIndex, setCurrentSpeakingQuestionIndex] =
    useState(0);
  const [selectedSpeakingAnswers, setSelectedSpeakingAnswers] = useState<
    IQuizOption[]
  >([]);
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<number[]>(
    []
  );

  // Update proficiency levels when language changes
  useEffect(() => {
    if (selectedLanguage) {
      setProficiencyLevels(getProficiencyLevelsForLanguage(selectedLanguage));
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setQuizStage("duration");
  };

  const handleDurationSelect = (duration: string) => {
    setLearningDuration(duration);
    setQuizStage("goal");
  };

  const handleGoalSelect = (goal: string) => {
    setLearningGoal(goal);
    setQuizStage("questions");
    // Initialize progress for questions
    setProgress(0);
  };

  const handleSingleOptionSelect = (optionIndex: number) => {
    // Handle speaking questions
    const currentQuestion =
      speakingFocusedQuestions[currentSpeakingQuestionIndex];

    // Set the selected option index
    const newSelectedSpeakingAnswers = [...selectedSpeakingAnswers];
    newSelectedSpeakingAnswers[currentSpeakingQuestionIndex] =
      currentQuestion.options[optionIndex];
    setSelectedSpeakingAnswers(newSelectedSpeakingAnswers);

    // If it's a single selection question, move to the next question
    if (currentQuestion.type === "single") {
      handleNextSpeakingQuestion();
    }
  };

  const handleMultiOptionToggle = (optionIndex: number) => {
    const currentQuestion =
      speakingFocusedQuestions[currentSpeakingQuestionIndex];

    const selectOption = currentQuestion.options[optionIndex];

    if (selectedOptions.includes(selectOption)) {
      // Remove option if already selected
      setSelectedOptions(
        selectedOptions.filter((item) => item !== selectOption)
      );
    } else {
      // Otherwise, add the option if under max selections
      if (selectedOptions.length < (currentQuestion.maxSelections || 1)) {
        setSelectedOptions([...selectedOptions, selectOption]);
      }
    }
  };

  const handleSubmitQuiz = () => {
    const queryParams = new URLSearchParams();

    // Add basic quiz parameters
    queryParams.append("language", selectedLanguage);
    queryParams.append("duration", learningDuration);
    queryParams.append("level", proficiencyLevel);
    queryParams.append("goal", learningGoal);

    // Add speaking question scores
    selectedSpeakingAnswers.forEach((option, optionIndex) => {
      if (option !== undefined) {
        const question = speakingFocusedQuestions[optionIndex];
        const option = question.options[optionIndex];

        // Get the score from the option if it's an object with a score property
        let score = 3; // Default score if not found
        if (typeof option === "object" && "score" in option) {
          score = option.score;
        }

        queryParams.append(`q${optionIndex + 1}`, score.toString());
      }
    });

    // For multiple selection questions, calculate an average score from selected options
    speakingFocusedQuestions.forEach((question, questionIndex) => {
      if (question.type === "multiple") {
        const selectedOptions = selectedMultiOptions.filter(
          (_, index) => index === questionIndex
        );

        if (selectedOptions.length > 0) {
          let totalScore = 0;
          selectedOptions.forEach((optionIndex) => {
            const option = question.options[optionIndex];
            if (typeof option === "object" && "score" in option) {
              totalScore += option.score;
            } else {
              totalScore += 3; // Default score
            }
          });

          const avgScore = Math.round(totalScore / selectedOptions.length);
          queryParams.append(`q${questionIndex + 1}`, avgScore.toString());
        }
      }
    });

    // Navigate to results page with all parameters
    router.push(`/${locale}/quiz/roadmap?${queryParams.toString()}`);
  };

  const handleMultiOptionSubmit = () => {
    const currentQuestion =
      speakingFocusedQuestions[currentSpeakingQuestionIndex];

    // Save the selected options for this question
    const newSelectedSpeakingAnswers = [...selectedSpeakingAnswers];
    //    newSelectedSpeakingAnswers[currentSpeakingQuestionIndex] = -1; // Mark as answered with multiple options
    setSelectedSpeakingAnswers(newSelectedSpeakingAnswers);
    setSelectedOptions([]);
    // Move to the next question or submit if this was the last one
    if (currentSpeakingQuestionIndex < speakingFocusedQuestions.length - 1) {
      setCurrentSpeakingQuestionIndex(currentSpeakingQuestionIndex + 1);
      setSelectedMultiOptions([]);
    } else {
      // This was the last question, submit the quiz
      handleSubmitQuiz();
    }
  };

  const handleNextSpeakingQuestion = () => {
    if (currentSpeakingQuestionIndex < speakingFocusedQuestions.length - 1) {
      setCurrentSpeakingQuestionIndex(currentSpeakingQuestionIndex + 1);
    } else {
      // This was the last question, submit the quiz
      handleSubmitQuiz();
    }
  };

  // Render language selection screen
  if (quizStage === "language") {
    return (
      <>
        <Head>
          <title>Language Learning Quiz</title>
        </Head>
        <div className="max-w-3xl mx-auto p-8 mt-[100px]">
          <h1 className="text-4xl text-center mb-4 text-gray-800 font-bold">
            {t("quiz.language.title")}
          </h1>
          <p className="text-center mb-8 text-gray-600 text-lg leading-relaxed">
            {t("quiz.language.description")}
          </p>

          <div className="flex flex-wrap flex-start gap-6 mt-8">
            {supportedLanguages.map((language) => (
              <button
                key={language.id}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl bg-white cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:border-blue-500 w-[45%]"
                onClick={() => handleLanguageSelect(language.id)}
              >
                <span className="text-4xl mb-4">{language.icon}</span>
                <span className="text-base font-medium text-center text-gray-700">
                  {t(language.label)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Render learning duration selection screen
  if (quizStage === "duration") {
    return (
      <>
        <Head>
          <title>Language Learning Quiz</title>
        </Head>
        <div className="max-w-3xl mx-auto p-8 mt-[100px]">
          <h1 className="text-4xl text-center mb-4 text-gray-800 font-bold">
            {t("quiz.duration.title")}
          </h1>
          <p className="text-center mb-8 text-gray-600 text-lg leading-relaxed">
            {t("quiz.duration.description")}
          </p>

          <div className="flex flex-wrap flex-start gap-6 mt-8">
            {learningDurations.map((duration) => (
              <button
                key={duration.id}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl bg-white cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:border-blue-500 w-[45%]"
                onClick={() => handleDurationSelect(duration.id)}
              >
                <span className="text-4xl mb-4">{duration.icon}</span>
                <span className="text-base font-medium text-center text-gray-700">
                  {t(duration.label)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Render learning goal selection screen
  if (quizStage === "goal") {
    return (
      <>
        <Head>
          <title>Language Learning Quiz</title>
        </Head>
        <div className="max-w-3xl mx-auto p-8 mt-[100px]">
          <h1 className="text-4xl text-center mb-4 text-gray-800 font-bold">
            {t("quiz.goal.title")}
          </h1>
          <p className="text-center mb-8 text-gray-600 text-lg leading-relaxed">
            {t("quiz.goal.description")}
          </p>

          <div className="flex flex-wrap flex-start gap-6 mt-8">
            {learningGoals.map((goal) => (
              <button
                key={goal.id}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl bg-white cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:border-blue-500 w-[45%]"
                onClick={() => handleGoalSelect(goal.id)}
              >
                <span className="text-4xl mb-4">{goal.icon}</span>
                <span className="text-base font-medium text-center text-gray-700">
                  {t(goal.label)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Render quiz questions
  const currentQuestionData =
    speakingFocusedQuestions[currentSpeakingQuestionIndex];

  const isMultipleChoice = currentQuestionData.type === "multiple";

  return (
    <>
      <Head>
        <title>Language Learning Quiz</title>
      </Head>
      <div className="max-w-3xl mx-auto p-8 mt-[100px]">
        <h1 className="text-4xl text-center mb-4 text-gray-800 font-bold">
          {t("quiz.questions.title")}
        </h1>
        <p className="text-center mb-8 text-gray-600 text-lg leading-relaxed">
          {t("quiz.questions.description")}
        </p>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mb-8 text-gray-600">
          {t("quiz.questions.progress", {
            current: currentSpeakingQuestionIndex + 1,
            total: speakingFocusedQuestions.length,
          })}
        </p>

        <div className="bg-white rounded-xl">
          <h2 className="text-2xl mb-6 text-gray-800">
            {t(currentQuestionData.translationKey + ".question")}
          </h2>

          {isMultipleChoice && currentQuestionData.maxSelections && (
            <p className="text-gray-600 italic mb-4 text-sm">
              {t("quiz.questions.multipleChoice", {
                max: currentQuestionData.maxSelections,
              })}
            </p>
          )}

          <div className="flex flex-col gap-4">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                className={`p-4 border border-gray-200 rounded-lg bg-white text-left cursor-pointer transition-all duration-200 flex items-center
                  ${
                    isMultipleChoice && selectedOptions.includes(option)
                      ? "bg-blue-50 border-blue-500"
                      : "hover:bg-blue-50 hover:border-blue-500"
                  }`}
                onClick={() =>
                  isMultipleChoice
                    ? handleMultiOptionToggle(index)
                    : handleSingleOptionSelect(index)
                }
              >
                {isMultipleChoice && (
                  <span className="inline-block w-5 h-5 border border-blue-500 rounded mr-3 text-center leading-5 text-blue-500 font-bold flex-shrink-0">
                    {selectedOptions.includes(option) ? "✓" : ""}
                  </span>
                )}
                {t(option.name)}
              </button>
            ))}
          </div>

          {isMultipleChoice && (
            <button
              className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200
                ${
                  selectedOptions.length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                }`}
              onClick={handleMultiOptionSubmit}
              disabled={selectedOptions.length === 0}
            >
              {t("quiz.questions.continue")}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
