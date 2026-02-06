document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const heartsContainer = document.getElementById('hearts-container');
    const debugInfo = document.getElementById('debug-info');
    
    console.log('🚀 Скрипт загружен. Найдены кнопки:', {
        yesBtn: !!yesBtn,
        noBtn: !!noBtn,
        noBtnPosition: noBtn.style.position
    });
    
    // Обновляем дебаг информацию
    function updateDebugInfo(message) {
        if (debugInfo) {
            debugInfo.innerHTML = message;
        }
        console.log('🔍 ' + message);
    }
    
    // Создаем сердечки заранее для анимации
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('flying-heart');
        heartsContainer.appendChild(heart);
        return heart;
    }
    
    // Массив предварительно созданных сердечек
    const hearts = Array.from({length: 20}, createHeart);
    let heartIndex = 0;
    
    // Функция для запуска сердечка
    function launchHeart(x, y) {
        const heart = hearts[heartIndex];
        heartIndex = (heartIndex + 1) % hearts.length;
        
        // Случайные параметры полета
        const tx = (Math.random() - 0.5) * 400;
        const ty = -(Math.random() * 300 + 100);
        const duration = Math.random() * 2 + 1.5;
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.animation = `fly ${duration}s ease-out forwards`;
        
        // Сброс анимации после завершения
        setTimeout(() => {
            heart.style.animation = '';
        }, duration * 1000);
    }
    
    // Функция для создания сверканий
    function createSparkle(button) {
        const sparkles = button.querySelectorAll('.sparkle');
        
        sparkles.forEach((sparkle, index) => {
            // Случайные позиции внутри кнопки
            const x = Math.random() * 80 + 10; // 10-90%
            const y = Math.random() * 80 + 10;
            const delay = Math.random() * 0.5;
            
            sparkle.style.left = `${x}%`;
            sparkle.style.top = `${y}%`;
            sparkle.style.animation = `sparkle 0.8s ease-out ${delay}s forwards`;
            
            // Сброс анимации для повторного использования
            setTimeout(() => {
                sparkle.style.animation = '';
            }, 1300);
        });
    }
    
    // Обработчик для кнопки ДА
yesBtn.addEventListener('mouseenter', function(e) {
    // Сверкание
    createSparkle(this);
    
    // Запуск сердечек со ВСЕХ сторон
    const rect = this.getBoundingClientRect();
    const heartCount = 25; // Больше сердечек
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            // Выбираем случайную сторону вокруг кнопки
            let x, y;
            const side = Math.floor(Math.random() * 4); // 0-3: 4 стороны
            
            switch(side) {
                case 0: // Сверху
                    x = rect.left + Math.random() * rect.width;
                    y = rect.top - 20 - Math.random() * 50;
                    break;
                case 1: // Справа
                    x = rect.right + 20 + Math.random() * 50;
                    y = rect.top + Math.random() * rect.height;
                    break;
                case 2: // Снизу
                    x = rect.left + Math.random() * rect.width;
                    y = rect.bottom + 20 + Math.random() * 50;
                    break;
                case 3: // Слева
                    x = rect.left - 20 - Math.random() * 50;
                    y = rect.top + Math.random() * rect.height;
                    break;
            }
            
            // Запускаем сердечко с этой позиции
            launchHeartFromSide(x, y, side);
        }, i * 30); // Более быстрое появление
    }
    
    // Показываем котиков
    showCats();
    
    // Легкая вибрация (если поддерживается)
    if (navigator.vibrate) {
        navigator.vibrate([30, 50, 30]);
    }
});

// Новая функция для запуска сердечек со сторон
function launchHeartFromSide(startX, startY, side) {
    const heart = hearts[heartIndex];
    heartIndex = (heartIndex + 1) % hearts.length;
    
    // Направление полета в зависимости от стороны
    let tx, ty;
    
    switch(side) {
        case 0: // Сверху - летят вниз
            tx = (Math.random() - 0.5) * 200;
            ty = Math.random() * 300 + 100;
            break;
        case 1: // Справа - летят влево
            tx = -(Math.random() * 300 + 100);
            ty = (Math.random() - 0.5) * 200;
            break;
        case 2: // Снизу - летят вверх
            tx = (Math.random() - 0.5) * 200;
            ty = -(Math.random() * 300 + 100);
            break;
        case 3: // Слева - летят вправо
            tx = Math.random() * 300 + 100;
            ty = (Math.random() - 0.5) * 200;
            break;
    }
    
    const duration = Math.random() * 1.5 + 1;
    const size = Math.random() * 0.5 + 0.7; // Разный размер
    
    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.fontSize = `${size}em`;
    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--ty', `${ty}px`);
    heart.style.animation = `fly ${duration}s ease-out forwards`;
    
    // Сброс анимации после завершения
    setTimeout(() => {
        heart.style.animation = '';
    }, duration * 1000);
}
// Также добавляем обработчик когда курсор уходит с кнопки
yesBtn.addEventListener('mouseleave', function(e) {
    // Скрываем котиков через некоторое время
    setTimeout(hideCats, 1000);
});

// Функции для управления котиками
function showCats() {
    const cats = document.querySelectorAll('.cat');
    cats.forEach((cat, index) => {
        setTimeout(() => {
            cat.style.opacity = '1';
            cat.style.transform = cat.classList.contains('cat-left') 
                ? 'translateY(0) rotate(-10deg)' 
                : 'translateY(0) rotate(10deg)';
        }, index * 200);
    });
}

function hideCats() {
    // Проверяем, не наведен ли курсор все еще на кнопку Да
    if (yesBtn.matches(':hover')) return;
    
    const cats = document.querySelectorAll('.cat');
    cats.forEach((cat, index) => {
        setTimeout(() => {
            cat.style.opacity = '0';
            cat.style.transform = cat.classList.contains('cat-left')
                ? 'translateY(100%) rotate(-10deg)'
                : 'translateY(100%) rotate(10deg)';
        }, index * 100);
    });
}

// Также показываем котиков при наведении на саму фотографию
const photoSection = document.querySelector('.photo-section');
if (photoSection) {
    photoSection.addEventListener('mouseenter', showCats);
    photoSection.addEventListener('mouseleave', hideCats);
}
    
    // ===== ИСПРАВЛЕННЫЙ КОД ДЛЯ КНОПКИ "НЕТ" =====
    
    let isMoving = false;
    let mouseMoveTimeout;
    
    // Функция для установки кнопки в начальную позицию
    function setInitialPosition() {
        console.log('🎯 Устанавливаем начальную позицию кнопки "Нет"');
        
        // На мобильных - относительное позиционирование
        if (window.innerWidth <= 768) {
            noBtn.style.position = 'relative';
            noBtn.style.left = 'auto';
            noBtn.style.top = 'auto';
            noBtn.style.transform = 'translate(0, 0)';
            noBtn.style.margin = '20px auto 0';
            updateDebugInfo('📱 Мобильный режим: относительное позиционирование');
            return;
        }
        
        // На десктопе - абсолютное позиционирование
        
        // 1. Получаем позицию кнопки "Да"
        const yesBtnRect = yesBtn.getBoundingClientRect();
        console.log('📍 Позиция кнопки "Да":', {
            left: yesBtnRect.left,
            top: yesBtnRect.top,
            right: yesBtnRect.right,
            bottom: yesBtnRect.bottom,
            width: yesBtnRect.width,
            height: yesBtnRect.height
        });
        
        // 2. Позиция справа от кнопки "Да" с отступом
        const offsetX = 40; // отступ от кнопки "Да"
        const offsetY = 0;  // на том же уровне по вертикали
        
        let targetX = yesBtnRect.right + offsetX;
        let targetY = yesBtnRect.top + offsetY;
        
        // 3. Получаем размеры кнопки "Нет"
        const noBtnWidth = noBtn.offsetWidth || 180;
        const noBtnHeight = noBtn.offsetHeight || 70;
        
        // 4. Проверяем, чтобы не выйти за правый край экрана
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        if (targetX + noBtnWidth > windowWidth - 20) {
            // Если не помещается справа, ставим слева
            targetX = yesBtnRect.left - noBtnWidth - offsetX;
            updateDebugInfo('⬅️ Кнопка "Нет" слева от "Да"');
        }
        
        // 5. Проверяем, чтобы не выйти за верхний/нижний край
        if (targetY < 20) targetY = 20;
        if (targetY + noBtnHeight > windowHeight - 20) {
            targetY = windowHeight - noBtnHeight - 20;
        }
        
        // 6. Устанавливаем позицию
        noBtn.style.position = 'fixed'; // Используем fixed вместо absolute
        noBtn.style.left = `${targetX}px`;
        noBtn.style.top = `${targetY}px`;
        noBtn.style.transform = 'translate(0, 0)';
        noBtn.style.transition = 'none'; // Без анимации при инициализации
        noBtn.style.zIndex = '1000'; // Высокий z-index
        noBtn.style.opacity = '1';
        noBtn.style.visibility = 'visible';
        
        console.log('✅ Кнопка "Нет" установлена на:', {targetX, targetY});
        updateDebugInfo(`✅ Кнопка "Нет" на позиции: ${Math.round(targetX)}x${Math.round(targetY)}`);
        
        // 7. Проверяем видимость
        const rect = noBtn.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= windowHeight &&
            rect.right <= windowWidth
        );
        
        if (!isVisible) {
            console.warn('⚠️ Кнопка не видна! Корректируем...');
            // Если не видна, ставим в центр экрана
            noBtn.style.left = `${windowWidth/2 - noBtnWidth/2}px`;
            noBtn.style.top = `${windowHeight/2 - noBtnHeight/2}px`;
            updateDebugInfo('⚠️ Кнопка была не видна! Перемещена в центр');
        }
    }
    
    // Функция для перемещения кнопки (убегания)
    function moveButtonToRandomPosition() {
        if (isMoving) return;
        isMoving = true;
        
        updateDebugInfo('🏃 Кнопка "Нет" убегает!');
        
        // Получаем размеры
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        // Безопасные границы (отступ от краев экрана)
        const safeMargin = 30;
        const minX = safeMargin;
        const minY = safeMargin;
        const maxX = windowWidth - btnWidth - safeMargin;
        const maxY = windowHeight - btnHeight - safeMargin;
        
        // Текущая позиция
        const currentRect = noBtn.getBoundingClientRect();
        
        // Генерируем новую позицию В ПРЕДЕЛАХ ЭКРАНА
        let newX, newY;
        let attempts = 0;
        const maxAttempts = 10;
        
        do {
            newX = Math.floor(Math.random() * (maxX - minX)) + minX;
            newY = Math.floor(Math.random() * (maxY - minY)) + minY;
            attempts++;
            
            // Проверяем расстояние от текущей позиции (минимум 100px)
            const distance = Math.sqrt(
                Math.pow(newX - currentRect.left, 2) + 
                Math.pow(newY - currentRect.top, 2)
            );
            
            if (distance > 120 || attempts >= maxAttempts) {
                console.log(`🎯 Новая позиция найдена за ${attempts} попыток:`, {newX, newY});
                break;
            }
        } while (attempts < maxAttempts);
        
        // Гарантируем, что не выходим за границы
        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));
        
        // Анимация перемещения
        noBtn.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        
        // Легкое вращение для эффекта
        const rotation = Math.random() * 20 - 10;
        noBtn.style.transform = `rotate(${rotation}deg)`;
        
        // Эффект свечения
        noBtn.style.boxShadow = '0 0 30px rgba(33, 150, 243, 0.7)';
        
        // Сбрасываем состояние
        setTimeout(() => {
            isMoving = false;
            noBtn.style.boxShadow = '0 10px 20px rgba(33, 150, 243, 0.3)';
            updateDebugInfo(`📍 Кнопка "Нет" на: ${Math.round(newX)}x${Math.round(newY)}`);
        }, 400);
    }
    
    // Обработчики событий для кнопки "Нет"
    noBtn.addEventListener('mouseenter', function(e) {
        console.log('🖱️ Наведение на кнопку "Нет"');
        if (isMoving || window.innerWidth <= 768) return;
        moveButtonToRandomPosition();
    });
    
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🖱️ Клик по кнопке "Нет"');
        if (window.innerWidth <= 768) return;
        this.dispatchEvent(new Event('mouseenter'));
    });
    
    // Отслеживание приближения курсора (убегание при приближении)
    document.addEventListener('mousemove', function(e) {
        if (isMoving || window.innerWidth <= 768 || mouseMoveTimeout) return;
        
        mouseMoveTimeout = setTimeout(() => {
            mouseMoveTimeout = null;
            
            const btnRect = noBtn.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - btnCenterX, 2) + 
                Math.pow(e.clientY - btnCenterY, 2)
            );
            
            // Убегаем, если курсор ближе 120px
            if (distance < 120) {
                console.log('🎯 Курсор близко! Дистанция:', Math.round(distance));
                noBtn.dispatchEvent(new Event('mouseenter'));
            }
        }, 100);
    });
    
    // Случайные сердечки на фоне
    function createBackgroundHearts() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                const x = Math.random() * window.innerWidth;
                const y = window.innerHeight + 20;
                const heart = hearts[heartIndex];
                heartIndex = (heartIndex + 1) % hearts.length;
                
                const tx = (Math.random() - 0.5) * 100;
                const ty = -(Math.random() * 400 + 200);
                const duration = Math.random() * 3 + 2;
                
                heart.style.left = `${x}px`;
                heart.style.top = `${y}px`;
                heart.style.setProperty('--tx', `${tx}px`);
                heart.style.setProperty('--ty', `${ty}px`);
                heart.style.animation = `fly ${duration}s linear forwards`;
                
                setTimeout(() => {
                    heart.style.animation = '';
                }, duration * 1000);
            }
        }, 800);
    }
    
    // ИНИЦИАЛИЗАЦИЯ
    function init() {
        console.log('🚀 Инициализация страницы');
        
        // 1. Сначала показываем кнопку "Нет"
        noBtn.style.opacity = '1';
        noBtn.style.visibility = 'visible';
        noBtn.style.display = 'block';
        
        // 2. Устанавливаем начальную позицию
        setInitialPosition();
        
        // 3. Запускаем фоновые сердечки
        createBackgroundHearts();
        
        // 4. Дополнительная проверка через секунду
        setTimeout(() => {
            const rect = noBtn.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= window.innerHeight &&
                rect.right <= window.innerWidth
            );
            
            if (!isVisible) {
                console.warn('⚠️ Кнопка "Нет" не видна после инициализации!');
                updateDebugInfo('⚠️ Кнопка не видна! Исправляем...');
                // Ставим в центр экрана
                noBtn.style.left = `${window.innerWidth/2 - noBtn.offsetWidth/2}px`;
                noBtn.style.top = `${window.innerHeight/2 - noBtn.offsetHeight/2}px`;
            } else {
                updateDebugInfo('✅ Кнопка "Нет" видна и готова');
            }
        }, 1000);
    }
    
    // Запускаем инициализацию
    window.addEventListener('load', init);
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        console.log('🔄 Изменение размера окна');
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = null;
        
        // Переустанавливаем позицию
        setTimeout(setInitialPosition, 100);
    });
    
    // Горячая клавиша для дебага (Ctrl+D)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'd' && e.ctrlKey) {
            console.log('=== 🔍 ДЕБАГ ИНФОРМАЦИЯ ===');
            const rect = noBtn.getBoundingClientRect();
            console.log('Кнопка "Нет":', {
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                styleLeft: noBtn.style.left,
                styleTop: noBtn.style.top,
                position: noBtn.style.position
            });
            setInitialPosition();
        }
    });
    
    console.log('✅ Скрипт успешно инициализирован');
});




// Создаем фоновую кнопку-сердечко
function createLoveButton() {
    const loveButton = document.createElement('button');
    loveButton.id = 'love-button';
    loveButton.innerHTML = '❤️';
    loveButton.title = 'Нажми меня...';
    
    // Массив из 7 надписей
    const messages = [
        'А вот я лично тебя очень сильно люблю',
        'Ты у меня самый лучший',
        'С тобой моя жизнь в миллионы раз лучше',
        'Я буду плакать когда ты уйдешь в армию(',
        'Спасибо, что появился в моей жизни',
        'Очкошка',
        'Ты для меня все ❤️'
    ];
    
    let messageIndex = 0;
    
    // Стилизация
    loveButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 20, 147, 0.9);
        border: none;
        font-size: 30px;
        cursor: pointer;
        z-index: 9998;
        box-shadow: 0 5px 20px rgba(255, 20, 147, 0.5);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse 2s infinite;
    `;
    
    document.body.appendChild(loveButton);
    
    // Обработчик наведения
    loveButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.boxShadow = '0 0 30px rgba(255, 20, 147, 0.8)';
    });
    
    loveButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(255, 20, 147, 0.5)';
    });
    
    // Обработчик клика
    loveButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Получаем текущую надпись
        const currentMessage = messages[messageIndex];
        
        // Увеличиваем индекс для следующего клика
        messageIndex = (messageIndex + 1) % messages.length;
        
        // Меняем цвет сердечка в зависимости от сообщения
        const colors = [
            '#ff4081', // розовый
            '#2196f3', // синий
            '#4caf50', // зеленый
            '#ff9800', // оранжевый
            '#9c27b0', // фиолетовый
            '#ff5722', // красный
            '#e91e63'  // малиновый
        ];
        
        this.style.background = colors[(messageIndex + 6) % colors.length];
        
        // Убираем существующее сообщение, если есть
        const existingMessage = document.getElementById('love-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Создаем сообщение
        const message = document.createElement('div');
        message.id = 'love-message';
        message.innerHTML = currentMessage;
        
        // Стили для сообщения
        message.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 40px;
            background: rgba(255, 255, 255, 0.97);
            color: ${colors[(messageIndex + 6) % colors.length]};
            padding: 20px 25px;
            border-radius: 20px;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
            z-index: 9999;
            max-width: 280px;
            text-align: center;
            animation: fadeInUp 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
            border: 3px solid ${colors[(messageIndex + 6) % colors.length]};
            font-family: 'Arial', sans-serif;
        `;
        
        // Особые стили для "Очкошка"
        if (currentMessage === 'Очкошка') {
            message.style.fontSize = '24px';
            message.style.fontWeight = '900';
            message.style.color = '#ff0000';
            message.style.border = '4px solid #ff0000';
            message.style.background = '#fff9c4';
            message.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
            message.style.animation = 'fadeInUp 0.5s ease, shake 0.5s ease 0.5s, fadeOut 0.5s ease 2.5s forwards';
            
            // Добавляем анимацию тряски
            const styleShake = document.createElement('style');
            if (!document.querySelector('#shake-style')) {
                styleShake.id = 'shake-style';
                styleShake.textContent = `
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                        20%, 40%, 60%, 80% { transform: translateX(5px); }
                    }
                `;
                document.head.appendChild(styleShake);
            }
        }
        
        // Особые стили для сообщения про армию
        if (currentMessage.includes('армию')) {
            message.style.background = '#e3f2fd';
            message.innerHTML = currentMessage + ' 😢';
        }
        
        // Особые стили для последнего сообщения
        if (currentMessage.includes('шучу')) {
            message.style.fontSize = '16px';
            message.style.fontStyle = 'italic';
        }
        
        document.body.appendChild(message);
        
        // Эффект сердечек при клике
        const heartCount = currentMessage === 'Очкошка' ? 25 : 15;
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const x = this.getBoundingClientRect().left + 30;
                const y = this.getBoundingClientRect().top + 30;
                launchHeart(x, y);
                
                // Особые сердечки для "Очкошка"
                if (currentMessage === 'Очкошка') {
                    hearts[(heartIndex + hearts.length - 1) % hearts.length].style.fontSize = '1.8em';
                    hearts[(heartIndex + hearts.length - 1) % hearts.length].innerHTML = '💥';
                }
            }, i * 50);
        }
        
        // Легкая вибрация (сильнее для "Очкошка")
        if (navigator.vibrate) {
            if (currentMessage === 'Очкошка') {
                navigator.vibrate([100, 50, 100, 50, 100]);
            } else {
                navigator.vibrate([50, 30, 50]);
            }
        }
        
  
        
        // Временно меняем эмодзи кнопки
        const originalHTML = this.innerHTML;
        if (currentMessage === 'Очкошка') {
            this.innerHTML = '💥';
        } else if (currentMessage.includes('армию')) {
            this.innerHTML = '😢';
        }
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
        }, 1000);
        
        // Автоматическое скрытие через 3 секунды
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    });
    
    // Анимация пульсации
    const style = document.createElement('style');
    if (!document.querySelector('#heartbeat-style')) {
        style.id = 'heartbeat-style';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 5px 20px rgba(255, 20, 147, 0.5); }
                50% { transform: scale(1.15); box-shadow: 0 0 40px rgba(255, 20, 147, 0.8); }
                100% { transform: scale(1); box-shadow: 0 5px 20px rgba(255, 20, 147, 0.5); }
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.9);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Вызываем создание кнопки после загрузки
window.addEventListener('load', function() {
    setTimeout(createLoveButton, 2000); // Появляется через 2 секунды
});