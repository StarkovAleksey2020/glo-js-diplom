export default class Carousel {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = [],
        modal,
    }) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slides = document.querySelector(wrap).children;
        this.slidesToShow = slidesToShow;
        this.options = {
            infinity,
            position,
            widthSlide: Math.floor(100 / this.slidesToShow),
            maxPosition: this.slides.length - this.slidesToShow,
        };
        this.responsive = responsive;
        this.modal = modal;
    }

    init() {
        this.addCarouselClass();
        this.addStyle();
        if (this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }
        if (this.responsive) {
            this.responseInit();
        }
        this.addOrderBtnListeners();
    }

    addOrderBtnListeners() {
        const orderButtons = Array.from(this.main.querySelectorAll('.img-wrapper'));
        orderButtons.forEach( item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                this.modal.openModal();
                const closeModalBtn = document.getElementById('closeModalBtn');
                
                closeModalBtn.addEventListener('click', () => {
                    this.modal.closeModal();
                });
                this.modal.modalOverlay.addEventListener('click', () => {
                    this.modal.closeModal();
                });
            });
        });
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse) {
                for (let index = 0; index < allResponse.length; index++) {
                    if (widthWindow < allResponse[index]) {
                        this.slidesToShow = this.responsive[index].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        };
        checkResponse();
        window.addEventListener('resize', checkResponse);
    }

    addCarouselClass() {
        this.main.classList.add('carousel-slider');
        this.wrap.classList.add('carousel-slider__wrap');
        for (const item of this.slides) {
            item.classList.add('carousel-slider__item');
        }
    }

    addStyle() {
        let style = document.getElementById('sliderCarousel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }
        style.textContent = `
            .carousel-slider {
                overflow: hidden !important;
            }
            .carousel-slider__wrap {
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .carousel-slider__item {
                display: flex !important;
                justify-content: center;
                align-items: center;
                flex: 0 0 ${this.options.widthSlide}% !important;
                margin: auto 0 !important;
            }
        `;
        if (!document.getElementById(style.id)) {
            document.head.appendChild(style);
        }
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlide.bind(this));
        this.next.addEventListener('click', this.nextSlide.bind(this));
    }

    prevSlide() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    nextSlide() {
        if (this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position;
            if (this.options.position > this.options.maxPosition) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-arrow-left';
        this.next.className = 'glo-arrow-right';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
            .glo-arrow-left,
            .glo-arrow-right {
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }
            .glo-arrow-right {
                border-right-color: #19b5fe;
            }
            .glo-arrow-right {
                border-left-color: #19b5fe;
            }
            .glo-arrow-left:hover,
            .glo-arrow-right:hover,
            .glo-arrow-left:focus,
            .glo-arrow-right:focus,{
                background: transparent;
                outline: transparent;
            }
        `;
        document.head.appendChild(style);
    }
}