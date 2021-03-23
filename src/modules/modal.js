export default class Modal {
    constructor(modalWindow, modalOverlay) {
        this.modalWindow = modalWindow;
        this.modalOverlay = modalOverlay;
    }

    openModal() {
        this.modalOverlay.style.display = 'block';
        this.modalWindow.style.display = 'block';
    }

    closeModal() {
        this.modalOverlay.style.display = 'none';
        this.modalWindow.style.display = 'none';
    }
}
