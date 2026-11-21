const autoReply = document.querySelector('#autoReply');
const darkMode = document.querySelector('#darkMode');
const botStatus = document.querySelector('#botStatus');
const themeStatus = document.querySelector('#themeStatus');

function apply() {
  botStatus.textContent = autoReply.checked
    ? 'Chatbot is ON: customer messages are answered automatically.'
    : 'Chatbot is OFF: messages go to the human support team.';
  document.body.classList.toggle('dark', darkMode.checked);
  themeStatus.textContent = 'Theme: ' + (darkMode.checked ? 'Dark' : 'Light');
}

// Restore saved settings
autoReply.checked = localStorage.getItem('autoReply') === 'true';
darkMode.checked = localStorage.getItem('darkMode') === 'true';
apply();

autoReply.addEventListener('change', () => {
  localStorage.setItem('autoReply', autoReply.checked);
  apply();
});
darkMode.addEventListener('change', () => {
  localStorage.setItem('darkMode', darkMode.checked);
  apply();
});
