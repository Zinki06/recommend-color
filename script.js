

// 감성 분석을 위한 모델 로드 및 초기화
let model;
toxicity.load(0.9).then(mod => {
  model = mod;
});

function analyzeAndDisplayColor() {
  const story = document.getElementById('story').value;
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  document.getElementById('colorDisplay').style.backgroundColor = randomColor;

  analyzeSentiment(story).then(sentiment => {
    const personalizedLetter = generatePersonalizedLetter(story, randomColor, sentiment);
    document.getElementById('letter').innerText = personalizedLetter;
  });
}

function analyzeSentiment(story) {
  return new Promise((resolve, reject) => {
    if (!model) {
      resolve('neutral');
      return;
    }
    model.classify([story]).then(predictions => {
      // 부정적인 내용이 감지되면 'negative'를, 그렇지 않으면 'positive'를 반환
      const hasNegative = predictions.some(prediction => prediction.results[0].match);
      resolve(hasNegative ? 'negative' : 'positive');
    });
  });
}

function generatePersonalizedLetter(story, color, sentiment) {
  let message = `오늘의 당신을 나타내는 컬러는 ${color}입니다. `;
  if(sentiment === 'positive') {
    message += `이 색상은 당신의 긍정적인 오늘을 반영하며, 행복과 에너지를 가져다줄 것입니다!`;
  } else if(sentiment === 'negative') {
    message += `이 색상은 어려움을 겪고 있는 당신에게 위로와 평온을 가져다줄 것입니다.`;
  } else {
    message += `이 색상은 당신의 다채로운 감정을 반영합니다. 오늘 하루를 잘 마무리하세요!`;
  }
  return message;
}
