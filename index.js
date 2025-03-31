class Dropdown {
    constructor(dropdown, ddBtnSelector, ddListSelector, ddListItemSelector) {
        this.dropdown = dropdown;
        this.button = dropdown.querySelector(ddBtnSelector) || dropdown.querySelector('[role="comboBox"]');
        this.list = dropdown.querySelector(ddListSelector) || dropdown.querySelector('[role="menu"]');
        this.listItems = dropdown.querySelectorAll(ddListItemSelector) || dropdown.querySelectorAll('[role="menuitem"]');
        this.links = dropdown.querySelectorAll('[role="menuitem"] a');

        this.isOpen = false;

        if (!this.button || !this.list || !this.listItems) {
            console.error('Dropdown initialization failed. Missing required elements.');
            return;
        }
        this.init();
    }

    toggle() {
        this.dropdown.classList.toggle('is-active', this.isOpen);
        this.button.setAttribute('aria-expanded', this.isOpen);
        this.list.setAttribute('aria-hidden', !this.isOpen);
    }

    init() {
        this.button.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            this.toggle();
            this.links[0]?.focus();
        });

        this.button.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.isOpen = false;
                this.toggle();
                this.button.focus();
            }
        });

        this.list.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.isOpen = false;
                this.toggle();
                this.button.focus();
            }
            if (event.key === 'Enter') {
                this.isOpen = false;
                this.toggle();
            }
            if (event.key === 'ArrowDown') {
                const focusedItemIndex = Array.from(this.links).findIndex((item) => document.activeElement === item);
                const nextItemIndex = (focusedItemIndex + 1) % this.links.length;
                this.links[nextItemIndex].focus();
            }
            if (event.key === 'ArrowUp') {
                const focusedItemIndex = Array.from(this.links).findIndex((item) => document.activeElement === item);
                const nextItemIndex = (focusedItemIndex - 1 + this.links.length) % this.links.length;
                this.links[nextItemIndex].focus();
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