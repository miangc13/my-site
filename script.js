document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Плавная прокрутка по якорям ---
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- 2. Модальное окно для карточек растений ---
  const modal = document.getElementById('plant-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');
  const closeBtn = document.querySelector('.close-btn');
  const plantCards = document.querySelectorAll('.plant-card');

  if (!modal || !closeBtn || !plantCards.length) {
    console.warn('Не найдены элементы модального окна или карточек. Проверьте HTML.');
    return; // Если элементов нет, дальше не выполняем, чтобы не ломать остальное
  }

  function openModal(title, description) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalText) modalText.textContent = description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем прокрутку
    modal.setAttribute('aria-hidden', 'true');
  }

  // Клик по карточке растения
  plantCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');

      // Защита: если данных нет — ничего не делаем
      if (!title || !desc) return;
      openModal(title, desc);
    });
  });

  // Закрытие по крестику
  closeBtn.addEventListener('click', closeModal);

  // Закрытие по клику вне окна
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
