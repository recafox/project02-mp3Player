import Logo from './logo.png';

function addImg () {
  const img = document.createElement('img');
  img.alt = "logo";
  img.width = "300";
  img.src = Logo;
  const body = document.querySelector('body');
  body.appendChild(img);

}

export default addImg;