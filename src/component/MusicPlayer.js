import getNode from '../util.js';

class MusicPlayer {
  constructor (playlist) {
    this.isPlaying = false;
    this.playlist = playlist;
    this.currentTrack = null;
    this.audioEl = new Audio();
    // control panel
    this.playBtn = getNode('.js-start-btn');
    this.prevBtn = getNode('.js-prev-btn');
    this.nextBtn = getNode('.js-next-btn');
    this.loopBtn = getNode('.js-loop-btn');
    this.repeatBtn = getNode('.js-repeat-btn');
    this.randomBtn = getNode('.js-random-btn');
    this.progressBar = getNode('.js-progress-bar');

    this.cover = getNode('.js-cover');
    this.trackTitle = getNode('.js-song-title');
    this.artistName = getNode('.js-artist-name');

    // track list
    this.listPage = getNode('.js-track-list');


  }


  playTrack () {
    this.isPlaying = true;
    this.audioEl.play();
    let img = Array.from(this.playBtn.childNodes).filter(child => child.tagName === 'IMG')[0];
    img.src = "./assets/icon/ic_pause.png";
  }

  switchPlayBtn () {
    
  }

  stopTrack () {
    this.isPlaying = false;
    let img = Array.from(this.playBtn.childNodes).filter(child => child.tagName === 'IMG')[0];
    img.src = "./assets/icon/ic_play.png";
    this.audioEl.pause();
  }

  getTrackCurrentTime () {
    return this.audioEl.currentTime;
  }

  getTrackDuration () {
    return this.audioEl.duration;
  }

  setTrack (songID) {
    this.currentTrack = this.getTrack(songID);
    this.audioEl.src = this.currentTrack.path;
    this.setCoverArt(this.currentTrack);
    this.setTrackInfo(this.currentTrack);

  }

  getTrack (songID) {
    return this.playlist.find(song => parseInt(song.id) === parseInt(songID));
  }
  
  setCoverArt (song) {
    this.cover.src = song.art;
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

  initialize () {
    let that = this;
    that.setTrack(that.playlist[0].id);
    that.playBtn.addEventListener('click', function (e) {
      if (!that.isPlaying) {
        that.playTrack();
      } else {
        that.stopTrack();
      }
    });

    // menu btn
    this.menuToggle = getNode('.js-menu-btn');
    this.container = getNode('.js-container');
    this.container.addEventListener('click', function (e) {
      let page = `current--${e.target.dataset.to}`;
      let container = getNode('.js-container');
      if (e.target.dataset.to !== undefined) {
        let classList = ['player', 'lyric', 'list'];
        classList.forEach(function(className) {
          container.classList.remove(`current--${className}`);
        })
        container.classList.add(page);
      }
    })

    this.createList();
    this.listPage.addEventListener('click', function (e) {
      let songItem = e.target.closest('.list__item');
      that.setTrack(songItem.dataset.id);
    })
  }
}

export default MusicPlayer;