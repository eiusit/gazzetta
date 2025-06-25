const RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.gazzettaufficiale.it%2Frss%2FSG&api_key=pysut7xpkqmkvufbheptgxgbyd7c46wo0zlfun1e";
const ENDPOINT_URL = "https://rssgazzetta.netlify.app/.netlify/functions/salva_item";

async function fetchRSS() {
  const res = await fetch(RSS_URL);
  const data = await res.json();

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
  await fetch(ENDPOINT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: item.title,
      link: item.link,
      date: item.pubDate
    })
  });

  setTimeout(() => {
    liElement.remove();
  }, 2000);
}

fetchRSS();
