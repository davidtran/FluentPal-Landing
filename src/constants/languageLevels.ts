// Language-specific proficiency levels

// Default/Generic proficiency levels
export const defaultProficiencyLevels = [
  {
    id: "a1",
    label: "A1 (Beginner)",
    icon: "🔤",
    description:
      "Can understand and use familiar everyday expressions and very basic phrases.",
  },
  {
    id: "a2",
    label: "A2 (Elementary)",
    icon: "📝",
    description:
      "Can communicate in simple and routine tasks on familiar topics.",
  },
  {
    id: "b1",
    label: "B1 (Intermediate)",
    icon: "💬",
    description:
      "Can deal with most situations likely to arise while traveling.",
  },
  {
    id: "b2",
    label: "B2 (Upper Intermediate)",
    icon: "🗣️",
    description: "Can interact with a degree of fluency with native speakers.",
  },
  {
    id: "c1",
    label: "C1 (Advanced)",
    icon: "📚",
    description:
      "Can express ideas fluently and spontaneously without much searching for expressions.",
  },
  {
    id: "c2",
    label: "C2 (Proficient)",
    icon: "🎓",
    description: "Can understand with ease virtually everything heard or read.",
  },
  {
    id: "native",
    label: "Native/Bilingual",
    icon: "🌟",
    description: "Native-like proficiency in the language.",
  },
];

// Spanish proficiency levels
export const spanishProficiencyLevels = [
  {
    id: "a1",
    label: "A1 (Principiante)",
    icon: "🔤",
    description: "Puede entender y usar expresiones cotidianas básicas.",
  },
  {
    id: "a2",
    label: "A2 (Elemental)",
    icon: "📝",
    description:
      "Puede comunicarse en tareas sencillas sobre temas familiares.",
  },
  {
    id: "b1",
    label: "B1 (Intermedio)",
    icon: "💬",
    description:
      "Puede desenvolverse en la mayoría de situaciones durante un viaje.",
  },
  {
    id: "b2",
    label: "B2 (Intermedio Alto)",
    icon: "🗣️",
    description: "Puede interactuar con cierta fluidez con hablantes nativos.",
  },
  {
    id: "c1",
    label: "C1 (Avanzado)",
    icon: "📚",
    description:
      "Puede expresarse con fluidez sin buscar mucho las expresiones.",
  },
  {
    id: "c2",
    label: "C2 (Dominio)",
    icon: "🎓",
    description:
      "Puede comprender con facilidad prácticamente todo lo que oye o lee.",
  },
  {
    id: "native",
    label: "Nativo/Bilingüe",
    icon: "🌟",
    description: "Dominio nativo del idioma.",
  },
];

// French proficiency levels
export const frenchProficiencyLevels = [
  {
    id: "a1",
    label: "A1 (Débutant)",
    icon: "🔤",
    description:
      "Peut comprendre et utiliser des expressions familières et quotidiennes.",
  },
  {
    id: "a2",
    label: "A2 (Élémentaire)",
    icon: "📝",
    description:
      "Peut communiquer lors de tâches simples sur des sujets familiers.",
  },
  {
    id: "b1",
    label: "B1 (Intermédiaire)",
    icon: "💬",
    description:
      "Peut faire face à la plupart des situations rencontrées en voyage.",
  },
  {
    id: "b2",
    label: "B2 (Intermédiaire Avancé)",
    icon: "🗣️",
    description: "Peut interagir avec aisance avec des locuteurs natifs.",
  },
  {
    id: "c1",
    label: "C1 (Avancé)",
    icon: "📚",
    description:
      "Peut s'exprimer spontanément et couramment sans chercher ses mots.",
  },
  {
    id: "c2",
    label: "C2 (Maîtrise)",
    icon: "🎓",
    description:
      "Peut comprendre sans effort pratiquement tout ce qu'il/elle lit ou entend.",
  },
  {
    id: "native",
    label: "Natif/Bilingue",
    icon: "🌟",
    description: "Maîtrise native de la langue.",
  },
];

// German proficiency levels
export const germanProficiencyLevels = [
  {
    id: "a1",
    label: "A1 (Anfänger)",
    icon: "🔤",
    description:
      "Kann vertraute, alltägliche Ausdrücke und ganz einfache Sätze verstehen und verwenden.",
  },
  {
    id: "a2",
    label: "A2 (Grundlegende Kenntnisse)",
    icon: "📝",
    description:
      "Kann sich in einfachen, routinemäßigen Situationen verständigen.",
  },
  {
    id: "b1",
    label: "B1 (Mittelstufe)",
    icon: "💬",
    description:
      "Kann die meisten Situationen bewältigen, denen man auf Reisen begegnet.",
  },
  {
    id: "b2",
    label: "B2 (Fortgeschrittene Kenntnisse)",
    icon: "🗣️",
    description:
      "Kann sich mit einem gewissen Grad an Flüssigkeit mit Muttersprachlern unterhalten.",
  },
  {
    id: "c1",
    label: "C1 (Fortgeschritten)",
    icon: "📚",
    description:
      "Kann sich fließend und spontan ausdrücken, ohne öfter nach Worten suchen zu müssen.",
  },
  {
    id: "c2",
    label: "C2 (Annähernd muttersprachliche Kenntnisse)",
    icon: "🎓",
    description:
      "Kann praktisch alles, was er/sie liest oder hört, mühelos verstehen.",
  },
  {
    id: "native",
    label: "Muttersprachler/Zweisprachig",
    icon: "🌟",
    description: "Muttersprachliche Beherrschung der Sprache.",
  },
];

// Map language IDs to their respective proficiency levels
export const proficiencyLevelsByLanguage = {
  spanish: spanishProficiencyLevels,
  french: frenchProficiencyLevels,
  german: germanProficiencyLevels,
  // For other languages, use the default proficiency levels
  italian: defaultProficiencyLevels,
  portuguese: defaultProficiencyLevels,
  japanese: defaultProficiencyLevels,
  chinese: defaultProficiencyLevels,
  korean: defaultProficiencyLevels,
  russian: defaultProficiencyLevels,
  arabic: defaultProficiencyLevels,
};

// Helper function to get proficiency levels for a specific language
export const getProficiencyLevelsForLanguage = (languageId: string) => {
  return (
    proficiencyLevelsByLanguage[
      languageId as keyof typeof proficiencyLevelsByLanguage
    ] || defaultProficiencyLevels
  );
};
