const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.gazzettaufficiale.it%2Frss%2FSG&api_key=pysut7xpkqmkvufbheptgxgbyd7c46wo0zlfun1e';
const ENDPOINT_URL = 'https://your-server.com/save-item'; // Cambia con il tuo endpoint reale

async function fetchFeed() {
  try {
    const res = await fetch(RSS_URL);
    const data = await res.json();
    displayItems(data.items);
  } catch (error) {
    console.error("Errore caricamento feed:", error);
    document.getElementById('feed-list').innerHTML = '<li>Errore nel caricamento.</li>';
  }
}

function displayItems(items) {
  const list = document.getElementById('feed-list');
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'feed-item';
    li.innerHTML = `<strong>${item.title}</strong><br><small>${item.pubDate}</small>`;
    li.addEventListener('click', () => handleClick(item, li));
    list.appendChild(li);
  });
}

async function handleClick(item, element) {
  try {
    await fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });

    element.style.background = '#d4edda';
    element.innerHTML += '<br><em>Salvato!</em>';
    setTimeout(() => element.remove(), 3000);
  } catch (err) {
    alert('Errore durante il salvataggio.');
    console.error(err);
  }
}

fetchFeed();