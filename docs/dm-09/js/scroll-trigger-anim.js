/**
 * GSAP & ScrollTrigger Cinematic Animations Controller
 */
document.addEventListener('DOMContentLoaded', () => {
	// Register ScrollTrigger Plugin
	gsap.registerPlugin(ScrollTrigger);

	// 1. Hero Background Parallax & Scale
	const heroBgImg = document.querySelector('.js-parallax-hero img');
	if (heroBgImg) {
		gsap.to(heroBgImg, {
			yPercent: 12,
			scale: 1.1,
			ease: 'none',
			scrollTrigger: {
				trigger: '.hero',
				start: 'top top',
				end: 'bottom top',
				scrub: true
			}
		});
	}

	// 2. Character-by-Character Staggered Reveal for Vertical Headings
	const revealCharsEls = document.querySelectorAll('.js-reveal-chars');
	revealCharsEls.forEach((el) => {
		const text = el.innerHTML;
		// Split by <br> tags to preserve vertical line breaks
		const parts = text.split(/<br\s*\/?>/i);
		let newHTML = '';

		parts.forEach((part, index) => {
			const chars = [...part];
			chars.forEach((char) => {
				// Wrap each char in an inline-block span for independent movement
				newHTML += `<span class="char-span" style="display: inline-block; opacity: 0; transform: translateY(30px);">${char}</span>`;
			});
			if (index < parts.length - 1) {
				newHTML += '<br>';
			}
		});
		el.innerHTML = newHTML;

		const charSpans = el.querySelectorAll('.char-span');
		gsap.to(charSpans, {
			opacity: 1,
			y: 0,
			duration: 1,
			stagger: 0.04,
			ease: 'power4.out',
			scrollTrigger: {
				trigger: el,
				start: 'top 85%',
				toggleActions: 'play none none none'
			}
		});
	});

	// 3. Smooth Fade-in-Up for Content Columns and Headers
	const revealFadeEls = document.querySelectorAll('.js-reveal-fade');
	revealFadeEls.forEach((el) => {
		gsap.fromTo(el, 
			{
				opacity: 0,
				y: 35
			}, 
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			}
		);
	});

	// 4. Subtle Slide-up Stagger for Grid Cards
	const revealUpEls = document.querySelectorAll('.js-reveal-up');
	revealUpEls.forEach((el) => {
		gsap.fromTo(el, 
			{
				opacity: 0,
				y: 40
			}, 
			{
				opacity: 1,
				y: 0,
				duration: 0.9,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 88%',
					toggleActions: 'play none none none'
				}
			}
		);
	});

	// 5. Cinematic Image Blur-to-Clear and Zoom Out
	const revealImgContainers = document.querySelectorAll('.js-reveal-img');
	revealImgContainers.forEach((container) => {
		const img = container.querySelector('img');
		if (img) {
			gsap.fromTo(img, 
				{
					scale: 1.15,
					filter: 'blur(8px)'
				}, 
				{
					scale: 1,
					filter: 'blur(0px)',
					duration: 1.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: container,
						start: 'top 80%',
						toggleActions: 'play none none none'
					}
				}
			);
		}
	});

	// 6. Image Box-inside Parallax (画像の枠内パララックス)
	const parallaxImages = document.querySelectorAll('.concept__img, .menu__item-img, .atmosphere__img');
	parallaxImages.forEach((img) => {
		const container = img.parentElement;
		gsap.fromTo(img, 
			{
				yPercent: -8
			}, 
			{
				yPercent: 8,
				ease: 'none',
				scrollTrigger: {
					trigger: container,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			}
		);
	});


	// 8. Forest Divider Scroll Shift (ギザギザ境界線の風の揺らぎスライド)
	const dividers = document.querySelectorAll('.l-divider');
	dividers.forEach((divider) => {
		let xShift = 3;
		if (divider.classList.contains('--forest-top')) {
			xShift = -3;
		}
		gsap.fromTo(divider, 
			{
				xPercent: -xShift
			}, 
			{
				xPercent: xShift,
				ease: 'none',
				scrollTrigger: {
					trigger: divider,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 0.5
				}
			}
		);
	});

	// 9. Scroll-Triggered Gold Lines (ゴールドの境界線伸びる演出)
	const revealLines = document.querySelectorAll('.js-reveal-line');
	revealLines.forEach((line) => {
		const isVertical = line.classList.contains('c-sec-title__line');
		if (isVertical) {
			gsap.to(line, {
				scaleY: 1,
				duration: 1.6,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: line,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		} else {
			gsap.to(line, {
				scaleX: 1,
				duration: 1.4,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: line,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		}
	});
});
