document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // FAQ Accordion Control (Exclusive opening)
    // -------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach((item) => {
        const summary = item.querySelector('.faq__question');
        summary.addEventListener('click', (e) => {
            // 他のアコーディオンを閉じる（排他制御）
            if (!item.hasAttribute('open')) {
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item && otherItem.hasAttribute('open')) {
                        otherItem.removeAttribute('open');
                    }
                });
            }
        });
    });

    // -------------------------------------------------------------
    // Swiper Slider Control (Atmosphere Gallery & Menus)
    // -------------------------------------------------------------
    if (typeof Swiper !== 'undefined') {
        const atmosphereSwiper = new Swiper('.atmosphere-swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            speed: 1200,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        // Menu Swiper (Tablet)
        const tabletSwiper = new Swiper('.menu-swiper.--tablet', {
            slidesPerView: 1.25,
            spaceBetween: 14,
            loop: true,
            speed: 600,
            navigation: {
                nextEl: '.--tablet .menu-swiper-next',
                prevEl: '.--tablet .menu-swiper-prev',
            },
            pagination: {
                el: '.--tablet .menu-swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    allowTouchMove: false,
                }
            }
        });

        // Menu Swiper (Salon)
        const salonSwiper = new Swiper('.menu-swiper.--salon', {
            slidesPerView: 1.25,
            spaceBetween: 14,
            loop: true,
            speed: 600,
            navigation: {
                nextEl: '.--salon .menu-swiper-next',
                prevEl: '.--salon .menu-swiper-prev',
            },
            pagination: {
                el: '.--salon .menu-swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    allowTouchMove: false,
                }
            }
        });
    }

    // -------------------------------------------------------------
    // Atmosphere Gallery Control (Filter, View More & Lightbox Modal)
    // -------------------------------------------------------------
    const gallery = document.querySelector('.atmosphere__gallery');
    if (gallery) {
        const tabs = gallery.querySelectorAll('.atmosphere__gallery-tab');
        const items = gallery.querySelectorAll('.atmosphere__gallery-item');
        const moreBtn = gallery.querySelector('.atmosphere__gallery-more');
        const dialog = document.getElementById('gallery-dialog');
        const dialogInner = dialog ? dialog.querySelector('.atmosphere__dialog-inner') : null;
        const dialogImg = dialog ? dialog.querySelector('.atmosphere__dialog-img') : null;
        const dialogCaption = dialog ? dialog.querySelector('.atmosphere__dialog-caption') : null;
        const dialogClose = dialog ? dialog.querySelector('.atmosphere__dialog-close') : null;

        let currentFilter = 'all';
        let isExpanded = false;
        const initLimit = 6; // 初期表示数

        function updateGallery(filter, expand) {
            currentFilter = filter;
            isExpanded = expand;

            // フィルターに合致するアイテム群を抽出
            const targetItems = [];
            const otherItems = [];

            items.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    targetItems.push(item);
                } else {
                    otherItems.push(item);
                }
            });

            // 対象外のアイテムは非表示
            otherItems.forEach(item => {
                item.style.display = 'none';
                item.classList.add('--hidden');
            });

            // 対象のアイテムの表示制御
            const showItems = [];
            const hideItems = [];

            targetItems.forEach((item, index) => {
                if (index < initLimit || expand) {
                    showItems.push(item);
                } else {
                    hideItems.push(item);
                }
            });

            // 非表示にするアイテム
            hideItems.forEach(item => {
                item.style.display = 'none';
                item.classList.add('--hidden');
            });

            // 表示するアイテム（新しく表示されるものはフェードイン）
            const newVisibleItems = [];
            showItems.forEach(item => {
                if (item.style.display === 'none' || item.classList.contains('--hidden') || !item.style.display) {
                    item.style.display = 'block';
                    item.classList.remove('--hidden');
                    newVisibleItems.push(item);
                }
            });

            if (newVisibleItems.length > 0 && typeof gsap !== 'undefined') {
                gsap.fromTo(newVisibleItems,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
                );
            } else {
                showItems.forEach(item => {
                    item.style.display = 'block';
                    item.classList.remove('--hidden');
                    item.style.opacity = 1;
                });
            }

            // 「もっと見る」ボタンの表示・文言制御
            if (targetItems.length > initLimit) {
                moreBtn.style.display = 'inline-block';
                if (isExpanded) {
                    moreBtn.textContent = '写真を閉じる';
                } else {
                    moreBtn.textContent = 'すべての写真を見る';
                }
            } else {
                moreBtn.style.display = 'none';
            }
        }

        // 初期化
        updateGallery('all', false);

        // タブ切り替えイベント
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('--active'));
                tab.classList.add('--active');
                const filter = tab.dataset.filter;
                updateGallery(filter, false);
            });
        });

        // もっと見るボタンイベント
        moreBtn.addEventListener('click', () => {
            if (isExpanded) {
                // 閉じる時のスクロール追従（ギャラリートップ位置へ戻る）
                const galleryTop = gallery.getBoundingClientRect().top + window.pageYOffset - 100;
                updateGallery(currentFilter, false);
                window.scrollTo({ top: galleryTop, behavior: 'smooth' });
            } else {
                updateGallery(currentFilter, true);
            }
        });

        // モーダル拡大イベント
        items.forEach(item => {
            item.addEventListener('click', () => {
                if (!dialog || !dialogImg) return;
                const img = item.querySelector('.atmosphere__gallery-img');
                const captionText = item.querySelector('.atmosphere__gallery-caption').textContent;

                dialogImg.src = img.src;
                dialogImg.alt = img.alt;
                if (dialogCaption) {
                    dialogCaption.textContent = captionText;
                }

                dialog.showModal();

                if (dialogInner && typeof gsap !== 'undefined') {
                    gsap.fromTo(dialogInner,
                        { scale: 0.9, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' }
                    );
                }
            });
        });

        // モーダル閉じるイベント
        function closeDialog() {
            if (!dialog) return;
            if (dialogInner && typeof gsap !== 'undefined') {
                gsap.to(dialogInner, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.25,
                    ease: 'power2.in',
                    onComplete: () => {
                        dialog.close();
                    }
                });
            } else {
                dialog.close();
            }
        }

        if (dialogClose) {
            dialogClose.addEventListener('click', closeDialog);
        }

        // ダイアログ外（backdrop）をクリックした時に閉じる
        if (dialog) {
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    closeDialog();
                }
            });
        }
    }
});
