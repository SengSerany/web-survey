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
    button.disabled = true;
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
        await document.location.reload(true);
    }

});