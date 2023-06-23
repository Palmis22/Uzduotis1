function universalModalFunctionality(text) {

    const universalModalContainer = document.querySelector('.universal-modal-container');

    universalModalContainer.innerHTML = `
        <button class="close-btn-modal"><i class="fa-solid fa-rectangle-xmark"></i></button>
        <div class="d-flex justify-content-center align-items-center universal-module-div">
            <p>${text}</p>
        </div>`



    const universalModal = document.querySelector('.universal-modal-overlay');
    universalModal.classList.add('open-universal-modal');
    const closeBtn = document.querySelector('.close-btn-modal');


    closeBtn.addEventListener('click', () => {
        universalModal.classList.remove('open-universal-modal');
    })
   

  
    window.addEventListener('click', function (e) {

        if (e.target === universalModal) {
            universalModal.classList.remove('open-universal-modal');
        }
    })

   
    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            universalModal.classList.remove('open-universal-modal');
        }
    });
}


export { universalModalFunctionality }

