document.querySelectorAll('.search-form').forEach((searchForm) => {
  const searchInput = searchForm.querySelector('input');
  const searchToggle = searchForm.querySelector('.search-toggle');

  searchToggle.addEventListener('click', () => {
    const isOpen = searchForm.classList.toggle('is-open');
    searchToggle.setAttribute('aria-expanded', String(isOpen));
    searchToggle.setAttribute('aria-label', isOpen ? 'Fechar pesquisa' : 'Abrir pesquisa');

    if (isOpen) {
      searchInput.focus();
    }
  });
});
