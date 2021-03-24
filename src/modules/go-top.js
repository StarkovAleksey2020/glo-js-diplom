export default class GoTop {
    constructor(button, position) {
        this.button = button;
        this.position = position;
    }

    init() {
        this.addListener();
        window.addEventListener('scroll', () => {
            let currentScrollPosition = window.scrollY;
            if (currentScrollPosition >= this.position) {
                this.showButton();
            } else {
                this.hideButton();
            }
        });

    }

    showButton() {
        this.button.style.display = 'block';
    }
    hideButton() {
        this.button.style.display = 'none';
    }
    addListener() {
        this.button.addEventListener('click', () => {
            const topPoint = document.getElementById('topPoint');
            topPoint.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
        });
    }
}