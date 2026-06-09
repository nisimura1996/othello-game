document.addEventListener('DOMContentLoaded', () => {
	const tabBtns = document.querySelectorAll('.js-menu-tab');
	const contents = document.querySelectorAll('.js-menu-content');

	if (tabBtns.length === 0 || contents.length === 0) return;

	tabBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const targetId = btn.getAttribute('data-target');

			// アクティブクラスの切り替え
			tabBtns.forEach(b => b.classList.remove('is-active'));
			btn.classList.add('is-active');

			contents.forEach(content => {
				if (content.id === targetId) {
					content.classList.add('is-active');
				} else {
					content.classList.remove('is-active');
				}
			});

			// スクロールを戻すUX向上処理（ヘッダーの高さを考慮して位置調整）
			const menuContainer = document.querySelector('.menu__container');
			if (menuContainer) {
				const yOffset = -120; 
				const y = menuContainer.getBoundingClientRect().top + window.scrollY + yOffset;
				window.scrollTo({ top: y, behavior: 'smooth' });
			}
		});
	});
});
