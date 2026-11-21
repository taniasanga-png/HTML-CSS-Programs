const solutions = [
  { id: 1, name: 'Retail Support Bot', cat: 'Chatbot', industry: 'Retail', info: 'Answers customer queries and tracks orders 24/7.' },
  { id: 2, name: 'Patient Helper Bot', cat: 'Chatbot', industry: 'Healthcare', info: 'Books appointments and answers common health FAQs.' },
  { id: 3, name: 'Defect Detector', cat: 'Vision', industry: 'Manufacturing', info: 'Finds product defects on the assembly line using cameras.' },
  { id: 4, name: 'X-ray Assistant', cat: 'Vision', industry: 'Healthcare', info: 'Highlights suspicious areas in medical images for doctors.' },
  { id: 5, name: 'Demand Forecaster', cat: 'Analytics', industry: 'Retail', info: 'Predicts product demand to reduce stock-outs.' },
  { id: 6, name: 'Machine Maintenance AI', cat: 'Analytics', industry: 'Manufacturing', info: 'Predicts machine failures before they happen.' }
];

const grid = document.querySelector('#grid');
const search = document.querySelector('#search');
const industry = document.querySelector('#industry');
const tabs = document.querySelectorAll('.tab');
const countP = document.querySelector('#count');
const detail = document.querySelector('#detail');
let activeCat = 'all';

function render() {
  const text = search.value.toLowerCase();
  const list = solutions.filter(s =>
    (activeCat === 'all' || s.cat === activeCat) &&
    (industry.value === 'all' || s.industry === industry.value) &&
    s.name.toLowerCase().includes(text));
  grid.textContent = '';
  countP.textContent = list.length + ' solution(s) found';
  list.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '<span class="badge"></span><img alt=""><div><strong></strong><p></p></div>';
    card.querySelector('.badge').textContent = s.cat;
    const img = card.querySelector('img');
    img.src = 'https://picsum.photos/seed/ai' + s.id + '/300/200';
    img.alt = s.name;
    card.querySelector('strong').textContent = s.name;
    card.querySelector('p').textContent = s.industry;
    card.addEventListener('click', () => {
      document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const found = solutions.find(x => x.id === s.id);
      detail.querySelector('h3').textContent = found.name;
      detail.querySelector('p').textContent = found.info;
      detail.hidden = false;
    });
    grid.appendChild(card);
  });
  if (list.length === 0) detail.hidden = true;
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  activeCat = tab.dataset.cat;
  render();
}));
search.addEventListener('input', render);
industry.addEventListener('change', render);
render();
