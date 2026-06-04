/**
 * Menu & Gallery Swiper Slider Controller
 */
document.addEventListener('DOMContentLoaded', () => {
	// Menu Slider Initialization
	const menuSliderEl = document.querySelector('.js-swiper-menu');
	if (menuSliderEl) {
		new Swiper('.js-swiper-menu', {
			slidesPerView: 1,
			spaceBetween: 0, /* スライド間の余白を0にすることで、ナビゲーションのズレを完全解消 */
			loop: true,
			grabCursor: true,
			speed: 1200, /* アニメーションの切り替え速度を1.2秒にして極めて優雅に */
			autoplay: {
				delay: 6000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			pagination: {
				el: '.menu__slider-pagination',
				clickable: true
			},
			navigation: {
				nextEl: '.menu__slider-btn.--next',
				prevEl: '.menu__slider-btn.--prev'
			}
		});
	}

	// Atmosphere Gallery Toggle
	const galleryBtn = document.querySelector('.js-gallery-btn');
	const galleryTarget = document.querySelector('.js-gallery-target');

	if (galleryBtn && galleryTarget) {
		galleryBtn.addEventListener('click', () => {
			const isOpen = galleryTarget.classList.contains('is-open');
			
			if (isOpen) {
				galleryTarget.classList.remove('is-open');
				galleryBtn.setAttribute('aria-expanded', 'false');
				galleryTarget.setAttribute('aria-hidden', 'true');
				galleryBtn.textContent = 'ギャラリーを見る';
			} else {
				galleryTarget.classList.add('is-open');
				galleryBtn.setAttribute('aria-expanded', 'true');
				galleryTarget.setAttribute('aria-hidden', 'false');
				galleryBtn.textContent = 'ギャラリーを閉じる';
			}

			// GSAP ScrollTriggerのレイアウト再計算
			if (typeof ScrollTrigger !== 'undefined') {
				setTimeout(() => {
					ScrollTrigger.refresh();
				}, 500);
			}
		});
	}

	// Menu Single Toggle
	const menuSingleBtn = document.querySelector('.js-menu-single-btn');
	const menuSingleTarget = document.querySelector('.js-menu-single-target');

	if (menuSingleBtn && menuSingleTarget) {
		menuSingleBtn.addEventListener('click', () => {
			const isOpen = menuSingleTarget.classList.contains('is-open');
			
			if (isOpen) {
				menuSingleTarget.classList.remove('is-open');
				menuSingleBtn.setAttribute('aria-expanded', 'false');
				menuSingleTarget.setAttribute('aria-hidden', 'true');
				menuSingleBtn.textContent = '単品メニューをもっと見る';
			} else {
				menuSingleTarget.classList.add('is-open');
				menuSingleBtn.setAttribute('aria-expanded', 'true');
				menuSingleTarget.setAttribute('aria-hidden', 'false');
				menuSingleBtn.textContent = '単品メニューを閉じる';
			}

			// GSAP ScrollTriggerのレイアウト再計算
			if (typeof ScrollTrigger !== 'undefined') {
				setTimeout(() => {
					ScrollTrigger.refresh();
				}, 500);
			}
		});
	}
});
