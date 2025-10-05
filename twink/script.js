// Game Data with local images
const games = [
  { name: "FNAF 1", desc: "A horror game very famous", tags: ["horror","singleplayer"], thumb: "images/fnaf1.png", url: "https://fnaf1.io/" },
  { name: "FNAF 2", desc: "A horror game very famous", tags: ["horror","singleplayer"], thumb: "images/fnaf2.png", url: "https://fnaf1.io/fnaf-2" },
  { name: "FNAF 3", desc: "A horror game very famous", tags: ["horror","singleplayer"], thumb: "images/fnaf3.png", url: "https://fnaf1.io/fnaf-3" },
  { name: "1v1.lol", desc: "A FPS game online", tags: ["fps","multiplayer"], thumb: "images/1v1lol.png", url: "https://1v1.lol/" },
  { name: "Deadshot", desc: "A FPS game like COD", tags: ["fps","multiplayer"], thumb: "images/deadshot.png", url: "https://deadshot.io/" },
  { name: "Eagle Craft 1.12", desc: "A game where imagination is the limit", tags: ["multiplayer"], thumb: "images/eagle12.png", url: "https://eaglercraft.com/mc/1.12.2" },
  { name: "Eagle Craft 1.8", desc: "A game where imagination is the limit", tags: ["multiplayer"], thumb: "images/eagle8.png", url: "https://eaglercraft.com/mc/1.8.8" }
];

// DOM References
const grid = document.getElementById('grid');
const tpl = document.getElementById('card-tpl');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');
const modalToggleFit = document.getElementById('modal-toggle-fit');
const modalOpenExternal = document.getElementById('modal-open-external');

// Render games
function renderGames(list) {
  grid.innerHTML = '';
  list.forEach(game => {
    const card = tpl.content.cloneNode(true);
    card.querySelector('.thumb img').src = game.thumb;
    card.querySelector('.thumb img').alt = game.name;
    card.querySelector('.title').textContent = game.name;
    card.querySelector('.desc').textContent = game.desc;

    const tagsContainer = card.querySelector('.tags');
    game.tags.forEach(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    card.querySelector('.play-btn').href = game.url;
    card.querySelector('.details-btn').addEventListener('click', () => openModal(game));
    grid.appendChild(card);
  });
}

// Filter & Search
function filterGames() {
  const searchText = searchInput.value.toLowerCase();
  const selectedTag = filterSelect.value;
  const filtered = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchText) ||
                          game.desc.toLowerCase().includes(searchText) ||
                          game.tags.some(tag => tag.toLowerCase().includes(searchText));
    const matchesTag = selectedTag === "" || game.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });
  renderGames(filtered);
}

searchInput.addEventListener('input', filterGames);
filterSelect.addEventListener('change', filterGames);

// Modal Functions
function openModal(game) {
  modal.classList.add('show');
  modalTitle.textContent = game.name;
  modalBody.innerHTML = '<div class="spinner"></div><iframe style="display:none;" allowfullscreen></iframe>';
  const iframe = modalBody.querySelector('iframe');
  iframe.src = game.url;
  modalOpenExternal.href = game.url;

  iframe.onload = () => {
    modalBody.querySelector('.spinner').remove();
    iframe.style.display = 'block';
  };
}

// Modal Close
modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
  modalBody.innerHTML = '';
});

modalToggleFit.addEventListener('click', () => {
  const iframe = modalBody.querySelector('iframe');
  if (!iframe) return;
  iframe.style.objectFit = iframe.style.objectFit === 'contain' ? 'cover' : 'contain';
});

// Responsive iframe height
window.addEventListener('resize', () => {
  const iframe = modalBody.querySelector('iframe');
  if (iframe) iframe.style.height = window.innerHeight * 0.7 + 'px';
});

// Initial Render
renderGames(games);
