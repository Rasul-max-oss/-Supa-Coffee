// Обработка формы контакта
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Получаем данные формы
      const formData = new FormData(contactForm);
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const phone = contactForm.querySelector('input[type="tel"]').value;
      
      // Валидация (простая)
      if (!name || !email || !phone) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      
      // Имитация отправки на сервер (можете заменить на реальный API)
      console.log('Отправка данных:', { name, email, phone });
      
      // Очищаем форму
      contactForm.reset();
      
      // Показываем модальное окно спасибо
      showSuccessModal();
    });
  }
});

// Функция для показа модального окна
function showSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('show');
    
    // Автоматически закрываем через 5 секунд
    setTimeout(function() {
      closeModal();
    }, 5000);
  }
}

// Функция для закрытия модального окна
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Закрытие модального окна при клике вне окна
document.addEventListener('click', function(e) {
  const modal = document.getElementById('successModal');
  if (modal && e.target === modal) {
    closeModal();
  }
});

// Закрытие при нажатии Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Анимация элементов при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Наблюдаем за секциями и карточками
document.querySelectorAll('section, .benefits__card, .formats__card').forEach(element => {
  observer.observe(element);
});
