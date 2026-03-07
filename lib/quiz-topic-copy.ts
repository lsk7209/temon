export function getTopicQuizFAQs(quizTitle: string): Array<{ question: string; answer: string }> {
  const lowerTitle = quizTitle.toLowerCase()

  if (lowerTitle.includes("k-drama") || lowerTitle.includes("드라마")) {
    return [
      {
        question: `How does ${quizTitle} decide the result?`,
        answer: "The quiz compares how you usually handle tension, affection, pacing, and social attention. Those patterns are mapped to a drama-style role so the result feels closer to behavior than fandom trivia.",
      },
      {
        question: "Who is this quiz most useful for?",
        answer: "It is most useful for visitors who enjoy character-based self-analysis and want a shareable result that still feels grounded in real social behavior.",
      },
      {
        question: "Should I answer as my favorite drama character?",
        answer: "No. The result is stronger when you answer from your own habit and reaction style. Favorite-character projection usually makes the outcome less accurate.",
      },
      {
        question: "Can I compare this result with friends?",
        answer: "Yes. Drama-style quizzes tend to work well as comparison content because the result pages are easy to discuss and contrast across a group.",
      },
    ]
  }

  if (lowerTitle.includes("idol") || lowerTitle.includes("아이돌") || lowerTitle.includes("k-pop")) {
    return [
      {
        question: `What is ${quizTitle} actually measuring?`,
        answer: "It measures where your energy naturally goes inside a group: leadership, expression, emotional tone, momentum, or coordination. That is why the result is useful even if you are not deep into fandom culture.",
      },
      {
        question: "Is this quiz only for K-pop fans?",
        answer: "No. The idol framing makes the result more fun, but the underlying pattern is about group role preference and social energy.",
      },
      {
        question: "How do I get the most accurate result?",
        answer: "Answer from your real behavior in teams, chats, and social settings rather than the role you wish you had. That keeps the output more consistent.",
      },
      {
        question: "Why do people share idol-style quiz results so much?",
        answer: "They are easy to compare. Visitors quickly understand the role label and often click into related quizzes after sharing or discussing the result.",
      },
    ]
  }

  if (lowerTitle.includes("pet") || lowerTitle.includes("반려")) {
    return [
      {
        question: `How should I read my ${quizTitle} result?`,
        answer: "Read it as a simple translation of your routine, sensitivity, attachment, and energy pattern into an animal-style profile. The value is in the pattern, not in literal pet matching.",
      },
      {
        question: "Does this result reflect lifestyle compatibility?",
        answer: "Partly. The questions tend to surface how much structure, interaction, stimulation, and recovery time you prefer in daily life.",
      },
      {
        question: "Can this be useful even if I do not own a pet?",
        answer: "Yes. Many visitors use pet-style quizzes because the animal metaphor makes their emotional pattern easier to understand and explain.",
      },
      {
        question: "What improves result accuracy here?",
        answer: "Think about your real home rhythm, stress response, and social battery instead of the image you want to present. That makes the result more stable.",
      },
    ]
  }

  if (lowerTitle.includes("ramen") || lowerTitle.includes("라면")) {
    return [
      {
        question: `Why does ${quizTitle} use food choices?`,
        answer: "Food-topic quizzes work well because familiar choices reveal habit, repetition, comfort level, and willingness to experiment. Those signals are easy to answer quickly and still feel personal.",
      },
      {
        question: "Is this result only about taste preference?",
        answer: "No. The food theme is the hook, but the interpretation usually reflects routine, curiosity, convenience, and decision style.",
      },
      {
        question: "Who tends to enjoy this quiz most?",
        answer: "Visitors coming from casual search or social sharing often like food-themed quizzes because they are light, fast, and easy to compare with friends.",
      },
      {
        question: "Should I overthink the questions?",
        answer: "No. Quick answers usually work better because the quiz is designed to catch your default preference pattern rather than a carefully edited self-image.",
      },
    ]
  }

  if (lowerTitle.includes("study") || lowerTitle.includes("공부")) {
    return [
      {
        question: `What can ${quizTitle} tell me?`,
        answer: "It can help you see whether your focus style leans more toward structure, repetition, immersion, pressure response, or flexibility. That makes the result useful for actual study planning.",
      },
      {
        question: "Is this result useful for exam preparation?",
        answer: "Yes. The result is most useful when you connect it to revision rhythm, note-taking, break timing, and your response to deadlines.",
      },
      {
        question: "How often should I retake this kind of quiz?",
        answer: "Retaking after a semester, exam period, or major schedule change can be useful because study behavior often shifts with environment and stakes.",
      },
      {
        question: "What is the best way to use the result page?",
        answer: "Use it as a practical checkpoint. Compare the described pattern with your real routine and then adjust one or two habits instead of trying to change everything at once.",
      },
    ]
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("기상")) {
    return [
      {
        question: `What does ${quizTitle} reveal?`,
        answer: "It reveals how you handle wake-up friction, routine momentum, and the first decisions of the day. That often says more about your daily system than about simple willpower.",
      },
      {
        question: "Can this result help improve mornings?",
        answer: "Yes. The result is most useful when you use it to redesign the loop between sleep timing, alarm behavior, and your first action after waking.",
      },
      {
        question: "Why do morning quizzes feel relatable?",
        answer: "Because alarm habits are concrete and repetitive. Visitors can answer quickly and immediately recognize themselves in the result pattern.",
      },
      {
        question: "Should I answer based on weekdays or weekends?",
        answer: "Use the pattern that shows up most consistently in real life. If weekday and weekend behavior are very different, weekday answers are usually more actionable.",
      },
    ]
  }

  return [
    {
      question: `How does ${quizTitle} work?`,
      answer: "The quiz is designed to be finished quickly with simple, intuitive answers. It works best when you answer from your real habit instead of the image you want to project.",
    },
    {
      question: "How should I read the result?",
      answer: "Treat the result as a practical interpretation of your current preference pattern. It is most useful when you compare it with how you actually behave in daily life.",
    },
    {
      question: "Can the result change if I retake the quiz?",
      answer: "Yes. Context, mood, and timing can all change how you answer. That variation is useful because it shows which parts of your pattern are stable and which are situational.",
    },
    {
      question: "Why do people share these quiz results?",
      answer: "Short quizzes perform well because they are easy to finish, easy to compare, and easy to discuss with other people who know your personality or habits.",
    },
  ]
}

export function getIntroSearchIntents(quizTitle: string): string[] {
  const lowerTitle = quizTitle.toLowerCase()

  if (lowerTitle.includes("k-drama") || lowerTitle.includes("드라마")) {
    return [
      "Visitors searching for a drama role test usually want a result that feels character-like but still maps back to real-life conflict and romance behavior.",
      "This topic performs best when the landing copy explains why the quiz is more than fandom labeling and why the result can still feel accurate.",
      "Strong follow-up behavior comes from comparing the result with friends, partners, and favorite character archetypes.",
    ]
  }

  if (lowerTitle.includes("idol") || lowerTitle.includes("아이돌") || lowerTitle.includes("k-pop")) {
    return [
      "Searchers often want a fast answer to which role they naturally take inside a team, friend group, or performance-style dynamic.",
      "The strongest landing angle is role clarity: leader, mood maker, visual energy, planner, or emotional center.",
      "These visitors also convert well into adjacent entertainment quizzes when the result page includes obvious next-click options.",
    ]
  }

  if (lowerTitle.includes("pet") || lowerTitle.includes("반려")) {
    return [
      "Pet-style search traffic often wants a softer, more emotional self-reading that is easy to understand and share.",
      "The key intent is not literal pet ownership. It is using an animal metaphor to describe attachment, comfort, stimulation, and social energy.",
      "Completion improves when the landing page reassures visitors that quick answers still produce a useful personality-style result.",
    ]
  }

  if (lowerTitle.includes("ramen") || lowerTitle.includes("라면")) {
    return [
      "Food-topic visitors usually arrive for curiosity first, then stay if the page shows that taste choice connects to habit and decision style.",
      "This search intent responds well to simple, concrete copy that explains why a fun topic can still lead to a recognizable result.",
      "The strongest secondary action is clicking into other lifestyle quizzes after finishing the result page.",
    ]
  }

  if (lowerTitle.includes("study") || lowerTitle.includes("공부")) {
    return [
      "Study-style searchers want practical value. They are more likely to stay when the intro promises usable insight rather than abstract personality labels.",
      "The best intent match is showing how the result connects to concentration, revision, note-taking, and exam preparation.",
      "This audience is more likely to revisit if the result page suggests concrete habit changes instead of generic encouragement.",
    ]
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("기상")) {
    return [
      "Morning-routine visitors usually want an explanation for why wake-up plans keep failing or feeling inconsistent.",
      "The highest intent match is framing the quiz as a routine-design tool instead of a simple lazy-versus-disciplined label.",
      "These visitors often engage more when the result page includes small next-step actions they can test immediately.",
    ]
  }

  return [
    `${quizTitle} works best for search visitors who want a short answer, a clear result, and a topic that feels familiar enough to start without friction.`,
    "The strongest intent match comes from explaining how the quiz translates a simple theme into a practical personality-style interpretation.",
    "Completion and sharing both improve when the landing page makes the time cost, result usefulness, and next-click path obvious.",
  ]
}
