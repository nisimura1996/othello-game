document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Animation
    const heroTl = gsap.timeline();

    // Label Parallax
    gsap.to(".o-section-label", {
        y: -150,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    // Title Line-by-Line Reveal
    heroTl.from(".hero__title-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2
    }, "+=0.5");

    heroTl.from(".hero__sub", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");

    heroTl.from(".hero__lead, .hero__cta", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    }, "-=0.5");

    // Hero Image Parallax (Zoom out on scroll)
    gsap.to(".hero::before", {
        scale: 1.2,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 2. Section Reveal Animations
    const revealSections = document.querySelectorAll("section:not(.hero, .features)");

    revealSections.forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // 2.1 Features Staggered Reveal
    gsap.from(".features__item", {
        scrollTrigger: {
            trigger: "#features", // IDを優先して確実にトリガー
            start: "top 85%", // 少し早めに開始して「出ない」リスクを回避
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all" // 終了後にスタイルをクリアして干渉を防ぐ
    });

    // 3. Concept Image Parallax & Frame Reveal
    gsap.to(".concept__img", {
        y: -50,
        scrollTrigger: {
            trigger: ".concept",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        }
    });

    gsap.from(".o-img-frame", {
        x: -40,
        y: -40,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".concept",
            start: "top 70%"
        }
    });

    // 4. Atmosphere Grid Interaction
    const atmosphereItems = document.querySelectorAll(".atmosphere__img-item");
    atmosphereItems.forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: ".atmosphere",
                start: "top 70%",
            },
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: i * 0.2,
            ease: "back.out(1.7)"
        });
    });

    // 6. Editorial Layer Animations (New)
    // Parallax Section Numbers
    const sectionNums = document.querySelectorAll(".o-section-num");
    sectionNums.forEach(num => {
        gsap.to(num, {
            y: -100,
            scrollTrigger: {
                trigger: num.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }
        });
    });

    // Connecting Lines Animation
    const oLines = document.querySelectorAll(".o-line");
    oLines.forEach(line => {
        gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: line,
                start: "top 80%"
            }
        });
    });

    // Motif Floating
    gsap.to(".o-motif", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
    });

    // 8. 120% Feature: Interactive FAQ Num
    const faqItems = document.querySelectorAll(".faq__item");
    const faqNum = document.getElementById("faq-num");

    faqItems.forEach(item => {
        item.addEventListener("toggle", () => {
            if (item.open) {
                gsap.to(faqNum, {
                    scale: 1.2,
                    rotate: -10,
                    opacity: 0.1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                });
            } else {
                // Return if all closed (simplified logic)
                gsap.to(faqNum, {
                    scale: 1,
                    rotate: 0,
                    opacity: 0.05,
                    duration: 0.5
                });
            }
        });
    });

    // 9. Interactive Features Cleanup
});
