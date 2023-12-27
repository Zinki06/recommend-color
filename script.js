// 감정 또는 상황에 따른 색상과 메시지를 매핑
const emotionsDetails = {
    "행복": { color: '#FFD700', message: '황금빛 행복이 가득한 날입니다!' },
    "사랑": { color: '#FF69B4', message: '사랑과 애정이 가득한 분홍빛 순간입니다.' },
    "성공": { color: '#7CFC00', message: '새로운 성공의 초록빛 기회가 왔어요!' },
    "평온": { color: '#ADD8E6', message: '평온하고 차분한 하늘빛의 안식을 즐기세요.' },
    "열정": { color: '#FF4500', message: '불타오르는 열정을 오렌지빛으로 표현하세요.' },
    "창의력": { color: '#8A2BE2', message: '보라색 상상력이 창의적인 아이디어를 불러일으킵니다.' },
    "우울": { color: '#483D8B', message: '다크블루의 우울함도 때로는 깊은 성찰을 가져다줍니다.' },
    "신비": { color: '#4B0082', message: '신비로운 인디고는 미지의 세계로 안내합니다.' },
    "진정": { color: '#B0C4DE', message: '라이트스틸블루의 진정한 안정을 느껴보세요.' },
    "상쾌": { color: '#3CB371', message: '시원한 민트의 상쾌함으로 하루를 시작하세요.' },
    "명상": { color: '#FFEFD5', message: '파파야휩의 평화로움으로 마음의 여유를 찾아보세요.' },
    "활기": { color: '#DB7093', message: '팔레보라의 활기찬 에너지로 가득 찬 하루를!' },
    "편안": { color: '#F5F5DC', message: '베이지색의 편안함으로 안정감을 찾으세요.' },
    "신선": { color: '#00FFFF', message: '아쿠아마린의 신선한 시작을 응원합니다!' },
    "환희": { color: '#7FFF00', message: '차트리스 그린으로 환희와 즐거움을 만끽하세요.' },
    "기대": { color: '#D2691E', message: '초콜릿색 기대감으로 가득 찬 변화를 맞이하세요.' },
    "포근": { color: '#FFDEAD', message: '따뜻한 나바호화이트의 포근함에 안기세요.' },
    "강인": { color: '#A52A2A', message: '브라운의 강인함으로 어떤 어려움도 이겨내세요.' },
    "안정": { color: '#8FBC8F', message: '다크시그린의 안정감으로 균형 잡힌 하루를.' },
    "소망": { color: '#2E8B57', message: '씨그린의 소망으로 희망찬 미래를 그려보세요.' },
    "설렘": { color: '#BA55D3', message: '오르키드색 설렘으로 가슴 뛰는 순간을 만끽하세요.' },
    "위로": { color: '#778899', message: '라이트슬레이트그레이의 위로가 마음을 감싸줍니다.' },
    "감사": { color: '#FFB6C1', message: '라이트핑크의 감사한 마음을 전하세요.' },
    "평화": { color: '#B22222', message: '파이어브릭의 평화와 안정을 소망합니다.' },
    "기쁨": { color: '#FFA07A', message: '라이트살몬의 기쁨으로 밝은 하루를 시작하세요.' },
    "영감": { color: '#4682B4', message: '스틸블루의 영감으로 창조적인 아이디어를 발산하세요.' },
    "희망": { color: '#6B8E23', message: '올리브드랩의 희망으로 더 나은 내일을 기대하세요.' },
    "안락": { color: '#F08080', message: '라이트코랄의 안락함에 마음을 맡겨보세요.' },
    "자유": { color: '#20B2AA', message: '라이트시그린의 자유로움으로 하루를 즐기세요.' },
    "중립": { color: '#808080', message: '회색의 중립은 모든 감정을 고르게 담아냅니다.' },
};

function getRandomEmotion() {
    const emotions = Object.keys(emotionsDetails);
    const randomIndex = Math.floor(Math.random() * emotions.length);
    return emotions[randomIndex];
}

function analyzeStory(story) {
    let emotionCount = {};
    let maxCount = 0;
    let dominantEmotion = null;

    // 이야기를 분석하여 각 감정의 출현 횟수를 계산
    for (const [emotion, details] of Object.entries(emotionsDetails)) {
        const count = (story.match(new RegExp(emotion, 'gi')) || []).length;
        if (count > 0) {
            emotionCount[emotion] = count;

            if (count > maxCount) {
                maxCount = count;
                dominantEmotion = emotion;
            }
        }
    }

    // 가장 우세한 감정과 해당하는 색상과 메시지를 반환합니다.
    if (dominantEmotion) {
        return { emotion: dominantEmotion, ...emotionsDetails[dominantEmotion] };
    }

    // 어떤 특정 감정도 감지되지 않으면 무작위 감정을 반환합니다.
    const randomEmotion = getRandomEmotion();
    return { emotion: randomEmotion, ...emotionsDetails[randomEmotion] };
}

function analyzeAndDisplayColor() {
    const studentId = document.getElementById('studentId').value.trim();
    const name = document.getElementById('name').value.trim();
    const story = document.getElementById('story').value.trim();

    if (!studentId || !name || !story) {
        alert('학번, 이름 그리고 오늘 하루 있었던 일을 모두 입력해주세요.');
        return;
    }

    const { emotion, color, message } = analyzeStory(story);
    document.getElementById('colorDisplay').style.backgroundColor = color;
    const personalizedLetter = generatePersonalizedLetter(name, emotion, color, message);
    document.getElementById('letter').innerText = personalizedLetter;
}

function generatePersonalizedLetter(name, emotion, color, message) {
    return `${name}님, 오늘의 감정은 '${emotion}'으로, 색상 ${color}이(가) 이를 반영합니다. ${message}`;
}

window.onload = function() {
    document.getElementById('colorButton').onclick = analyzeAndDisplayColor;
}
