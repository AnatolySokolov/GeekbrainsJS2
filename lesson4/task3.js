'use strict';

// json-server db.json --watch --static ./lesson4

const FEEDBACK_URL = 'feedback';
const regexp = {
  name: /[A-Za-zA-Яа-яЁё]/g,
  phone: /^\+7\([\d]{3}\)[\d]{3}-[\d]{4}$/,
  email: /my[-.]?mail@mail\.ru/g
};

const form = document.getElementById('feedback');

const checkField = (re, str) => re.test(str);

const checkValidity = form => {
  const fields = document.querySelectorAll('input');

  return Array.from(fields).every(item => {
    if (checkField(regexp[item.name], form.get(item.name))) {
      item.style.borderColor = 'initial';
      return true;
    } else {
      item.style.borderColor = 'red';
      return false;
    }
  });
};

const onFormSubmit = e => {
  const feedback = new FormData(form);
  const searchParams = new URLSearchParams();

  for (const pair of feedback) {
    searchParams.append(pair[0], pair[1]);
  }

  e.preventDefault();
  if (checkValidity(feedback)) {
    fetch(FEEDBACK_URL, {
      method: 'post',
      body: searchParams
    });
    form.reset();
  }
};

form.addEventListener('submit', onFormSubmit);
