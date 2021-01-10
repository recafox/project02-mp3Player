class Teleprompter {
  constructor(lyrics, songName, container) {
    this.container = container;
    this.lyricMap = this.parseLyric(lyrics);
    this.lyricsWrapper = Array.from(container.children).filter(child => child.className.includes('js-lyrics-wrapper'))[0];
    this.lyricsList = Array.from(this.lyricsWrapper.children).filter(child => child.className.includes('js-lyrics-list'))[0];
    this.titleNode = Array.from(container.children).filter(child => child.className.includes('js-lyrics-title'))[0];
    this.allSentences = null;
    this.intervalId = undefined;
    this.currentTime = 0;
    this.isCounting = false;
    this.currentPlaying = "";
    this.activeClassName = 'is--current';
    this.offset = 45;
    this.lyricsList.style.top = '0px';
    this.reset();
    this.setTitle(songName);
    this.render();
    
  }
  parseLyric (lyrics) {
    const that = this;
    let raw = lyrics.split("");
    let i = 0;
    let max = raw.length;
    let key = undefined;
    let map = {};
    let insideBrackets = true;
    while (i <= max) {
      if (raw[i - 1] === '[') {
        insideBrackets = true;
        key = "";
      } else if (raw[i] === ']') {
        insideBrackets = false;
        key = Math.floor(that.convertToMilliSec(key));
        map[key] = "";
      }

      if (insideBrackets === true) {
        key += `${raw[i]}`;
      }

      if (insideBrackets === false && raw[i] !== '[' && raw[i] !== ']' && raw[i]) {
        let content = `${raw[i]}`;
        map[key] += content;
      }
      i++;
    }
    return map;
  }
  // 02:25.49 => 100 * 60 * 20 + 100 * 25 + 49
  convertToMilliSec (timeStr) {
    let min = parseInt(timeStr.split(":")[0], 10);
    let sec = parseFloat(timeStr.split(":")[1]);
    return min * 100 * 60 + sec * 100;
  }
  render() {
    const that = this;
    let tmplString = "";
    for (let key in that.lyricMap) {
      tmplString += that.createLyricTmpl(that.lyricMap[key], key);
    }
    that.lyricsList.innerHTML = tmplString;
    that.allSentences = Array.from(that.lyricsList.querySelectorAll('p'));
  }
  createLyricTmpl (lyric, time) {
    return `<p data-time="${time}">${lyric}</p>`;
  }
  /**
   * 
   * @param {number} time 80.7188
   */
  start (time) {
    const that = this;
    that.isCounting = true;
    if (time > 0) {
      that.clear();
      that.updateCurrent(that.getNearest(time.toFixed(2) * 100));
    }
    that.currentTime = time.toFixed(2) * 100;
    that.intervalId = window.setInterval(function() {
      that.currentTime ++;
      for (let key in that.lyricMap) {
        if (Math.ceil(key) === that.currentTime) {
          that.clear();
          that.updateCurrent(that.currentTime);
        }
      }
    }, 10);
  }

  getNearest (num) {
    const that = this;
    let arr = [];
    for (let key in that.lyricMap) {
      arr.push(key);
    }
    arr.push(num);
    let sorted = arr.sort((a, b) => a - b);
    return sorted[sorted.indexOf(num) - 1];
  }
  stop () {
    const that = this;
    that.isCounting = false;
    window.clearInterval(that.intervalId);
  }
  updateCurrent(time) {
    const that = this;
    let current = that.allSentences.find(sentence => parseInt(sentence.dataset.time) === parseInt(time));
    if (current) {
      current.classList.add(that.activeClassName);
      let currentSentencePos = that.allSentences.findIndex(sentence => parseInt(sentence.dataset.time) === parseInt(time));
      let pos = current.getBoundingClientRect().top;
      let windowHeight = window.innerHeight;

      that.lyricsList.style.top = `-${that.offset * currentSentencePos}px`;
      if (pos > windowHeight / 3) {
        if (currentSentencePos > that.allSentences.length - 3) {
          return;
        } else {
          let prevPos = isNaN(parseInt(that.lyricsList.style.top.replace("px", "").trim(), 10)) ? 0 : parseInt(that.lyricsList.style.top.replace("px", "").trim(), 10);
          that.lyricsList.style.top = `${prevPos - that.offset}px`;
        }
      }

    }
  }
  clear () {
    const that = this;
    let prev = that.allSentences.find(lyric => lyric.classList.contains(that.activeClassName));
    if (prev) {
      prev.classList.remove(that.activeClassName);
    }
    
  }

  removeAll () {
    const that = this;
    that.lyricsList.innerHTML = "";
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
  
}

export default Teleprompter;