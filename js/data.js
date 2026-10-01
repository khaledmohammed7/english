/**
 * Cambridge English: Advanced (CAE) - Unit 1: Happiness & Success
 * Comprehensive Educational Dataset for Interactive Presentation & Workbook
 */

const COURSE_DATA = {
  unitInfo: {
    unitNumber: 1,
    title: "Happiness & Success",
    subtitle: "Listening, Speaking, Reading & Use of English",
    level: "C1 Advanced / Upper-Intermediate",
    pages: "Pages 14 – 18",
    sections: [
      { id: "listening", title: "Listening & Speaking", page: "Page 14", icon: "P.14" },
      { id: "speaking", title: "Speaking & Everyday English", page: "Page 15", icon: "P.15" },
      { id: "reading", title: "Reading: Life's Good! Why So Bad?", page: "Pages 16–17", icon: "P.16-17" },
      { id: "use-of-english", title: "Use of English: Gerund & Infinitive", page: "Page 18", icon: "P.18" }
    ]
  },

  // PAGE 14: LISTENING & SPEAKING
  listening: {
    part4: {
      title: "Listening – Part 4: Multiple Matching Task",
      warmup: {
        prompt: "With a partner, talk about a special moment in your life when you felt very happy.",
        questions: [
          "How old were you?",
          "What was the situation?",
          "Who was with you? How did they feel?"
        ]
      },
      strategy: {
        title: "STRATEGY POINT: Part 4 Multiple Matching",
        tips: [
          "Take advantage of the preparation time before listening to predict the themes and vocabulary of the extracts.",
          "Both Tasks 1 and 2 are based on the same 5 extracts. Concentrate on Task 1 during the first listening, and Task 2 during the second listening.",
          "Remember that three items in each task list do NOT match with any of the speakers (distractors)."
        ]
      },
      speakers: [
        {
          id: 1,
          speakerLabel: "Speaker 1",
          audioTranscript: "I remember looking at that thick envelope with trembling hands. My sister was standing next to me holding her breath. When I tore it open and saw the word 'Congratulations' and all top grades, we just screamed and hugged each other! I could finally go to medical school.",
          task1Answer: "C", // A school leaver
          task1Options: "C",
          task2Answer: "D", // Passing an exam
          task2Options: "D",
          explanation: "Speaker 1 describes opening exam results with their sister, seeing top grades and realizing they can go to university (A school leaver passing an exam)."
        },
        {
          id: 2,
          speakerLabel: "Speaker 2",
          audioTranscript: "It had been a gruelling 14-hour shift in the maternity ward, but when that tiny baby let out its first strong cry and the mother held her newborn daughter weeping tears of sheer joy, every bit of exhaustion vanished. In our profession, moments like that make everything worthwhile.",
          task1Answer: "A", // A nurse
          task1Options: "A",
          task2Answer: "F", // Having a baby
          task2Options: "F",
          explanation: "Speaker 2 mentions working a 14-hour shift in a maternity ward and delivering a baby (A nurse witnessing/facilitating having a baby)."
        },
        {
          id: 3,
          speakerLabel: "Speaker 3",
          audioTranscript: "We had been training for nine months, enduring freezing gales and blizzards. When we finally reached the ridge at 4,000 meters and the summit cross came into view with the sunrise illuminating the glaciers below, I felt on top of the world. All my clients burst into cheers.",
          task1Answer: "D", // A fitness instructor
          task1Options: "D",
          task2Answer: "H", // Climbing a mountain
          task2Options: "H",
          explanation: "Speaker 3 mentions training clients, climbing at 4,000 meters, and reaching the snowy summit (A fitness instructor climbing a mountain)."
        },
        {
          id: 4,
          speakerLabel: "Speaker 4",
          audioTranscript: "After six months of rejections and auditioning until I felt completely drained, the director called me personally. He said, 'The lead role in the West End production is yours.' I dropped the receiver and just broke down crying with relief. My dream had finally begun.",
          task1Answer: "H", // An actor
          task1Options: "H",
          task2Answer: "A", // Getting a job
          task2Options: "A",
          explanation: "Speaker 4 discusses auditions, a director calling for a lead role in a West End production, and securing their big role (An actor getting a job)."
        },
        {
          id: 5,
          speakerLabel: "Speaker 5",
          audioTranscript: "At seventy-two, most people thought I was just passing the time in my garden shed. But when the courier knocked and handed me the advance copy with my name embossed on the hardcover jacket, I couldn't believe it. Fifty years of research and stories were finally in print.",
          task1Answer: "G", // A pensioner
          task1Options: "G",
          task2Answer: "B", // Publishing a book
          task2Options: "B",
          explanation: "Speaker 5 mentions being 72, having worked in the garden shed, and receiving a hardcover advance copy of their newly printed book (A pensioner publishing a book)."
        }
      ],
      task1: {
        title: "Task 1: Identify the Speaker",
        instruction: "For questions 1–5, choose from the list (A–H) the person who is speaking.",
        options: [
          { letter: "A", text: "A nurse" },
          { letter: "B", text: "A lawyer" },
          { letter: "C", text: "A school leaver" },
          { letter: "D", text: "A fitness instructor" },
          { letter: "E", text: "A teacher" },
          { letter: "F", text: "A sibling" },
          { letter: "G", text: "A pensioner" },
          { letter: "H", text: "An actor" }
        ]
      },
      task2: {
        title: "Task 2: Identify the Topic",
        instruction: "For questions 6–10, choose from the list (A–H) what topic each speaker is talking about.",
        options: [
          { letter: "A", text: "Getting a job" },
          { letter: "B", text: "Publishing a book" },
          { letter: "C", text: "Watching a play" },
          { letter: "D", text: "Passing an exam" },
          { letter: "E", text: "Watching a prize-giving" },
          { letter: "F", text: "Having a baby" },
          { letter: "G", text: "Finishing university" },
          { letter: "H", text: "Climbing a mountain" }
        ]
      },
      followUp: {
        prompt: "1c. In pairs, think of other situations where the remaining people in Task 1 (A lawyer, A teacher, A sibling) could feel the same way."
      }
    },

    part2: {
      title: "Listening – Part 2: Radio Report about 'Google'",
      warmup: {
        prompt: "2a. You will hear a radio news report about 'Google', a popular Internet search engine. Before you listen, look at questions 1–8 and in pairs try to predict what kind of information might be needed to complete the gaps."
      },
      strategy: {
        title: "STRATEGY POINT: Part 2 Sentence Completion",
        tips: [
          "This task is always a monologue (one speaker).",
          "You will need between 1 and 3 words for each gap. Exact spelling matters!",
          "Your answers must fit grammatically with the rest of the sentence.",
          "The sentence stems paraphrase what the speaker says. Listen out for synonyms and restructured sentences."
        ]
      },
      audioTranscript: `Good evening and welcome to the Tech Hour. Tonight we examine the sensational rise of Google, the Internet search engine that has turned the tech world on its head. Google's dominance has grown so rapid and total that even the software titan Microsoft is openly envious of its unprecedented success.

The story started back in 1996 when two doctoral students at Stanford University, Larry Page and Sergey Brin, founded Google as a research project. Rather than splashing out millions on TV commercials, Google relied entirely on word of mouth, which remains one of the oldest methods of marketing a product.

Today, Google processes hundreds of millions of queries daily and is now the official search engine for the world's top service provider, America Online. Its appeal reaches everywhere: one university professor, working quietly in his garden, admitted he was not engaged in serious research at all, but simply browsing the Internet for pleasure.

Google has penetrated popular culture so deeply that, like Xerox or Hoover before it, it is now widely used as a lowercase verb, spelt without a capital letter. One commentator remarked that browsing the Internet with Google is like opening the covers of old books in an endless library. And where did the name originate? 'Google' is actually a deliberate misspelling of 'googol', a mathematical term for the numeral one followed by a hundred zeros, coined by an American mathematician's nephew more than sixty years ago.`,
      questions: [
        {
          num: 1,
          lead: "Even the computer giant Microsoft is",
          trail: "of Google's success.",
          acceptedAnswers: ["envious", "jealous"],
          displayAnswer: "envious",
          hint: "An adjective expressing feeling bitter or wanting someone else's success (7 letters).",
          explanation: "The broadcast states: 'even the software titan Microsoft is openly envious of its unprecedented success.'"
        },
        {
          num: 2,
          lead: "Two students from Stanford University",
          trail: "Google.",
          acceptedAnswers: ["founded", "started", "created", "set up"],
          displayAnswer: "founded",
          hint: "Past tense verb meaning established or created an organization (7 letters).",
          explanation: "The transcript says: 'two doctoral students at Stanford University, Larry Page and Sergey Brin, founded Google.'"
        },
        {
          num: 3,
          lead: "For its success, Google relied on word of mouth, which is one of the oldest methods of",
          trail: "a product.",
          acceptedAnswers: ["marketing", "promoting", "advertising"],
          displayAnswer: "marketing",
          hint: "A gerund (-ing form) related to promoting or selling products (9 letters).",
          explanation: "The report states that word of mouth 'remains one of the oldest methods of marketing a product.'"
        },
        {
          num: 4,
          lead: "Google is now the official",
          trail: "engine for the world's top service provider, America Online.",
          acceptedAnswers: ["search"],
          displayAnswer: "search",
          hint: "The type of engine that looks up information on the web (6 letters).",
          explanation: "The report mentions it is 'now the official search engine for the world's top service provider, America Online.'"
        },
        {
          num: 5,
          lead: "The reporter mentions a professor, working in the",
          trail: "who was not engaged in serious research but just browsing the Internet.",
          acceptedAnswers: ["garden"],
          displayAnswer: "garden",
          hint: "An outdoor space with plants and flowers at a house (6 letters).",
          explanation: "The text notes: 'one university professor, working quietly in his garden, admitted he was not engaged in serious research...'"
        },
        {
          num: 6,
          lead: "Like some other well-known brand names, it is now often spelt without a",
          trail: "letter.",
          acceptedAnswers: ["capital"],
          displayAnswer: "capital",
          hint: "An uppercase letter (7 letters).",
          explanation: "The text explains: 'used as a lowercase verb, spelt without a capital letter.'"
        },
        {
          num: 7,
          lead: "The reporter says that browsing the Internet is like",
          trail: "the covers of old books.",
          acceptedAnswers: ["opening"],
          displayAnswer: "opening",
          hint: "A gerund: unclosing or revealing the inside of a book (7 letters).",
          explanation: "The commentary says: 'browsing the Internet with Google is like opening the covers of old books.'"
        },
        {
          num: 8,
          lead: "'Google' is a variant spelling of 'googol', a term invented by a mathematician's",
          trail: "more than sixty years ago.",
          acceptedAnswers: ["nephew"],
          displayAnswer: "nephew",
          hint: "A family relative: the son of one's brother or sister (6 letters).",
          explanation: "The broadcast explains: 'coined by an American mathematician's nephew more than sixty years ago.'"
        }
      ],
      discussion: [
        {
          id: "2c",
          prompt: "Have you ever used Google? What do you think of it? Tell your partner."
        },
        {
          id: "2d",
          prompt: "What other famous and very successful products do you know of? Why do you think they're successful? Discuss in pairs."
        }
      ]
    }
  },

  // PAGE 15: SPEAKING - PART 2: COMPARE & SPECULATE
  speaking: {
    title: "Speaking – Part 2: Compare & Speculate",
    formatNotes: "In Cambridge C1 Advanced Speaking Part 2, each candidate is given three color photographs. You must compare two of them and answer two specific questions about them in 1 minute without interruption.",
    
    taskAchievements: {
      role: "Student A",
      topic: "Achievements",
      prompt: "Look at the pictures below. Compare two of the pictures, and say what kind of success is portrayed in each one and who you think might be feeling the happiest.",
      questions: [
        "What kind of success is portrayed in each photo?",
        "Who do you think might be feeling the happiest?"
      ],
      followUpRole: "Student B",
      followUpQuestion: "3b. Who do you think may have worked the hardest to achieve success?",
      photos: [
        {
          id: "achieve-a",
          label: "Photo A: Buying a First Home",
          caption: "A joyful young couple hugging passionately outside their new suburban house in front of a 'SOLD' sign.",
          imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
          successType: "Financial & Domestic Milestone",
          happinessFactor: "Relief, security, independence, starting a family foundation",
          effortRequired: "Years of saving a deposit, budgeting, career sacrifices"
        },
        {
          id: "achieve-b",
          label: "Photo B: Learning to Ride a Bicycle",
          caption: "A supportive father gently coaching his smiling young daughter riding a bicycle with a safety helmet.",
          imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
          successType: "Developmental / Parental Milestone",
          happinessFactor: "Overcoming fear, newfound childhood freedom, parental pride",
          effortRequired: "Patience, overcoming scrapes and falls, confidence building"
        },
        {
          id: "achieve-c",
          label: "Photo C: Sinking a Winning Putt",
          caption: "A focused golfer in classic athletic clothing successfully watching a decisive ball roll into the golf hole.",
          imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80",
          successType: "Sporting & Competitive Excellence",
          happinessFactor: "Thrill of victory, personal mastery, adrenaline surge",
          effortRequired: "Intense physical training, mental discipline, precision practice"
        }
      ],
      modelAnswer: {
        comparingPhotos: "Photo A (First Home) & Photo B (Riding a Bike)",
        candidateRole: "Candidate A (1-minute turn)",
        speechText: "Both pictures illustrate significant personal achievements, though they occur at vastly different stages in life. In the first picture, we see a young couple who have evidently just purchased their first home. This represents a major domestic milestone that typically requires years of financial discipline, saving for a deposit, and career sacrifices. In stark contrast, the second image portrays a much younger child learning to cycle with her father's encouragement. While this is a childhood developmental milestone rather than a financial one, it is no less profound. Regarding who might be feeling the happiest, I'd say the child probably experiences the purest, uninhibited joy—a sudden rush of freedom and triumph having overcome the fear of falling. On the other hand, the couple's happiness is likely tinged with immense relief after what was undoubtedly a protracted and stressful property transaction.",
        keyPhrases: [
          "Both pictures illustrate significant personal achievements...",
          "In stark contrast, the second image portrays...",
          "While this is a ..., it is no less profound",
          "Regarding who might be feeling the happiest, I'd say...",
          "On the other hand, ... is likely tinged with immense relief"
        ],
        partnerModel: {
          role: "Candidate B (30-second follow-up)",
          question: "Who do you think may have worked the hardest to achieve success?",
          speechText: "In my opinion, it would definitely be the couple in Photo A. Purchasing real estate in today's economic climate demands years of sustained dedication, relentless budgeting, and long working hours. While mastering cycling takes patience and determination, it usually occurs over days or weeks, whereas buying a house represents the culmination of a decade of hard graft."
        }
      }
    },

    taskCelebrations: {
      role: "Student B",
      topic: "Celebrations",
      prompt: "Now look at the three pictures of different celebrations. Compare two of the pictures and say what differences there are between the two occasions and what each situation means to the person celebrating.",
      questions: [
        "What differences are there between the occasions?",
        "What do you think each situation means to the person celebrating?"
      ],
      followUpRole: "Student A",
      followUpQuestion: "3d. How do you think each celebration might develop?",
      photos: [
        {
          id: "celeb-a",
          label: "Photo A: Child's Birthday Party",
          caption: "A delighted young child blowing out candles on a colorful birthday cake with joyful anticipation.",
          imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
          occasionType: "Personal Birthday Milestone",
          meaning: "Pure joy, excitement of growing up, being the center of loving attention",
          nextDevelopment: "Opening presents, party games, singing with friends and family"
        },
        {
          id: "celeb-b",
          label: "Photo B: University Graduation",
          caption: "A proud young woman in traditional academic cap and gown holding her rolled degree certificate.",
          imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
          occasionType: "Academic Rite of Passage",
          meaning: "Culmination of years of hard study, transition to professional adulthood",
          nextDevelopment: "Ceremonial cap toss, celebratory lunch with parents, job hunting"
        },
        {
          id: "celeb-c",
          label: "Photo C: Golden Anniversary",
          caption: "An affectionate elderly couple smiling warmly as they read an anniversary card or family letter together.",
          imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
          occasionType: "Lifelong Partnership / Golden Anniversary",
          meaning: "Enduring love, reflection on a shared lifetime, deep gratitude",
          nextDevelopment: "A quiet family gathering with grandchildren, reminiscing over old photo albums"
        }
      ],
      modelAnswer: {
        comparingPhotos: "Photo B (Graduation) & Photo C (Golden Anniversary)",
        candidateRole: "Candidate B (1-minute turn)",
        speechText: "Both photographs capture celebratory occasions marked by pride and nostalgia, but the underlying significance of each event is quite distinctive. The first image portrays a young university graduate, which represents an academic rite of passage and the doorway into professional life. She has reached the end of intense scholarly effort and is looking forward with optimism to her future career. In contrast, the couple in the second photograph are celebrating a lifelong milestone, perhaps their golden wedding anniversary. For them, the occasion represents decades of shared commitment, weathering life's storms together, and quiet contentment. While the graduate's celebration is exhilarating and forward-looking, the anniversary is deeply reflective, characterized by gratitude and fond memories.",
        keyPhrases: [
          "Both photographs capture celebratory occasions...",
          "In contrast, the couple in the second photograph...",
          "While the graduate's celebration is exhilarating and forward-looking...",
          "For them, the occasion represents decades of shared commitment..."
        ],
        partnerModel: {
          role: "Candidate A (30-second follow-up)",
          question: "How do you think each celebration might develop?",
          speechText: "I imagine the graduation will culminate in a jubilant gathering with fellow students, perhaps throwing their mortarboards into the air, followed by a formal dinner with family. On the other hand, the anniversary celebration is likely to be much more intimate—perhaps a cozy family reunion with children and grandchildren sharing old memories."
        }
      }
    },

    usefulLanguage: {
      comparing: [
        "Both pictures show...",
        "In both pictures the people are...",
        "Both pictures were taken...",
        "The main connection / similarity between these pictures is that...",
        "The first picture shows ..., whereas the second one...",
        "In the picture on the left ... whereas in the other one...",
        "The main / most striking difference between the two pictures is...",
        "There are several differences between the pictures: firstly, ..."
      ],
      speculating: [
        "They could / might / may be...",
        "They seem / appear to be...",
        "I suppose / assume / imagine that...",
        "It could / might / may be that...",
        "I can't be sure / certain, but perhaps...",
        "Although I can't be sure, perhaps..."
      ]
    },

    assessmentCriteria: [
      {
        criterion: "Grammar & Vocabulary",
        description: "Range and accuracy of C1 structures, complex sentences, varied topic vocabulary, and precise modal verbs."
      },
      {
        criterion: "Discourse Management",
        description: "Coherent progression, clear transitions, organizing ideas smoothly over the full 60-second turn."
      },
      {
        criterion: "Pronunciation",
        description: "Intelligible stress, rhythm, natural sentence intonation, and clear individual sounds."
      },
      {
        criterion: "Interactive Communication",
        description: "Active listening, responding appropriately to follow-up questions, expanding on a partner's point."
      }
    ],

    everydayEnglish: {
      title: "Everyday English: Responding to News",
      instruction: "In pairs, decide what the other speaker has said and use the expressions below in response.",
      expressions: [
        { code: "a", phrase: "Typical!", tone: "Exasperated / Cynical", usage: "Used when an annoying event happens that was completely predictable." },
        { code: "b", phrase: "Alright for some.", tone: "Playfully envious", usage: "Used when someone has a privilege or lucky break you wish you had." },
        { code: "c", phrase: "Poor you!", tone: "Sympathetic", usage: "Used to express genuine compassion when someone experiences misfortune." },
        { code: "d", phrase: "Good for her.", tone: "Appreciative / Pleased", usage: "Used to express approval of a woman's positive action or success." },
        { code: "e", phrase: "Lucky you.", tone: "Envious / Congratulatory", usage: "Used when someone gets a fortunate opportunity or pleasant treat." }
      ],
      scenarios: [
        {
          id: 1,
          speakerA: "I'm sorry, but your computer can't be fixed.",
          bestResponse: "Typical!",
          explanation: "Expressing frustration at an annoying, yet depressingly common inconvenience."
        },
        {
          id: 2,
          speakerA: "I've just been upgraded to first class on my flight to Hawaii!",
          bestResponse: "Lucky you.",
          explanation: "Congratulating someone who received an unexpected luxury stroke of good fortune."
        },
        {
          id: 3,
          speakerA: "I have to work this entire weekend and then study all night for Monday's exam.",
          bestResponse: "Poor you!",
          explanation: "Showing heartfelt sympathy for someone enduring an exhausting ordeal."
        },
        {
          id: 4,
          speakerA: "Sarah decided to resign from that toxic office and start her own graphic design studio.",
          bestResponse: "Good for her.",
          explanation: "Commending a woman's brave, positive life decision."
        },
        {
          id: 5,
          speakerA: "My boss gets to leave at 2 PM every Friday while the rest of us stay until 7.",
          bestResponse: "Alright for some.",
          explanation: "A wry, slightly resentful acknowledgment of someone else's privileged perk."
        }
      ]
    }
  },

  // PAGES 16 & 17: READING - PART 3
  reading: {
    title: "Reading – Part 3: Multiple Choice",
    articleTitle: "Life's good! Why do we feel so bad?",
    articleSubtitle: "We've tried shopping and New Age cures, making money and spending it. We're still miserable. What's missing from our lives?",
    strategy: {
      title: "STRATEGY POINT: Reading Part 3 Multiple Choice",
      tips: [
        "Get the gist first by scanning the headline, subtitle, and skimming through the paragraphs rapidly.",
        "Read each question stem carefully BEFORE reading the four options (A–D). Try to answer it in your own words first.",
        "Underline the evidence in the text that directly addresses the question stem.",
        "BEWARE OF DISTRACTORS: Options that repeat exact words from the text are often traps! Look for paraphrase.",
        "Watch out for absolute words (e.g., 'never', 'only', 'wholly') which often make an otherwise plausible statement false."
      ]
    },
    preReading: [
      "1. Are the people of your generation generally happier or unhappier than your parents' generation?",
      "2. Look at the title and introduction to the article. What do you think the writer's answer to his question will be? Read through quickly and check."
    ],
    paragraphs: [
      {
        num: 1,
        lines: "ll. 1–4",
        text: "Did you notice an outbreak of joviality and generosity last week? People [beaming] at you as they let you go ahead in the bus queue, grinning as they shared your morning traffic jam, smirking through the quarterly budget planning meeting?"
      },
      {
        num: 2,
        lines: "ll. 5–13",
        text: "No? The organisers of National Smile Week will be [down in the mouth]. All their efforts to perk us up for at least seven days have [run into the sand of our collective scepticism]. Four out of ten of us think life has become worse in the past five years. Two million of us are on anti-depressants; only a minority of us think 'people can be trusted most of the time'. Mix in some road/air/office/phone rage, a rise in reported [incivility] and a good dose of political apathy and the gloom looks even starker. We're a wretched lot."
      },
      {
        num: 3,
        lines: "ll. 14–19",
        text: "All this when average house prices have just blasted through the £100,000 mark, when life expectancy continues to lengthen, mortality rates are dropping and more than a third of young people enjoy what was once the elite privilege of higher education. We are healthy, wealthy and wise. Yet we've never felt so bad."
      },
      {
        num: 4,
        lines: "ll. 20–30",
        text: "If we seem like a nation of [ingrates], it may be because all the goodies that are supposed to make us happy don't do it for us any more – even if we have yet to wake up to the fact. So, your house is worth half a million. Karl Marx, who for all his faults knew a bit about capitalism, captured the [keeping-up-with-the-Joneses] dynamic of market economies perfectly: 'A house may be large or small; as long as the neighbouring houses are likewise small, it satisfies all the social requirements of a residence. But let there arise next to the little house a palace and the little house shrinks to a hut.' With mass media, the palace doesn't have to be next door – it can be beamed into our living rooms."
      },
      {
        num: 5,
        lines: "ll. 31–43",
        text: "Money doesn't make most of us happy any more. Poor people, understandably, see their life satisfaction rise with income but for most of the population in a country as [affluent] as ours, any jump-start to well-being from a pay rise quickly wears off. 'I was window-shopping in the South of France recently and I saw a diamond-studded woolly hat, and I quite fancied it.' When we get to that stage we should realise that more money isn't getting us much more in terms of happiness. Harrods is currently carrying a pair of shoes priced at a cool million – imagine if somebody stepped on your foot."
      },
      {
        num: 6,
        lines: "ll. 44–56",
        text: "But what about health? Surely the virtual [elimination] of most fatal diseases, rising life expectancy and falling mortality should be cheering us up? Not a bit of it. All that happens is that our expectations rise just as or even more quickly. Objectively, our health is better on almost every count, but this doesn't translate into our feeling any healthier. We are more aware of our health, so we get more anxious about it. Medicine has become a [victim of its own success]: having [massively] reduced the chances of death in childbirth, for example, people are now shocked if a life is lost – and reach for a lawyer. Death was unavoidable – now it is unacceptable."
      },
      {
        num: 7,
        lines: "ll. 57–69",
        text: "Like the answer to many great problems, however, the answer to the question of happiness may be quite [prosaic]: once countries and households are free of material need, the biggest contributor to life satisfaction seems to be a healthy set of personal relationships. The relative happiness of late teenagers and those passing middle age may relate to their spending more time on friendships. The thirty somethings, fighting on the two fronts of work and children, are the most dejected. Those between full-time education and retirement may be spending more time on the activities they think will make them happy – earning and spending – than on those that actually will: spending time with friends and family."
      },
      {
        num: 8,
        lines: "ll. 70–79",
        text: "This [friend-shaped gap] explains the American paradox – why the residents of the richest nation in the world are so glum – according to Professor Robert E. Lane at Yale University. 'There is a kind of famine of warm interpersonal relations, of easy-to-reach neighbours, of encircling, inclusive memberships, and of solid family life,' he says."
      },
      {
        num: 9,
        lines: "ll. 80–86",
        text: "The secret of happiness? Not money. So leave the lawn, forget your investments and call in sick tomorrow. Do yourself a favour. Phone a friend."
      }
    ],

    vocabulary: [
      {
        word: "beaming",
        pos: "adj / verb participle",
        definition: "Smiling broadly and radiantly, showing evident delight or satisfaction.",
        quote: "People beaming at you as they let you go ahead in the bus queue..."
      },
      {
        word: "incivility",
        pos: "noun",
        definition: "Rude, impolite, or discourteous behavior or speech.",
        quote: "...a rise in reported incivility and a good dose of political apathy..."
      },
      {
        word: "ingrates",
        pos: "noun",
        definition: "Ungrateful people who do not appreciate the benefits, privileges, or gifts they have received.",
        quote: "If we seem like a nation of ingrates, it may be because all the goodies..."
      },
      {
        word: "affluent",
        pos: "adj",
        definition: "Wealthy, prosperous, having abundant goods or financial resources.",
        quote: "...for most of the population in a country as affluent as ours..."
      },
      {
        word: "elimination",
        pos: "noun",
        definition: "The complete eradication, removal, or destruction of something undesirable.",
        quote: "Surely the virtual elimination of most fatal diseases... should be cheering us up?"
      },
      {
        word: "massively",
        pos: "adverb",
        definition: "To an immense, tremendous, or extraordinarily large degree.",
        quote: "...having massively reduced the chances of death in childbirth..."
      },
      {
        word: "prosaic",
        pos: "adj",
        definition: "Ordinary, matter-of-fact, straightforward, lacking poetic romance or complexity.",
        quote: "...the answer to the question of happiness may be quite prosaic: personal relationships."
      }
    ],

    idioms: [
      {
        phrase: "down in the mouth",
        meaning: "Unhappy, disappointed, or depressed.",
        context: "The organisers of National Smile Week will be down in the mouth because their campaign failed."
      },
      {
        phrase: "run into the sand of our collective scepticism",
        meaning: "Ground to a halt or failed to make progress due to widespread public cynicism.",
        context: "All their efforts to perk us up have run into the sand."
      },
      {
        phrase: "keeping-up-with-the-Joneses",
        meaning: "The relentless social pressure to match or surpass the wealth and possessions of your neighbors and peers.",
        context: "Karl Marx captured the keeping-up-with-the-Joneses dynamic of market economies."
      },
      {
        phrase: "victim of its own success",
        meaning: "Suffering unexpected negative consequences or unrealistic perfectionist demands as a direct result of earlier progress.",
        context: "Medicine has become a victim of its own success: expectations are now impossibly high."
      },
      {
        phrase: "friend-shaped gap",
        meaning: "A deep emotional emptiness caused by the absence of close, meaningful personal friendships.",
        context: "This friend-shaped gap explains why the richest nations are often the glumest."
      }
    ],

    questions: [
      {
        id: 1,
        question: "1. What can be inferred about National Smile Week?",
        options: [
          { letter: "A", text: "Its organisers did not expect it to succeed." },
          { letter: "B", text: "It seems to have annoyed some people." },
          { letter: "C", text: "It was largely unsuccessful." },
          { letter: "D", text: "It was not ambitious enough." }
        ],
        correct: "C",
        explanation: "The text states that the organisers will be 'down in the mouth' and that all their efforts 'have run into the sand of our collective scepticism' (lines 5–7), indicating the week completely failed to cheer people up."
      },
      {
        id: 2,
        question: "2. Which of the following is implied in the second paragraph?",
        options: [
          { letter: "A", text: "People are getting stingier." },
          { letter: "B", text: "People are getting less polite." },
          { letter: "C", text: "People are arguing more about politics." },
          { letter: "D", text: "People are working longer hours." }
        ],
        correct: "B",
        explanation: "Paragraph 2 specifically highlights 'a rise in reported incivility' alongside road/phone rage (lines 10–11). Incivility literally means rudeness / lack of politeness."
      },
      {
        id: 3,
        question: "3. In the third paragraph the writer says that higher education",
        options: [
          { letter: "A", text: "is only available to a small, privileged group." },
          { letter: "B", text: "is available to the whole of the population." },
          { letter: "C", text: "is available to far more people than in the past." },
          { letter: "D", text: "should only be available to young people." }
        ],
        correct: "C",
        explanation: "The writer says: 'more than a third of young people enjoy what was once the elite privilege of higher education' (lines 15–17), meaning university access has expanded dramatically compared to history."
      },
      {
        id: 4,
        question: "4. What is the writer referring to when he says '[the palace] can be beamed into our living rooms'? (ll. 28–30)",
        options: [
          { letter: "A", text: "advertising" },
          { letter: "B", text: "over-work" },
          { letter: "C", text: "politics" },
          { letter: "D", text: "depression" }
        ],
        correct: "A",
        explanation: "The author notes that with mass media and television, displays of ostentatious wealth and luxury consumer goods ('the palace') are broadcast directly into our homes via commercial media and advertising, triggering envy."
      },
      {
        id: 5,
        question: "5. An increase in earnings fails to make most people happier because",
        options: [
          { letter: "A", text: "their expenses are incredibly high." },
          { letter: "B", text: "they realise that's not where happiness lies." },
          { letter: "C", text: "there is always someone who earns more." },
          { letter: "D", text: "they don't have financial problems." }
        ],
        correct: "B",
        explanation: "The author writes: 'for most of the population in a country as affluent as ours, any jump-start to well-being from a pay rise quickly wears off... more money isn't getting us much more in terms of happiness' (lines 33–40)."
      },
      {
        id: 6,
        question: "6. According to the writer, improvements in health care",
        options: [
          { letter: "A", text: "made no difference to the public's mood." },
          { letter: "B", text: "alleviated some health worries." },
          { letter: "C", text: "directly led to increased anxiety." },
          { letter: "D", text: "only caused complex legal issues." }
        ],
        correct: "C",
        explanation: "The text states: 'We are more aware of our health, so we get more anxious about it. Medicine has become a victim of its own success' (lines 49–51). People now find any mortality or illness unacceptable."
      },
      {
        id: 7,
        question: "7. On average, people in their early thirties",
        options: [
          { letter: "A", text: "have more friends." },
          { letter: "B", text: "have happier marriages." },
          { letter: "C", text: "are better-educated." },
          { letter: "D", text: "face more problems." }
        ],
        correct: "D",
        explanation: "The writer remarks: 'The thirty somethings, fighting on the two fronts of work and children, are the most dejected' (lines 62–64), as they shoulder double the pressure with diminished time for friendships."
      }
    ],

    miserableSynonyms: [
      { word: "wretched", found: true, hint: "Appears in paragraph 2 ('We're a wretched lot.')" },
      { word: "glum", found: true, hint: "Appears in paragraph 8 ('why the residents... are so glum')" },
      { word: "dejected", found: true, hint: "Appears in paragraph 7 ('are the most dejected')" },
      { word: "down in the mouth", found: true, hint: "Appears in paragraph 2 ('will be down in the mouth')" }
    ]
  },

  // PAGE 18: USE OF ENGLISH - GERUND / INFINITIVE
  useOfEnglish: {
    title: "Use of English: Gerund & Infinitive",
    ex1a: {
      title: "1a. Sentence Transformation with Gerund Subjects",
      instruction: "Rewrite the following sentences using a gerund (-ing form), as in the example.",
      example: {
        original: "It takes her ages to put on her make-up.",
        rewritten: "Putting on her make-up takes her ages."
      },
      items: [
        {
          id: 2,
          original: "It's nearly impossible for me to do two things at the same time.",
          expected: "Doing two things at the same time is nearly impossible for me.",
          keywords: ["doing two things at the same time is nearly impossible for me"],
          explanation: "The infinitive clause 'to do two things...' becomes the gerund subject 'Doing two things at the same time'."
        },
        {
          id: 3,
          original: "It is very frustrating for her to have to deal with such a problem on a Friday afternoon.",
          expected: "Having to deal with such a problem on a Friday afternoon is very frustrating for her.",
          keywords: ["having to deal with such a problem on a friday afternoon is very frustrating for her"],
          explanation: "'To have to deal...' becomes the gerund subject 'Having to deal with such a problem...'."
        },
        {
          id: 4,
          original: "It makes me feel really happy to see old people holding hands.",
          expected: "Seeing old people holding hands makes me feel really happy.",
          keywords: ["seeing old people holding hands makes me feel really happy"],
          explanation: "'To see old people...' transforms into 'Seeing old people holding hands makes me feel really happy'."
        }
      ]
    },

    ex2a: {
      title: "2a. Prepositions with Verbs & Adjectives",
      instruction: "Fill in the prepositions which usually follow these phrases. When followed by a verb, remember to use a gerund!",
      items: [
        { id: 1, phrase: "to disapprove", prep: "of", example: "I disapprove of smoking in public." },
        { id: 2, phrase: "to compliment sb", prep: "on", example: "She complimented him on singing so beautifully." },
        { id: 3, phrase: "to be ashamed", prep: "of", example: "He was ashamed of having lied to his parents." },
        { id: 4, phrase: "to apologise", prep: "for", example: "I must apologise for arriving so late." },
        { id: 5, phrase: "to be involved", prep: "in", example: "They were involved in organizing the charity gala." },
        { id: 6, phrase: "to discourage sb", prep: "from", example: "Parents discouraged him from dropping out of school." },
        { id: 7, phrase: "to be keen", prep: "on", example: "My sister is very keen on learning Japanese." },
        { id: 8, phrase: "to compensate sb", prep: "for", example: "The airline compensated us for losing our luggage." },
        { id: 9, phrase: "to be guilty", prep: "of", example: "He was found guilty of committing fraud." },
        { id: 10, phrase: "to be obsessed", prep: "with", example: "She is completely obsessed with checking her phone." },
        { id: 11, phrase: "to consist", prep: "of", example: "The course consists of completing six modules." },
        { id: 12, phrase: "to object", prep: "to", example: "We strongly object to paying extra fees." },
        { id: 13, phrase: "to protest", prep: "against", alt: "about", example: "Students protested against increasing tuition fees." },
        { id: 14, phrase: "to benefit", prep: "from", example: "Many students benefit from studying abroad." }
      ]
    },

    ex3: {
      title: "3a & 3b. Phrasal Verbs in Action",
      matching: [
        { id: 1, verb: "take up", meaningId: "b", meaning: "start (e.g. a hobby)" },
        { id: 2, verb: "give up", meaningId: "c", meaning: "stop trying" },
        { id: 3, verb: "block out", meaningId: "d", meaning: "ignore" },
        { id: 4, verb: "count on", meaningId: "a", meaning: "rely" },
        { id: 5, verb: "make up for", meaningId: "e", meaning: "compensate" },
        { id: 6, verb: "run through", meaningId: "f", meaning: "examine" }
      ],
      rewrites: [
        {
          id: 1,
          original: "He's been a stamp collector since he was five.",
          model: "He took up stamp collecting when he was five.",
          phrasalVerb: "take up + gerund"
        },
        {
          id: 2,
          original: "I ignored the street noise and continued studying.",
          model: "I blocked out the street noise and continued studying.",
          phrasalVerb: "block out"
        },
        {
          id: 3,
          original: "Let's think of all the places where you might have left it.",
          model: "Let's run through all the places where you might have left it.",
          phrasalVerb: "run through"
        },
        {
          id: 4,
          original: "She couldn't go on holiday with her parents so they bought her a car instead.",
          model: "They bought her a car to make up for her not going on holiday with them.",
          phrasalVerb: "make up for + gerund"
        },
        {
          id: 5,
          original: "I really need you to support me at the meeting.",
          model: "I really need to count on you supporting me at the meeting.",
          phrasalVerb: "count on + someone + gerund"
        },
        {
          id: 6,
          original: "I stopped trying to get my husband to do housework years ago.",
          model: "I gave up trying to get my husband to do housework years ago.",
          phrasalVerb: "give up + gerund"
        }
      ]
    },

    ex4: {
      title: "4. Gerund vs. Infinitive Verb Complementation",
      instruction: "Fill the gaps in the following sentences using the gerund or the infinitive of the verbs in parentheses.",
      items: [
        {
          id: 1,
          sentence: "I enjoy [living] (live) in Spain, but I do miss [going] (go) out with my friends.",
          gaps: [
            { base: "live", correct: "living", rule: "'enjoy' takes gerund (-ing)" },
            { base: "go", correct: "going", rule: "'miss' takes gerund (-ing)" }
          ]
        },
        {
          id: 2,
          sentence: "We agreed [to meet] (meet) by the river at 8 o'clock, but they never showed up.",
          gaps: [
            { base: "meet", correct: "to meet", rule: "'agree' takes to-infinitive" }
          ]
        },
        {
          id: 3,
          sentence: "Frank failed [to complete] (complete) the course and so he will have to retake it.",
          gaps: [
            { base: "complete", correct: "to complete", rule: "'fail' takes to-infinitive" }
          ]
        },
        {
          id: 4,
          sentence: "I suggested [going] (go) to the cinema, but Helen said she didn't fancy [waiting] (wait) in a queue.",
          gaps: [
            { base: "go", correct: "going", rule: "'suggest' takes gerund (-ing)" },
            { base: "wait", correct: "waiting", rule: "'fancy' takes gerund (-ing)" }
          ]
        },
        {
          id: 5,
          sentence: "I can't really afford [to buy] (buy) a car this year.",
          gaps: [
            { base: "buy", correct: "to buy", rule: "'afford' takes to-infinitive" }
          ]
        },
        {
          id: 6,
          sentence: "Martha practised [playing] (play) the piano daily, but she seemed [to make] (make) little progress.",
          gaps: [
            { base: "play", correct: "playing", rule: "'practise' takes gerund (-ing)" },
            { base: "make", correct: "to make", rule: "'seem' takes to-infinitive" }
          ]
        },
        {
          id: 7,
          sentence: "Much as I dread [going] (go) to the dentist, I don't think I can avoid [visiting] (visit) him this time.",
          gaps: [
            { base: "go", correct: "going", rule: "'dread' takes gerund (-ing)" },
            { base: "visit", correct: "visiting", rule: "'avoid' takes gerund (-ing)" }
          ]
        },
        {
          id: 8,
          sentence: "She certainly mentioned [seeing] (see) Mark, but I don't remember her [talking] (talk) about Vicky.",
          gaps: [
            { base: "see", correct: "seeing", rule: "'mention' takes gerund (-ing)" },
            { base: "talk", correct: "talking", rule: "'remember + person' takes gerund (-ing) for a past recollection" }
          ]
        }
      ]
    },

    ex5: {
      title: "5. 'To Success': 6 Golden Rules",
      instruction: "Use the verbs below in their infinitive or -ing form to complete the six rules for achieving success.",
      wordBank: ["respect", "focus", "gain", "improve", "imagine", "concentrate"],
      rules: [
        {
          id: 1,
          lead: "1. You must",
          trail: "yourself and others around you.",
          correct: "respect",
          rule: "Modal auxiliary verb 'must' is followed by bare infinitive: 'respect'."
        },
        {
          id: 2,
          lead: "2. Remember,",
          trail: "on the outcome of your goal is a great motivator.",
          correct: ["focusing", "concentrating"],
          display: "focusing / concentrating",
          rule: "Gerund subject: 'focusing' or 'concentrating'."
        },
        {
          id: 3,
          lead: "3. Try",
          trail: "what your life will be like once you have accomplished your aim.",
          correct: ["to imagine", "imagining"],
          display: "to imagine",
          rule: "'Try to imagine' (make an effort to visualize) or 'imagining'."
        },
        {
          id: 4,
          lead: "4. Build up your motivation levels by",
          trail: "your diet.",
          correct: "improving",
          rule: "Preposition 'by' followed by gerund (-ing): 'improving'."
        },
        {
          id: 5,
          lead: "5. You should always",
          trail: "on the job at hand, don't get distracted.",
          correct: ["focus", "concentrate"],
          display: "focus / concentrate",
          rule: "Modal verb 'should' followed by bare infinitive: 'focus' or 'concentrate'."
        },
        {
          id: 6,
          lead: "6. You need",
          trail: "control over the everyday events in your life.",
          correct: "to gain",
          rule: "Semi-modal verb 'need' followed by to-infinitive: 'to gain'."
        }
      ]
    }
  }
};
