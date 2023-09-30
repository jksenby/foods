import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";
function forms(formSelector, modalTimerID) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thank you! We connect with you soon',
        failure: 'Something went wrong...'
    }
    forms.forEach(item => {
        bindPostData(item)
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
    

            postData('http://localhost:3000/requests', json)
            .then(data => { console.log(data)
                    showModalDialogue(message.success);
                    statusMessage.remove();
            }).catch(() => {
                showModalDialogue(message.failure)
            }).finally(() => {
                form.reset();
            })
        })
    }


    function showModalDialogue(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = "none";
        openModal('.modal', modalTimerID);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = "block";
            closeModal('.modal');
        },4000);
    }
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

export default forms;