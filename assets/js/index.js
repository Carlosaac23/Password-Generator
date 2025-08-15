const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersChars = '0123456789';
const symbolsChars = '!-$*^+';
const spaceChar = ' ';

function getRandomChar(chars) {
  const index = Math.floor(Math.random() * chars.length);
  return chars[index];
}

function generatePassword() {
  const passwordInput = document.getElementById('password');
  const lowercaseCheckbox = document.getElementById('lowercase');
  const uppercaseCheckbox = document.getElementById('uppercase');
  const numbersCheckbox = document.getElementById('numbers');
  const symbolsCheckbox = document.getElementById('symbols');
  const excludeDuplicateCheckbox = document.getElementById('exc-duplicate');
  const spacesCheckbox = document.getElementById('spaces');

  let characters = '';
  if (lowercaseCheckbox.checked) characters += lowercaseChars;
  if (uppercaseCheckbox.checked) characters += uppercaseChars;
  if (numbersCheckbox.checked) characters += numbersChars;
  if (symbolsCheckbox.checked) characters += symbolsChars;
  if (spacesCheckbox.checked) characters += spaceChar;

  if (characters === '') {
    passwordInput.value = '';
    showMessage('Please select at least one password setting');
    return;
  }

  let password = '';
  const length = 12; // Default password length

  while (password.length < length) {
    let char = getRandomChar(characters);
    if (excludeDuplicateCheckbox.checked && password.includes(char)) continue;
    password += char;
  }

  passwordInput.value = password;
}

function copyPassword() {
  const passwordInput = document.getElementById('password');

  if (passwordInput.value === '') {
    showMessage('No password to copy');
    return;
  }

  passwordInput.disabled = false;
  // Enable the input to select its value
  passwordInput.select();
  document.execCommand('copy');
  passwordInput.disabled = true;
  showMessage('¡Password copied!');
}

function showMessage(message) {
  const textContainer = document.querySelector('.copy-text');

  // Remove existing message if any
  const existingMsg = document.querySelector('.copied-msg');
  if (existingMsg) {
    return;
  }

  const copiedMsg = document.createElement('p');
  copiedMsg.classList.add('copied-msg');
  copiedMsg.textContent = message;
  textContainer.appendChild(copiedMsg);
  setTimeout(() => {
    copiedMsg.remove();
  }, 2500);
}
