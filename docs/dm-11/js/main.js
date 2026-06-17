/**
 * Scroll Snap & Page Transition Animation Control
 */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.js-section');
    const indicatorLinks = document.querySelectorAll('.c-indicator__link');

    if (sections.length === 0) return;

    // 1. Intersection Observer を用いたアクティブセクションの検知
    const observerOptions = {
        root: null, // ビューポートを基準にする
        rootMargin: '-10% 0px -10% 0px', // 上下の境界を少し狭めて誤判定を防ぐ
        threshold: 0.1 // セクションの10%以上が画面内に入った時点で検知（縦長セクション対策）
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.getAttribute('id');
            const targetLink = document.querySelector(`.c-indicator__link[href="#${sectionId}"]`);

            if (entry.isIntersecting) {
                // セクションを活性化
                entry.target.classList.add('is-active');
                
                // 対応するインジケーターを活性化
                if (targetLink) {
                    indicatorLinks.forEach(link => link.classList.remove('is-active'));
                    targetLink.classList.add('is-active');
                }
            }
        });
    }, observerOptions);

    // 各セクションの監視を開始
    sections.forEach(section => sectionObserver.observe(section));

    // 2. インジケータークリック時のスムーズスクロール処理
    indicatorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Space セクションのギャラリー制御
    const galleryThumbs = document.querySelectorAll('.js-gallery-thumb');
    const galleryMain = document.querySelector('.js-gallery-main');

    if (galleryThumbs.length > 0 && galleryMain) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // すでにアクティブなら処理をスキップ
                if (thumb.classList.contains('is-active')) return;

                // アクティブ状態の切り替え
                galleryThumbs.forEach(t => t.classList.remove('is-active'));
                thumb.classList.add('is-active');

                const newSrc = thumb.getAttribute('data-src');
                const newAlt = thumb.querySelector('img').getAttribute('alt');

                // フェードインアウトによる滑らかな切り替え
                galleryMain.classList.add('is-switching');
                
                setTimeout(() => {
                    galleryMain.setAttribute('src', newSrc);
                    galleryMain.setAttribute('alt', newAlt);
                    galleryMain.classList.remove('is-switching');
                }, 300); // style.css の transition 0.3s と同期
            });
        });
    }

    // 4. FAQ アコーディオンのスムーズ制御
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const summary = item.querySelector('.faq__question');
        const wrapper = item.querySelector('.faq__answer-wrapper');
        
        if (!summary || !wrapper) return;

        // 初期状態で開いている場合のクラス付与
        if (item.hasAttribute('open')) {
            item.classList.add('is-open');
        }

        summary.addEventListener('click', (e) => {
            e.preventDefault(); // デフォルトの瞬間開閉を抑制
            
            const isOpen = item.classList.contains('is-open');
            
            if (isOpen) {
                // クローズ処理
                const startHeight = wrapper.scrollHeight;
                wrapper.style.height = `${startHeight}px`;
                
                // リフロー強制
                wrapper.offsetHeight;
                
                wrapper.style.height = '0px';
                item.classList.remove('is-open');
                
                const onTransitionEnd = (event) => {
                    if (event.propertyName === 'height') {
                        item.removeAttribute('open');
                        wrapper.style.height = '';
                        wrapper.removeEventListener('transitionend', onTransitionEnd);
                    }
                };
                wrapper.addEventListener('transitionend', onTransitionEnd);
            } else {
                // オープン処理
                item.setAttribute('open', '');
                
                const endHeight = wrapper.scrollHeight;
                wrapper.style.height = '0px';
                
                // リフロー強制
                wrapper.offsetHeight;
                
                wrapper.style.height = `${endHeight}px`;
                item.classList.add('is-open');
                
                const onTransitionEnd = (event) => {
                    if (event.propertyName === 'height') {
                        wrapper.style.height = '';
                        wrapper.removeEventListener('transitionend', onTransitionEnd);
                    }
                };
                wrapper.addEventListener('transitionend', onTransitionEnd);
            }
        });
    });
});
