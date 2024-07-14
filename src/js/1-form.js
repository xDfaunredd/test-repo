import validator from 'validator';

const form = document.querySelector('.feedback-form');

const formData = { email: '', message: '' };
const feedbackFormState = 'feedback-form-state';

const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

const reloadSite = () => {
  const savedData = JSON.parse(localStorage.getItem(feedbackFormState));

  if (savedData) {
    formData.email = savedData.email;
    formData.message = savedData.message;
  }

  emailInput.value = formData.email;
  messageTextarea.value = formData.message;
};

reloadSite();

const setInputTextToLocaleStorage = event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(feedbackFormState, JSON.stringify(formData));
};

const sendProcessedData = event => {
  event.preventDefault();

  const { email, message } = formData;

  const isValidEmail = validator.isEmail(email);

  if (email === '' || message === '') {
    alert('fill in all fields');
    return;
  }

  if (!isValidEmail) {
    alert('invalid email');
    return;
  }

  console.log(formData);

  form.reset();

  localStorage.removeItem(feedbackFormState);
  formData.email = '';
  formData.message = '';
};

form.addEventListener('input', setInputTextToLocaleStorage);
form.addEventListener('submit', sendProcessedData);
