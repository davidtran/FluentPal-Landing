"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Head from "next/head";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useLocale, useTranslations } from "next-intl";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Core features to always show for language learning
const coreFeatures = [
  {
    title: "AI Conversation Partner",
    description:
      "Practice speaking with our AI that adapts to your level, corrects your pronunciation, and helps you build confidence in real conversations.",
    icon: "🗣️",
    primary: true,
  },
  {
    title: "Smart Vocabulary Builder",
    description:
      "Our app tracks words you're learning and creates personalized review sessions using spaced repetition to ensure you never forget vocabulary.",
    icon: "📚",
    primary: false,
  },
  {
    title: "Grammar Assistant",
    description:
      "Get instant feedback on your writing and speaking with clear explanations of grammar rules tailored to your native language.",
    icon: "✏️",
    primary: false,
  },
];

// Personalized recommendations based on quiz answers
const getPersonalizedRecommendations = (
  language: string,
  level: string,
  goal: string,
  answers: Record<string, number>
) => {
  const recommendations = [];

  // Check for vocabulary retention issues
  if (
    answers["3"] <= 2 || // Low expression ability score
    answers["4"] <= 2 || // Low listening comprehension score
    (answers["5"] && answers["5"] === 3) // Selected vocabulary as a challenge
  ) {
    recommendations.push({
      titleKey: "quiz.recommendations.vocabulary.title",
      descriptionKey: "quiz.recommendations.vocabulary.description",
      icon: "🔤",
      primary: true,
    });
  }

  // Check for speaking confidence issues
  if (
    answers["2"] <= 2 || // Low comfort with native speakers
    answers["1"] <= 2 || // Rarely practices speaking
    (answers["5"] && answers["5"] === 5) // Selected confidence as a challenge
  ) {
    recommendations.push({
      titleKey: "quiz.recommendations.speaking.title",
      descriptionKey: "quiz.recommendations.speaking.description",
      icon: "🎙️",
      primary: true,
    });
  }

  // Check for grammar difficulties
  if (
    answers["3"] <= 3 || // Medium-low expression ability
    (answers["5"] && answers["5"] === 2) // Selected grammar as a challenge
  ) {
    recommendations.push({
      titleKey: "quiz.recommendations.grammar.title",
      descriptionKey: "quiz.recommendations.grammar.description",
      icon: "📝",
      primary: true,
    });
  }

  // Check for listening comprehension issues
  if (
    answers["4"] <= 3 || // Medium-low listening comprehension
    (answers["5"] && answers["5"] === 4) // Selected speaking fluency as a challenge
  ) {
    recommendations.push({
      titleKey: "quiz.recomme ndations.listening.title",
      descriptionKey: "quiz.recommendations.listening.description",
      icon: "👂",
      primary: true,
    });
  }

  // Goal-specific recommendations
  if (goal === "travel") {
    recommendations.push({
      titleKey: "quiz.recommendations.travel.title",
      descriptionKey: "quiz.recommendations.travel.description",
      icon: "✈️",
      primary: false,
    });
  } else if (goal === "business") {
    recommendations.push({
      titleKey: "quiz.recommendations.business.title",
      descriptionKey: "quiz.recommendations.business.description",
      icon: "💼",
      primary: false,
    });
  } else if (goal === "academic") {
    recommendations.push({
      titleKey: "quiz.recommendations.academic.title",
      descriptionKey: "quiz.recommendations.academic.description",
      icon: "🎓",
      primary: false,
    });
  }

  // Add general recommendations if we don't have enough specific ones
  if (recommendations.length < 3) {
    recommendations.push({
      titleKey: "quiz.recommendations.cultural.title",
      descriptionKey: "quiz.recommendations.cultural.description",
      icon: "🌍",
      primary: false,
    });

    recommendations.push({
      titleKey: "quiz.recommendations.daily.title",
      descriptionKey: "quiz.recommendations.daily.description",
      icon: "📅",
      primary: false,
    });
  }

  // Limit to 4 recommendations
  return recommendations.slice(0, 4);
};

// Language-specific stats
const languageStats = {
  spanish: {
    vocabularyGrowth: "1,200+",
    conversationConfidence: "85%",
    usersCount: "2.5M+",
  },
  french: {
    vocabularyGrowth: "1,100+",
    conversationConfidence: "82%",
    usersCount: "1.8M+",
  },
  german: {
    vocabularyGrowth: "950+",
    conversationConfidence: "79%",
    usersCount: "1.2M+",
  },
  italian: {
    vocabularyGrowth: "1,050+",
    conversationConfidence: "84%",
    usersCount: "950K+",
  },
  portuguese: {
    vocabularyGrowth: "1,150+",
    conversationConfidence: "83%",
    usersCount: "780K+",
  },
  japanese: {
    vocabularyGrowth: "850+",
    conversationConfidence: "75%",
    usersCount: "1.5M+",
  },
  chinese: {
    vocabularyGrowth: "800+",
    conversationConfidence: "72%",
    usersCount: "1.7M+",
  },
  korean: {
    vocabularyGrowth: "820+",
    conversationConfidence: "74%",
    usersCount: "1.1M+",
  },
  russian: {
    vocabularyGrowth: "900+",
    conversationConfidence: "76%",
    usersCount: "850K+",
  },
  arabic: {
    vocabularyGrowth: "780+",
    conversationConfidence: "71%",
    usersCount: "720K+",
  },
  default: {
    vocabularyGrowth: "1,000+",
    conversationConfidence: "80%",
    usersCount: "1.5M+",
  },
};

// Chart data for 4-week progress

// 4-week benefits by language level
const getFourWeekBenefits = (level?: string) => {
  if (level === "a1" || level === "a2") {
    return [
      {
        title: "Basic Conversation Skills",
        description:
          "You'll be able to introduce yourself, ask simple questions, and navigate everyday situations with confidence.",
        icon: "💬",
      },
      {
        title: "500+ New Words",
        description:
          "Master essential vocabulary that you'll actually use, with 90% retention thanks to our spaced repetition system.",
        icon: "📝",
      },
      {
        title: "Pronunciation Improvement",
        description:
          "Sound more natural with feedback on your accent and intonation from our AI speech analysis.",
        icon: "🔊",
      },
    ];
  } else if (level === "b1" || level === "b2") {
    return [
      {
        title: "Fluid Conversations",
        description:
          "Express complex thoughts, discuss a variety of topics, and understand native speakers at normal conversational speed.",
        icon: "🗣️",
      },
      {
        title: "Grammar Mastery",
        description:
          "Eliminate persistent errors and gain confidence with advanced grammatical structures through targeted practice.",
        icon: "📚",
      },
      {
        title: "Cultural Fluency",
        description:
          "Understand idioms, slang, and cultural references that textbooks don't teach but are essential for true fluency.",
        icon: "🌍",
      },
    ];
  } else {
    return [
      {
        title: "Near-Native Fluency",
        description:
          "Refine subtle aspects of your language use to sound more like a native speaker in professional and social contexts.",
        icon: "🎯",
      },
      {
        title: "Specialized Vocabulary",
        description:
          "Master technical or field-specific terminology relevant to your professional or academic goals.",
        icon: "🔬",
      },
      {
        title: "Nuanced Expression",
        description:
          "Convey complex emotions, opinions, and ideas with the precision and style of an advanced speaker.",
        icon: "✨",
      },
    ];
  }
};

// FluentPal benefits with translation keys
const fluentPalBenefits = [
  {
    title: "quiz.roadmap.fluentPalBenefits.aiSpeaking.title",
    description: "quiz.roadmap.fluentPalBenefits.aiSpeaking.description",
    icon: "🎯",
  },
  {
    title: "quiz.roadmap.fluentPalBenefits.unlimitedPractice.title",
    description: "quiz.roadmap.fluentPalBenefits.unlimitedPractice.description",
    icon: "🔄",
  },
  {
    title: "quiz.roadmap.fluentPalBenefits.immediateFeedback.title",
    description: "quiz.roadmap.fluentPalBenefits.immediateFeedback.description",
    icon: "⚡",
  },
  {
    title: "quiz.roadmap.fluentPalBenefits.vocabularyExpansion.title",
    description:
      "quiz.roadmap.fluentPalBenefits.vocabularyExpansion.description",
    icon: "📚",
  },
  {
    title: "quiz.roadmap.fluentPalBenefits.realLifeTopics.title",
    description: "quiz.roadmap.fluentPalBenefits.realLifeTopics.description",
    icon: "🌎",
  },
];

// 4-week outcomes with translation keys
const fourWeekOutcomes = [
  {
    title: "quiz.roadmap.fourWeekOutcomes.confidence.title",
    description: "quiz.roadmap.fourWeekOutcomes.confidence.description",
    icon: "😊",
  },
  {
    title: "quiz.roadmap.fourWeekOutcomes.conversationSkills.title",
    description: "quiz.roadmap.fourWeekOutcomes.conversationSkills.description",
    icon: "💬",
  },
  {
    title: "quiz.roadmap.fourWeekOutcomes.expandedVocabulary.title",
    description: "quiz.roadmap.fourWeekOutcomes.expandedVocabulary.description",
    icon: "📝",
  },
  {
    title: "quiz.roadmap.fourWeekOutcomes.improvedFluency.title",
    description: "quiz.roadmap.fourWeekOutcomes.improvedFluency.description",
    icon: "🌊",
  },
  {
    title: "quiz.roadmap.fourWeekOutcomes.rightBrain.title",
    description: "quiz.roadmap.fourWeekOutcomes.rightBrain.description",
    icon: "🧠",
  },
];

const QuizResults = () => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();
  // Get query parameters from searchParams
  const language = searchParams.get("language");
  const duration = searchParams.get("duration");
  const level = searchParams.get("level");
  const goal = searchParams.get("goal");
  const queryAnswers = searchParams.get("answers");

  const [relevantTestimonials, setRelevantTestimonials] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [stats, setStats] = useState({
    vocabularyGrowth: "1,000+",
    conversationConfidence: "80%",
    usersCount: "1.5M+",
  });
  const [fourWeekBenefits, setFourWeekBenefits] = useState<any[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const getChartData = () => {
    // Adjust starting point based on proficiency level
    let startingPoint = 10;
    // Calculate 4-week progress
    const weeklyGain = (100 - startingPoint) / 8; // Aim for 50% of remaining progress in 4 weeks

    const data = {
      labels: [
        t("quiz.roadmap.progressRoadmap.week", { number: 1 }),
        t("quiz.roadmap.progressRoadmap.week", { number: 2 }),
        t("quiz.roadmap.progressRoadmap.week", { number: 3 }),
        t("quiz.roadmap.progressRoadmap.week", { number: 4 }),
      ],
      datasets: [
        {
          label: t("quiz.roadmap.progressRoadmap.traditional"),
          data: [
            startingPoint,
            startingPoint + weeklyGain * 0.3,
            startingPoint + weeklyGain * 0.6,
            startingPoint + weeklyGain * 0.9,
          ],
          borderColor: "#ccc",
          backgroundColor: "rgba(204, 204, 204, 0.2)",
          fill: true,
          tension: 0.4,
        },
        {
          label: t("quiz.roadmap.progressRoadmap.withFluentPal"),
          data: [
            startingPoint,
            startingPoint + weeklyGain,
            startingPoint + weeklyGain * 2,
            startingPoint + weeklyGain * 4,
          ],
          borderColor: "#4285f4",
          backgroundColor: "rgba(66, 133, 244, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    };

    console.log(data);

    return data;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 10,
          },
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: t("quiz.roadmap.progressRoadmap.title"),
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: t("quiz.roadmap.progressRoadmap.title"),
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  useEffect(() => {
    if (language && goal) {
      // Set relevant testimonials based on language
      const languageKey = language as string;

      // Set chart data based on language and level
      setChartData(getChartData());

      // Set stats based on language
      setStats(
        languageStats[languageKey as keyof typeof languageStats] ||
          languageStats.default
      );

      // Set 4-week benefits based on level
      setFourWeekBenefits(getFourWeekBenefits());

      // Collect quiz answers from URL parameters (q1, q2, q3, etc.)
      const quizAnswers: Record<string, number> = {};
      for (let i = 1; i <= 20; i++) {
        const answer = searchParams.get(`q${i}`);
        if (answer) {
          quizAnswers[i.toString()] = parseInt(answer, 10);
        }
      }

      // Generate recommendations based on answers
      if (Object.keys(quizAnswers).length > 0) {
        // Generate personalized recommendations
        setRecommendations(
          getPersonalizedRecommendations(
            languageKey,
            level as string,
            goal as string,
            quizAnswers
          )
        );
      } else {
        // Fallback to generic recommendations
        setRecommendations([
          {
            titleKey: "quiz.recommendations.speaking.title",
            descriptionKey: "quiz.recommendations.speaking.description",
            icon: "🎙️",
            primary: true,
          },
          {
            titleKey: "quiz.recommendations.adaptive.title",
            descriptionKey: "quiz.recommendations.adaptive.description",
            icon: "🧠",
            primary: true,
          },
          {
            titleKey: "quiz.recommendations.cultural.title",
            descriptionKey: "quiz.recommendations.cultural.description",
            icon: "🌍",
            primary: false,
          },
          {
            titleKey: "quiz.recommendations.daily.title",
            descriptionKey: "quiz.recommendations.daily.description",
            icon: "📅",
            primary: false,
          },
        ]);
      }
    }
  }, [language, level, goal, searchParams]);

  const handleDownload = () => {
    window.location.href = "/" + locale + "/quiz/download";
  };

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  // Get language display name
  const getLanguageDisplay = () => {
    return t("home.supported_languages." + language);
  };

  return (
    <>
      <Head>
        <title>{t("roadmap.pageTitle")}</title>
      </Head>
      <div className="max-w-4xl mx-auto p-8 mt-[100px]">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-800 mb-4 font-bold">
            {t("quiz.roadmap.personalizedPlan", {
              language: getLanguageDisplay(),
            })}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t("quiz.roadmap.planDescription")}
          </p>
        </div>

        {chartData && (
          <div className="mb-12 bg-white p-4 md:p-6 rounded-xl shadow-xs border-[1px] border-gray-200">
            <div className="h-[300px] md:h-[400px]">
              <Line
                data={chartData}
                options={chartOptions}
              />
            </div>
            <p className="text-center text-gray-600 mt-4 italic text-sm md:text-base">
              {t("quiz.roadmap.chartDescription")}
            </p>
          </div>
        )}

        <div className="flex justify-between mb-[100px] flex-wrap gap-4">
          <div className="bg-blue-50 rounded-xl p-6 text-center flex-1 min-w-[200px]">
            <h3 className="text-4xl text-blue-500 mb-2 font-bold">
              {stats.vocabularyGrowth}
            </h3>
            <p className="text-gray-600">{t("quiz.roadmap.stats.newWords")}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 text-center flex-1 min-w-[200px]">
            <h3 className="text-4xl text-blue-500 mb-2 font-bold">
              {stats.conversationConfidence}
            </h3>
            <p className="text-gray-600">
              {t("quiz.roadmap.stats.confidenceIncrease")}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 text-center flex-1 min-w-[200px]">
            <h3 className="text-4xl text-blue-500 mb-2 font-bold">
              {stats.usersCount}
            </h3>
            <p className="text-gray-600">
              {t("quiz.roadmap.stats.usersCount")}
            </p>
          </div>
        </div>

        <div className="mb-[100px]">
          <h2 className="text-3xl text-gray-800 mb-4 text-center font-bold">
            {t("quiz.roadmap.fluentPalHelp.title")}
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            {t("quiz.roadmap.fluentPalHelp.subtitle", {
              language: getLanguageDisplay(),
            })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fluentPalBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-xs border-[1px] border-gray-200 text-center transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 mx-auto bg-blue-100 w-20 h-20 flex items-center justify-center rounded-full text-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl text-gray-800 mb-3 font-semibold">
                  {t(benefit.title)}
                </h3>
                <p className="text-gray-600">{t(benefit.description)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What You'll Achieve After 4 Weeks - Updated Design */}
        <div className="mb-[100px] bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl">
          <h2 className="text-3xl text-gray-800 mb-4 text-center font-bold">
            {t("quiz.roadmap.fourWeeks.title")}
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            {t("quiz.roadmap.fourWeeks.subtitle")}
          </p>

          <div className="space-y-6">
            {fourWeekOutcomes.map((outcome, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm flex items-start hover:shadow-xs border-[1px] border-gray-200 transition-all duration-300"
              >
                <div className="mr-6 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{outcome.icon}</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl text-gray-800 font-semibold">
                      {t(outcome.title)}
                    </h3>
                    <div className="h-1 bg-blue-500 w-16 ml-4 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {t(outcome.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-[100px]">
          <h2 className="text-3xl text-gray-800 mb-4 text-center font-bold">
            {t("quiz.roadmap.successStories.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-xs border-[1px] border-gray-200">
              <div className="flex items-center mb-4">
                <h3 className="text-lg text-gray-800 font-medium">
                  {t("quiz.roadmap.testimonials." + language + ".first.name")}
                </h3>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                "{t("quiz.roadmap.testimonials." + language + ".first.text")}"
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-xs border-[1px] border-gray-200">
              <div className="flex items-center mb-4">
                <h3 className="text-lg text-gray-800 font-medium">
                  {t("quiz.roadmap.testimonials." + language + ".second.name")}
                </h3>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                "{t("quiz.roadmap.testimonials." + language + ".second.text")}"
              </p>
            </div>
          </div>
        </div>

        <div className="mb-[100px] bg-white rounded-xl overflow-hidden shadow-xs border-[1px] border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img
                src="/images/teacher.jpg"
                alt={t("quiz.roadmap.commitment.imageAlt")}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-8 w-full md:w-1/2">
              <h2 className="text-2xl text-gray-800 mb-4 font-bold">
                {t("quiz.roadmap.commitment.title")}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t("quiz.roadmap.commitment.paragraph1")}
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t("quiz.roadmap.commitment.paragraph2", {
                  language: getLanguageDisplay(),
                })}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t("quiz.roadmap.commitment.paragraph3")}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-blue-500 to-blue-700 p-10 rounded-xl text-white relative overflow-hidden">
          <h2 className="text-2xl mb-4 font-bold relative z-10">
            {t("quiz.roadmap.callToAction.title")}
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto relative z-10">
            {t("quiz.roadmap.callToAction.subtitle")}
          </p>
          <button
            className="bg-white text-blue-700 text-lg font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-lg relative z-10"
            onClick={handleDownload}
          >
            {t("quiz.roadmap.callToAction.button")}
          </button>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-24 h-24 bg-white opacity-10 rounded-full transform -translate-y-1/2 -translate-x-12"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-y-1/3 translate-x-8"></div>
        </div>
      </div>
    </>
  );
};

export default QuizResults;
