let tasks = JSON.parse(localStorage.getItem('neuraTasks')) || [];
let editId = null;

const form = document.querySelector('#taskForm');
const tbody = document.querySelector('#tbody');
const counts = document.querySelector('#counts');
const filterSel = document.querySelector('#filter');
const saveBtn = document.querySelector('#saveBtn');
const cancelBtn = document.querySelector('#cancelBtn');

const save = () => localStorage.setItem('neuraTasks', JSON.stringify(tasks));

function makeBtn(text, cls, handler) {
  const b = document.createElement('button');
  b.textContent = text;
  if (cls) b.className = cls;
  b.addEventListener('click', handler);
  return b;
}

function render() {
  tbody.textContent = '';
  counts.textContent = '';
  ['Pending', 'In Progress', 'Completed'].forEach(s => {
    const li = document.createElement('li');
    li.textContent = s + ': ' + tasks.filter(t => t.status === s).length;
    counts.appendChild(li);
  });

  const shown = filterSel.value === 'All' ? tasks : tasks.filter(t => t.status === filterSel.value);
  if (shown.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4; td.className = 'empty'; td.textContent = 'No tasks found.';
    tr.appendChild(td); tbody.appendChild(tr);
    return;
  }

  shown.forEach(t => {
    const tr = document.createElement('tr');
    if (t.status === 'Completed') tr.className = 'done';

    const tdTitle = document.createElement('td');
    tdTitle.textContent = t.title;
    const small = document.createElement('small');
    small.textContent = t.desc;
    tdTitle.appendChild(small);

    const tdPri = document.createElement('td');
    const tag = document.createElement('span');
    tag.className = 'tag ' + t.priority;
    tag.textContent = t.priority;
    tdPri.appendChild(tag);

    const tdStatus = document.createElement('td');                 // UPDATE status
    const sel = document.createElement('select');
    ['Pending', 'In Progress', 'Completed'].forEach(s => {
      const o = document.createElement('option');
      o.textContent = s; o.selected = s === t.status;
      sel.appendChild(o);
    });
    sel.addEventListener('change', () => {
      tasks.find(x => x.id === t.id).status = sel.value;
      save(); render();
    });
    tdStatus.appendChild(sel);

    const tdAct = document.createElement('td');
    tdAct.className = 'actions';
    tdAct.appendChild(makeBtn('Edit', '', () => startEdit(t.id)));
    tdAct.appendChild(makeBtn('Delete', 'del', () => {            // DELETE
      tasks = tasks.filter(x => x.id !== t.id);
      save(); render();
    }));

    [tdTitle, tdPri, tdStatus, tdAct].forEach(td => tr.appendChild(td));
    tbody.appendChild(tr);
  });
}

function startEdit(id) {
  const t = tasks.find(x => x.id === id);
  editId = id;
  document.querySelector('#title').value = t.title;
  document.querySelector('#desc').value = t.desc;
  document.querySelector('#priority').value = t.priority;
  document.querySelector('#status').value = t.status;
  document.querySelector('#formTitle').textContent = 'Edit Task';
  saveBtn.textContent = 'Update Task';
  cancelBtn.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  editId = null;
  form.reset();
  document.querySelector('#formTitle').textContent = 'Add New Task';
  saveBtn.textContent = 'Add Task';
  cancelBtn.hidden = true;
}

form.addEventListener('submit', (e) => {                           // CREATE / UPDATE
  e.preventDefault();
  const data = {
    title: document.querySelector('#title').value.trim(),
    desc: document.querySelector('#desc').value.trim(),
    priority: document.querySelector('#priority').value,
    status: document.querySelector('#status').value
  };
  if (editId) Object.assign(tasks.find(t => t.id === editId), data);
  else tasks.push({ id: Date.now(), ...data });
  save(); resetForm(); render();
});

cancelBtn.addEventListener('click', resetForm);
filterSel.addEventListener('change', render);
render();                                                          // READ on page load
