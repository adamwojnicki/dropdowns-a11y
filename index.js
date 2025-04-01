class Dropdown {
    constructor(dropdown, ddBtnSelector, ddListSelector, ddListItemSelector) {
        this.dropdown = dropdown;
        this.button = dropdown.querySelector(ddBtnSelector) || dropdown.querySelector('[role="comboBox"]');
        this.list = dropdown.querySelector(ddListSelector) || dropdown.querySelector('[role="listbox"]');
        this.listItems = dropdown.querySelectorAll('[role="option"]');

        this.isOpen = false;
        this.currentSelectedIndex = 0;

        if (!this.button || !this.list || !this.listItems) {
            console.error('Dropdown initialization failed. Missing required elements.');
            return;
        }
        if (this.listItems.length === 0) {
            console.error('No option items found');
        }
        this.init();
    }

    toggle() {
        this.dropdown.classList.toggle('is-active', this.isOpen);
        this.button.setAttribute('aria-expanded', this.isOpen);
        this.list.setAttribute('aria-hidden', !this.isOpen);
    }

    open() {
        this.isOpen = true;
        this.toggle();
        this.listItems[this.currentSelectedIndex]?.focus();
    }

    close() {
        this.isOpen = false;
        this.toggle();
        this.button.focus();
    }

    setupInteractions() {
        this.button.addEventListener('click', () => this.isOpen ? this.close() : this.open());

        this.button.addEventListener('keydown', (event) => {
            if (event.key.includes(['Enter', 'Space'])) {
                this.open();
            }
            if (event.key === 'Escape') {
                this.close();
            }
        });

        this.list.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.close();
            }
            if (event.key === 'Tab') {
                this.close();
            }
        });

        this.listItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.close();
            });

            item.addEventListener('keydown', (event) => {
                event.preventDefault();
                if (event.key === 'ArrowDown') {
                    const nextItemIndex = (index + 1) % this.listItems.length;
                    this.listItems[nextItemIndex].focus();
                }
                if (event.key === 'ArrowUp') {
                    const prevItemIndex = (index - 1 + this.listItems.length) % this.listItems.length;
                    this.listItems[prevItemIndex].focus();
                }
                if (event.key === 'Enter') {
                    item.click();
                }
                if (event.key === 'Escape') {
                    this.close();
                }
            });

        })
        // close dropdown on click outside
        document.addEventListener('click', (event) => {
            if (!this.dropdown.contains(event.target)) {
                this.close();
            }
        });
    }

    init() {
        this.setupInteractions();
    }
}

// document.addEventListener('DOMContentLoaded', () => {
const dropdowns = document.querySelectorAll('.js-dropdown');
dropdowns.forEach((dropdown) => {
    new Dropdown(dropdown);
});
// });