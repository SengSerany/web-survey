const form = document.getElementById('questionForm');
const button = form.querySelector('button[type=submit]');
const inputQuestion = form.querySelector('[name=question]');
const types = form.querySelectorAll('[name=answerType]');
const surveyID = form.querySelector('[name=surveyID]').value;

const inputAnswerType = () => {
            for (let i=0; i < types.length; i++) {
                if ( types[i].checked ) {
                    return types[i].value
                }
            }
        };

form.addEventListener('submit', async (e) => {
    button.disable = true;
    e.preventDefault();
    const answers = form.querySelectorAll('[name=answerName]');
    let aList = [];


    for (let j = 0; j < answers.length; j++) {
        aList.push(answers[j].value);
    }

        let response = await fetch(form.getAttribute('action'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: await new URLSearchParams({
                question: inputQuestion.value,
                survey: surveyID,
                answerType: inputAnswerType(),
                answerNumber: answers.length,
                answerName: aList
            })
        });
        let responseData = response.text();

    if (response.ok === false) {
    } else {
        const questionsArea = document.getElementById('questionsArea');

        const questionDiv = document.createElement('div');
        questionDiv.className = 'questions';
        questionDiv.classList.add("card");

        const questionH4 = document.createElement('h4');
        questionH4.className = 'card-header';
        questionH4.innerHTML = inputQuestion.value;

        const bodyCardDiv = document.createElement('div');
        bodyCardDiv.className = 'card-body';

        const questionTypeP = document.createElement('p');
        questionTypeP.innerHTML = `Type de réponse: ${inputAnswerType()}`

        questionDiv.appendChild(questionH4);
        bodyCardDiv.appendChild(questionTypeP);
        questionDiv.appendChild(bodyCardDiv);

        const currentAnswers = form.querySelectorAll('[name=answerName]');

        if (inputAnswerType() === 'Ordonner' | inputAnswerType() === 'Selection-s'){

            const questionAnswersP = document.createElement('p');
            questionAnswersP.innerHTML = 'Réponse-s possible-s:';
            bodyCardDiv.appendChild(questionAnswersP);

            const answersUl = document.createElement('ul');

            for (let i = 0; i < currentAnswers.length; i++) {
                const answerLi = document.createElement('li');
                answerLi.innerHTML = currentAnswers[i].value;
                answersUl.appendChild(answerLi);
            };

            bodyCardDiv.appendChild(answersUl);
        }

        if (document.getElementsByClassName("alert alert-primary").length !== 0) {

            const previousNewQ = await document.getElementsByClassName("alert-primary");
            previousNewQ[0].classList.remove("alert");
            previousNewQ[0].classList.remove("alert-primary");

        }

        if (document.getElementsByClassName("alert alert-warning").length !== 0) {

            const alertMess = await document.getElementById("questionsArea");
            alertMess.innerHTML = "";

        }

        questionDiv.classList = "alert alert-primary";
        questionsArea.appendChild(questionDiv);

        eraseForm(currentAnswers.length);
    }
    button.disable = false;
})

let eraseForm = (nbAnswer) => {
    const currentAnswers = form.querySelectorAll('[name=answerName]');

    inputQuestion.value = "";

    const answerGroup = document.getElementById("answer");
    answerGroup.className = "d-none";

    const answerField = document.getElementsByClassName("answerNameGroup");

    while (answerField.length !== 1) {
        answerField[answerField.length - 1].remove();
    }

    currentAnswers[0].value = "";

    const numberSelect = form.querySelector('[name=answerNumber]');
    numberSelect.options.selectedIndex = 0;

    types[0].checked = true;
};