document.addEventListener('DOMContentLoaded', () => {
    // GSAP と ScrollTrigger が読み込まれていることを確認
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    // ScrollTriggerの登録
    gsap.registerPlugin(ScrollTrigger);

    // -------------------------------------------------------------
    // Hero Animations (On Load)
    // -------------------------------------------------------------
    // 縦書きメインコピーの文字ごとのマスク・スライドアップ
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        // <br>を保持しつつ文字をspanタグで囲む
        const wrappedText = text.split('<br>').map(line => {
            return line.split('').map(char => {
                if (char === ' ' || char === '　') return char;
                return `<span class="anim-char" style="display:inline-block; opacity:0; transform:translateY(30px);">${char}</span>`;
            }).join('');
        }).join('<br>');

        heroTitle.innerHTML = wrappedText;

        gsap.to('.anim-char', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.08,
            delay: 0.2
        });
    }

    // Heroのその他の要素フェードイン
    gsap.fromTo('.hero__desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.8 }
    );

    gsap.fromTo('.hero__cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 1.2 }
    );

    // Hero画像の初期ズームアウト演出
    gsap.fromTo('.hero__img',
        { scale: 1.15 },
        { scale: 1.05, duration: 2.5, ease: 'power2.out' }
    );

    // Hero画像のスクロールパララックス効果
    gsap.to('.hero__img-wrapper', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // -------------------------------------------------------------
    // ScrollTrigger Animations for Sections
    // -------------------------------------------------------------

    // 1. 各タイトルの縦書きフェードイン (一文字ずつ)
    const revealChars = document.querySelectorAll('.js-reveal-char:not(.hero__title)');
    revealChars.forEach((title) => {
        const text = title.innerHTML;
        const wrapped = text.split('<br>').map(line => {
            return line.split('').map(char => {
                if (char === ' ' || char === '　') return char;
                return `<span class="title-char" style="display:inline-block; opacity:0; transform:translateY(20px);">${char}</span>`;
            }).join('');
        }).join('<br>');
        title.innerHTML = wrapped;

        const chars = title.querySelectorAll('.title-char');
        gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // 2. 単純フェードイン＋スライドアップ (.js-reveal-fade)
    const revealFades = document.querySelectorAll('.js-reveal-fade');
    revealFades.forEach((elem) => {
        gsap.fromTo(elem,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // 3. Staggerで順番にスライドアップするカード類 (.js-reveal-up)
    // 複数の親要素でグループ化して処理
    const staggerGroups = [
        { parent: '.menu__grid', items: '.menu__item' },
        { parent: '.recommend__list', items: '.recommend__item' },
        { parent: '.faq__list', items: '.faq__item' }
    ];

    staggerGroups.forEach((group) => {
        const parentElem = document.querySelector(group.parent);
        if (parentElem) {
            const items = parentElem.querySelectorAll(group.items);
            gsap.fromTo(items,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: parentElem,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    });

    // 4. コンセプトセクションのスケールアップデコフレーム (.js-reveal-scale)
    const revealScale = document.querySelector('.js-reveal-scale');
    if (revealScale) {
        gsap.fromTo(revealScale,
            { scaleX: 0.8, opacity: 0 },
            {
                scaleX: 1,
                opacity: 0.5,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: revealScale,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // 5. お客様の声（左右からのスライドイン）
    const revealLeft = document.querySelector('.js-reveal-left');
    if (revealLeft) {
        gsap.fromTo(revealLeft,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: revealLeft,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    const revealRight = document.querySelectorAll('.js-reveal-right');
    revealRight.forEach((elem) => {
        // SwiperコンテナでScrollTriggerが機能するように調整
        gsap.fromTo(elem,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
});
