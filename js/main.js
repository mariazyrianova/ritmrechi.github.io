// Функция для анимации заголовков
function observeHeadings() {
    const headings = document.querySelectorAll("h1");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    headings.forEach((heading) => {
        observer.observe(heading);
    });
}

function openPdf(filePath) {
    // Открыть файл в новой вкладке
    window.open(filePath, '_blank');
}

// Бургер-меню
const burgerBtn = document.querySelector('.header__burger-btn');
const header = document.querySelector('.header');
const menuOverlay = document.querySelector('.menu-overlay');

if (burgerBtn) {
    burgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        header.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });
}

// Закрытие меню при клике на оверлей
if (menuOverlay) {
    menuOverlay.addEventListener('click', function() {
        header.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
}

// Закрытие меню при клике на пункт
const menuLinks = document.querySelectorAll('.menu__link');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        header.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
});

// Функция для скачивания файла
function triggerDownload(fileName) {
    const element = document.createElement("a");
    element.setAttribute("href", fileName);
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Попап
const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");

function showPopup() {
    if (popupOverlay) {
        popupOverlay.style.display = "block";
    } else {
        console.error("Элемент с id 'popup-overlay' не найден.");
    }
}

function hidePopup() {
    if (popupOverlay) {
        popupOverlay.style.display = "none";
    } else {
        console.error("Элемент с id 'popup-overlay' не найден.");
    }
}

if (popupOverlay) {
    popupOverlay.addEventListener("click", hidePopup);
} else {
    console.error("Элемент с id 'popup-overlay' не найден.");
}

if (popup) {
    popup.addEventListener("click", (event) => {
        event.stopPropagation();
    });
} else {
    console.error("Элемент с id 'popup' не найден.");
}

// Кнопки записи
const btnRecords = document.querySelectorAll(".btn-record");
if (btnRecords.length > 0) {
    btnRecords.forEach((btn) => {
        btn.addEventListener("click", showPopup);
    });
} else {
    console.error("Элементы с классом .btn-record не найдены.");
}

 //Функция для нормализации номера телефона (удаление всех нецифровых символов)
function normalizePhoneNumber(phone) {
    return phone.replace(/\D/g, '');
}

// Функция для валидации номера телефона
function validatePhoneNumber(phone) {
    // Нормализуем номер
    const normalizedPhone = normalizePhoneNumber(phone);
    // Проверяем, что номер содержит 10 или 11 цифр (для российских номеров)
    return normalizedPhone.length === 10 || normalizedPhone.length === 11;
}

// Обработчик отправки формы
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Валидация полей
    const name = formData.get('name')?.toString().trim();
    let phone = formData.get('phone')?.toString().trim();
    const service = formData.get('service')?.toString();

    if (!name) {
        alert("Пожалуйста, введите ваше имя");
        return;
    }

    if (!phone) {
        alert("Пожалуйста, введите номер телефона");
        return;
    }

    // Нормализуем номер телефона перед проверкой
    phone = normalizePhoneNumber(phone);
    
    if (!validatePhoneNumber(phone)) {
        alert("Пожалуйста, введите корректный номер телефона (10 или 11 цифр)");
        return;
    }

    if (!service || service === "Выберите услугу:") {
        alert("Пожалуйста, выберите услугу");
        return;
    }

    // Обновляем formData с нормализованным номером
    formData.set('phone', phone);

    try {
        // Отправка данных
        const response = await fetch('https://script.google.com/macros/s/AKfycbw63C6K-dZj6iG5WG7CiGccW8XElWesUQyHtyWVqwMxbWGQzgz_pRM8z2WTBaULfxJRdw/exec', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert("Вы успешно записались! Мы скоро свяжемся с вами.");
        form.reset();
        
        // Закрываем попап, если форма была в нем
        if (form.closest('#popup')) {
            hidePopup();
        }
    } catch (error) {
        console.error("Ошибка при отправке формы:", error);
        alert("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.");
    }
}

// Добавьте эту функцию в ваш main.js
function formatPhoneNumber(input) {
    // Удаляем все нецифровые символы
    let phone = input.value.replace(/\D/g, '');
    
    // Форматируем номер в формате 8-999-999-99-99
    if (phone.length > 1) {
        phone = phone.substring(0, 1) + '-' + phone.substring(1);
    }
    if (phone.length > 5) {
        phone = phone.substring(0, 5) + '-' + phone.substring(5);
    }
    if (phone.length > 9) {
        phone = phone.substring(0, 9) + '-' + phone.substring(9);
    }
    if (phone.length > 12) {
        phone = phone.substring(0, 12) + '-' + phone.substring(12);
    }
    
    input.value = phone;
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Анимация заголовков
    observeHeadings();

    // Обработчики форм
    const mainForm = document.getElementById('index__form');
    const popupForm = document.getElementById('index__popupform');

    if (mainForm) {
        mainForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.warn("Форма с id 'index__form' не найдена");
    }

    if (popupForm) {
        popupForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.warn("Форма с id 'index__popupform' не найдена");
    }

      const phoneInputs = document.querySelectorAll('input[name="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
});