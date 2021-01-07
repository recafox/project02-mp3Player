import getNode from '../util.js';
import Teleprompter from './Teleprompter.js';

class MusicPlayer {
  constructor (playlist) {
    this.isPlaying = false;
    this.playlist = playlist;
    this.currentPlaylist = playlist;
    this.currentTrack = null;
    this.audioEl = new Audio();
    this.progressTimer = null;
    // control panel
    this.playBtn = getNode('.js-start-btn');
    this.prevBtn = getNode('.js-prev-btn');
    this.nextBtn = getNode('.js-next-btn');
    this.loopBtn = getNode('.js-loop-btn');
    this.repeatBtn = getNode('.js-repeat-btn');
    this.randomBtn = getNode('.js-random-btn');
    this.progressBar = getNode('.js-progress-bar');
    this.playerBg = getNode('.js-player-bg');

    this.cover = getNode('.js-cover');
    this.trackTitle = getNode('.js-song-title');
    this.artistName = getNode('.js-artist-name');

    // track list
    this.listPage = getNode('.js-track-list');

    // playlist
    this.randomList = this.shuffleArray(this.playlist);
    this.repeatOneList = [this.currentTrack];
    this.loopList = this.playlist;

    // default mode
    this.playMode = 'loop'; // single loop, loop, random

    // prompter
    this.prompter = null;



  }
  setTrack (songID) {
    this.currentTrack = this.getTrack(songID);
    this.audioEl.src = this.currentTrack.path;
    this.audioEl.currentTime = 0;
    this.updateProgressBar();
    this.stopTrack();
    this.setCoverArt(this.currentTrack);
    this.setTrackInfo(this.currentTrack);
    this.setCurrentItem(songID);

    this.prompter = new Teleprompter(this.currentTrack.lyrics, this.currentTrack.name, getNode('.js-lyrics-container'));
  }

  playTrack () {
    const that = this;
    that.isPlaying = true;
    that.audioEl.play();
    let img = Array.from(that.playBtn.childNodes).filter(child => child.tagName === 'IMG')[0];
    img.src = "./assets/icon/ic_pause.png";
    that.updateProgressBar();

    if (that.prompter) {
      that.prompter.start(that.audioEl.currentTime);
    }
  }

  playNext () {
    const that = this;
    function getNextSongId () {
      for (let i = 0; i < that.currentPlaylist.length; i++) {
        if (that.currentPlaylist[i].id === that.currentTrack.id) {
          if (that.currentPlaylist[i + 1] !== undefined) {
            return that.currentPlaylist[i + 1].id;
          } else {
            return that.currentPlaylist[0].id;
          }
        }
      }
    }
    that.setTrack(getNextSongId());
    that.playTrack();
  }

  playPrev () {
    const that = this;
    function getPrevSongId () {
      for (let i = 0; i < that.currentPlaylist.length; i++) {
        if (that.currentPlaylist[i].id === that.currentTrack.id) {
          if (that.currentPlaylist[i - 1] !== undefined) {
            return that.currentPlaylist[i - 1].id;
          } else {
            return that.currentPlaylist[that.currentPlaylist.length - 1].id;
          }
        }
      }
    }
    that.setTrack(getPrevSongId());
    that.playTrack();
  }
  setTrackCurrentTime (time) {
    const that = this;
    that.stopTrack();
    that.audioEl.currentTime = time;
    that.playTrack();
  }
  updateProgressBar () {
    const that = this;
    let bar = Array.from(that.progressBar.childNodes).filter(child => child.classList !== undefined && child.classList.contains('js-bar'))[0];
    that.progressTimer = setInterval(function() {
      bar.setAttribute('style', `width:${that.calculateProgressBar(that.audioEl.currentTime, that.audioEl.duration)}%`);
    }, 500);
  }
  calculateProgressBar (current, total) {
    return (current / total) * 100;
  }
  stopProgressBar () {
    const that = this;
    window.clearInterval(that.progressTimer);

  }

  stopTrack () {
    const that = this;
    that.isPlaying = false;
    let img = Array.from(that.playBtn.childNodes).filter(child => child.tagName === 'IMG')[0];
    img.src = "./assets/icon/ic_play.png";
    that.audioEl.pause();
    that.stopProgressBar();
    if (that.prompter) {
      that.prompter.stop();
    }
  }

  getTrackCurrentTime () {
    return this.audioEl.currentTime;
  }

  getTrackDuration () {
    return this.audioEl.duration;
  }



  getTrack (songID) {
    return this.playlist.find(song => parseInt(song.id) === parseInt(songID));
  }
  
  setCoverArt (song) {
    this.cover.src = song.art;
    this.playerBg.setAttribute('src', song.art);
  }

  setTrackInfo (song) {
    this.trackTitle.innerText = song.name;
    this.artistName.innerText = song.artist;
  }

  createList () {
    let that = this;
    let str = "";
    this.playlist.forEach(function (song) {
      str += that.createListItem(song);
    })
    this.listPage.innerHTML = str;
  }

  createListItem (song) {
    return (
      `<li class="list__item" data-id="${song.id}">
          <div class="item__content">
            <h3>${song.name}</h3>
            <p>${song.artist}</p>
          </div>
        </li>`
    )
  }

  setCurrentItem (songID) {
    let that = this;
    let items = Array.from(document.querySelectorAll('.list__item'));
    items.forEach(function (item) {
      item.classList.remove('is--current');
    });
    let current = items.find(item => parseInt(item.dataset.id) === parseInt(songID));
    current.classList.add('is--current');    
  }
  
  setPlayMode (mode) {
    const that = this;
    switch(mode) {
      case 'loop':
        that.currentPlaylist = that.playlist;
        break;
      case 'random':
        that.currentPlaylist = that.shuffleArray(that.playlist);
        break;
      case 'repeatOne':
        that.currentPlaylist = [that.currentTrack];
        break;
      default:
        break;
    }
  }

  // random playlist
  shuffleArray (array) {
    // 從最尾端開始, 向前隨機抽一個, 然後將該隨機抽到的數與尾端交換, 依次從尾端向前排
    let m = array.length;
    let t;
    let i;
    while (m) {
      m --;
      i = Math.floor(Math.random() * m);
      let t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  initialize () {
    let that = this;
    that.createList();
    that.setPlayMode('loop');
    that.setTrack(that.currentPlaylist[0].id);
    that.audioEl.currentTime = 0;
    that.updateProgressBar();



    that.playBtn.addEventListener('click', function (e) {
      if (!that.isPlaying) {
        that.playTrack();
      } else {
        that.stopTrack();
      }
    });

    // menu btn
    that.menuToggle = getNode('.js-menu-btn');
    that.container = getNode('.js-container');
    that.container.addEventListener('click', function (e) {
      let page = `current--${e.target.dataset.to}`;
      let container = getNode('.js-container');
      if (e.target.dataset.to !== undefined) {
        let classList = ['player', 'lyric', 'list'];
        classList.forEach(function(className) {
          container.classList.remove(`current--${className}`);
        })
        container.classList.add(page);
      }
    });

    // set track from list
    that.listPage.addEventListener('click', function (e) {
      let songItem = e.target.closest('.list__item');
      that.setTrack(songItem.dataset.id);
    });

    // progress bar
    that.progressBar.addEventListener('mousedown', function (e) {
      let totalLen = that.progressBar.offsetWidth;
      let newCurrentTime = (e.offsetX / totalLen) * that.audioEl.duration;
      that.setTrackCurrentTime(newCurrentTime);
      that.updateProgressBar();
    });

    // set play mode
    let modeBtns = Array.from(document.querySelectorAll('.js-mode-btn'));
    modeBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        modeBtns.forEach(function (btn) {
          btn.classList.remove('is--current');
        });
        btn.classList.add('is--current');
        that.setPlayMode(this.dataset.playmode);
      })
    });

    // play next & play prev
    that.nextBtn.addEventListener('click', function (e) {
      that.playNext();
    });

    that.prevBtn.addEventListener('click', function(e) {
      that.playPrev();
    });

    // song is over
    that.audioEl.addEventListener('ended', function () {
      that.prompter.removeAll();
      that.playNext();
    });


  }
}

export default MusicPlayer;