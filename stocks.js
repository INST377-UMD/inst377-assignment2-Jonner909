const apiKey = "MByifZxSotxIohZcAFhYwxc91EAuulUo"; 

async function getStockData() {
  const ticker = document.getElementById("ticker").value.toUpperCase();
  const days = parseInt(document.getElementById("days").value);
  const end = Math.floor(Date.now() / 1000);
  const start = end - days * 86400;

  const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${start * 1000}/${end * 1000}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`);
  const data = await response.json();

  const dates = data.results.map(p => new Date(p.t).toLocaleDateString());
  const closes = data.results.map(p => p.c);

  new Chart(document.getElementById("stockChart"), {
    type: "line",
    data: {
      labels: dates,
      datasets: [{ label: ticker, data: closes, borderWidth: 2 }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: false } }
    }
  });
}

fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("redditStocks");
    data.slice(0, 5).forEach(stock => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${stock.ticker}</td>
        <td>${stock.no_of_comments}</td>
        <td>${stock.sentiment} ${stock.sentiment === 'Bullish' ? '📈' : '📉'}</td>
        <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">Link</a></td>
      `;
      table.appendChild(row);
    });
  });
