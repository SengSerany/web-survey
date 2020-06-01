document.body.addEventListener("click", async (e) => {
    let initElem = e.target;

    if (initElem.classList.contains('btn-outline-danger')){
        e.preventDefault();
        let actionMethod = initElem.parentElement.getAttribute('action');
        let response = await fetch(actionMethod, {
            method: 'DELETE',
        })

        let responseData = response.text();

        if (response.ok === false) {
            console.log(responseData);
        } else {
            const newQuestionID = await actionMethod.match("[^\/]+$")[0]
            const deletedQDiv = document.createElement('div');
            deletedQDiv.className = "alert alert-success alert-dismissible fade show";
            deletedQDiv.setAttribute("role", "alert");
            deletedQDiv.innerHTML = "Cette question à bien été supprimé";

            const closeSuccessBtn = document.createElement("button");
            closeSuccessBtn.setAttribute("type", "button");
            closeSuccessBtn.setAttribute("data-dismiss", "alert")
            closeSuccessBtn.setAttribute("aria-label", "close")
            closeSuccessBtn.className = "close";

            const spanCloseBtn = document.createElement("span");
            spanCloseBtn.setAttribute("aria-hidden", "true");
            spanCloseBtn.innerHTML = "&times;";

            closeSuccessBtn.appendChild(spanCloseBtn);
            deletedQDiv.appendChild(closeSuccessBtn);

            let questionAnim = await document.getElementById(newQuestionID);
            let parentQ = await questionAnim.parentNode
            parentQ.replaceChild(deletedQDiv, questionAnim);


            const alertToDelete = document.querySelector("[role=alert]");
            alertToDelete.parentNode.classList.remove("card");

        }
    }
})