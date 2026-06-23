document.addEventListener("DOMContentLoaded", () => {
    // GSAP & ScrollTrigger の初期化確認
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("GSAP or ScrollTrigger is not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 2. Heroセクションのオープニング演出
    const heroTl = gsap.timeline();
    heroTl.from(".hero__title-line", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        clearProps: "all"
    })
    .from(".hero__desc", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "all"
    }, "-=1.0")
    .from(".hero__cta", {
        opacity: 0,
        y: 20,
        duration: 1.0,
        ease: "power3.out",
        clearProps: "all"
    }, "-=0.8");

    // 3. 各セクションのスクロール連動表示（上スクロール時の再発火を防止）
    
    // 汎用：スライドアップ登場
    const revealUpElements = document.querySelectorAll(".js-reveal-up");
    revealUpElements.forEach((element) => {
        gsap.from(element, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none" // 1回再生のみ、上スクロール時の再発火なし
            }
        });
    });

    // 個別：左からスライドイン
    const revealLeftElements = document.querySelectorAll(".js-reveal-left");
    revealLeftElements.forEach((element) => {
        gsap.from(element, {
            x: -60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // 個別：右からスライドイン
    const revealRightElements = document.querySelectorAll(".js-reveal-right");
    revealRightElements.forEach((element) => {
        gsap.from(element, {
            x: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // 4. 画像のスクロールズームイン効果
    const zoomImages = document.querySelectorAll(".menu__item-img, .atmosphere__img");
    zoomImages.forEach((img) => {
        gsap.from(img, {
            scale: 1.15,
            duration: 1.8,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
                trigger: img,
                start: "top 95%",
                toggleActions: "play none none none"
            }
        });
    });

    // 5. グラスモルフィズムカードのぼかしフェードイン（多層装飾のリッチな演出）
    const glassCards = document.querySelectorAll(".c-glass-card");
    glassCards.forEach((card) => {
        gsap.from(card, {
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderColor: "rgba(255, 255, 255, 0)",
            boxShadow: "none",
            duration: 1.5,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // 6. 夜を彩る「光の粒子（パーティクル）」の浮遊演出
    const particleContainer = document.getElementById("js-particles");
    if (particleContainer) {
        const particleCount = 24;
        const colors = ["#fde4bf", "#fca7b5", "#93b9f5", "#aaf2c5"];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("c-particle");
            particleContainer.appendChild(particle);
            
            const size = gsap.utils.random(4, 12);
            gsap.set(particle, {
                width: size,
                height: size,
                x: gsap.utils.random(0, window.innerWidth),
                y: gsap.utils.random(0, window.innerHeight),
                opacity: gsap.utils.random(0.1, 0.45),
                backgroundColor: gsap.utils.random(colors)
            });
            
            animateParticle(particle);
        }
    }

    function animateParticle(el) {
        gsap.to(el, {
            y: -50,
            x: `+=${gsap.utils.random(-80, 80)}`,
            opacity: 0,
            duration: gsap.utils.random(10, 20),
            ease: "none",
            onComplete: () => {
                const size = gsap.utils.random(4, 12);
                gsap.set(el, {
                    width: size,
                    height: size,
                    y: window.innerHeight + 50,
                    x: gsap.utils.random(0, window.innerWidth),
                    opacity: gsap.utils.random(0.1, 0.45)
                });
                animateParticle(el);
            }
        });
    }

    // 7. メニューセクションのタブ切り替え
    const tabButtons = document.querySelectorAll(".menu__tab-btn");
    const tabPanels = document.querySelectorAll(".menu__panel");
    const tabLine = document.querySelector(".menu__tab-line");

    function updateTabLine(activeBtn) {
        if (!tabLine || !activeBtn) return;
        tabLine.style.width = `${activeBtn.offsetWidth}px`;
        tabLine.style.left = `${activeBtn.offsetLeft}px`;
    }

    if (tabButtons.length > 0) {
        // 初期位置の設定
        const activeBtn = document.querySelector(".menu__tab-btn.is-active");
        if (activeBtn) {
            setTimeout(() => updateTabLine(activeBtn), 100);
        }

        tabButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                tabButtons.forEach((b) => {
                    b.classList.remove("is-active");
                    b.setAttribute("aria-selected", "false");
                });
                btn.classList.add("is-active");
                btn.setAttribute("aria-selected", "true");

                updateTabLine(btn);

                const targetTab = btn.getAttribute("data-tab");
                tabPanels.forEach((panel) => {
                    if (panel.id === `panel-${targetTab}`) {
                        panel.classList.add("is-active");
                    } else {
                        panel.classList.remove("is-active");
                    }
                });
            });
        });

        window.addEventListener("resize", () => {
            const currentActive = document.querySelector(".menu__tab-btn.is-active");
            updateTabLine(currentActive);
        });
    }

    // 8. Atmosphereセクションの3D円形カルーセル
    const carouselContainer = document.querySelector(".atmosphere__carousel-container");
    const carouselTrack = document.querySelector(".atmosphere__carousel-track");
    const carouselItems = document.querySelectorAll(".atmosphere__carousel-item");
    const prevBtn = document.querySelector(".atmosphere__carousel-btn.--prev");
    const nextBtn = document.querySelector(".atmosphere__carousel-btn.--next");

    if (carouselContainer && carouselTrack && carouselItems.length > 0) {
        const itemCount = carouselItems.length;
        const angleStep = 360 / itemCount;
        let currAngle = 0;
        let autoPlayTimer = null;
        let isDragging = false;
        let startX = 0;
        let currentRotationY = 0;
        let startRotationY = 0;

        // トラック幅の取得（レスポンシブ対応）
        function getTrackWidth() {
            return carouselTrack.offsetWidth || 280;
        }

        // 3D配置と半径の動的計算
        function layoutCarousel() {
            const trackWidth = getTrackWidth();
            const radius = Math.round((trackWidth / 2) / Math.tan(Math.PI / itemCount)) + 30;

            // トラック初期回転の明示的リセット
            gsap.set(carouselTrack, { rotationY: 0 });
            currentRotationY = 0;
            currAngle = 0;

            carouselItems.forEach((item, index) => {
                const itemAngle = index * angleStep;
                gsap.set(item, {
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(1)`
                });
            });
            updateDepthEffects(radius);
        }

        // 奥行き効果の更新 (手前ははっきり、奥はぼかして透過度を落とす)
        // transform文字列が上書き競合しないように一括で適用する
        function updateDepthEffects(radius) {
            carouselItems.forEach((item, index) => {
                const itemAngle = index * angleStep;
                const angleRad = ((itemAngle + currentRotationY) * Math.PI) / 180;
                const cosValue = Math.cos(angleRad); // 手前=1.0, 奥=-1.0

                const opacity = gsap.utils.mapRange(-1, 1, 0.35, 1.0, cosValue);
                const blur = gsap.utils.mapRange(-1, 1, 4, 0, cosValue);
                const scale = gsap.utils.mapRange(-1, 1, 0.85, 1.0, cosValue);

                gsap.set(item, {
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                    opacity: opacity,
                    filter: `blur(${blur}px)`,
                    zIndex: Math.round(gsap.utils.mapRange(-1, 1, 1, 10, cosValue))
                });
            });
        }

        // 指定角度への回転アニメーション
        function rotateToAngle(angle) {
            currAngle = angle;
            currentRotationY = angle;
            const trackWidth = getTrackWidth();
            const radius = Math.round((trackWidth / 2) / Math.tan(Math.PI / itemCount)) + 30;

            gsap.killTweensOf(carouselTrack); // 既存アニメーションのキルで競合防止

            gsap.to(carouselTrack, {
                rotationY: angle,
                duration: 1.0,
                overwrite: "auto",
                ease: "power2.out",
                onUpdate: () => {
                    currentRotationY = gsap.getProperty(carouselTrack, "rotationY");
                    updateDepthEffects(radius);
                }
            });
        }

        // 自動再生の開始/停止
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(() => {
                currAngle -= angleStep;
                rotateToAngle(currAngle);
            }, 4000);
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        // 左右ボタンの制御
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                stopAutoPlay();
                currAngle += angleStep;
                rotateToAngle(currAngle);
                startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                stopAutoPlay();
                currAngle -= angleStep;
                rotateToAngle(currAngle);
                startAutoPlay();
            });
        }

        // ドラッグ/タッチ操作のイベント制御
        function onDragStart(x) {
            isDragging = true;
            stopAutoPlay();
            gsap.killTweensOf(carouselTrack); // ドラッグ開始時にアニメーションを強制停止
            startX = x;
            startRotationY = gsap.getProperty(carouselTrack, "rotationY");
            carouselTrack.style.cursor = "grabbing";
        }

        function onDragMove(x) {
            if (!isDragging) return;
            const deltaX = x - startX;
            const trackWidth = getTrackWidth();
            const dragAngle = (deltaX / trackWidth) * 70; // 移動量感度
            currentRotationY = startRotationY + dragAngle;

            gsap.set(carouselTrack, { rotationY: currentRotationY });
            
            const radius = Math.round((trackWidth / 2) / Math.tan(Math.PI / itemCount)) + 30;
            updateDepthEffects(radius);
        }

        function onDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            carouselTrack.style.cursor = "grab";

            // 最も近い角度へスナップ
            const snappedAngle = Math.round(currentRotationY / angleStep) * angleStep;
            currAngle = snappedAngle;

            rotateToAngle(currAngle);
            startAutoPlay();
        }

        // イベントリスナー登録
        carouselTrack.addEventListener("mousedown", (e) => onDragStart(e.clientX));
        window.addEventListener("mousemove", (e) => onDragMove(e.clientX));
        window.addEventListener("mouseup", onDragEnd);

        carouselTrack.addEventListener("touchstart", (e) => onDragStart(e.touches[0].clientX), { passive: true });
        window.addEventListener("touchmove", (e) => {
            if (isDragging) {
                onDragMove(e.touches[0].clientX);
            }
        }, { passive: true });
        window.addEventListener("touchend", onDragEnd);

        // 初期実行
        layoutCarousel();
        startAutoPlay();

        window.addEventListener("resize", () => {
            layoutCarousel();
        });
    }
});
