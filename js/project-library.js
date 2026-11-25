(() => {
  const form = document.querySelector('.library-controls');
  const search = document.getElementById('library-search');
  const category = document.getElementById('library-category');
  const cards = [...document.querySelectorAll('[data-library-project]')];
  const count = document.getElementById('library-count');
  const empty = document.getElementById('library-empty');
  const reset = document.getElementById('library-reset');

  function update() {
    let visible = 0;
    cards.forEach(card => {
      card.hidden = !projectMatches(card.dataset.category, card.dataset.search, category.value, search.value);
      if (!card.hidden) visible += 1;
    });
    count.textContent = visible + (visible === 1 ? ' project' : ' projects');
    empty.hidden = visible !== 0;
  }

  form.addEventListener('submit', event => event.preventDefault());
  search.addEventListener('input', update);
  category.addEventListener('change', update);
  reset.addEventListener('click', () => {
    search.value = '';
    category.value = 'all';
    update();
    search.focus();
  });
  update();
})();
