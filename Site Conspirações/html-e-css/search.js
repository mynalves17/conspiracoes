const searchForms = document.querySelectorAll('.search-form');
const searchInput = document.querySelector('#search-input') ||
  document.querySelector('.search-form input');
const searchResult = document.querySelector('#search-result');

const normalizeText = (text) =>
  (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const cards = [
  ...document.querySelectorAll('.cards-grid .col'),
  ...document.querySelectorAll('.article-card-grid .article-card')
];

if (searchInput && cards.length) {
  const filterCards = () => {
    const terms = normalizeText(searchInput.value).split(/\s+/).filter(Boolean);
    let visibleCards = 0;

    cards.forEach((card) => {
      const title = card.querySelector('h2, h4');
      const titleText = normalizeText(title?.textContent);

      // Separa a pesquisa em palavras e mostra todos os cards cujo
      // título contenha pelo menos uma delas.
      const matches = terms.length === 0 ||
        terms.some((term) => titleText.includes(term));

      card.hidden = !matches;

      if (matches) {
        visibleCards += 1;
      }
    });

    if (searchResult) {
      if (terms.length && visibleCards === 0) {
        searchResult.textContent = 'Nenhum artigo relacionado encontrado.';
      } else if (terms.length) {
        searchResult.textContent =
          `${visibleCards} artigo(s) relacionado(s) encontrado(s).`;
      } else {
        searchResult.textContent = '';
      }
    }
  };

  searchForms.forEach((searchForm) => {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (document.querySelector('.cards-grid') &&
          !document.querySelector('.article-card-grid')) {
        const query = searchInput.value.trim();
        window.location.href = query
          ? `artigos.html?q=${encodeURIComponent(query)}`
          : 'artigos.html';
        return;
      }
      filterCards();
    });
  });

  searchInput.addEventListener('input', filterCards);

  const initialQuery = new URLSearchParams(window.location.search).get('q');
  if (initialQuery) {
    searchInput.value = initialQuery;
  }

  filterCards();
}
