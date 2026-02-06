document.addEventListener('DOMContentLoaded', function() {
    const fireworksContainer = document.getElementById('fireworks-container');
    const fallingHeartsContainer = document.getElementById('falling-hearts');
    const backButton = document.getElementById('back-button');
    const fireworkSound = document.getElementById('firework-sound');
    
    console.log('🎆 Страница празднования загружена!');
    
    // Сразу запускаем салют при загрузке страницы
    setTimeout(() => {
        createGrandFireworksShow();
    }, 800);
    
    // Улучшенная функция создания одного взрыва фейерверка
    function createFirework(x, y, color, size = 'large') {
        const particleCount = size === 'large' ? 200 : size === 'medium' ? 120 : 80;
        const explosion = document.createElement('div');
        explosion.style.position = 'fixed';
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        explosion.style.pointerEvents = 'none';
        explosion.style.zIndex = '5';
        
        fireworksContainer.appendChild(explosion);
        
        // Создаем яркую вспышку в центре
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.width = '40px';
        flash.style.height = '40px';
        flash.style.borderRadius = '50%';
        flash.style.backgroundColor = color || getRandomBrightColor();
        flash.style.opacity = '0.9';
        flash.style.filter = 'blur(10px)';
        flash.style.transform = 'translate(-50%, -50%)';
        
        // Анимация вспышки
        const flashAnimation = flash.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 0.9 },
            { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)'
        });
        
        flashAnimation.onfinish = () => flash.remove();
        explosion.appendChild(flash);
        
        // Создаем частицы взрыва с разной скоростью
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = size === 'large' ? '12px' : '8px';
                particle.style.height = size === 'large' ? '12px' : '8px';
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = color || getRandomBrightColor();
                particle.style.boxShadow = `0 0 20px ${color || getRandomBrightColor()}`;
                particle.style.filter = 'blur(1px)';
                
                // Разные траектории для объемности
                const angle = Math.random() * Math.PI * 2;
                const distance = 80 + Math.random() * 120;
                const speed = 0.8 + Math.random() * 0.4;
                
                // Создаем 3D эффект с разными слоями
                const zIndex = Math.random() > 0.5 ? 1 : 2;
                particle.style.zIndex = zIndex;
                
                // Анимация частицы
                const duration = 1400 + Math.random() * 600;
                const keyframes = [
                    { 
                        transform: 'translate(0, 0) scale(1) rotate(0deg)', 
                        opacity: 1,
                        boxShadow: `0 0 30px ${color || getRandomBrightColor()}`
                    },
                    { 
                        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.2) rotate(${Math.random() * 360}deg)`, 
                        opacity: 0,
                        boxShadow: `0 0 5px ${color || getRandomBrightColor()}`
                    }
                ];
                
                const animation = particle.animate(keyframes, {
                    duration: duration,
                    easing: 'cubic-bezier(0.2, 0.4, 0.6, 1)'
                });
                
                // Медленное затухание
                particle.animate([
                    { opacity: 1 },
                    { opacity: 0.7 },
                    { opacity: 0 }
                ], {
                    duration: duration,
                    easing: 'ease-out'
                });
                
                animation.onfinish = () => {
                    particle.remove();
                };
                
                explosion.appendChild(particle);
            }, i * 5); // Небольшая задержка между частицами для объемности
        }
        
        // Создаем "хвосты" у частиц
        for (let i = 0; i < 20; i++) {
            createParticleTrail(x, y, color);
        }
        
        // Удаляем контейнер взрыва после завершения
        setTimeout(() => {
            explosion.remove();
        }, 2000);
    }
    
    // Функция для создания хвостов у частиц
    function createParticleTrail(x, y, color) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.borderRadius = '50%';
        trail.style.backgroundColor = color || getRandomBrightColor();
        trail.style.opacity = '0.7';
        trail.style.filter = 'blur(2px)';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '4';
        
        fireworksContainer.appendChild(trail);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        
        trail.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 0.7
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.1)`,
                opacity: 0
            }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        setTimeout(() => trail.remove(), 1200);
    }
    
    // Функция для запуска взлетающей ракеты
    function createRocket(startX, endX, endY, color) {
        const rocket = document.createElement('div');
        rocket.innerHTML = '🚀';
        rocket.style.position = 'fixed';
        rocket.style.left = `${startX}px`;
        rocket.style.bottom = '0';
        rocket.style.fontSize = '24px';
        rocket.style.zIndex = '6';
        rocket.style.filter = 'drop-shadow(0 0 10px rgba(255,255,255,0.5))';
        
        fireworksContainer.appendChild(rocket);
        
        // Анимация взлета ракеты
        rocket.animate([
            { 
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - startX}px, -${endY}px) rotate(${Math.random() * 20 - 10}deg)`,
                opacity: 0.8
            }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        // Создаем след от ракеты
        createRocketTrail(startX, endX, endY, color);
        
        setTimeout(() => {
            rocket.remove();
            // Взрыв в конце полета
            setTimeout(() => {
                createFirework(endX, window.innerHeight - endY, color, 'large');
            }, 100);
        }, 1200);
    }
    
    // Функция для создания следа от ракеты
    function createRocketTrail(startX, endX, endY, color) {
        const trailContainer = document.createElement('div');
        trailContainer.style.position = 'fixed';
        trailContainer.style.left = '0';
        trailContainer.style.bottom = '0';
        trailContainer.style.pointerEvents = 'none';
        trailContainer.style.zIndex = '5';
        
        fireworksContainer.appendChild(trailContainer);
        
        // Создаем несколько частиц следа
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const trailParticle = document.createElement('div');
                trailParticle.style.position = 'absolute';
                trailParticle.style.width = '6px';
                trailParticle.style.height = '6px';
                trailParticle.style.borderRadius = '50%';
                trailParticle.style.backgroundColor = color || '#FF9800';
                trailParticle.style.opacity = '0.8';
                trailParticle.style.filter = 'blur(3px)';
                
                const progress = i / 15;
                const x = startX + (endX - startX) * progress;
                const y = endY * progress;
                
                trailParticle.style.left = `${x}px`;
                trailParticle.style.bottom = `${y}px`;
                
                trailContainer.appendChild(trailParticle);
                
                // Анимация исчезновения частицы следа
                trailParticle.animate([
                    { opacity: 0.8, transform: 'scale(1)' },
                    { opacity: 0, transform: 'scale(0.2)' }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                });
                
                setTimeout(() => trailParticle.remove(), 800);
            }, i * 80);
        }
        
        setTimeout(() => trailContainer.remove(), 1500);
    }
    
    // Функция для грандиозного шоу фейерверков
    function createGrandFireworksShow() {
        console.log('🎇 Запускаем грандиозный салют!');
        
        // Воспроизводим звук, если есть
        if (fireworkSound) {
            fireworkSound.currentTime = 0;
            fireworkSound.volume = 0.2;
            fireworkSound.play().catch(e => console.log('Звук не воспроизводится:', e));
        }
        
        // Первая серия: 3 больших взрыва по центру
        setTimeout(() => createFirework(window.innerWidth / 2, window.innerHeight / 3, '#FF4081', 'large'), 300);
        setTimeout(() => createFirework(window.innerWidth / 3, window.innerHeight / 2, '#2196F3', 'large'), 800);
        setTimeout(() => createFirework(window.innerWidth * 2/3, window.innerHeight / 2, '#4CAF50', 'large'), 1300);
        
        // Вторая серия: ракеты
        setTimeout(() => {
            createRocket(100, window.innerWidth / 2, window.innerHeight / 1.5, '#FF4081');
        }, 1800);
        
        setTimeout(() => {
            createRocket(window.innerWidth - 100, window.innerWidth / 2, window.innerHeight / 1.8, '#2196F3');
        }, 2300);
        
        // Третья серия: веер фейерверков
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = (i + 1) * (window.innerWidth / 6);
                    const y = 100 + Math.random() * 200;
                    createFirework(x, y, getRandomBrightColor(), 'medium');
                }, i * 300);
            }
        }, 3000);
        
        // Продолжаем салют случайными красивыми взрывами
        const fireworksInterval = setInterval(() => {
            if (Math.random() > 0.4) {
                const x = Math.random() * window.innerWidth;
                const y = 100 + Math.random() * (window.innerHeight * 0.7);
                const size = Math.random() > 0.7 ? 'large' : 'medium';
                createFirework(x, y, getRandomBrightColor(), size);
            }
            
            // Иногда запускаем ракету
            if (Math.random() > 0.8) {
                const startX = Math.random() * window.innerWidth;
                const endX = Math.random() * window.innerWidth;
                const endY = 100 + Math.random() * (window.innerHeight * 0.6);
                createRocket(startX, endX, endY, getRandomBrightColor());
            }
        }, 1200);
        
        // Запускаем падающие сердечки через 8 секунд
        setTimeout(() => {
            startFallingHearts();
        }, 8000);
        
        // Останавливаем салют через 25 секунд, но оставляем случайные
        setTimeout(() => {
            clearInterval(fireworksInterval);
            console.log('🎆 Основной салют завершен!');
            
            // Медленные красивые фейерверки продолжаются
            setInterval(() => {
                if (Math.random() > 0.7) {
                    const x = Math.random() * window.innerWidth;
                    const y = 100 + Math.random() * (window.innerHeight * 0.6);
                    createFirework(x, y, getRandomBrightColor(), Math.random() > 0.5 ? 'medium' : 'small');
                }
            }, 2000);
        }, 25000);
    }
    
    // Функция для падающих сердечек (улучшенная)
    function startFallingHearts() {
        console.log('💕 Запускаем падающие сердечки');
        
        setInterval(() => {
            if (Math.random() > 0.6) {
                createFallingHeart();
            }
        }, 500);
    }
    
    function createFallingHeart() {
        const heart = document.createElement('div');
        const heartTypes = ['❤️', '💖', '💗', '💓', '💞', '💕'];
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.classList.add('falling-heart');
        
        // Случайная позиция вверху
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 2 + 1.5;
        const duration = Math.random() * 5 + 4;
        const swing = Math.random() * 150 - 75;
        const rotation = Math.random() * 360;
        
        heart.style.left = `${startX}px`;
        heart.style.top = '-50px';
        heart.style.fontSize = `${size}em`;
        heart.style.filter = 'drop-shadow(0 0 10px rgba(255,64,129,0.7))';
        
        fallingHeartsContainer.appendChild(heart);
        
        // Плавная анимация падения с покачиванием
        heart.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg)', 
                opacity: 0 
            },
            { 
                transform: 'translate(0, 0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${swing}px, ${window.innerHeight + 100}px) rotate(${rotation}deg)`, 
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        // Эффект мерцания
        heart.animate([
            { opacity: 1 },
            { opacity: 0.7 },
            { opacity: 1 }
        ], {
            duration: 1500 + Math.random() * 1000,
            iterations: Infinity
        });
        
        setTimeout(() => heart.remove(), duration * 1000);
    }
    
    // Функция для случайного яркого цвета
    function getRandomBrightColor() {
        const colors = [
            '#FF4081', // ярко-розовый
            '#2196F3', // ярко-синий
            '#4CAF50', // ярко-зеленый
            '#FF9800', // ярко-оранжевый
            '#9C27B0', // ярко-фиолетовый
            '#FFEB3B', // ярко-желтый
            '#E91E63', // малиновый
            '#00BCD4', // голубой
            '#FF5722', // красно-оранжевый
            '#8BC34A'  // светло-зеленый
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Обработчик кнопки "Назад"
    backButton.addEventListener('click', function() {
        // Создаем прощальный фейерверк
        createFirework(window.innerWidth / 2, window.innerHeight / 2, '#FF4081', 'large');
        
        // Плавный переход назад
        setTimeout(() => {
            document.body.style.opacity = '0.7';
            document.body.style.transition = 'opacity 0.8s ease';
            
            setTimeout(() => {
                window.history.back();
            }, 800);
        }, 500);
    });
    
    // Добавляем эффект при наведении на фото
    const photoFrame = document.querySelector('.photo-frame-celebration');
    if (photoFrame) {
        photoFrame.addEventListener('mouseenter', function() {
            // Создаем круговые фейерверки вокруг фото
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const radius = rect.width / 2 + 50;
            
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    createFirework(x, y, '#FF4081', 'small');
                }, i * 150);
            }
        });
    }
    
    // Красивый фейерверк при клике в любом месте
    document.addEventListener('click', function(e) {
        createFirework(e.clientX, e.clientY, getRandomBrightColor(), 'medium');
        
        // Создаем дополнительные мелкие взрывы вокруг
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                createFirework(e.clientX + offsetX, e.clientY + offsetY, getRandomBrightColor(), 'small');
            }, i * 200);
        }
    });
    
    // Добавляем начальную анимацию текста
    const celebrationText = document.querySelector('.celebration-text');
    if (celebrationText) {
        celebrationText.animate([
            { transform: 'scale(0.8)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)'
        });
    }
    
    console.log('✅ Страница празднования готова! Фейерверки запущены!');
});


// ===== ИНТЕРАКТИВНАЯ ИГРА "ВЫБЕРИ ПОДАРОК" =====

// Создаем интерактивную игру через 15 секунд после загрузки
setTimeout(() => {
    createGiftSelectionGame();
}, 9000);

function createGiftSelectionGame() {
    console.log('🎁 Создаю интерактивную игру с подарками!');
    
    // Создаем контейнер для игры
    const gameContainer = document.createElement('div');
    gameContainer.id = 'gift-game-container';
    gameContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        border-radius: 25px;
        padding: 40px;
        z-index: 10000;
        box-shadow: 0 0 50px rgba(255, 64, 129, 0.5);
        border: 5px solid #ff4081;
        max-width: 800px;
        width: 90%;
        text-align: center;
        animation: gameAppear 0.8s cubic-bezier(0.2, 0.8, 0.3, 1);
    `;
    
    // Добавляем анимацию появления
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gameAppear {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes giftHover {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }
        @keyframes confettiRain {
            0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Заголовок игры
    const title = document.createElement('h2');
    title.textContent = 'Выбери, какой подарок ты хочешь получить от меня!';
    title.style.cssText = `
        color: #ff4081;
        font-size: 2.2rem;
        margin-bottom: 30px;
        font-family: 'Dancing Script', cursive;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    `;
    
    // Контейнер для подарков
    const giftsContainer = document.createElement('div');
    giftsContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 25px;
        margin: 40px 0;
    `;
    
    // Массив подарков
    const gifts = [
        { emoji: '💐', name: 'Цветы', color: '#FF4081', message: 'Еще чо захотел, я тоже цветочки хочу 🌸' },
        { emoji: '🍫', name: 'Шоколад', color: '#8D6E63', message: 'Куплю чоколадку твои любимую 🍬' },
        { emoji: '🧸', name: 'Плюшевый мишка', color: '#FF9800', message: 'Я тож хочу его, давай хотеть вместе:D 🐻' },
        { emoji: '💄', name: 'Помада', color: '#E91E63', message: 'Если купишь мне помаду, то буду оставлять на тебе свои поцелуи 💋' },
        { emoji: '📸', name: 'Фотография', color: '#2196F3', message: 'У тебя и так есть фотка в твоем картхолдере где я чуханчик сусумбер 📷' },
        { emoji: '🎵', name: 'Песня', color: '#9C27B0', message: 'Я тебе и так концерты устраиваю и караоке пою 🎤' },
        { emoji: '🍕', name: 'Пицца', color: '#FF5722', message: 'Я тоже хочу пиццу блин, реально, давай закажем 🍕❤️' },
        { emoji: '🎮', name: 'Играть вместе', color: '#4CAF50', message: 'Если это хоррор обомралка или мыть обосранные машинки или чистить листья то я хз.... 🎮' }
    ];
    
    // Создаем кнопки подарков
    gifts.forEach((gift, index) => {
        const giftButton = document.createElement('button');
        giftButton.className = 'gift-button';
        giftButton.dataset.gift = gift.name;
        giftButton.style.cssText = `
            background: ${gift.color}20;
            border: 3px solid ${gift.color};
            border-radius: 20px;
            padding: 25px 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            font-size: 1.1rem;
            color: #333;
            font-weight: 600;
            animation: giftHover 3s infinite ${index * 0.1}s;
        `;
        
        giftButton.innerHTML = `
            <div style="font-size: 3.5rem; margin-bottom: 10px;">${gift.emoji}</div>
            <div>${gift.name}</div>
        `;
        
        // Эффект при наведении
        giftButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = `0 15px 30px ${gift.color}40`;
            this.style.background = `${gift.color}30`;
            
            // Создаем маленькие эмодзи вокруг кнопки
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const emoji = document.createElement('div');
                    emoji.textContent = gift.emoji;
                    emoji.style.position = 'absolute';
                    emoji.style.fontSize = '1.5rem';
                    emoji.style.zIndex = '10001';
                    emoji.style.pointerEvents = 'none';
                    emoji.style.animation = `emojiFloat 1s ease-out forwards`;
                    
                    // Позиция вокруг кнопки
                    const rect = this.getBoundingClientRect();
                    const angle = (i / 5) * Math.PI * 2;
                    const distance = 60;
                    const x = rect.left + rect.width/2 + Math.cos(angle) * distance;
                    const y = rect.top + rect.height/2 + Math.sin(angle) * distance;
                    
                    emoji.style.left = `${x}px`;
                    emoji.style.top = `${y}px`;
                    
                    document.body.appendChild(emoji);
                    
                    // Удаляем через секунду
                    setTimeout(() => emoji.remove(), 1000);
                }, i * 100);
            }
        });
        
        giftButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            this.style.background = `${gift.color}20`;
        });
        
        // Обработчик выбора подарка
        giftButton.addEventListener('click', function() {
            selectGift(gift);
        });
        
        giftsContainer.appendChild(giftButton);
    });
    
    // Кнопка закрытия
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ff4081;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10001;
    `;
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(90deg) scale(1.2)';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
    
    closeButton.addEventListener('click', function() {
        closeGame();
    });
    
    // Собираем интерфейс
    gameContainer.appendChild(closeButton);
    gameContainer.appendChild(title);
    gameContainer.appendChild(giftsContainer);
    document.body.appendChild(gameContainer);
    
    // Функция выбора подарка
    function selectGift(gift) {
        console.log(`🎁 Выбран подарок: ${gift.name}`);
        
        // Убираем все кнопки
        const allGiftButtons = document.querySelectorAll('.gift-button');
        allGiftButtons.forEach(btn => {
            btn.style.opacity = '0.3';
            btn.style.pointerEvents = 'none';
        });
        
        // Подсвечиваем выбранный
        const selectedBtn = document.querySelector(`[data-gift="${gift.name}"]`);
        selectedBtn.style.animation = 'none';
        selectedBtn.style.transform = 'scale(1.3)';
        selectedBtn.style.boxShadow = `0 0 40px ${gift.color}`;
        selectedBtn.style.zIndex = '10002';
        selectedBtn.style.background = gift.color;
        selectedBtn.style.color = 'white';
        
        // Создаем эффект выбора
        createConfetti(gift.color);
        
        // Создаем сообщение
        setTimeout(() => {
            const message = document.createElement('div');
            message.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                border: 4px solid ${gift.color};
                z-index: 10003;
                text-align: center;
                max-width: 500px;
                width: 80%;
                animation: gameAppear 0.6s ease;
            `;
            
            message.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 20px;">${gift.emoji}</div>
                <h3 style="color: ${gift.color}; font-size: 2rem; margin-bottom: 15px;">${gift.message}</h3>
                <button id="close-message-btn" style="
                    padding: 12px 30px;
                    background: ${gift.color};
                    color: white;
                    border: none;
                    border-radius: 25px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">
                    Люблю тебя! ❤️
                </button>
            `;
            
            gameContainer.appendChild(message);
            
            // Обработчик закрытия сообщения
            document.getElementById('close-message-btn').addEventListener('click', function() {
                // Финальный фейерверк
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createFirework(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight * 0.7,
                            gift.color,
                            'large'
                        );
                    }, i * 300);
                }
                
                closeGame();
            });
        }, 1000);
    }
    
    // Функция создания конфетти
    function createConfetti(color) {
        const confettiCount = 100;
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '10001';
        
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '15px';
            confetti.style.height = '15px';
            confetti.style.backgroundColor = color || getRandomBrightColor();
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.top = '0';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.opacity = '0.9';
            
            confettiContainer.appendChild(confetti);
            
            // Анимация падения
            confetti.animate([
                { 
                    transform: `translateY(0) rotate(0deg) translateX(${Math.random() * 100 - 50}px)`, 
                    opacity: 1 
                },
                { 
                    transform: `translateY(100vh) rotate(${Math.random() * 720}deg) translateX(${Math.random() * 200 - 100}px)`, 
                    opacity: 0 
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)'
            });
            
            setTimeout(() => confetti.remove(), 3000);
        }
        
        setTimeout(() => confettiContainer.remove(), 3000);
    }
    
    // Функция закрытия игры
    function closeGame() {
        gameContainer.style.animation = 'gameAppear 0.5s ease reverse forwards';
        setTimeout(() => {
            if (gameContainer.parentNode) {
                gameContainer.remove();
            }
        }, 500);
        
        // Создаем прощальные фейерверки
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight * 0.6,
                    getRandomBrightColor(),
                    'medium'
                );
            }, i * 400);
        }
    }
    
    // Добавляем CSS для анимации эмодзи
    const emojiStyle = document.createElement('style');
    emojiStyle.textContent = `
        @keyframes emojiFloat {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(${Math.random() * 100 - 50}px, -80px) scale(0.5); opacity: 0; }
        }
    `;
    document.head.appendChild(emojiStyle);
}

// ===== ДОПОЛНИТЕЛЬНЫЙ ИНТЕРАКТИВ: СЕКРЕТНЫЕ КЛАВИШИ =====

document.addEventListener('keydown', function(e) {
    // Секретная комбинация: L + O + V + E
    if (e.key === 'l' || e.key === 'L') {
        console.log('💕 Секретная функция активирована!');
        
        // Создаем сердечный взрыв
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createHeartExplosion(x, y);
            }, i * 50);
        }
    }
    
    // Секретная комбинация: Космос для мега-фейерверка
    if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        createMegaFirework();
    }
});

// Функция сердечного взрыва
function createHeartExplosion(x, y) {
    const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💖', '💗', '💓', '💞', '💕'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = `${Math.random() * 2 + 1.5}em`;
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            
            document.body.appendChild(heart);
            
            // Анимация разлета сердец
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 150;
            
            heart.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.3)`, opacity: 0 }
            ], {
                duration: 1500 + Math.random() * 500,
                easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)'
            });
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 30);
    }
}

// Функция мега-фейерверка
function createMegaFirework() {
    console.log('💥 МЕГА-ФЕЙЕРВЕРК АКТИВИРОВАН!');
    
    // Центральный супер-взрыв
    createFirework(window.innerWidth / 2, window.innerHeight / 2, getRandomBrightColor(), 'large');
    
    // Круговой взрыв
    setTimeout(() => {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const angle = (i / 12) * Math.PI * 2;
                const distance = 200;
                const x = window.innerWidth / 2 + Math.cos(angle) * distance;
                const y = window.innerHeight / 2 + Math.sin(angle) * distance;
                createFirework(x, y, getRandomBrightColor(), 'medium');
            }, i * 100);
        }
    }, 300);
    
    // Взрывы по углам
    setTimeout(() => {
        const corners = [
            [50, 50],
            [window.innerWidth - 50, 50],
            [50, window.innerHeight - 50],
            [window.innerWidth - 50, window.innerHeight - 50]
        ];
        
        corners.forEach(([x, y], i) => {
            setTimeout(() => {
                createFirework(x, y, getRandomBrightColor(), 'large');
            }, i * 200);
        });
    }, 800);
}

console.log('🎮 Интерактивные функции загружены!');