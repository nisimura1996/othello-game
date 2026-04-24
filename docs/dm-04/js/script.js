document.addEventListener('DOMContentLoaded', () => {
    // GSAP: Register Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Lenis: Smooth Scroll initialization
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // GSAP: Scroll Reveal
    const revealItems = document.querySelectorAll('.js-reveal');
    revealItems.forEach((item) => {
        gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
});
