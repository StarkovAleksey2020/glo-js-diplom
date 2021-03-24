export default class Accordeon {
    constructor(elementArray) {
        this.elementArray = elementArray;
    }

    init() {
        this.addButtonsHandler();
    }
    addButtonsHandler() {
        this.elementArray.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                let accordeonPromise = new Promise((resolve, reject) => {
                    this.removeActive();
                    resolve("result");
                });
                accordeonPromise
                .then(
                    result => {
                        item.classList.add('active');
                        const itemText = item.querySelector('.element-content');
                        itemText.style.display = 'block';
                    },
                    error => {
                      console.log(error);
                    }
                  );
            });
        });
    }

    removeActive() {
        this.elementArray.forEach(item => {
            item.classList.remove('active');
            const itemText = item.querySelector('.element-content');
            itemText.style.display = 'none';
        });
    }
}