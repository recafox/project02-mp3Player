class Teleprompter {
  constructor(lyrics, songName, container) {
    this.lyricMap = this.parseLyric(lyrics);
    this.lyricsList = Array.from(container.children).filter(child => child.className.includes('js-lyrics-list'))[0];
    this.titleNode = Array.from(container.children).filter(child => child.className.includes('js-lyrics-title'))[0];

    this.reset();
    this.setTitle(songName);
    this.render();
    
  }
  parseLyric (lyrics) {
    let raw = lyrics.split("");
    let i = 0;
    let max = raw.length;
    let key = "";
    let value = "";
    let map = {};
    let insideBrackets = true;
    while (i <= max) {
      if (raw[i - 1] === '[') {
        insideBrackets = true;
        key = "";
      } else if (raw[i] === ']') {
        insideBrackets = false;
        map[key] = {
          value: "",
        };
      }

      if (insideBrackets === true) {
        key += `${raw[i]}`;
      }

      if (insideBrackets === false && raw[i] !== '[' && raw[i] !== ']' && raw[i]) {
        map[key].value += `${raw[i]}`;
      }
      i++;
    }
    return map;
  }
  render() {
    const that = this;
    let tmplString = "";
    for (let key in that.lyricMap) {
      tmplString += that.createLyricTmpl(that.lyricMap[key].value, key);
    }
    that.lyricsList.innerHTML = tmplString;
  }
  createLyricTmpl (lyric, time) {
    return `<p data-time="${time}">${lyric}</p>`;
  }

  reset () {
    const that = this;
    that.titleNode.innerText = "";
    that.lyricsList.innerHTML = "";
  }
  setTitle (title) {
    const that = this;
    that.titleNode.innerText = title;
  }
  updateCurrent() {

  }
  
}

export default Teleprompter;