const slider = () => {
    const slide = document.querySelectorAll('.item-slide'),
      btn = document.querySelectorAll('.portfolio-btn'),
      dot = document.querySelectorAll('.dot'),
      slider = document.querySelector('.top-slider');
    
    let currentSlide = 0,
      interval;
  
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
  
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
  
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'item-slide-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'item-slide-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
  
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
  
    const stopSlide = () => {
      clearInterval(interval);
    };
  
    slider.addEventListener('click', (event) => {
      event.preventDefault();
  
      let target = event.target;
  
      if (!target.matches('.dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'item-slide-active');
      prevSlide(dot, currentSlide, 'dot-active');
  
      if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'item-slide-active');
      nextSlide(dot, currentSlide, 'dot-active');
  
    });
  
    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.dot')) {
        stopSlide();
      }
    });
  
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.dot')) {
        startSlide();
      }
  
    });
  
    startSlide(3000);
  };
  
  export default slider;
