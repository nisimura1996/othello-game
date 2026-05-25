document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.js-menu-tab');
    const contents = document.querySelectorAll('.menu__category-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');

            // ボタンのactiveクラス切り替え
            tabs.forEach(t => {
                t.classList.remove('active');
                t.classList.remove('--pink');
                t.classList.add('--secondary');
            });
            tab.classList.add('active');
            tab.classList.remove('--secondary');
            
            if (target === 'food-category') {
                tab.classList.add('--pink');
            } else {
                tab.classList.add('--cyan');
            }

            // コンテンツの表示・非表示切り替え
            contents.forEach(content => {
                if (content.getAttribute('id') === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
});
