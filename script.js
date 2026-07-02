const app = document.querySelector(".app");
const beginButton = document.querySelector(".begin-btn");

let currentQuestion = 0;
let answers = {};

function showWelcome() {
  app.innerHTML = `
    <section class="card fade-in">
      <div class="seed">🌱</div>
      <p class="eyebrow">WELCOME</p>
      <h1>Hi.</h1>
      <p>I'm really glad you're here.</p>
      <p>There are no wrong answers.</p>
      <p>Let's slow things down together.</p>
      <button class="begin-btn" onclick="showQuestion()">Continue</button>
      <p class="small">🌱 One moment. One next step.</p>
    </section>
  `;
}

function showQuestion() {
  const question = questions[currentQuestion];

  app.innerHTML = `
    <section class="card fade-in">
      <div class="seed">${currentQuestion === 0 ? "🌱" : "🌿"}</div>
      <p class="eyebrow">RESET</p>
      <h1>${question.text}</h1>
      <div class="options">
        ${question.options
          .map(option => `<button class="option-btn" onclick="saveAnswer('${question.id}', '${option}')">${option}</button>`)
          .join("")}
      </div>
      <p class="small">Take your time. There are no wrong answers.</p>
    </section>
  `;
}

function saveAnswer(id, value) {
  answers[id] = value;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  app.innerHTML = `
    <section class="card fade-in">
      <div class="seed">🌿</div>
      <p class="eyebrow">YOUR NEXT STEP</p>
      <h1>Your seed has been planted.</h1>
      <p>You don't have to grow the whole tree today.</p>

      <h2>Today</h2>
      <ul>
        <li>Drink a glass of water.</li>
        <li>Take one slow breath.</li>
        <li>Choose one small thing you can do next.</li>
      </ul>

      <h2>This Week</h2>
      <ul>
        <li>Write down what feels heaviest.</li>
        <li>Ask one trusted person for support.</li>
        <li>Celebrate one small win.</li>
      </ul>

      <button class="begin-btn" onclick="continueWithAI()">Continue with AI Support</button>
      <p class="small">🌱 One moment. One next step.</p>
    </section>
  `;
}

function continueWithAI() {
  const prompt = encodeURIComponent(
    `I just completed a Reset Button check-in. My answers were: ${JSON.stringify(answers)}. Please help me create a kind, practical next-step plan.`
  );

  window.open(`https://chat.openai.com/?q=${prompt}`, "_blank");
}

if (beginButton) {
  beginButton.addEventListener("click", showWelcome);
}