const questions = [
  {
    q: "When something scary or unfair happens, what do you do first?",
    answers: [
      { text: "Jump in to help, no matter the risk.", house: "gryffindor" },
      { text: "Try to calm everyone down and keep things fair.", house: "hufflepuff" },
      { text: "Think it through and find a clever solution.", house: "ravenclaw" },
      { text: "Stay calm and look for a smart advantage.", house: "slytherin" },
    ],
  },
  {
    q: "What would your ideal weekend look like?",
    answers: [
      { text: "Going on an adventure or helping a friend.", house: "gryffindor" },
      { text: "Baking, gardening, or spending time with loved ones.", house: "hufflepuff" },
      { text: "Reading, drawing, or learning something new.", house: "ravenclaw" },
      { text: "Planning your next big success or practicing a skill.", house: "slytherin" },
    ],
  },
  {
    q: "Which magical creature would you want as a companion?",
    answers: [
      { text: "A brave phoenix 🦜", house: "gryffindor" },
      { text: "A loyal badger 🦡", house: "hufflepuff" },
      { text: "A wise raven 🦅", house: "ravenclaw" },
      { text: "A sleek serpent 🐍", house: "slytherin" },
    ],
  },
  {
    q: "What do your friends say about you?",
    answers: [
      { text: "You’re brave and protective.", house: "gryffindor" },
      { text: "You’re kind and dependable.", house: "hufflepuff" },
      { text: "You’re smart and creative.", house: "ravenclaw" },
      { text: "You’re confident and determined.", house: "slytherin" },
    ],
  },
  {
    q: "What’s your biggest strength?",
    answers: [
      { text: "Courage — I never give up.", house: "gryffindor" },
      { text: "Loyalty — I always stand by others.", house: "hufflepuff" },
      { text: "Intelligence — I love to learn and think differently.", house: "ravenclaw" },
      { text: "Ambition — I know how to get things done.", house: "slytherin" },
    ],
  },
];

const characters = {
  gryffindor: [
    { name: "Harry Potter", desc: "You’re brave, loyal, and always stand up for what’s right!" },
    { name: "Hermione Granger", desc: "You’re clever, courageous, and care deeply about fairness." },
  ],
  hufflepuff: [
    { name: "Cedric Diggory", desc: "You’re kind, fair, and admired for your quiet strength." },
    { name: "Nymphadora Tonks", desc: "You’re funny, loyal, and always true to yourself." },
  ],
  ravenclaw: [
    { name: "Luna Lovegood", desc: "You’re imaginative, wise, and wonderfully unique." },
    { name: "Filius Flitwick", desc: "You’re clever, cheerful, and love helping others learn." },
  ],
  slytherin: [
    { name: "Draco Malfoy", desc: "You’re ambitious, witty, and secretly care more than you show." },
    { name: "Bellatrix Lestrange", desc: "You’re bold, fearless, and powerful — though a bit intense!" },
  ],
};

let currentQuestion = 0;
let scores = { gryffindor: 0, hufflepuff: 0, ravenclaw: 0, slytherin: 0 };
let selectedHouse = null;

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");

function loadQuestion() {
  const q = questions[currentQuestion];
  quizDiv.innerHTML = `
    <h2>${q.q}</h2>
    <div class="answers">
      ${q.answers
        .map(
          (a, i) =>
            `<div class="answer" onclick="selectAnswer('${a.house}', this)">${a.text}</div>`
        )
        .join("")}
    </div>
  `;
}

function selectAnswer(house, element) {
  document.querySelectorAll(".answer").forEach((el) => el.classList.remove("selected"));
  element.classList.add("selected");
  selectedHouse = house;
}

function nextQuestion() {
  if (!selectedHouse) {
    alert("Please choose an answer first!");
    return;
  }

  scores[selectedHouse]++;
  selectedHouse = null;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizDiv.classList.add("hidden");
  nextBtn.classList.add("hidden");

  const topHouse = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const charList = characters[topHouse];
  const chosenChar = charList[Math.floor(Math.random() * charList.length)];

  document.getElementById("character-name").textContent = chosenChar.name;
  document.getElementById("character-description").textContent = chosenChar.desc;
  resultDiv.classList.remove("hidden");
}

loadQuestion();
