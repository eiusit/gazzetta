const RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.gazzettaufficiale.it%2Frss%2FSG&api_key=pysut7xpkqmkvufbheptgxgbyd7c46wo0zlfun1e";

// Inserisci qui il tuo endpoint esterno
const ENDPOINT_URL = "https://tuo-endpoint-esterno.com/api/ricevi_item"; 

async function fetchRSS() {
  const response = await fetch(RSS_URL);
  const data = await response.json();

  const list = document.getElementById("rss-list");
  list.innerHTML = "";

  data.items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.title;
    li.onclick = () => handleClick(item, li);
    list.appendChild(li);
  });
}

async function handleClick(item, liElement) {
  try {
    const payload = {
      title: item.title,
      link: item.link,
      date: item.pubDate,
      description: item.description
    };

    await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // Rimozione dopo invio
    setTimeout(() => {
      liElement.remove();
    }, 2000);
    
  } catch (error) {
    console.error("Errore durante l'invio:", error);
    alert("Errore durante l'invio dei dati");
  }
}

fetchRSS();
