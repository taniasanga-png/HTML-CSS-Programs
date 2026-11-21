const API_URL = 'https://jsonplaceholder.typicode.com/users';
const loader = document.querySelector('#loader');
const statusP = document.querySelector('#status');
const tbody = document.querySelector('#tbody');
const summary = document.querySelector('#summary');

async function loadClients(url) {
  loader.hidden = false;
  statusP.className = '';
  statusP.textContent = 'Loading...';
  tbody.textContent = '';
  summary.textContent = '';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Server responded with status ' + response.status);
    const clients = await response.json();
    render(clients);
    statusP.textContent = clients.length + ' clients loaded successfully.';
  } catch (error) {
    statusP.className = 'error';
    statusP.textContent = 'Could not load data: ' + error.message;
  } finally {
    loader.hidden = true;                                     // always hide loader
  }
}

function render(clients) {
  const cities = new Set(clients.map(c => c.address.city));
  [['Total Clients', clients.length], ['Cities', cities.size]].forEach(([label, value]) => {
    const card = document.createElement('div');
    card.className = 'stat';
    const num = document.createElement('strong');
    num.textContent = value;
    const text = document.createElement('span');
    text.textContent = label;
    card.appendChild(num);
    card.appendChild(text);
    summary.appendChild(card);
  });
  clients.forEach(c => {
    const tr = document.createElement('tr');
    [c.id, c.name, c.company.name, c.email, c.address.city].forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

document.querySelector('#loadBtn').addEventListener('click', () => loadClients(API_URL));
document.querySelector('#errorBtn').addEventListener('click', () => loadClients(API_URL + '-wrong'));
