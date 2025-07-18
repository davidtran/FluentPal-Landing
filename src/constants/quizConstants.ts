export interface IQuizOption {
  name: string;
  score: number;
}

// Languages supported
export const supportedLanguages = [
  {
    id: "spanish",
    label: "home.supported_languages.spanish",
    icon: "🇪🇸",
  },
  {
    id: "french",
    label: "home.supported_languages.french",
    icon: "🇫🇷",
  },
  {
    id: "german",
    label: "home.supported_languages.germany",
    icon: "🇩🇪",
  },
  {
    id: "italian",
    label: "Italian",
    icon: "🇮🇹",
  },
  {
    id: "japanese",
    label: "home.supported_languages.japanese",
    icon: "🇯🇵",
  },
  {
    id: "chinese",
    label: "home.supported_languages.chinese",
    icon: "🇨🇳",
  },
  {
    id: "korean",
    label: "home.supported_languages.korean",
    icon: "🇰🇷",
  },
];

// Learning duration options
export const learningDurations = [
  {
    id: "beginner",
    label: "quiz.duration.options.justStarted",
    icon: "🌱",
  },
  {
    id: "oneSixMonths",
    label: "quiz.duration.options.oneSixMonths",
    icon: "⏲️",
  },
  {
    id: "oneYear",
    label: "quiz.duration.options.oneYear",
    icon: "🕰️",
  },
  {
    id: "1-2years",
    label: "quiz.duration.options.twoYears",
    icon: "📅",
  },
  {
    id: "2-5years",
    label: "quiz.duration.options.twoFiveYears",
    icon: "📆",
  },
  {
    id: "5years+",
    label: "quiz.duration.options.moreThanFiveYears",
    icon: "🗓️",
  },
];

// Learning goals
export const learningGoals = [
  {
    id: "travel",
    label: "quiz.goal.options.travel",
    icon: "✈️",
  },
  {
    id: "work",
    label: "quiz.goal.options.work",
    icon: "💼",
  },
  {
    id: "study",
    label: "quiz.goal.options.study",
    icon: "📘",
  },
  {
    id: "culture",
    label: "quiz.goal.options.culture",
    icon: "🎭",
  },
  {
    id: "friends",
    label: "quiz.goal.options.friends",
    icon: "👪",
  },
  {
    id: "living",
    label: "quiz.goal.options.living",
    icon: "🏙️",
  },
  {
    id: "hobby",
    label: "quiz.goal.options.hobby",
    icon: "🎯",
  },
];

// Define the question type interface
export interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{ name: string; score: number }>;
  type: "single" | "multiple";
  maxSelections?: number;
  languageSpecific?: boolean;
  translationKey?: string;
}

// Speaking and conversation focused questions
export const speakingFocusedQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How often do you practice speaking your target language?",
    options: [
      { name: "quiz.speakingFrequency.options.daily", score: 5 },
      { name: "quiz.speakingFrequency.options.severalTimesWeek", score: 4 },
      { name: "quiz.speakingFrequency.options.onceWeek", score: 3 },
      { name: "quiz.speakingFrequency.options.fewTimesMonth", score: 2 },
      { name: "quiz.speakingFrequency.options.rarelyNever", score: 1 },
    ],
    type: "single",
    translationKey: "quiz.speakingFrequency",
  },
  {
    id: 2,
    question: "How do you feel when speaking with native speakers?",
    options: [
      { name: "quiz.speakingComfort.options.veryComfortable", score: 5 },
      { name: "quiz.speakingComfort.options.somewhatComfortable", score: 4 },
      { name: "quiz.speakingComfort.options.nervous", score: 3 },
      { name: "quiz.speakingComfort.options.veryNervous", score: 2 },
      { name: "quiz.speakingComfort.options.avoid", score: 1 },
    ],
    type: "single",
    translationKey: "quiz.speakingComfort",
  },
  {
    id: 3,
    question: "How well can you express your thoughts in your target language?",
    options: [
      { name: "quiz.expressionAbility.options.complexTopics", score: 5 },
      { name: "quiz.expressionAbility.options.mostIdeas", score: 4 },
      { name: "quiz.expressionAbility.options.basicNeeds", score: 3 },
      { name: "quiz.expressionAbility.options.somePhrasesStruggle", score: 2 },
      { name: "quiz.expressionAbility.options.fewWords", score: 1 },
    ],
    type: "single",
    translationKey: "quiz.expressionAbility",
  },
  {
    id: 4,
    question: "How well do you understand native speakers?",
    options: [
      {
        name: "quiz.listeningComprehension.options.almostEverything",
        score: 5,
      },
      {
        name: "quiz.listeningComprehension.options.mostConversations",
        score: 4,
      },
      {
        name: "quiz.listeningComprehension.options.mainPoints",
        score: 3,
      },
      {
        name: "quiz.listeningComprehension.options.basicPhrases",
        score: 2,
      },
      {
        name: "quiz.listeningComprehension.options.veryLittle",
        score: 1,
      },
    ],
    type: "single",
    translationKey: "quiz.listeningComprehension",
  },
  {
    id: 5,
    question: "What aspects of speaking do you find most challenging?",
    options: [
      { name: "quiz.speakingChallenges.options.pronunciation", score: 3 },
      {
        name: "quiz.speakingChallenges.options.grammar",
        score: 3,
      },
      {
        name: "quiz.speakingChallenges.options.vocabulary",
        score: 3,
      },
      {
        name: "quiz.speakingChallenges.options.fluency",
        score: 3,
      },
      {
        name: "quiz.speakingChallenges.options.confidence",
        score: 3,
      },
    ],
    type: "single",
    translationKey: "quiz.speakingChallenges",
  },
  {
    id: 6,
    question: "What methods do you use to practice speaking?",
    options: [
      {
        name: "quiz.speakingMethods.options.languagePartners",
        score: 5,
      },
      { name: "quiz.speakingMethods.options.friendsFamily", score: 4 },
      { name: "quiz.speakingMethods.options.languageApps", score: 4 },
      { name: "quiz.speakingMethods.options.selfPractice", score: 3 },
      { name: "quiz.speakingMethods.options.aiPartners", score: 3 },
      {
        name: "quiz.speakingMethods.options.noPractice",
        score: 1,
      },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.speakingMethods",
  },
  {
    id: 7,
    question: "How do you prepare for conversations in your target language?",
    options: [
      {
        name: "quiz.conversationPrep.options.rehearsePhrases",
        score: 4,
      },
      {
        name: "quiz.conversationPrep.options.prepareVocabulary",
        score: 5,
      },
      {
        name: "quiz.conversationPrep.options.practiceWithRecordings",
        score: 3,
      },
      {
        name: "quiz.conversationPrep.options.noPreparation",
        score: 2,
      },
      {
        name: "quiz.conversationPrep.options.avoidConversations",
        score: 1,
      },
    ],
    type: "single",
    translationKey: "quiz.conversationPrep",
  },
  {
    id: 8,
    question:
      "What do you do when you can't find the right word while speaking?",
    options: [
      {
        name: "quiz.wordFinding.options.useSimpler",
        score: 5,
      },
      {
        name: "quiz.wordFinding.options.useGestures",
        score: 4,
      },
      {
        name: "quiz.wordFinding.options.switchLanguage",
        score: 3,
      },
      { name: "quiz.wordFinding.options.lookUp", score: 2 },
      {
        name: "quiz.wordFinding.options.pauseConversation",
        score: 2,
      },
      {
        name: "quiz.wordFinding.options.giveUp",
        score: 1,
      },
    ],
    type: "single",
    translationKey: "quiz.wordFinding",
  },
  {
    id: 9,
    question: "What speaking situations cause you the most anxiety?",
    options: [
      { name: "quiz.speakingAnxiety.options.groups", score: 1 },
      {
        name: "quiz.speakingAnxiety.options.phoneCalls",
        score: 1,
      },
      {
        name: "quiz.speakingAnxiety.options.fastConversations",
        score: 1,
      },
      { name: "quiz.speakingAnxiety.options.formalSituations", score: 1 },
      {
        name: "quiz.speakingAnxiety.options.nativeSpeakers",
        score: 1,
      },
      {
        name: "quiz.speakingAnxiety.options.noAnxiety",
        score: 5,
      },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.speakingAnxiety",
  },
  {
    id: 10,
    question: "How do you feel about your accent when speaking?",
    options: [
      { name: "quiz.accentConfidence.options.veryConfident", score: 5 },
      { name: "quiz.accentConfidence.options.somewhatConfident", score: 4 },
      { name: "quiz.accentConfidence.options.neutral", score: 3 },
      { name: "quiz.accentConfidence.options.selfConscious", score: 2 },
      { name: "quiz.accentConfidence.options.veryEmbarrassed", score: 1 },
    ],
    type: "single",
    translationKey: "quiz.accentConfidence",
  },
  {
    id: 11,
    question: "What tools have you used to improve your speaking skills?",
    options: [
      { name: "quiz.speakingTools.options.tutors", score: 5 },
      { name: "quiz.speakingTools.options.speechRecognition", score: 4 },
      { name: "quiz.speakingTools.options.aiConversation", score: 4 },
      { name: "quiz.speakingTools.options.pronunciationApps", score: 3 },
      { name: "quiz.speakingTools.options.selfRecording", score: 3 },
      { name: "quiz.speakingTools.options.none", score: 1 },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.speakingTools",
  },
  {
    id: 12,
    question: "What motivates you to improve your speaking skills?",
    options: [
      { name: "quiz.speakingMotivation.options.career", score: 4 },
      { name: "quiz.speakingMotivation.options.travel", score: 4 },
      {
        name: "quiz.speakingMotivation.options.relationships",
        score: 5,
      },
      { name: "quiz.speakingMotivation.options.cultural", score: 4 },
      { name: "quiz.speakingMotivation.options.personal", score: 3 },
      { name: "quiz.speakingMotivation.options.academic", score: 3 },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.speakingMotivation",
  },
  {
    id: 13,
    question: "How do you handle making mistakes when speaking?",
    options: [
      { name: "quiz.mistakeHandling.options.welcomeCorrections", score: 3 },
      { name: "quiz.mistakeHandling.options.embarrassed", score: 3 },
      { name: "quiz.mistakeHandling.options.apologize", score: 3 },
      { name: "quiz.mistakeHandling.options.discouraged", score: 3 },
      { name: "quiz.mistakeHandling.options.rarelyNotice", score: 3 },
    ],
    type: "single",
    translationKey: "quiz.mistakeHandling",
  },
  {
    id: 14,
    question: "What aspects of conversation do you find most difficult?",
    options: [
      { name: "quiz.conversationDifficulties.options.starting", score: 3 },
      { name: "quiz.conversationDifficulties.options.keeping", score: 3 },
      { name: "quiz.conversationDifficulties.options.slangIdioms", score: 3 },
      { name: "quiz.conversationDifficulties.options.naturalPace", score: 3 },
      {
        name: "quiz.conversationDifficulties.options.complexThoughts",
        score: 3,
      },
      { name: "quiz.conversationDifficulties.options.accents", score: 3 },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.conversationDifficulties",
  },
  {
    id: 15,
    question: "What's your goal for speaking fluency?",
    options: [
      { name: "quiz.fluencyGoal.options.basicTravel", score: 1 },
      { name: "quiz.fluencyGoal.options.casualSocial", score: 2 },
      { name: "quiz.fluencyGoal.options.professional", score: 3 },
      { name: "quiz.fluencyGoal.options.academic", score: 3 },
      { name: "quiz.fluencyGoal.options.nativeLike", score: 3 },
    ],
    type: "single",
    translationKey: "quiz.fluencyGoal",
  },
  {
    id: 16,
    question: "How often do you receive feedback on your speaking?",
    options: [
      { name: "quiz.feedbackFrequency.options.regularly", score: 5 },
      { name: "quiz.feedbackFrequency.options.sometimes", score: 4 },
      { name: "quiz.feedbackFrequency.options.rarely", score: 3 },
      { name: "quiz.feedbackFrequency.options.never", score: 2 },
      { name: "quiz.feedbackFrequency.options.avoid", score: 1 },
    ],
    type: "single",
    translationKey: "quiz.feedbackFrequency",
  },
  {
    id: 17,
    question: "What would help you most to improve your speaking skills?",
    options: [
      { name: "quiz.improvementHelp.options.regularPractice", score: 5 },
      { name: "quiz.improvementHelp.options.structuredExercises", score: 4 },
      { name: "quiz.improvementHelp.options.pronunciationTraining", score: 4 },
      { name: "quiz.improvementHelp.options.expandedVocabulary", score: 3 },
      { name: "quiz.improvementHelp.options.confidenceBuilding", score: 3 },
      { name: "quiz.improvementHelp.options.specificFeedback", score: 4 },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.improvementHelp",
  },
  {
    id: 18,
    question: "What prevents you from practicing speaking more often?",
    options: [
      { name: "quiz.practiceBarriers.options.noPartners", score: 3 },
      { name: "quiz.practiceBarriers.options.noTime", score: 3 },
      { name: "quiz.practiceBarriers.options.anxiety", score: 2 },
      { name: "quiz.practiceBarriers.options.noTopics", score: 2 },
      { name: "quiz.practiceBarriers.options.cost", score: 3 },
      { name: "quiz.practiceBarriers.options.noMotivation", score: 1 },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.practiceBarriers",
  },
  {
    id: 19,
    question: "How do you measure improvement in your speaking skills?",
    options: [
      { name: "quiz.improvementMeasure.options.feedback", score: 5 },
      { name: "quiz.improvementMeasure.options.betterUnderstood", score: 4 },
      { name: "quiz.improvementMeasure.options.lessHesitation", score: 4 },
      {
        name: "quiz.improvementMeasure.options.complexConversations",
        score: 5,
      },
      { name: "quiz.improvementMeasure.options.formalAssessments", score: 3 },
      { name: "quiz.improvementMeasure.options.dontTrack", score: 1 },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.improvementMeasure",
  },
  {
    id: 20,
    question: "What speaking situations do you want to be prepared for?",
    options: [
      { name: "quiz.speakingSituations.options.everyday", score: 3 },
      { name: "quiz.speakingSituations.options.social", score: 4 },
      { name: "quiz.speakingSituations.options.professional", score: 5 },
      { name: "quiz.speakingSituations.options.academic", score: 5 },
      { name: "quiz.speakingSituations.options.emergency", score: 3 },
      { name: "quiz.speakingSituations.options.dating", score: 4 },
    ],
    type: "multiple",
    maxSelections: 3,
    translationKey: "quiz.speakingSituations",
  },
];
