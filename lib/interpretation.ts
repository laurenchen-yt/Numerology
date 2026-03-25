import { NumerologyResult } from "@/types/numerology";

/**
 * Generate a 300-500 character Traditional Chinese interpretation
 * dynamically based on the numerology result. No fixed templates — 
 * text is assembled by combining contextual fragments.
 */
export function generateInterpretation(result: NumerologyResult): string {
  const {
    lifeNumber,
    talentNumbers,
    zodiacSign,
    digitCounts,
    missingDigits,
    activeLines,
  } = result;

  const parts: string[] = [];

  // --- Life Number personality core ---
  const lifePersonality: Record<number, string> = {
    1: "你天生具備獨立開創的能量，內心有股驅動自己往前的力量，傾向用自己的方式解決問題，不喜歡被框架限制。",
    2: "你天生對人際關係敏銳，能感受他人情緒，擅長在衝突中扮演協調者，溫潤但內斂，需要被看見。",
    3: "你對世界充滿好奇，表達力強，創意旺盛，能用語言或藝術感染身邊的人，但有時思緒散漫，難以聚焦。",
    4: "你重視秩序與穩定，做事踏實有計畫，對承諾認真，是周遭人信任的後盾，但過度謹慎時會壓抑自己。",
    5: "你對自由渴望強烈，喜歡變化與探索，適應力佳，能快速切換情境，但有時缺乏定性，容易分心。",
    6: "你對家庭與責任有深刻認同，重視關係中的付出，有強烈的美感與完美傾向，但容易為他人過度犧牲。",
    7: "你內心世界豐富，喜歡深入思考，善於分析與觀察，偏好獨處或小範圍的深度交流，外表冷靜但感受細膩。",
    8: "你對目標有強烈執行力，重視成果與效率，有天然的商業直覺，但情感上可能較難開放，需要刻意練習柔軟。",
    9: "你有廣闊的視野與同理心，容易看見大局，有理想主義傾向，對人慷慨，但有時會忽略自身的實際需求。",
  };

  parts.push(
    `你的生命數為 ${lifeNumber}，${lifePersonality[lifeNumber] ?? "你有獨特的生命能量等待探索。"}`
  );

  // --- Talent numbers ---
  const talentDesc =
    talentNumbers.length === 2
      ? `天賦數 ${talentNumbers[0]} 與 ${talentNumbers[1]} 交織，代表你在個人特質與表達方式上兼具兩種能量的影響。`
      : `天賦數 ${talentNumbers[0]} 強化了你生命數的核心特質。`;
  parts.push(talentDesc);

  // --- Zodiac influence ---
  const zodiacInfluence: Record<string, string> = {
    牡羊座: "作為牡羊座，你行動力強，敢於冒險，但有時缺乏耐心，容易在半途放棄或衝動行事。",
    金牛座: "金牛座賦予你穩健與耐力，你重視安全感，善於累積，但對改變的抵抗可能限制成長空間。",
    雙子座: "雙子座讓你靈活多變，善於溝通，在不同圈子都能適應，但深度和持續性有時是你需要刻意維持的。",
    巨蟹座: "巨蟹座使你情感豐富，對家庭與親密關係投入深刻，直覺敏銳，但容易受情緒波動影響決策。",
    獅子座: "獅子座帶來強烈的自我表達欲，你有天然的領導氣場，喜歡被肯定，在舞台上最能發揮自己的光芒。",
    處女座: "處女座讓你注重細節與品質，思維縝密，分析能力強，但完美主義可能造成不必要的焦慮。",
    天秤座: "天秤座使你重視公平與美感，善於傾聽不同立場，但在決策時容易猶豫，需要更信任自己的直覺。",
    天蠍座: "天蠍座賦予你深度與洞察力，你不輕易展示內心，但一旦信任便全力投入，情感強烈而忠誠。",
    射手座: "射手座讓你熱愛自由與探索，樂觀進取，但對承諾的謹慎有時會讓親近的人感到難以捉摸。",
    摩羯座: "摩羯座使你目標明確、意志堅定，擅長長期規劃，但對自己的要求高，需要學會適時放鬆。",
    水瓶座: "水瓶座賦予你獨立思考與前瞻視野，你不隨波逐流，但有時過於理性，在情感表達上較為含蓄。",
    雙魚座: "雙魚座讓你充滿同理心與想像力，容易感受他人情緒，但邊界感不足時容易迷失在他人的期待中。",
  };
  parts.push(
    zodiacInfluence[zodiacSign] ?? `${zodiacSign}為你帶來獨特的性格色彩。`
  );

  // --- Grid analysis: dominant and missing digits ---
  const dominantDigits = Object.entries(digitCounts)
    .filter(([, c]) => c >= 3)
    .map(([d]) => d);
  const moderateDigits = Object.entries(digitCounts)
    .filter(([, c]) => c === 2)
    .map(([d]) => d);

  if (dominantDigits.length > 0) {
    parts.push(
      `九宮格中，數字 ${dominantDigits.join("、")} 出現頻繁，顯示這些數字所代表的特質在你的生命中有強烈的存在感，可能是你的優勢，也可能是需要有意識平衡的面向。`
    );
  } else if (moderateDigits.length > 0) {
    parts.push(
      `九宮格中，數字 ${moderateDigits.join("、")} 出現兩次，顯示這些特質在你生命中有穩定的存在，是你較為熟悉且可以依賴的能量。`
    );
  }

  if (missingDigits.length > 0) {
    parts.push(
      `數字 ${missingDigits.join("、")} 在你的生命藍圖中處於缺席狀態，這並非缺陷，而是提示你在這些面向可能較不熟悉，是成長的潛力方向。`
    );
  }

  // --- Active lines ---
  if (activeLines.length > 0) {
    const lineNames: Record<string, string> = {
      "1-2-3": "思維軸（1-2-3）",
      "4-5-6": "意志軸（4-5-6）",
      "7-8-9": "行動軸（7-8-9）",
      "1-4-7": "計畫軸（1-4-7）",
      "2-5-8": "感性軸（2-5-8）",
      "3-6-9": "創造軸（3-6-9）",
      "1-5-9": "決心軸（1-5-9）",
      "3-5-7": "靈感軸（3-5-7）",
    };
    const lineDescs = activeLines
      .map((k) => lineNames[k] ?? k)
      .join("、");
    parts.push(
      `目前你已形成 ${lineDescs}，這些連線代表對應能量在你的生命中有完整的通道，是你可以主動運用的天然優勢。`
    );
  } else {
    parts.push(
      "九宮格中尚未形成完整連線，代表你的能量目前較為分散，各方向都有接觸，但尚在整合階段。這並不是劣勢，而是提示你仍有許多待開發的面向。"
    );
  }

  // --- Growth suggestion ---
  const growthSuggestions: Record<number, string> = {
    1: "學著接受合作並信任他人，不是所有事都需要自己扛。",
    2: "建立更清晰的自我界線，照顧他人之前，先確認自己的需求是否被滿足。",
    3: "將你的創意聚焦到一個方向，深耕比廣撒更能讓你的才能被看見。",
    4: "嘗試在計畫之外留一點空間給自發性，有時候最好的事情就在意料之外。",
    5: "在追求自由的同時，找到一件值得長期投入的事，讓你的能量有所落地。",
    6: "練習說出自己的需求，允許自己偶爾不完美，關係中的脆弱是真實連結的入口。",
    7: "嘗試把你內在的洞見分享出來，你的思想值得被聽見，不要讓它只停留在腦海中。",
    8: "在效率之外，為情感與直覺留出空間，最有力量的決策往往來自理性與感性的整合。",
    9: "在為他人付出之前，先確保自己的根基穩固。你的理想需要現實的土壤才能真正開花。",
  };

  parts.push(
    `成長建議：${growthSuggestions[lifeNumber] ?? "持續聆聽內心的聲音，它永遠是你最可靠的羅盤。"}`
  );

  return parts.join("\n\n");
}
