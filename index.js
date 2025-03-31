class Dropdown {
    constructor(dropdown, ddBtnSelector, ddListSelector, ddListItemSelector) {
        this.dropdown = dropdown;
        this.button = dropdown.querySelector(ddBtnSelector) || dropdown.querySelector('[role="comboBox"]');
        this.list = dropdown.querySelector(ddListSelector) || dropdown.querySelector('[role="listbox"]');
        this.listItems = dropdown.querySelectorAll('[role="option"]');

        this.isOpen = false;

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

    setupInteractions() {
        this.button.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            this.toggle();
            this.listItems[0]?.focus();
        });

        this.button.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.button.click()
                this.button.focus();
            }
        });

        // this.list.addEventListener('keydown', (event) => {
        // if (event.key === 'Escape') {
        //     this.button.click();
        //     this.button.focus();
        // }
        // if (event.key === 'Enter') {
        //     this.isOpen = false;
        //     this.toggle();
        // }
        // if (event.key === 'Tab') {
        //     this.isOpen = false;
        //     this.toggle();
        // }
        // if (event.key === 'ArrowDown') {
        //     console.log('arrow down');

        //     const focusedItemIndex = Array.from(this.listItems).findIndex((item) => document.activeElement === item);
        //     const nextItemIndex = (focusedItemIndex + 1) % this.listItems.length;
        //     this.listItems[nextItemIndex].focus();
        // }
        // if (event.key === 'ArrowUp') {
        //     const focusedItemIndex = Array.from(this.listItems).findIndex((item) => document.activeElement === item);
        //     const nextItemIndex = (focusedItemIndex - 1 + this.listItems.length) % this.listItems.length;
        //     this.listItems[nextItemIndex].focus();
        // }
        // });

        this.listItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.handleChange();
                this.isOpen = false;
                this.toggle();
            });

            item.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowDown') {
                    const nextItemIndex = (index + 1) % this.listItems.length;
                    this.listItems[nextItemIndex].focus();
                }
                if (event.key === 'ArrowUp') {
                    const prevItemIndex = (index - 1 + this.listItems.length) % this.listItems.length;
                    this.listItems[prevItemIndex].focus();
                }
                if (event.key === 'Enter') {
                    this.handleChange();
                    this.isOpen = false;
                    this.toggle();
                }
            });

        })
        // close dropdown on click outside
        document.addEventListener('click', (event) => {
            if (!this.dropdown.contains(event.target)) {
                this.isOpen = false;
                this.toggle();
            }
        });
    }

    handleChange() {
        console.log('changed');
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