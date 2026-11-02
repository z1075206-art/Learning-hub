const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mainNav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

// Search the course cards
const courseSearch = document.getElementById('courseSearch');
const courseCards = [...document.querySelectorAll('.course-card')];
courseSearch.addEventListener('input', () => {
  const term = courseSearch.value.trim().toLowerCase();
  let visible = 0;
  courseCards.forEach(card => {
    const match = (card.innerText + ' ' + card.dataset.search).toLowerCase().includes(term);
    card.hidden = !match;
    if (match) visible++;
  });
  document.getElementById('noCourses').hidden = visible !== 0;
});

// Sample quiz: choose an answer, get feedback, and see a score.
const questions = [
  {q:'Which language is used to structure a web page?', options:['CSS','HTML','SQL','Python'], answer:1, why:'HTML provides the structure of a web page.'},
  {q:'Which language is mainly used to style a web page?', options:['CSS','HTML','C++','SQL'], answer:0, why:'CSS controls colours, spacing, layout and visual style.'},
  {q:'Which accounting equation is correct?', options:['Assets = Liabilities + Equity','Assets = Revenue − Expenses','Liabilities = Assets + Equity','Equity = Assets + Liabilities'], answer:0, why:'The basic accounting equation is Assets = Liabilities + Equity.'}
];
let questionIndex = 0, score = 0, answered = false;
const questionText = document.getElementById('questionText');
const answerOptions = document.getElementById('answerOptions');
const questionCounter = document.getElementById('questionCounter');
const quizFeedback = document.getElementById('quizFeedback');
const nextQuestion = document.getElementById('nextQuestion');
function renderQuestion() {
  answered = false;
  const item = questions[questionIndex];
  questionCounter.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
  questionText.textContent = item.q;
  quizFeedback.textContent = '';
  answerOptions.innerHTML = '';
  item.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.type = 'button';
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.addEventListener('click', () => selectAnswer(index));
    answerOptions.appendChild(button);
  });
  nextQuestion.disabled = true;
  nextQuestion.textContent = questionIndex === questions.length - 1 ? 'See Results →' : 'Next Question →';
}
function selectAnswer(selected) {
  if (answered) return;
  answered = true;
  const item = questions[questionIndex];
  [...answerOptions.children].forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add('correct');
    if (index === selected && selected !== item.answer) button.classList.add('wrong');
  });
  if (selected === item.answer) {
    score++;
    quizFeedback.textContent = `Correct! ${item.why}`;
  } else {
    quizFeedback.textContent = `Not quite. ${item.why}`;
  }
  nextQuestion.disabled = false;
}
nextQuestion.addEventListener('click', () => {
  if (!answered) return;
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    questionText.textContent = `You scored ${score} out of ${questions.length}!`;
    answerOptions.innerHTML = '';
    questionCounter.textContent = 'Quiz complete';
    quizFeedback.textContent = score === questions.length ? 'Excellent work! Try again to practice.' : 'Good effort. You can practice again to improve your score.';
    nextQuestion.textContent = 'Try Again ↻';
    nextQuestion.disabled = false;
    nextQuestion.onclick = () => {
      questionIndex = 0; score = 0; nextQuestion.onclick = null; renderQuestion();
    };
  }
});
renderQuestion();

// Login modal is a front-end demonstration only. Do not enter a real password.
const loginModal = document.getElementById('loginModal');
document.getElementById('openLogin').addEventListener('click', () => {
  loginModal.classList.add('show'); loginModal.setAttribute('aria-hidden','false');
});
function closeModal() { loginModal.classList.remove('show'); loginModal.setAttribute('aria-hidden','true'); }
document.getElementById('closeLogin').addEventListener('click', closeModal);
loginModal.addEventListener('click', event => { if (event.target === loginModal) closeModal(); });
document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('loginFeedback').textContent = 'Demo successful! Real student accounts need a secure backend.';
});

// Contact form demo: no email is actually sent.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('contactFeedback').textContent = 'Thank you! This demo form does not send messages yet.';
  event.target.reset();
});
