const form = document.querySelector('#demoForm');
const successMsg = document.querySelector('#successMsg');
const fields = form.querySelectorAll('input, select, textarea');

// Demo date cannot be in the past
document.querySelector('#date').min = new Date().toISOString().split('T')[0];

function validate(el) {
  el.setCustomValidity('');                                   // reset old message
  if (el.validity.patternMismatch) el.setCustomValidity(el.title);
  if (el.id === 'email' && /@(gmail|yahoo|hotmail)\./i.test(el.value)) {
    el.setCustomValidity('Please use your company email address.');
  }
  el.classList.add('touched');
  const box = el.closest('.field').querySelector('.error');
  box.textContent = el.checkValidity() ? '' : el.validationMessage;
}

fields.forEach(el => {
  el.addEventListener('input', () => validate(el));
  el.addEventListener('blur', () => validate(el));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.hidden = true;
  fields.forEach(validate);
  if (!form.checkValidity()) {
    form.reportValidity();                                    // shows first error bubble
    return;
  }
  successMsg.hidden = false;
  form.reset();
  fields.forEach(el => el.classList.remove('touched'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
