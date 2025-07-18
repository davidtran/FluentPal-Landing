"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { supportedLanguages } from "@/constants/quizConstants";

const ResultsPage = () => {
  const t = useTranslations("quiz.results");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [quizData, setQuizData] = useState<any>(null);
  const [learningProfile, setLearningProfile] = useState<string>("beginner");

  useEffect(() => {
    // Get parameters from URL
    const language = searchParams.get("language") || "";
    const duration = searchParams.get("duration") || "";
    const level = searchParams.get("level") || "";
    const goal = searchParams.get("goal") || "";

    // Get speaking question scores from URL
    // Format: q1=2&q2=3&q3=1 etc.
    const questionScores: number[] = [];
    for (let i = 1; i <= 20; i++) {
      const score = searchParams.get(`q${i}`);
      if (score) {
        questionScores.push(parseInt(score, 10));
      }
    }

    // Find language details
    const languageDetails = supportedLanguages.find(
      (l) => l.id === language
    ) || {
      id: language,
      label: "Unknown",
      icon: "🌐",
    };

    // Set quiz data
    setQuizData({
      language: languageDetails,
      duration,
      level,
      goal,
      questionScores,
    });

    // Determine learning profile based on level and scores
    // This is used for recommendations instead of showing a numerical score
    let profile = level;

    // If we have question scores, refine the profile
    if (questionScores.length > 0) {
      const avgScore =
        questionScores.reduce((sum, score) => sum + score, 0) /
        questionScores.length;

      if (level === "beginner") {
        if (avgScore < 2) profile = "earlyBeginner";
        else if (avgScore > 3.5) profile = "advancedBeginner";
        else profile = "beginner";
      } else if (level === "intermediate") {
        if (avgScore < 2.5) profile = "earlyIntermediate";
        else if (avgScore > 4) profile = "advancedIntermediate";
        else profile = "intermediate";
      } else if (level === "advanced") {
        if (avgScore < 3) profile = "earlyAdvanced";
        else profile = "advanced";
      }
    }

    setLearningProfile(profile);
    setIsLoading(false);
  }, [searchParams]);

  const getLanguageDisplay = () => {
    return quizData?.language?.label || "your target language";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-[50px] mb-[100px]">
      <h1 className="text-4xl text-center mb-2 text-gray-800 font-bold">
        {t("title")}
      </h1>
      <p className="text-center mb-8 text-gray-600 text-lg">{t("subtitle")}</p>

      {/* Quiz Summary Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("summary.title")}</h2>
        <p className="text-gray-600 mb-6">
          {t("summary.description", { language: getLanguageDisplay() })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">{quizData.language.icon}</span>
              <h3 className="text-xl font-medium">{t("summary.language")}</h3>
            </div>
            <p className="text-gray-700">{quizData.language.label}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">📊</span>
              <h3 className="text-xl font-medium">{t("summary.level")}</h3>
            </div>
            <p className="text-gray-700">{t(`levels.${quizData.level}`)}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">⏱️</span>
              <h3 className="text-xl font-medium">{t("summary.duration")}</h3>
            </div>
            <p className="text-gray-700">
              {t(`durations.${quizData.duration}`)}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">🎯</span>
              <h3 className="text-xl font-medium">{t("summary.goal")}</h3>
            </div>
            <p className="text-gray-700">{t(`goals.${quizData.goal}`)}</p>
          </div>
        </div>
      </div>

      {/* Learning Insights Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("insights.title")}</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3">
            {t(`insights.profile.${learningProfile}.title`)}
          </h3>
          <p className="text-gray-600 mb-4">
            {t(`insights.profile.${learningProfile}.description`)}
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">
            {t("insights.recommendations.title")}
          </h3>
          <ul className="space-y-3">
            {[0, 1, 2].map((index) => (
              <li
                key={index}
                className="flex items-start"
              >
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  {t(`insights.recommendations.${learningProfile}.${index}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How We Can Help Section */}
      <div className="bg-blue-600 text-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("help.title")}</h2>
        <p className="mb-6 text-lg">{t("help.description")}</p>

        <div className="bg-blue-700 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4 text-xl">
            {t("help.benefits.title")}:
          </h3>
          <ul className="space-y-3">
            {[0, 1, 2, 3, 4].map((index) => (
              <li
                key={index}
                className="flex items-start"
              >
                <span className="text-green-300 mr-2">✓</span>
                <span>{t(`help.benefits.items.${index}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <Link
            href={`/${locale}/conversation`}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors text-lg"
          >
            {t("help.cta")}
          </Link>
        </div>
      </div>

      {/* Additional Options */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link
          href={`/${locale}/quiz/roadmap?language=${quizData.language.id}&level=${quizData.level}&duration=${quizData.duration}&goal=${quizData.goal}`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors text-center"
        >
          {t("options.viewRoadmap")}
        </Link>

        <Link
          href={`/${locale}/quiz`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors text-center"
        >
          {t("options.retakeQuiz")}
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;
