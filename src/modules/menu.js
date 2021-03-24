export default class Menu {
    constructor(menuElement) {
        this.menuElement = menuElement;
    }

    toggleMenu(menuStatus) {
        if (menuStatus) {
            this.menuElement.classList.add('visible-md-inline-block');
            this.menuElement.classList.add('visible-lg-inline-block');
        } else {
            this.menuElement.classList.remove('visible-md-inline-block');
            this.menuElement.classList.remove('visible-lg-inline-block');
        }
        return !menuStatus;
    }
}
