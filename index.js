class Dropdown {
    constructor(dropdown, ddBtnSelector, ddListSelector) {
        this.dropdown = dropdown;
        this.button = dropdown.querySelector(ddBtnSelector) || dropdown.querySelector('.js-dropdown-button');
        this.list = dropdown.querySelector(ddListSelector) || dropdown.querySelector('.js-dropdown-list');
        this.isOpen = false;

        this.init();
    }

    toggle() {
        // this.isOpen = !this.isOpen;
        this.dropdown.classList.toggle('is-active', this.isOpen);
        this.button.setAttribute('aria-expanded', this.isOpen);
        this.list.setAttribute('aria-hidden', !this.isOpen);
    }

    init() {
        this.button.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            this.toggle();
        });

        this.list.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.isOpen = false;
                this.toggle();
            }
            if (event.key === 'Enter') {
                this.isOpen = false;
                this.toggle();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.js-dropdown');
    dropdowns.forEach((dropdown) => {
        new Dropdown(dropdown);
    });
});