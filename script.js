document.addEventListener('DOMContentLoaded', () => {
    const problemElement = document.getElementById('problem');
    const answerDisplay = document.getElementById('answer-display');
    const resultElement = document.getElementById('result');
    const nextButton = document.getElementById('next-button');
    const keypad = document.getElementById('keypad');

    let correctAnswer;
    let userAnswer = '';

    function generateProblem() {
        userAnswer = '';
        answerDisplay.textContent = userAnswer;
        resultElement.textContent = '';
        nextButton.style.display = 'none';
        keypad.style.display = 'grid'; // テンキーを再表示

        const type = Math.floor(Math.random() * 3);
        let num1, num2;

        switch (type) {
            case 0: // 足し算
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * 90) + 10;
                correctAnswer = num1 + num2;
                problemElement.textContent = `${num1} + ${num2} = `;
                break;
            case 1: // 引き算
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * num1);
                correctAnswer = num1 - num2;
                problemElement.textContent = `${num1} - ${num2} = `;
                break;
            case 2: // 掛け算 (九九)
                num1 = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
                correctAnswer = num1 * num2;
                problemElement.textContent = `${num1} × ${num2} = `;
                break;
        }
    }

    function checkAnswer() {
        const userAnswerInt = parseInt(userAnswer, 10);

        if (userAnswerInt === correctAnswer) {
            resultElement.textContent = 'せいかい！';
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = `まちがい... こたえは ${correctAnswer}`;
            resultElement.style.color = 'red';
        }
        nextButton.style.display = 'block';
        keypad.style.display = 'none'; // 正解・不正解表示中はキーパッドを隠す
    }

    function handleKeyPress(e) {
        if (e.target.matches('.number')) {
            userAnswer += e.target.textContent;
            answerDisplay.textContent = userAnswer;
        } else if (e.target.matches('.clear')) {
            userAnswer = '';
            answerDisplay.textContent = userAnswer;
        } else if (e.target.matches('.check')) {
            if (userAnswer !== '') {
                checkAnswer();
            }
        }
    }

    keypad.addEventListener('click', handleKeyPress);
    nextButton.addEventListener('click', generateProblem);

    generateProblem();
});