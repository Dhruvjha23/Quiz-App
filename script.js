let timeLeft = 30;
const timerElement = document.getElementById("time");
let timerInterval = startTimer();
let currentQuestion = 0;

const questions = document.querySelectorAll(".question");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const submitBtn = document.getElementById("submit");
const progressBar = document.getElementById("progress-bar");

showQuestion(currentQuestion);

function startTimer() {
    return setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function showQuestion(index) {
    questions.forEach((q, i) => {
        q.style.display = i === index ? "block" : "none";
        if (i === index) {
            q.classList.remove("fade");
            void q.offsetWidth; // Trigger reflow
            q.classList.add("fade");
        }
    });

    prevBtn.style.display = index === 0 ? "none" : "inline-block";
    nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";

    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

submitBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    submitQuiz();
});

function submitQuiz() {
    questions.forEach(question => {
        const selected = question.querySelector("input[type=radio]:checked");
        const feedback = question.querySelector(".feedback");

        if (selected) {
            if (selected.value === question.dataset.answer) {
                feedback.textContent = "Correct!";
                feedback.className = "feedback correct";
            } else {
                feedback.textContent = "Incorrect!";
                feedback.className = "feedback incorrect";
            }
        } else {
            feedback.textContent = "Please select an answer.";
            feedback.className = "feedback incorrect";
        }
    });

    submitBtn.disabled = true;
    nextBtn.disabled = true;
    prevBtn.disabled = true;
}

document.getElementById("reset").addEventListener("click", function () {
    clearInterval(timerInterval);
    questions.forEach(question => {
        question.querySelectorAll("input[type=radio]").forEach(input => input.checked = false);
        const feedback = question.querySelector(".feedback");
        feedback.textContent = "";
        feedback.className = "feedback";
    });

    timeLeft = 30;
    timerElement.textContent = timeLeft;
    timerInterval = startTimer();
    currentQuestion = 0;
    showQuestion(currentQuestion);

    nextBtn.disabled = false;
    prevBtn.disabled = false;
    submitBtn.disabled = false;
});
