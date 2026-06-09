/**
 * Scroll Trigger Animation Control (GSAP & ScrollTrigger)
 * 
 * 役割: セクションのフェードイン、HeroセクションのStagger演出、およびスクロール連動パララックス
 */

document.addEventListener('DOMContentLoaded', () => {
    // GSAPにScrollTriggerプラグインを登録
    gsap.registerPlugin(ScrollTrigger);

    // 0. プラス20点提案：ライトリーク（木漏れ日・湯気）の浮遊・明滅アニメーション (GSAP)
    // イエローのライトリーク（木漏れ日）の浮遊運動と明滅
    gsap.to('.js-leak-yellow', {
        x: '12vw',
        y: '8vh',
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    gsap.to('.js-leak-yellow', {
        opacity: 0.45,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // グリーンのライトリーク（森の空気）の浮遊運動と明滅
    gsap.to('.js-leak-green', {
        x: '-8vw',
        y: '-12vh',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    gsap.to('.js-leak-green', {
        opacity: 0.5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // 1. Heroセクションの初期アニメーション（初回ロード時）
    // テキスト要素の順差（Stagger）フェードイン
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero__sub', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
    })
    .from('.hero__title', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero__desc', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero__cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');

    // Hero画像エリアのフェードイン・ズームイン（時間差）
    gsap.from('.hero__img-frame.--main', {
        opacity: 0,
        scale: 0.9,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.4
    });

    gsap.from('.hero__img-frame.--sub', {
        opacity: 0,
        x: -40,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.7
    });

    // アニメーション競合回避のため一時的にtransitionを無効化
    gsap.set('.hero__badge', { transition: 'none' });

    // バッジの「ぽよん」としたポップイン登場
    gsap.from('.hero__badge', {
        opacity: 0,
        scale: 0,
        rotation: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 1.2,
        onComplete: () => {
            gsap.set('.hero__badge', { clearProps: 'all' });
        }
    });




    // 2. スクロール連動：セクションのふわっと浮き上がるフェードイン (ScrollTrigger)
    const revealElements = document.querySelectorAll('.js-reveal');
    
    revealElements.forEach((element) => {
        // Hero と Concept はそれぞれ個別の高精度アニメーションを施すため除外
        if (element.id === 'hero' || element.id === 'concept') return;

        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 82%', // 画面の下部82%の位置に要素のトップが来たら発火
                toggleActions: 'play none none none', // 1回だけ再生
                once: true
            }
        });
    });

    // 2.1 Conceptセクションの個別スクロールアニメーション (エディトリアル出現効果)
    gsap.from('.concept .c-section-title', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.concept',
            start: 'top 82%',
            once: true
        }
    });

    gsap.from('.concept__img-frame', {
        opacity: 0,
        x: -60,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.concept__grid',
            start: 'top 80%',
            once: true
        }
    });

    gsap.from('.concept__card', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.25, // カードが順番に浮き上がる Stagger 効果
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.concept__cards',
            start: 'top 80%',
            once: true
        }
    });


    // 3. 画像の緩やかなスクロールパララックス（視差効果）
    gsap.to('.js-parallax', {
        yPercent: 12, // 少し下にずらす
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true // スクロール量に完全連動
        }
    });
});
