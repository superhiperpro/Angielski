export interface WordItem {
  id: string;
  en: string;
  pl: string;
  category: 'family' | 'countries' | 'grammar' | 'phrases';
  tag?: string;
  pronunciation?: string;
  tip?: string;
  gender?: 'he' | 'she' | 'both';
  informalPair?: { formal: string; informal: string };
  flag?: string;
  exampleEn?: string;
  examplePl?: string;
}

export const VOCABULARY_LIST: WordItem[] = [
  // Rodzina - Podstawowe & Oficjalne / Potoczne
  { id: 'f1', en: 'mother', pl: 'matka (oficjalnie)', category: 'family', gender: 'she', tag: 'Rodzina', tip: 'Formalne słowo na mamę', informalPair: { formal: 'mother', informal: 'mum' }, exampleEn: 'Julia is my mother.', examplePl: 'Julia jest moją matką.' },
  { id: 'f2', en: 'mum', pl: 'mama (potocznie)', category: 'family', gender: 'she', tag: 'Rodzina', informalPair: { formal: 'mother', informal: 'mum' }, exampleEn: 'Here is my mum!', examplePl: 'Oto moja mama!' },
  { id: 'f3', en: 'father', pl: 'ojciec (oficjalnie)', category: 'family', gender: 'he', tag: 'Rodzina', tip: 'Formalne słowo na tatę', informalPair: { formal: 'father', informal: 'dad' }, exampleEn: 'Paul is Mark’s father.', examplePl: 'Paul jest ojcem Marka.' },
  { id: 'f4', en: 'dad', pl: 'tata (potocznie)', category: 'family', gender: 'he', tag: 'Rodzina', informalPair: { formal: 'father', informal: 'dad' }, exampleEn: 'Dad is in the kitchen.', examplePl: 'Tata jest w kuchni.' },
  { id: 'f5', en: 'parents', pl: 'rodzice (mama i tata)', category: 'family', gender: 'both', tag: 'Rodzina', exampleEn: 'My parents aren’t superheroes.', examplePl: 'Moi rodzice nie są superbohaterami.' },
  { id: 'f6', en: 'grandfather', pl: 'dziadek (oficjalnie)', category: 'family', gender: 'he', tag: 'Rodzina', informalPair: { formal: 'grandfather', informal: 'grandad' }, exampleEn: 'John is Mark’s grandfather.', examplePl: 'John jest dziadkiem Marka.' },
  { id: 'f7', en: 'grandad', pl: 'dziadek (potocznie)', category: 'family', gender: 'he', tag: 'Rodzina', informalPair: { formal: 'grandfather', informal: 'grandad' }, exampleEn: 'Grandad Umberto is Italian.', examplePl: 'Dziadek Umberto jest Włochem.' },
  { id: 'f8', en: 'grandmother', pl: 'babcia (oficjalnie)', category: 'family', gender: 'she', tag: 'Rodzina', informalPair: { formal: 'grandmother', informal: 'granny' }, exampleEn: 'Agatha is Mark’s grandmother.', examplePl: 'Agatha jest babcią Marka.' },
  { id: 'f9', en: 'granny', pl: 'babcia (potocznie)', category: 'family', gender: 'she', tag: 'Rodzina', informalPair: { formal: 'grandmother', informal: 'granny' }, exampleEn: 'It’s Granny’s birthday!', examplePl: 'To są urodziny babci!' },
  { id: 'f10', en: 'brother', pl: 'brat', category: 'family', gender: 'he', tag: 'Rodzina', exampleEn: 'David is Mark’s brother.', examplePl: 'David jest bratem Marka.' },
  { id: 'f11', en: 'sister', pl: 'siostra', category: 'family', gender: 'she', tag: 'Rodzina', exampleEn: 'Lucy is Mark’s sister.', examplePl: 'Lucy jest siostrą Marka.' },
  { id: 'f12', en: 'son', pl: 'syn', category: 'family', gender: 'he', tag: 'Rodzina', exampleEn: 'David is Paul’s son.', examplePl: 'David jest synem Paula.' },
  { id: 'f13', en: 'daughter', pl: 'córka', category: 'family', gender: 'she', tag: 'Rodzina', tip: 'Uwaga na pisownię: d-a-u-g-h-t-e-r!', exampleEn: 'Anna is Julia’s daughter.', examplePl: 'Anna jest córką Julii.' },
  { id: 'f14', en: 'aunt', pl: 'ciocia', category: 'family', gender: 'she', tag: 'Rodzina', exampleEn: 'Julia is Mark’s aunt.', examplePl: 'Julia jest ciocią Marka.' },
  { id: 'f15', en: 'uncle', pl: 'wujek', category: 'family', gender: 'he', tag: 'Rodzina', exampleEn: 'Peter is Mark’s uncle.', examplePl: 'Peter jest wujkiem Marka.' },
  { id: 'f16', en: 'cousin', pl: 'kuzyn / kuzynka', category: 'family', gender: 'both', tag: 'Rodzina', tip: 'To samo słowo dla chłopca i dziewczynki!', exampleEn: 'Tom is Mark’s cousin.', examplePl: 'Tom jest kuzynem Marka.' },

  // Kraje i Narodowości (strona 6 podręcznika)
  { id: 'c1', en: 'the UK', pl: 'Wielka Brytania (kraj)', category: 'countries', flag: '🇬🇧', tag: 'Kraj', tip: 'Zawsze z przedimkiem "the"!', exampleEn: 'I am from the UK.', examplePl: 'Jestem z Wielkiej Brytanii.' },
  { id: 'c2', en: 'British', pl: 'brytyjski / Brytyjczyk', category: 'countries', flag: '🇬🇧', tag: 'Narodowość', tip: 'Piszemy wielką literą!', exampleEn: 'Dad is British.', examplePl: 'Tata jest Brytyjczykiem.' },
  { id: 'c3', en: 'Spain', pl: 'Hiszpania (kraj)', category: 'countries', flag: '🇪🇸', tag: 'Kraj', exampleEn: 'Jason is in Spain.', examplePl: 'Jason jest w Hiszpanii.' },
  { id: 'c4', en: 'Spanish', pl: 'hiszpański / Hiszpan', category: 'countries', flag: '🇪🇸', tag: 'Narodowość', tip: 'Piszemy wielką literą!', exampleEn: 'Uncle Roberto is Spanish.', examplePl: 'Wujek Roberto jest Hiszpanem.' },
  { id: 'c5', en: 'Poland', pl: 'Polska (kraj)', category: 'countries', flag: '🇵🇱', tag: 'Kraj', exampleEn: 'We live in Poland.', examplePl: 'Mieszkamy w Polsce.' },
  { id: 'c6', en: 'Polish', pl: 'polski / Polak', category: 'countries', flag: '🇵🇱', tag: 'Narodowość', tip: 'Piszemy wielką literą!', exampleEn: 'Mum is Polish.', examplePl: 'Mama jest Polką.' },
  { id: 'c7', en: 'the USA', pl: 'Stany Zjednoczone (USA)', category: 'countries', flag: '🇺🇸', tag: 'Kraj', tip: 'Zawsze z "the"!', exampleEn: 'They are from the USA.', examplePl: 'Oni są z USA.' },
  { id: 'c8', en: 'American', pl: 'amerykański / Amerykanin', category: 'countries', flag: '🇺🇸', tag: 'Narodowość', tip: 'Piszemy wielką literą!', exampleEn: 'Granny Flossie isn’t American.', examplePl: 'Babcia Flossie nie jest Amerykanką.' },
  { id: 'c9', en: 'Italy', pl: 'Włochy (kraj)', category: 'countries', flag: '🇮🇹', tag: 'Kraj', exampleEn: 'I’m not from Italy.', examplePl: 'Nie jestem z Włoch.' },
  { id: 'c10', en: 'Italian', pl: 'włoski / Włoch', category: 'countries', flag: '🇮🇹', tag: 'Narodowość', tip: 'Piszemy wielką literą!', exampleEn: 'Grandad Umberto is Italian.', examplePl: 'Dziadek Umberto jest Włochem.' },
  { id: 'c11', en: 'France', pl: 'Francja (kraj)', category: 'countries', flag: '🇫🇷', tag: 'Kraj', exampleEn: 'Paris is in France.', examplePl: 'Paryż jest we Francji.' },
  { id: 'c12', en: 'French', pl: 'francuski / Francuz', category: 'countries', flag: '🇫🇷', tag: 'Narodowość', tip: 'Piszemy wielką literą!', exampleEn: 'Dug is not French.', examplePl: 'Dug nie jest Francuzem.' },
  { id: 'c13', en: 'China', pl: 'Chiny (kraj)', category: 'countries', flag: '🇨🇳', tag: 'Kraj', exampleEn: 'Beijing is in China.', examplePl: 'Pekin jest w Chinach.' },
  { id: 'c14', en: 'Chinese', pl: 'chiński / Chińczyk', category: 'countries', flag: '🇨🇳', tag: 'Narodowość', tip: 'Piszemy wielką literą!', exampleEn: 'Cousin Chen is Chinese.', examplePl: 'Kuzyn Chen jest Chińczykiem.' },

  // Przydatne zwroty "Out of Class" (strona 2 i 3)
  { id: 'p1', en: 'Hold this, please!', pl: 'Potrzymaj to, proszę!', category: 'phrases', tag: 'Zwrot z lekcji', exampleEn: 'Alex! Hold this, please!', examplePl: 'Alex! Potrzymaj to, proszę!' },
  { id: 'p2', en: 'Be careful!', pl: 'Uważaj! / Bądź ostrożny!', category: 'phrases', tag: 'Zwrot z lekcji', exampleEn: 'Be careful! It’s Granny’s birthday cake.', examplePl: 'Uważaj! To tort urodzinowy babci.' },
  { id: 'p3', en: 'I’ve got it!', pl: 'Mam to! / Trzymam to! / Daję radę!', category: 'phrases', tag: 'Zwrot z lekcji', exampleEn: 'It’s OK. I’ve got it!', examplePl: 'Wszystko gra. Trzymam to!' },
  { id: 'p4', en: 'Happy birthday!', pl: 'Wszystkiego najlepszego z okazji urodzin!', category: 'phrases', tag: 'Zwrot z lekcji', exampleEn: 'Happy birthday, Mum!', examplePl: 'Wszystkiego najlepszego z okazji urodzin, mamo!' },
  { id: 'p5', en: 'Here’s your present.', pl: 'Oto twój prezent.', category: 'phrases', tag: 'Zwrot z lekcji', exampleEn: 'Here’s your present, Granny!', examplePl: 'Oto twój prezent, babciu!' },
];

export interface GrammarRule {
  id: string;
  title: string;
  ruleExplanation: string;
  tableData: { subject: string; affirmativeLong: string; affirmativeShort: string; negativeLong: string; negativeShort: string; translation: string }[];
  possessives?: { pronoun: string; possessive: string; example: string; tip: string }[];
}

export const TO_BE_RULES: GrammarRule = {
  id: 'to_be',
  title: 'Czasownik "TO BE" (być): Twierdzenia i Przeczenia',
  ruleExplanation: 'Czasownik "być" ma w teraźniejszości tylko 3 formy: AM, ARE, IS. W mowie i na kartkówkach najczęściej stosuje się formy skrócone z apostrofem (\').',
  tableData: [
    { subject: 'I (ja)', affirmativeLong: 'I am', affirmativeShort: "I'm", negativeLong: 'I am not', negativeShort: "I'm not", translation: 'jestem / nie jestem' },
    { subject: 'You (ty)', affirmativeLong: 'You are', affirmativeShort: "You're", negativeLong: 'You are not', negativeShort: "You aren't", translation: 'jesteś / nie jesteś' },
    { subject: 'He (on)', affirmativeLong: 'He is', affirmativeShort: "He's", negativeLong: 'He is not', negativeShort: "He isn't", translation: 'on jest / nie jest' },
    { subject: 'She (ona)', affirmativeLong: 'She is', affirmativeShort: "She's", negativeLong: 'She is not', negativeShort: "She isn't", translation: 'ona jest / nie jest' },
    { subject: 'It (ono/to)', affirmativeLong: 'It is', affirmativeShort: "It's", negativeLong: 'It is not', negativeShort: "It isn't", translation: 'to jest / nie jest' },
    { subject: 'We (my)', affirmativeLong: 'We are', affirmativeShort: "We're", negativeLong: 'We are not', negativeShort: "We aren't", translation: 'jesteśmy / nie jesteśmy' },
    { subject: 'You (wy)', affirmativeLong: 'You are', affirmativeShort: "You're", negativeLong: 'You are not', negativeShort: "You aren't", translation: 'jesteście / nie jesteście' },
    { subject: 'They (oni/one)', affirmativeLong: 'They are', affirmativeShort: "They're", negativeLong: 'They are not', negativeShort: "They aren't", translation: 'oni są / nie są' },
  ],
  possessives: [
    { pronoun: 'I', possessive: 'my', example: "It's my birthday. I'm ten!", tip: 'my = mój / moja / moje' },
    { pronoun: 'you', possessive: 'your', example: "It's your birthday. You're eleven!", tip: 'your = twój / twoja / wasz' },
    { pronoun: 'he', possessive: 'his', example: "Jason is in Spain with his class.", tip: 'HIS = JEGO (dla chłopca!)' },
    { pronoun: 'she', possessive: 'her', example: "It's Sophie's birthday. We are at her house.", tip: 'HER = JEJ (dla dziewczyny!)' },
  ]
};

// Struktura drzewa rodziny Marka z podręcznika (strony 1, 5)
export interface FamilyTreeNode {
  id: string;
  name: string;
  role: string;
  rolePl: string;
  relationToMark: string;
  generation: 1 | 2 | 3; // 1 = Dziadkowie, 2 = Rodzice/Wujkowie, 3 = Dzieci
  parents?: string[];
  spouse?: string;
  gender: 'M' | 'F';
  avatarEmoji: string;
}

export const MARKS_FAMILY_TREE: FamilyTreeNode[] = [
  // Pokolenie 1 (Dziadkowie)
  { id: 'john', name: 'John', role: "Mark's grandfather", rolePl: 'Dziadek Marka', relationToMark: 'grandfather (grandad)', generation: 1, gender: 'M', avatarEmoji: '👴' },
  { id: 'agatha', name: 'Agatha', role: "Mark's grandmother", rolePl: 'Babcia Marka', relationToMark: 'grandmother (granny)', generation: 1, gender: 'F', avatarEmoji: '👵' },

  // Pokolenie 2 (Rodzice i Wujostwo)
  { id: 'peter', name: 'Peter', role: "Mark's uncle", rolePl: 'Wujek Marka (mąż Julii)', relationToMark: 'uncle', generation: 2, spouse: 'julia', gender: 'M', avatarEmoji: '👨🏿' },
  { id: 'julia', name: 'Julia', role: "Mark's aunt", rolePl: 'Ciocia Marka (siostra Paula)', relationToMark: 'aunt', generation: 2, spouse: 'peter', gender: 'F', avatarEmoji: '👩' },
  { id: 'paul', name: 'Paul', role: "Mark's father", rolePl: 'Ojciec / Tata Marka', relationToMark: 'father (dad)', generation: 2, spouse: 'rose', gender: 'M', avatarEmoji: '👨' },
  { id: 'rose', name: 'Rose', role: "Mark's mother", rolePl: 'Matka / Mama Marka', relationToMark: 'mother (mum)', generation: 2, spouse: 'paul', gender: 'F', avatarEmoji: '👩🏻' },

  // Pokolenie 3 (Kuzyni i rodzeństwo)
  { id: 'tom', name: 'Tom', role: "Mark's cousin", rolePl: 'Kuzyn Marka (syn Petera i Julii)', relationToMark: 'cousin', generation: 3, parents: ['peter', 'julia'], gender: 'M', avatarEmoji: '👦🏿' },
  { id: 'anna', name: 'Anna', role: "Mark's cousin", rolePl: 'Kuzynka Marka (córka Petera i Julii)', relationToMark: 'cousin', generation: 3, parents: ['peter', 'julia'], gender: 'F', avatarEmoji: '👧' },
  { id: 'mark', name: 'Mark', role: 'Mark (główny bohater)', rolePl: 'Mark (10 lat)', relationToMark: 'me', generation: 3, parents: ['paul', 'rose'], gender: 'M', avatarEmoji: '🧒' },
  { id: 'david', name: 'David', role: "Mark's brother", rolePl: 'Brat Marka', relationToMark: 'brother', generation: 3, parents: ['paul', 'rose'], gender: 'M', avatarEmoji: '👦' },
  { id: 'lucy', name: 'Lucy', role: "Mark's sister", rolePl: 'Siostra Marka', relationToMark: 'sister', generation: 3, parents: ['paul', 'rose'], gender: 'F', avatarEmoji: '👧🏻' },
];

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: 'family' | 'countries' | 'to_be' | 'possessive' | 'phrases' | 'tree';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Czasownik TO BE - twierdzenia i formy skrócone
  {
    id: 'q1',
    prompt: 'Wybierz poprawną formę: You ___ ready.',
    options: ['are', 'is', 'am', 'be'],
    correctAnswer: 'are',
    explanation: 'Z zaimkiem "you" zawsze łączymy formę "are" (You are ready / You\'re ready).',
    category: 'to_be',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    prompt: 'Wybierz poprawną formę: I ___ very happy!',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 'am',
    explanation: 'Dla "I" (ja) poprawna forma to "am" (I am / I\'m).',
    category: 'to_be',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    prompt: 'Uzupełnij: Jason ___ Jen\'s cousin.',
    options: ['is', 'are', 'am', 'isn\'t not'],
    correctAnswer: 'is',
    explanation: 'Jason to "he" (on) - dla trzeciej osoby liczby pojedynczej używamy "is".',
    category: 'to_be',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    prompt: 'Jen and Alex ___ at their Granny\'s house.',
    options: ['are', 'is', 'am', 'be'],
    correctAnswer: 'are',
    explanation: 'Jen and Alex to dwie osoby, czyli "they" (oni) -> They are!',
    category: 'to_be',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    prompt: 'Jak brzmi skrócona forma zdania: "They are at her house"?',
    options: ["They're at her house.", "Theyr at her house.", "They is at her house.", "They's at her house."],
    correctAnswer: "They're at her house.",
    explanation: 'They + are skraca się do "They\'re".',
    category: 'to_be',
    difficulty: 'medium'
  },
  {
    id: 'q6',
    prompt: 'Jak skrócić zdanie: "We are ten"?',
    options: ["We're ten.", "We's ten.", "We are'nt ten.", "Were ten."],
    correctAnswer: "We're ten.",
    explanation: 'We + are skraca się do "We\'re".',
    category: 'to_be',
    difficulty: 'easy'
  },

  // Czasownik TO BE - przeczenia (negatives)
  {
    id: 'q7',
    prompt: 'Utwórz przeczenie skrócone: Dug is French -> Dug ___ French.',
    options: ["isn't", "aren't", "'m not", "not is"],
    correctAnswer: "isn't",
    explanation: 'Dug to pies/on ("he"/"it"), więc is not -> isn\'t.',
    category: 'to_be',
    difficulty: 'medium'
  },
  {
    id: 'q8',
    prompt: 'Utwórz przeczenie skrócone: You are in the photo -> You ___ in the photo.',
    options: ["aren't", "isn't", "'m not", "are not no"],
    correctAnswer: "aren't",
    explanation: 'You + are not w formie skróconej to "You aren\'t".',
    category: 'to_be',
    difficulty: 'medium'
  },
  {
    id: 'q9',
    prompt: 'Wybierz poprawne przeczenie: I ___ hungry.',
    options: ["'m not", "aren't", "isn't", "am'nt"],
    correctAnswer: "'m not",
    explanation: 'Pamiętaj: "am not" skracamy ZAWSZE do "I\'m not" (nie ma słowa "am\'nt"!).',
    category: 'to_be',
    difficulty: 'medium'
  },
  {
    id: 'q10',
    prompt: 'Dug\'s parents ___ superheroes.',
    options: ["aren't", "isn't", "'m not", "is not"],
    correctAnswer: "aren't",
    explanation: 'Dug\'s parents to liczba mnoga (rodzice = they), więc are not -> aren\'t.',
    category: 'to_be',
    difficulty: 'hard'
  },

  // Zaimki dzierżawcze (his, her, my, your)
  {
    id: 'q11',
    prompt: 'Jason is in Spain with ___ class. (Jason to chłopak)',
    options: ['his', 'her', 'your', 'my'],
    correctAnswer: 'his',
    explanation: 'Dla chłopca (he) używamy "his" (jego). Jason is with HIS class.',
    category: 'possessive',
    difficulty: 'medium'
  },
  {
    id: 'q12',
    prompt: 'It\'s Sophie\'s birthday. We are at ___ house. (Sophie to kobieta)',
    options: ['her', 'his', 'my', 'your'],
    correctAnswer: 'her',
    explanation: 'Dla dziewczynki/kobiety (she) używamy "her" (jej). Sophie -> her house.',
    category: 'possessive',
    difficulty: 'medium'
  },
  {
    id: 'q13',
    prompt: 'Alex do babci: "Granny, here\'s ___ birthday card!"',
    options: ['your', 'her', 'his', 'my'],
    correctAnswer: 'your',
    explanation: 'Alex zwraca się bezpośrednio do babci: "Oto TWOJA kartka!" -> your.',
    category: 'possessive',
    difficulty: 'medium'
  },
  {
    id: 'q14',
    prompt: 'I\'m ten today! It\'s ___ birthday!',
    options: ['my', 'your', 'his', 'her'],
    correctAnswer: 'my',
    explanation: 'Skoro "I\'m ten" (ja mam 10 lat), to są moje urodziny -> my birthday.',
    category: 'possessive',
    difficulty: 'easy'
  },

  // Kraje i Narodowości
  {
    id: 'q15',
    prompt: 'Wybierz poprawną parę: Poland -> ___',
    options: ['Polish', 'Polisher', 'Polan', 'Polite'],
    correctAnswer: 'Polish',
    explanation: 'Polska to Poland, a narodowość (Polak/polski) to Polish.',
    category: 'countries',
    difficulty: 'easy'
  },
  {
    id: 'q16',
    prompt: 'Wybierz poprawną parę: the UK -> ___',
    options: ['British', 'Englishman', 'UK-ish', 'Britisher'],
    correctAnswer: 'British',
    explanation: 'the UK (Wielka Brytania) -> British (brytyjski / Brytyjczyk).',
    category: 'countries',
    difficulty: 'easy'
  },
  {
    id: 'q17',
    prompt: 'Wybierz narodowość dla kraju: Spain -> ___',
    options: ['Spanish', 'Spainish', 'Spaniard', 'Spanic'],
    correctAnswer: 'Spanish',
    explanation: 'Spain -> Spanish. Pamiętaj o wielkiej literze!',
    category: 'countries',
    difficulty: 'easy'
  },
  {
    id: 'q18',
    prompt: 'Wybierz narodowość: Italy -> ___',
    options: ['Italian', 'Italic', 'Italish', 'Italyan'],
    correctAnswer: 'Italian',
    explanation: 'Italy -> Italian.',
    category: 'countries',
    difficulty: 'easy'
  },
  {
    id: 'q19',
    prompt: 'Wybierz narodowość: France -> ___',
    options: ['French', 'Francish', 'Francean', 'Frencher'],
    correctAnswer: 'French',
    explanation: 'France -> French.',
    category: 'countries',
    difficulty: 'easy'
  },
  {
    id: 'q20',
    prompt: 'Wybierz narodowość: China -> ___',
    options: ['Chinese', 'Chinian', 'Chinish', 'Chino'],
    correctAnswer: 'Chinese',
    explanation: 'China -> Chinese.',
    category: 'countries',
    difficulty: 'easy'
  },
  {
    id: 'q21',
    prompt: 'Grandad Umberto isn\'t from China. He is from Italy, so he is ___.',
    options: ['Italian', 'British', 'French', 'American'],
    correctAnswer: 'Italian',
    explanation: 'Skoro jest z Włoch (Italy), to jest Włochem -> Italian!',
    category: 'countries',
    difficulty: 'medium'
  },

  // Słownictwo: Rodzina & Drzewo z podręcznika
  {
    id: 'q22',
    prompt: 'Jak powiesz "córka" po angielsku?',
    options: ['daughter', 'sister', 'aunt', 'cousin'],
    correctAnswer: 'daughter',
    explanation: 'córka = daughter (czytamy: /dooter/).',
    category: 'family',
    difficulty: 'easy'
  },
  {
    id: 'q23',
    prompt: 'Dopasuj parę formalne - potoczne: grandmother -> ___',
    options: ['granny', 'mum', 'dad', 'grandad'],
    correctAnswer: 'granny',
    explanation: 'grandmother (babcia oficjalnie) -> granny (babcia pieszczotliwie).',
    category: 'family',
    difficulty: 'easy'
  },
  {
    id: 'q24',
    prompt: 'Dopasuj parę formalne - potoczne: father -> ___',
    options: ['dad', 'grandad', 'uncle', 'mum'],
    correctAnswer: 'dad',
    explanation: 'father -> dad.',
    category: 'family',
    difficulty: 'easy'
  },
  {
    id: 'q25',
    prompt: 'Dopasuj parę męski (He) - żeński (She): son -> ___',
    options: ['daughter', 'sister', 'aunt', 'mother'],
    correctAnswer: 'daughter',
    explanation: 'son (syn) to odpowiednik żeński: daughter (córka).',
    category: 'family',
    difficulty: 'easy'
  },
  {
    id: 'q26',
    prompt: 'Dopasuj parę męski (He) - żeński (She): uncle -> ___',
    options: ['aunt', 'sister', 'granny', 'daughter'],
    correctAnswer: 'aunt',
    explanation: 'uncle (wujek) -> aunt (ciocia).',
    category: 'family',
    difficulty: 'easy'
  },
  {
    id: 'q27',
    prompt: 'Zadanie z podręcznika: Peter jest mężem Julii (siostry taty Marka). Kim Peter jest dla Marka?',
    options: ["Mark's uncle", "Mark's father", "Mark's brother", "Mark's grandad"],
    correctAnswer: "Mark's uncle",
    explanation: 'Peter is Mark’s uncle (wujek Marka).',
    category: 'tree',
    difficulty: 'medium'
  },
  {
    id: 'q28',
    prompt: 'Z podręcznika: David i Mark mają tych samych rodziców (Paul & Rose). Kim jest David dla Marka?',
    options: ["Mark's brother", "Mark's cousin", "Mark's uncle", "Mark's father"],
    correctAnswer: "Mark's brother",
    explanation: 'David is Mark’s brother (brat Marka).',
    category: 'tree',
    difficulty: 'easy'
  },
  {
    id: 'q29',
    prompt: 'Z podręcznika: Tom to syn cioci Julii. Kim Tom jest dla Marka?',
    options: ["Mark's cousin", "Mark's brother", "Mark's uncle", "Mark's dad"],
    correctAnswer: "Mark's cousin",
    explanation: 'Dziecko cioci lub wujka to Twój kuzyn/kuzynka -> cousin.',
    category: 'tree',
    difficulty: 'medium'
  },

  // Zwroty Out of Class
  {
    id: 'q30',
    prompt: 'Niesiesz ciężki tort i mówisz koledze: "Potrzymaj to, proszę!". Jak to będzie po angielsku?',
    options: ['Hold this, please!', 'Be careful!', 'I’ve got it!', 'Happy birthday!'],
    correctAnswer: 'Hold this, please!',
    explanation: 'Hold this, please! = Potrzymaj to, proszę!',
    category: 'phrases',
    difficulty: 'medium'
  },
  {
    id: 'q31',
    prompt: 'Ktoś idzie po śliskiej podłodze. Ostrzegasz go: "Uważaj!". Jak powiesz to po angielsku?',
    options: ['Be careful!', 'Hold this, please!', 'I’ve got it!', 'You are ready!'],
    correctAnswer: 'Be careful!',
    explanation: 'Be careful! = Uważaj! Bądź ostrożny!',
    category: 'phrases',
    difficulty: 'easy'
  },
  {
    id: 'q32',
    prompt: 'Mama pyta: "Czy trzymasz torbę?", a Ty odpowiadasz: "Mam to! / Daję radę!". Jak to powiesz?',
    options: ['I’ve got it!', 'Hold this, please!', 'Be careful!', 'Happy birthday!'],
    correctAnswer: 'I’ve got it!',
    explanation: 'I\'ve got it! = Mam to! Daję radę!',
    category: 'phrases',
    difficulty: 'medium'
  }
];

export interface SpellingWord {
  id: string;
  word: string;
  promptPl: string;
  hint: string;
  category: 'family' | 'countries' | 'grammar';
}

export const SPELLING_WORDS: SpellingWord[] = [
  { id: 's1', word: 'daughter', promptPl: 'córka', hint: 'Zaczyna się na d-a-u...', category: 'family' },
  { id: 's2', word: 'brother', promptPl: 'brat', hint: 'b-r-o...', category: 'family' },
  { id: 's3', word: 'cousin', promptPl: 'kuzyn / kuzynka', hint: 'c-o-u-s-i-n', category: 'family' },
  { id: 's4', word: 'parents', promptPl: 'rodzice', hint: 'p-a-r-e-n-t-s', category: 'family' },
  { id: 's5', word: 'grandad', promptPl: 'dziadek (potocznie)', hint: 'g-r-a-n-d-a-d', category: 'family' },
  { id: 's6', word: 'granny', promptPl: 'babcia (potocznie)', hint: 'g-r-a-n-n-y', category: 'family' },
  { id: 's7', word: 'British', promptPl: 'brytyjski / Brytyjczyk', hint: 'B-r-i-t-i-s-h (z dużej litery)', category: 'countries' },
  { id: 's8', word: 'Spanish', promptPl: 'hiszpański / Hiszpan', hint: 'S-p-a-n-i-s-h', category: 'countries' },
  { id: 's9', word: 'Polish', promptPl: 'polski / Polak', hint: 'P-o-l-i-s-h', category: 'countries' },
  { id: 's10', word: 'French', promptPl: 'francuski / Francuz', hint: 'F-r-e-n-c-h', category: 'countries' },
  { id: 's11', word: 'Italian', promptPl: 'włoski / Włoch', hint: 'I-t-a-l-i-a-n', category: 'countries' },
  { id: 's12', word: 'Chinese', promptPl: 'chiński / Chińczyk', hint: 'C-h-i-n-e-s-e', category: 'countries' },
  { id: 's13', word: "isn't", promptPl: 'przeczenie od "is" (skrócone)', hint: 'i-s-n-\'-t', category: 'grammar' },
  { id: 's14', word: "aren't", promptPl: 'przeczenie od "are" (skrócone)', hint: 'a-r-e-n-\'-t', category: 'grammar' },
  { id: 's15', word: 'his', promptPl: 'jego (dla chłopca)', hint: 'h-i-s', category: 'grammar' },
  { id: 's16', word: 'her', promptPl: 'jej (dla dziewczynki)', hint: 'h-e-r', category: 'grammar' },
];
