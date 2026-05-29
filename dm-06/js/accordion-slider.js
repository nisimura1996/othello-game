document.addEventListener('DOMContentLoaded', () => {
    // 1. お品書きアコーディオン制御
    const moreBtn = document.querySelector('.js-menu-more-btn');
    const wrap = document.querySelector('.js-menu-expand-wrap');

    if (moreBtn && wrap) {
        // 閉じた状態の高さを要素の実測値から動的に算出する関数（PC時は4商品＝2行分、スマホ時は2商品分）
        const getCollapsedHeight = () => {
            const isPC = window.innerWidth >= 960;
            const items = wrap.querySelectorAll('.menu__item');
            if (items.length < 2) return wrap.scrollHeight;

            const item1Height = items[0].offsetHeight;
            const item2Height = items[1].offsetHeight;
            
            // cssの.menu__listから現在のgap値を取得（取得できない場合はデフォルトの40px）
            const menuList = wrap.querySelector('.menu__list');
            const gap = menuList ? parseFloat(getComputedStyle(menuList).rowGap || getComputedStyle(menuList).gap) || 40 : 40;

            if (isPC) {
                // PC時は2列グリッドのため、縦に並ぶのは2行分（2商品分）
                return (item1Height * 2) + gap;
            } else {
                // スマホ時は1列縦並びのため、最初の2商品分の実高さ ＋ gap
                return item1Height + item2Height + gap;
            }
        };

        // 初期状態で閉じていてJSが動くタイミングで高さを動的適用
        if (wrap.classList.contains('--collapsed')) {
            wrap.style.maxHeight = getCollapsedHeight() + 'px';
        }

        moreBtn.addEventListener('click', () => {
            const isCollapsed = wrap.classList.contains('--collapsed');

            if (isCollapsed) {
                // 展開（開く）処理
                const fullHeight = wrap.scrollHeight;
                wrap.style.maxHeight = fullHeight + 'px';
                wrap.classList.remove('--collapsed');
                moreBtn.textContent = 'お品書きを閉じる';

                // アニメーション完了後に一時的にmax-heightをクリア（画面幅変化に対応するため）
                setTimeout(() => {
                    if (!wrap.classList.contains('--collapsed')) {
                        wrap.style.maxHeight = 'none';
                    }
                }, 600);
            } else {
                // 格納（閉じる）処理
                // 一旦現在の実高さをインラインにセットしてトランジションを有効化
                wrap.style.maxHeight = wrap.scrollHeight + 'px';
                wrap.offsetHeight; // リフローを強制実行

                const collapsedHeight = getCollapsedHeight();
                wrap.style.maxHeight = collapsedHeight + 'px';
                wrap.classList.add('--collapsed');
                moreBtn.textContent = 'お品書きをすべて見る';
            }
        });

        // ウィンドウサイズ変更時に展開状態を正しく保つ
        window.addEventListener('resize', () => {
            if (!wrap.classList.contains('--collapsed')) {
                wrap.style.maxHeight = 'none';
            } else {
                wrap.style.maxHeight = getCollapsedHeight() + 'px';
            }
        });
    }

    // 2. 店内紹介スライダー（Swiper）初期化
    const atmosphereSwiper = new Swiper('.atmosphere-swiper', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true, // 画像枚数が増えてもドット表示が崩れないように制御
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        watchSlidesProgress: true,
    });
});
