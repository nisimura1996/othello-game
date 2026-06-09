/**
 * Gallery Slider Control (Swiper)
 * 
 * 役割: 店内雰囲気（Atmosphere）セクションのSwiperスライダーの初期化・制御
 */

document.addEventListener('DOMContentLoaded', () => {
    // Atmosphere スライダーの初期化
    const atmosphereSlider = new Swiper('.atmosphere__slider', {
        // ループ再生
        loop: true,
        // スライドの進行状況を監視してクラスを付与
        watchSlidesProgress: true,
        // マウスドラッグ時のカーソル変更
        grabCursor: true,
        // スライドの間隔
        spaceBetween: 24,
        // 初期表示スライド数
        slidesPerView: 1.2,
        // スライドの中央揃え
        centeredSlides: true,
        // 自動再生
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        // ページネーション（丸インジケーター）
        pagination: {
            el: '.atmosphere__pagination',
            clickable: true,
        },
        // 前後ナビゲーションボタン
        navigation: {
            nextEl: '.atmosphere__next',
            prevEl: '.atmosphere__prev',
        },
        // レスポンシブブレイクポイント
        breakpoints: {
            // スマートフォン横向き・タブレット（横スクロールで前後が少し見えるように）
            600: {
                spaceBetween: 30,
            },
            // デスクトップ
            960: {
                slidesPerView: 1.6,
                spaceBetween: 40,
            }
        }
    });
});
