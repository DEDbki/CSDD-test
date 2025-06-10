let currentQuestion = 0;
let totalQuestions = 10;
let startTime;
let timerInterval;
let timeLimit = 600;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let remaining = timeLimit - elapsed;
    if (remaining <= 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
    let minutes = Math.floor(remaining / 60);
    let seconds = remaining % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function sleptAttelus() {
  document.querySelectorAll('.atteluKonteineris').forEach(el => el.style.display = 'none');
}

function paraditAttelu(nr) {
  document.getElementById("attels" + nr).style.display = "block";
}

function nakamaisAttels() {
  if (currentQuestion < totalQuestions) {
    sleptAttelus();
    currentQuestion++;
    paraditAttelu(currentQuestion);
  }
}

function ieprieksejaisAttels() {
  if (currentQuestion > 1) {
    sleptAttelus();
    currentQuestion--;
    paraditAttelu(currentQuestion);
  }
}

function finishQuiz() {
  clearInterval(timerInterval);
  let correctAnswers = 0;
  for (let i = 1; i <= totalQuestions; i++) {
    const selected = document.querySelector(`input[name=q${i}]:checked`);
    if (selected && selected.value === "1") correctAnswers++;
  }
  let totalTime = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("score").textContent = `Pareizās atbildes: ${correctAnswers} no ${totalQuestions}`;
  document.getElementById("elapsed").textContent = `Pavadītais laiks: ${Math.floor(totalTime / 60)}:${(totalTime % 60).toString().padStart(2, '0')}`;
  radatresult(correctAnswers);
  sleptAttelus();
  paraditAttelu(11);
}

function radatresult(score) {
    const resultText = score > 8 ? "Jūs nokārtojāt testu!" : "Jūs nenokartojāt testu.";
    document.getElementById("result").textContent = resultText;
}

function Saktest() {
    currentQuestion ++;
    sleptAttelus();
    paraditAttelu(currentQuestion);
    startTimer();
}

function restartQuiz() {
  currentQuestion = 1;
  document.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
  sleptAttelus();
  paraditAttelu(currentQuestion);
  startTimer();
}

sleptAttelus();
paraditAttelu(currentQuestion);
