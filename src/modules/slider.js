export default class Slider {
    constructor(slider, slide, dot) {
        this.slider = slider;
        this.slide = slide;
        this.dot = dot;
        this.currentSlide = 0;
        this.interval = 0;
    }

    startSlide(time = 3000) {
        
        function prevSlide(elem, index, strClass) {
            elem[index].classList.remove(strClass);
        }
        
        function nextSlide(elem, index, strClass) {
            elem[index].classList.add(strClass);
        }
        
        function autoPlaySlide(_this) {
            prevSlide(_this.slide, _this.currentSlide, 'item-slide-active');
            prevSlide(_this.dot, _this.currentSlide, 'dot-active');
            _this.currentSlide++;
            
            if (_this.currentSlide >= _this.slide.length) {
                _this.currentSlide = 0;
            }
            nextSlide(_this.slide, _this.currentSlide, 'item-slide-active');
            nextSlide(_this.dot, _this.currentSlide, 'dot-active');
        }
        this.interval = setInterval(() => {
            autoPlaySlide(this);
        }, time);
    }
    
    stopSlide() {
        clearInterval(this.interval);
    }
        
}