class MusicPlayer {
  constructor (playlist) {
    this.playlist = playlist;
    this.currentTrack = playlist[0];
    this.audioEl = new Audio();
    // node
    this.playBtn = this.getNode('.js-start-btn');
    this.prevBtn = this.getNode('.js-prev-btn');
    this.nextBtn = this.getNode('.js-next-btn');
    this.loopBtn = this.getNode('.js-loop-btn');
    this.repeatBtn = this.getNode('.js-repeat-btn');
    this.randomBtn = this.getNode('.js-random-btn');
    this.progressBar = this.getNode('.js-progress-bar');
    this.cover = this.getNode('.js-cover');

  }

  getNode (className) {
    return document.querySelector(className);
  }

  playTrack () {
    this.audioEl.play();
  }

  stopTrack () {
    this.audioEl.pause();
  }

  getTrackCurrentTime () {
    return this.audioEl.currentTime;
  }

  getTrackDuration () {
    return this.audioEl.duration;
  }

  setTrack (path) {
    this.audioEl.src = path;
  }
  
  setCoverArt (src) {
    this.cover.src = src;
  }

  initialize () {
    let that = this;
    that.setTrack(that.currentTrack.path);
    that.setCoverArt(that.currentTrack.art)
    console.dir(that.audioEl);
    that.playBtn.addEventListener('click', function (e) {
      that.playTrack();
    })
  }
}

export default MusicPlayer;