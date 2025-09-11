document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate the numbers
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Function to handle the animation
    function handleScrollAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        statNumbers.forEach((number) => {
            if (number.getAttribute('data-animated') !== 'true' && isInViewport(number)) {
                const target = parseInt(number.getAttribute('data-count'), 10);
                const duration = 2000; // 2 seconds
                animateValue(number, 0, target, duration);
                number.setAttribute('data-animated', 'true');
            }
        });
    }

    // Initial check in case numbers are already in viewport
    handleScrollAnimation();

    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimation);
});
