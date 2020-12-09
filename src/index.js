import hello from './hello.js'
import Button from './component/Button/button.js';
import Heading from './component/Heading/heading.js'

require('/src/style/style.scss');



if (process.env.NODE_ENV === 'production') {
  console.log("this is production mode");
}