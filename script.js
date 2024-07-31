document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const items = document.querySelectorAll('.testimonial-item');
    const totalItems = items.length;
    let autoSlideInterval;

    function showCurrent() {
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }

    function next() {
        currentIndex = (currentIndex + 1) % totalItems;
        showCurrent();
    }

    function prev() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showCurrent();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(next, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    document.querySelector('.next').addEventListener('click', next);
    document.querySelector('.prev').addEventListener('click', prev);

    // Touch controls for swiping
    let startX;

    document.querySelector('.testimonial-carousel').addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    document.querySelector('.testimonial-carousel').addEventListener('touchmove', function(e) {
        if (!startX) return;
        let diffX = startX - e.touches[0].clientX;
        if (Math.abs(diffX) > 30) { // Detect swipe distance
            if (diffX > 0) {
                next();
            } else {
                prev();
            }
            startX = null; // Reset startX after a swipe
        }
    });

    // Start automatic slide show
    startAutoSlide();

    // Stop automatic slide show on user interaction
    document.querySelector('.testimonial-carousel').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.testimonial-carousel').addEventListener('mouseleave', startAutoSlide);
});
