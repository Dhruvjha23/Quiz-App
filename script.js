        let timeLeft = 30;
        const timerElement = document.getElementById("time");
        const timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                clearInterval(timerInterval);
                document.getElementById("submit").click();
                document.getElementById("submit").disabled = true;
            }
        }, 1000);

        document.getElementById("submit").addEventListener("click", function() {
            document.querySelectorAll(".question").forEach(question => {
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
        });
        
        document.getElementById("reset").addEventListener("click", function() {
            document.querySelectorAll("input[type=radio]").forEach(input => input.checked = false);
            document.querySelectorAll(".feedback").forEach(feedback => {
                feedback.textContent = "";
                feedback.className = "feedback";
            });
            timeLeft = 30;
            timerElement.textContent = timeLeft;
            clearInterval(timerInterval);
            setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    timerElement.textContent = timeLeft;
                }
            }, 1000);
            document.getElementById("submit").disabled = false;
        });
