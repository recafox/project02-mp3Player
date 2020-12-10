// import hello from './hello.js'
// import Button from './component/Button/button.js';
// import Heading from './component/Heading/heading.js'

require('/src/style/style.scss');

let actionBtns = document.querySelectorAll('.js-action');
let actionEffect = function (e, node) {
  e.stopPropagation();
  let target = e.target;
  console.log(target);

}

actionBtns.forEach(function (item) {
  console.log(item);
  item.addEventListener('click', actionEffect);
})