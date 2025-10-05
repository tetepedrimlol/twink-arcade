const games = [
  {
    title: "FNAF 1",
    desc: "A horror classic — survive 5 nights at Freddy’s.",
    img: "images/fnaf1.png",
    url: "https://fnaf1.io/",
    tags: ["horror", "singleplayer"],
  },
  {
    title: "FNAF 2",
    desc: "The sequel to the hit horror game.",
    img: "images/FNAF2.png",
    url: "https://fnaf1.io/fnaf-2",
    tags: ["horror", "singleplayer"],
  },
  {
    title: "FNAF 3",
    desc: "Face your fears in Fazbear’s Fright.",
    img: "images/fnaf3.png",
    url: "https://fnaf1.io/fnaf-3",
    tags: ["horror", "singleplayer"],
  },
  {
    title: "1v1.lol",
    desc: "A fast-paced online FPS and build battle.",
    img: "images/1v1lol.png",
    url: "https://1v1.lol/",
    tags: ["fps", "multiplayer"],
  },
  {
    title: "Deadshot",
    desc: "Multiplayer shooter similar to Call of Duty.",
    img: "images/deadshot.png",
    url: "https://deadshot.io/",
    tags: ["fps", "multiplayer"],
  },
  {
    title: "Eaglercraft 1.12.2",
    desc: "A Minecraft-like sandbox game — build with friends.",
    img: "images/eagle112.png",
    url: "https://eaglercraft.com/mc/1.12.2",
    tags: ["multiplayer"],
  },
  {
    title: "Eaglercraft 1.8.8",
    desc: "Classic Minecraft experience online.",
    img: "images/eaglecraft18.png",
    url: "https://eaglercraft.com/mc/1.8.8",
    tags: ["multiplayer"],
  },
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const tpl = document.getElementById("card-tpl");

function render() {
  grid.innerHTML = "";
  const term = search.value.toLowerCase();
  const tag = filter.value;

  const filtered = games.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(term) ||
      g.desc.toLowerCase().includes(term);
    const matchesTag = !tag || g.tags.includes(tag);
    return matchesSearch && matchesTag;
  });

  for (const game of filtered) {
    const card = tpl.content.cloneNode(true);
    card.querySelector(".title").textContent = game.title;
    card.querySelector(".desc").textContent = game.desc;
    card.querySelector("img").src = game.img;
    card.querySelector("a").href = game.url;
    grid.appendChild(card);
  }
}

search.addEventListener("input", render);
filter.addEventListener("change", render);
render();
