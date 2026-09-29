export function initModal() {
  const modal = document.querySelector('#modal');
  const modalClose = document.querySelector('#mclose');
  let lastFocusedElement = null;

  function showModal(title, msg) {
    lastFocusedElement = document.activeElement;
    document.querySelector('#mt').textContent = title;
    document.querySelector('#mp').textContent = msg;
    modal.hidden = false;
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  if (modalClose) modalClose.onclick = closeModal;
  if (modal) {
    modal.onclick = e => {
      if (e.target === modal) closeModal();
    };
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  return { showModal, closeModal };
}
