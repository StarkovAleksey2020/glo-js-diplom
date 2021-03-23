const addDots = () => {
    const slideCount = document.querySelectorAll('.item-slide').length;
    const dotsCount = document.querySelectorAll('.dot').length;
    
    if (dotsCount < slideCount) {
      const dotsUl = document.querySelector('.portfolio-dots');
      for (let i = 0; i <= slideCount - 1; i++) {
        const li = document.createElement('li');
        li.classList.add('dot');
        if (i === 0) li.classList.add('dot-active');
        dotsUl.append(li);
      }
    }
  };
  
  export default addDots;