document.addEventListener('DOMContentLoaded', () => {
    const moreBtn = document.querySelector('.js-menu-more-btn');
    const wrap = document.querySelector('.js-menu-expand-wrap');

    if (moreBtn && wrap) {
        moreBtn.addEventListener('click', () => {
            const isCollapsed = wrap.classList.contains('--collapsed');

            if (isCollapsed) {
                // 展開（開く）処理
                const fullHeight = wrap.scrollHeight;
                wrap.style.maxHeight = fullHeight + 'px';
                wrap.classList.remove('--collapsed');
                moreBtn.textContent = 'メニューを閉じる';
                moreBtn.classList.add('--active');

                // アニメーション完了後にmax-heightをnoneにしてレスポンシブに対応
                setTimeout(() => {
                    if (!wrap.classList.contains('--collapsed')) {
                        wrap.style.maxHeight = 'none';
                    }
                }, 500);
            } else {
                // 格納（閉じる）処理
                wrap.style.maxHeight = wrap.scrollHeight + 'px';
                wrap.offsetHeight; // リフロー強制

                wrap.style.maxHeight = '0px';
                wrap.classList.add('--collapsed');
                moreBtn.textContent = '他のフードメニューを見る';
                moreBtn.classList.remove('--active');
            }
        });

        // 画面幅変化時に展開中ならmax-heightを追従させる
        window.addEventListener('resize', () => {
            if (!wrap.classList.contains('--collapsed')) {
                wrap.style.maxHeight = 'none';
            }
        });
    }
});
