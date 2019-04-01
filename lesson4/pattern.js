'use strict';

const input = document.querySelector('.input').textContent;
const output = document.querySelector('.output');
const pattern = /:\s?'.+?'|\s'[^']+?',?\s?-/g;
// :\s?'.+?'              - прямая речь после слов автора
// \s'[^']+?',?\s?-       - прямая речь перед словами автора

output.textContent = input.replace(pattern, match => match.replace(/'/g, '"'));
