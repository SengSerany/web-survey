const scaleAnswer = document.getElementById('scaleAnswer');
const orderAnswer = document.getElementById('orderAnswer');
const inputAnswer = document.getElementById('inputAnswer');
const checkBoxAnswer = document.getElementById('checkBoxAnswer');
const answerField = document.getElementById('answer');
const answerNumber = document.getElementById('answerNumber');

let createAnswerNameField = () => {
    
}

answerNumber.addEventListener('change', (e) => {
    let nbAnswer = parseInt(e.target.value);
    let answerNameFieldToAdd = nbAnswer - 2;
    
})

scaleAnswer.addEventListener('click', () => {
    if (answerField.classList.contains("d-none")){
    } else {
        answerField.classList.add('d-none');
    };
})

orderAnswer.addEventListener('click', () => {
    if (answerField.classList.contains("d-none")){
        answerField.classList.remove('d-none');
    } else {
    };
})

inputAnswer.addEventListener('click', () => {
    if (answerField.classList.contains("d-none")){
        answerField.classList.remove('d-none');
    } else {
    };
})

checkBoxAnswer.addEventListener('click', () => {
    if (answerField.classList.contains("d-none")){
        answerField.classList.remove('d-none');
    } else {
    };
})