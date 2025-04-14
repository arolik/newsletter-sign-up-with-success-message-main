
class Form {
    constructor(form){
        this.form = form;
        this.elements = this.form.elements;
        this.errorMessage = this.form.querySelector('#errorMessage');
        this.formInput = this.form.querySelector('input[type="email"]');
        this.formSubmit = this.form.querySelector('input[type="submit"]');
        this.formInput.addEventListener('input', this.handleFormInput.bind(this))
        this.formSubmit.addEventListener('click', this.handleFormSubmit.bind(this));
        this.formModalSuccess = this.form.querySelector('#modalSuccess');
        this.formModalSuccessCloseBtn = this.formModalSuccess.querySelector('#closeModal');
        this.formModalSuccessCloseBtn.addEventListener('click', this.closeModal.bind(this));
        this.mobileView = 768;
        this.isMobileView = false;
        this.changeView.bind(this);
    }

    handleFormInput (e) {
        const elem = e.target;
        if(!elem.validity.valid){
            elem.classList.add('invalidInput');
            if(!this.errorMessage.classList.contains('show-error-message')){
                this.errorMessage.classList.add('show-error-message')
            }
        } else if (elem.validity.valid) {
            elem.classList.remove('invalidInput');
            if(this.errorMessage.classList.contains('show-error-message')){
                this.errorMessage.classList.remove('show-error-message')
            }
        }
    }

    handleFormSubmit (e) {
        e.preventDefault();
        if(!this.formInput.validity.valid){
            return;
        } else if (this.formInput.validity.valid){
            let value = this.formInput.value;
            this.formModalSuccess.classList.toggle('success__modal-hiden');
            this.isMobileView ? this.formModalSuccess.show() : this.formModalSuccess.showModal();
        }
    }

    closeModal () {
        this.formModalSuccess.classList.toggle('success__modal-hiden');
        this.formModalSuccess.close();
    }

    changeView (windowWidth) {
        if(windowWidth <= this.mobileView){
            this.isMobileView = true;
        } else {
            this.isMobileView = false;
        }
    }
}

const form = new Form(document.forms.appForm);
window.addEventListener('resize', () => {
    form.changeView(window.innerWidth)
})