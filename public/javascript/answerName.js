const scaleAnswer = document.getElementById('scaleAnswer');
const orderAnswer = document.getElementById('orderAnswer');
const inputAnswer = document.getElementById('inputAnswer');
const checkBoxAnswer = document.getElementById('checkBoxAnswer');
const answerField = document.getElementById('answer');
const answerNumber = document.getElementById('answerNumber');
const answerNames = document.getElementsByClassName('answerNameGroup');

let createAnswerNameField = (nb) => {

    let brElement = document.createElement('br');

    let divElement = document.createElement('div');
    divElement.classList.add('form-group', 'answerNameGroup');

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', 'answerName');
    labelElement.innerHTML = `Réponse ${nb}`

    let inputElement = document.createElement('input');
    inputElement.className = 'form-control';
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('id', `answerName${nb}`);
    inputElement.setAttribute('name', 'answerName');

    divElement.appendChild(labelElement);
    divElement.appendChild(inputElement);
    divElement.appendChild(brElement);

    let addAnswerNamesLength= answerNames.length;
    let addLastAnswerName =  answerNames[addAnswerNamesLength - 1];
    addLastAnswerName.parentNode.insertBefore(divElement, addLastAnswerName.nextSibling);
}

let removeAnswerNameField = () => {
    let subAnswerNamesLength = answerNames.length;
    let subLastAnswerName = answerNames[subAnswerNamesLength - 1];
    subLastAnswerName.remove();
}

answerNumber.addEventListener('change', (e) => {

    let nbAnswer = parseInt(e.target.value);

    if (answerNames.length < nbAnswer){
        for (answerNames.length; answerNames.length < nbAnswer; answerNames.length++){
            createAnswerNameField(parseInt(answerNames.length + 1));
        }
    } else if (answerNames.length > nbAnswer) {
        for (answerNames.length; answerNames.length > nbAnswer; answerNames.length++){
            removeAnswerNameField();
        }
    } else {
        alert("Une erreur s'est produite :c ...");
    }
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