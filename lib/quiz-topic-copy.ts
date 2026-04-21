export function getTopicQuizFAQs(
  quizTitle: string,
): Array<{ question: string; answer: string }> {
  const lowerTitle = quizTitle.toLowerCase();

  if (lowerTitle.includes("k-drama") || lowerTitle.includes("드라마")) {
    return [
      {
        question: `${quizTitle}는 어떻게 결과를 결정하나요?`,
        answer:
          "긴장감·애정 표현·페이스 조절·사회적 주목 방식을 비교해 드라마 속 캐릭터 아키타입으로 연결해요. 팬덤 지식보다 실제 행동 패턴이 중요해요.",
      },
      {
        question: "이 테스트가 가장 유용한 분은 누구인가요?",
        answer:
          "캐릭터 기반 자기 분석을 즐기고, 실제 사회적 행동에 기반한 공유 가능한 결과를 원하는 분께 잘 맞아요.",
      },
      {
        question: "좋아하는 드라마 캐릭터처럼 답해야 하나요?",
        answer:
          "아니에요. 나 자신의 습관과 반응 방식으로 답할 때 결과가 더 정확해요. 캐릭터 투영은 오히려 정확도를 낮춰요.",
      },
      {
        question: "친구와 결과를 비교할 수 있나요?",
        answer:
          "네. 드라마 스타일 테스트는 결과 레이블이 직관적이어서 그룹 내 비교 콘텐츠로 활용하기 좋아요.",
      },
    ];
  }

  if (
    lowerTitle.includes("idol") ||
    lowerTitle.includes("아이돌") ||
    lowerTitle.includes("k-pop")
  ) {
    return [
      {
        question: `${quizTitle}는 실제로 무엇을 측정하나요?`,
        answer:
          "그룹 안에서 에너지가 자연스럽게 향하는 방향을 측정해요: 리더십·표현력·감성 톤·모멘텀·조율 능력. 팬덤 문화에 익숙하지 않아도 결과가 유용한 이유예요.",
      },
      {
        question: "K-pop 팬이 아니어도 재미있게 할 수 있나요?",
        answer:
          "네. 아이돌 프레임은 결과를 재미있게 하지만, 실제로는 그룹 역할 선호도와 사회적 에너지 패턴을 분석해요.",
      },
      {
        question: "가장 정확한 결과를 얻으려면 어떻게 해야 하나요?",
        answer:
          "팀·채팅방·사회적 상황에서의 실제 행동을 기반으로 답하세요. 원하는 역할이 아닌 현재 패턴으로 답할 때 결과가 일관성 있어요.",
      },
      {
        question: "아이돌 유형 결과를 왜 많이 공유하나요?",
        answer:
          "역할 레이블이 직관적이어서 비교하기 쉬워요. 결과를 보고 관련 테스트로 이어서 클릭하는 경우가 많아요.",
      },
    ];
  }

  if (lowerTitle.includes("pet") || lowerTitle.includes("반려")) {
    return [
      {
        question: `${quizTitle} 결과는 어떻게 읽어야 하나요?`,
        answer:
          "루틴·감수성·애착 방식·에너지 패턴을 동물 스타일 프로필로 번역한 거예요. 문자 그대로의 반려동물 매칭보다 패턴 자체에 주목하세요.",
      },
      {
        question: "이 결과가 라이프스타일 궁합을 반영하나요?",
        answer:
          "어느 정도는요. 질문들이 일상에서 선호하는 구조·상호작용·자극·회복 시간을 자연스럽게 드러내줘요.",
      },
      {
        question: "반려동물을 키우지 않아도 유용한가요?",
        answer:
          "네. 동물 메타포가 감정 패턴을 이해하고 설명하기 쉽게 만들어줘서, 반려동물 여부와 관계없이 많은 분들이 활용해요.",
      },
      {
        question: "결과 정확도를 높이려면 어떻게 해야 하나요?",
        answer:
          "보여주고 싶은 모습보다 실제 일상 리듬·스트레스 반응·사회적 에너지를 기준으로 답하세요. 그럼 결과가 더 안정적이에요.",
      },
    ];
  }

  if (lowerTitle.includes("ramen") || lowerTitle.includes("라면")) {
    return [
      {
        question: `${quizTitle}는 왜 음식 선택을 활용하나요?`,
        answer:
          "익숙한 음식 선택이 습관·반복 패턴·컴포트존·실험 의지를 자연스럽게 드러내줘요. 빠르게 답하면서도 개인적인 결과를 얻을 수 있어요.",
      },
      {
        question: "이 결과가 단순히 입맛 취향인가요?",
        answer:
          "아니에요. 음식 테마는 시작점이고, 실제로는 루틴·호기심·편의성·결정 스타일을 반영해요.",
      },
      {
        question: "어떤 분들이 이 테스트를 가장 즐기나요?",
        answer:
          "가볍고 빠른 테스트를 원하는 분, 친구와 결과를 비교하고 싶은 분께 잘 맞아요.",
      },
      {
        question: "질문을 너무 깊이 생각해야 하나요?",
        answer:
          "아니에요. 직관적으로 빠르게 답하는 게 더 좋아요. 신중하게 편집된 자아보다 기본 성향 패턴을 잡아내는 테스트예요.",
      },
    ];
  }

  if (lowerTitle.includes("study") || lowerTitle.includes("공부")) {
    return [
      {
        question: `${quizTitle}에서 무엇을 알 수 있나요?`,
        answer:
          "집중 스타일이 구조형·반복형·몰입형·압박 반응형·유연형 중 어느 쪽에 가까운지 파악할 수 있어요. 실제 공부 계획에 활용하기 좋아요.",
      },
      {
        question: "시험 준비에도 유용한가요?",
        answer:
          "네. 복습 리듬·필기 방식·휴식 타이밍·마감 반응과 연결할 때 가장 유용해요.",
      },
      {
        question: "이 테스트를 얼마나 자주 다시 해보면 좋나요?",
        answer:
          "한 학기 후, 시험 기간, 큰 일정 변화 후에 다시 해보면 공부 행동이 어떻게 달라졌는지 확인할 수 있어요.",
      },
      {
        question: "결과 페이지를 가장 잘 활용하는 방법은 뭔가요?",
        answer:
          "실용적인 체크포인트로 사용하세요. 묘사된 패턴을 실제 루틴과 비교하고, 한 번에 다 바꾸려 하지 말고 한두 가지 습관부터 조정해보세요.",
      },
    ];
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("기상")) {
    return [
      {
        question: `${quizTitle}에서 무엇을 알 수 있나요?`,
        answer:
          "기상 저항감·루틴 모멘텀·하루 첫 결정 방식을 알 수 있어요. 단순한 의지력보다 일상 시스템 전체를 보여주는 경우가 많아요.",
      },
      {
        question: "이 결과로 아침 루틴을 개선할 수 있나요?",
        answer:
          "네. 수면 타이밍·알람 행동·기상 후 첫 행동을 하나의 루프로 재설계하는 데 활용할 수 있어요.",
      },
      {
        question: "아침 테스트가 왜 공감이 잘 되나요?",
        answer:
          "알람 습관은 구체적이고 반복적이어서 빠르게 답할 수 있고, 결과에서 바로 자신의 모습을 발견하는 경우가 많아요.",
      },
      {
        question: "평일 기준으로 답해야 하나요, 주말 기준으로 답해야 하나요?",
        answer:
          "실제 생활에서 가장 자주 나타나는 패턴으로 답하세요. 평일과 주말 차이가 크다면 평일 기준이 더 실용적인 결과를 줘요.",
      },
    ];
  }

  return [
    {
      question: `${quizTitle}는 어떻게 작동하나요?`,
      answer:
        "짧은 선택지에 직관적으로 답하면 돼요. 이상적인 모습보다 실제 행동 습관을 기반으로 답할 때 결과가 더 정확해요.",
    },
    {
      question: "결과는 어떻게 읽으면 좋나요?",
      answer:
        "현재 나의 선호 패턴을 실용적으로 해석하는 도구로 활용하세요. 실제 일상 행동과 비교할 때 가장 유용해요.",
    },
    {
      question: "다시 하면 결과가 바뀔 수 있나요?",
      answer:
        "네. 상황·기분·타이밍에 따라 답이 달라질 수 있어요. 그 변화가 오히려 어떤 성향이 안정적이고 어떤 게 상황 의존적인지 보여줘요.",
    },
    {
      question: "왜 이런 테스트 결과를 많이 공유하나요?",
      answer:
        "짧고 빠르게 끝나고, 비교하기 쉽고, 나를 잘 아는 사람과 이야기 나누기 좋아서 공유 욕구가 높아요.",
    },
  ];
}

export function getIntroSearchIntents(quizTitle: string): string[] {
  const lowerTitle = quizTitle.toLowerCase();

  if (lowerTitle.includes("k-drama") || lowerTitle.includes("드라마")) {
    return [
      "Visitors searching for a drama role test usually want a result that feels character-like but still maps back to real-life conflict and romance behavior.",
      "This topic performs best when the landing copy explains why the quiz is more than fandom labeling and why the result can still feel accurate.",
      "Strong follow-up behavior comes from comparing the result with friends, partners, and favorite character archetypes.",
    ];
  }

  if (
    lowerTitle.includes("idol") ||
    lowerTitle.includes("아이돌") ||
    lowerTitle.includes("k-pop")
  ) {
    return [
      "Searchers often want a fast answer to which role they naturally take inside a team, friend group, or performance-style dynamic.",
      "The strongest landing angle is role clarity: leader, mood maker, visual energy, planner, or emotional center.",
      "These visitors also convert well into adjacent entertainment quizzes when the result page includes obvious next-click options.",
    ];
  }

  if (lowerTitle.includes("pet") || lowerTitle.includes("반려")) {
    return [
      "Pet-style search traffic often wants a softer, more emotional self-reading that is easy to understand and share.",
      "The key intent is not literal pet ownership. It is using an animal metaphor to describe attachment, comfort, stimulation, and social energy.",
      "Completion improves when the landing page reassures visitors that quick answers still produce a useful personality-style result.",
    ];
  }

  if (lowerTitle.includes("ramen") || lowerTitle.includes("라면")) {
    return [
      "Food-topic visitors usually arrive for curiosity first, then stay if the page shows that taste choice connects to habit and decision style.",
      "This search intent responds well to simple, concrete copy that explains why a fun topic can still lead to a recognizable result.",
      "The strongest secondary action is clicking into other lifestyle quizzes after finishing the result page.",
    ];
  }

  if (lowerTitle.includes("study") || lowerTitle.includes("공부")) {
    return [
      "Study-style searchers want practical value. They are more likely to stay when the intro promises usable insight rather than abstract personality labels.",
      "The best intent match is showing how the result connects to concentration, revision, note-taking, and exam preparation.",
      "This audience is more likely to revisit if the result page suggests concrete habit changes instead of generic encouragement.",
    ];
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("기상")) {
    return [
      "Morning-routine visitors usually want an explanation for why wake-up plans keep failing or feeling inconsistent.",
      "The highest intent match is framing the quiz as a routine-design tool instead of a simple lazy-versus-disciplined label.",
      "These visitors often engage more when the result page includes small next-step actions they can test immediately.",
    ];
  }

  return [
    `${quizTitle} works best for search visitors who want a short answer, a clear result, and a topic that feels familiar enough to start without friction.`,
    "The strongest intent match comes from explaining how the quiz translates a simple theme into a practical personality-style interpretation.",
    "Completion and sharing both improve when the landing page makes the time cost, result usefulness, and next-click path obvious.",
  ];
}

export function getTopicResultFAQs(
  quizTitle: string,
  resultName: string,
): Array<{ question: string; answer: string }> {
  const lowerTitle = quizTitle.toLowerCase();

  if (lowerTitle.includes("drama")) {
    return [
      {
        question: `What does ${resultName} mean in ${quizTitle}?`,
        answer: `${resultName} reflects the kind of role energy you project in conflict, affection, and group attention. It works best as a reading of behavior patterns, not as a literal fictional identity.`,
      },
      {
        question: "Why does this drama-style result feel specific?",
        answer:
          "Drama quizzes feel specific when the result connects your social pacing, emotional expression, and decision style into one recognizable archetype.",
      },
      {
        question: "How should I use this result page?",
        answer:
          "Use it to compare your real reactions in relationships, friend groups, and stressful scenes. That is where the role label becomes practical.",
      },
    ];
  }

  if (lowerTitle.includes("idol") || lowerTitle.includes("k-pop")) {
    return [
      {
        question: `What does ${resultName} mean in ${quizTitle}?`,
        answer: `${resultName} describes the role you most naturally occupy in a group setting, such as direction, energy, atmosphere, or coordination.`,
      },
      {
        question: "Is this result about talent or personality?",
        answer:
          "It is closer to personality in motion. The result focuses on how you behave in group dynamics rather than on performance skill alone.",
      },
      {
        question: "What is the best way to use this result?",
        answer:
          "Compare it with how you act in real teams, friendships, and social events. That makes the role label more useful and more shareable.",
      },
    ];
  }

  if (lowerTitle.includes("pet")) {
    return [
      {
        question: `How should I read ${resultName} in ${quizTitle}?`,
        answer: `${resultName} is an animal-style summary of your attachment, comfort, stimulation, and routine pattern. The point is the lifestyle metaphor, not a literal animal match.`,
      },
      {
        question: "Why do pet-style results feel accurate?",
        answer:
          "They often feel accurate because animal metaphors make emotional style, sensitivity, and social energy easier to notice and compare.",
      },
      {
        question: "How can I use this result in daily life?",
        answer:
          "Use it as a quick check on your routine needs, interaction level, and recovery style. That is where the result becomes more than a fun label.",
      },
    ];
  }

  if (
    lowerTitle.includes("ramen") ||
    lowerTitle.includes("spice") ||
    lowerTitle.includes("food")
  ) {
    return [
      {
        question: `What does ${resultName} mean in ${quizTitle}?`,
        answer: `${resultName} translates your food choice pattern into a repeatable personality or habit signal. The useful part is the decision pattern behind the taste preference.`,
      },
      {
        question: "Why do food results work so well?",
        answer:
          "Food choices are familiar and low-friction, so visitors answer quickly. That often reveals real preference patterns without overthinking.",
      },
      {
        question: "What should I do after reading this result?",
        answer:
          "Compare it with your ordering habits, comfort choices, and willingness to experiment. Then use the related quizzes to see whether the same pattern repeats in other topics.",
      },
    ];
  }

  if (lowerTitle.includes("study")) {
    return [
      {
        question: `What does ${resultName} mean in ${quizTitle}?`,
        answer: `${resultName} describes the learning pattern that showed up most strongly in your answers, such as structure, immersion, flexibility, or pressure response.`,
      },
      {
        question: "Can I use this result to improve studying?",
        answer:
          "Yes. The result is most useful when you turn it into one or two concrete changes in revision rhythm, note-taking, break timing, or review strategy.",
      },
      {
        question: "Why might this result change later?",
        answer:
          "Study behavior changes with stress, deadlines, and environment. That is useful information because it shows which parts of your method are stable and which are situational.",
      },
    ];
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("phone")) {
    return [
      {
        question: `What does ${resultName} mean in ${quizTitle}?`,
        answer: `${resultName} points to the repeat pattern behind your daily habit loop. It highlights how you start, react, delay, or recover inside the same routine.`,
      },
      {
        question: "How can I make this result actionable?",
        answer:
          "Pick the one repeated behavior described in the result that costs you the most time or energy. Change that first instead of trying to redesign everything at once.",
      },
      {
        question: "Why are habit-based result pages useful?",
        answer:
          "Habit topics work because visitors can immediately compare the result with something they do every day. That makes the interpretation easier to trust and apply.",
      },
    ];
  }

  return [
    {
      question: `What does ${resultName} mean in ${quizTitle}?`,
      answer: `${resultName} is the strongest preference pattern detected by the quiz. It should be used as a practical interpretation aid rather than a fixed identity label.`,
    },
    {
      question: "Can this result change later?",
      answer:
        "Yes. Changes in context, mood, or decision criteria can shift the result. That variation is useful because it shows how stable your pattern really is.",
    },
    {
      question: "How should I use this result page?",
      answer:
        "Use the result as a quick reference for your strengths, blind spots, and repeat habits. The page becomes more useful when you compare it with real behavior over time.",
    },
  ];
}

export function getTopicResultUseCases(
  quizTitle: string,
  resultName: string,
): string[] {
  const lowerTitle = quizTitle.toLowerCase();

  if (lowerTitle.includes("drama")) {
    return [
      `${resultName} works best when you compare it with your real behavior in conflict, romance, and group scenes.`,
      "It is especially useful as shareable comparison content because role-based labels are easy to discuss with friends.",
      "The strongest next click is usually another entertainment or relationship-style quiz.",
    ];
  }

  if (lowerTitle.includes("idol") || lowerTitle.includes("k-pop")) {
    return [
      `${resultName} becomes clearer when you compare it with how you behave in teams, chats, or fast-moving social settings.`,
      "This kind of result is strongest when it is used as a group-role explanation instead of a celebrity fantasy label.",
      "Visitors who identify with one role often keep clicking into other pop-culture and personality quizzes.",
    ];
  }

  if (lowerTitle.includes("pet")) {
    return [
      `${resultName} is most useful when you connect it to your actual home rhythm and social battery.`,
      "Animal-style results work well because they make emotional patterns easier to recognize without heavy self-analysis.",
      "The next useful step is checking whether the same pattern repeats in habit, food, or relationship quizzes.",
    ];
  }

  if (
    lowerTitle.includes("ramen") ||
    lowerTitle.includes("spice") ||
    lowerTitle.includes("food")
  ) {
    return [
      `${resultName} is best used as a clue about your comfort zone, experimentation level, and repeat-choice habit.`,
      "Food-themed results perform well because visitors can immediately test whether the pattern shows up in real ordering behavior.",
      "A strong next step is exploring other daily-life quizzes to see whether the same decision style appears again.",
    ];
  }

  if (lowerTitle.includes("study")) {
    return [
      `${resultName} is most useful when you turn the interpretation into one practical study adjustment this week.`,
      "Study results become more accurate when you compare them with your actual exam period behavior rather than your ideal plan.",
      "The best follow-up is another habit or productivity quiz that shows whether the same routine pattern is recurring.",
    ];
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("phone")) {
    return [
      `${resultName} matters most when you map it onto one real loop you repeat every day.`,
      "Habit-based result pages are strongest when they lead to one small behavioral change instead of a full routine reset.",
      "The next click usually comes from curiosity about whether the same pattern appears in another routine-based quiz.",
    ];
  }

  return [
    `${resultName} is most useful when you compare it with your real repeat behavior instead of a one-off mood.`,
    "The strongest value of a result page is showing how one pattern repeats across different kinds of choices.",
    "Use related quizzes to test whether the same preference appears in nearby topics.",
  ];
}
