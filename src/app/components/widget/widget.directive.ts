/**
 * Created by awadm on 9/6/2016.
 */

/** @ngInject */
export function widget(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/widget/widget.html',
    controller: WidgetController,
    controllerAs: 'vm',
    bindToController: true
  };
}

/** @ngInject */
export class WidgetController {

  private scPlayer: any;
  private trackData: any;
  private currentTime: number;
  private totalTime: number;
  private $scope: ng.IScope;
  private playListIndex: number;
  private isLoaded: boolean;
  private isPlaying: boolean;
  private soundCloudClientId: string;

  constructor($scope: ng.IScope) {
    this.playListIndex = 0;
    this.$scope = $scope;
    this.soundCloudClientId = '';

    // create new instance of audio
    this.scPlayer = new SoundCloudAudio(this.soundCloudClientId);
    this.initPlayList();
  }

  initPlayList() {
    this.isLoaded = true;

    // load track and resolve it's data
    this.scPlayer.resolve('https://soundcloud.com/zone24x7/sets/zonecast/s-qEq9z', angular.bind(this, function (track: any) {
      // inspect objects
      // console.log(track);
      // console.log(this.scPlayer);
      this.bindTrackData(track);
      this.isLoaded = false;
    }));
    this.isPlaying = false;
    this.bindTimeUpdateEvent();
    this.bindEndAction();
  }

  bindEndAction() {
    // try and play next
    this.scPlayer.on('ended', angular.bind(this, function () {
      this.next();
    }));
  }

  bindTimeUpdateEvent() {
    this.scPlayer.on('timeupdate', angular.bind(this, function () {
      this.currentTime = this.scPlayer.audio.currentTime;
      this.playTime = this.getPlayTime();
      this.$scope.$apply();
    }));
  }

  play() {
    this.updatePlayListIndex();
    this.scPlayer.play({playlistIndex: this.playListIndex});
    this.isPlaying = true;
    this.updateTotalTime();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  playFromIndex(index: number) {
    this.scPlayer.play({playlistIndex: index});
    this.isPlaying = true;
    this.updateTotalTime();
  }

  pause() {
    this.scPlayer.pause();
    this.isPlaying = false;
  }

  next() {
    this.scPlayer.next();
    this.isPlaying = true;
    this.updateTotalTime();
  }

  previous() {
    this.scPlayer.previous();
    this.isPlaying = true;
    this.updateTotalTime();
  }

  stop() {
    this.scPlayer.stop();
    this.isPlaying = false;
  }

  bindTrackData(track: any) {
    track.artwork_url = this.getLargerArtWork(track.artwork_url);
    this.trackData = track;
  }

  seek(event: any) {
    this.scPlayer.seek(event);
  }

  volUp() {
    if (this.scPlayer.audio.volume < 1.0) {
      this.scPlayer.audio.volume += 0.1;
    }
  }

  volDown() {
    if (this.scPlayer.audio.volume > 0.1) {
      this.scPlayer.audio.volume -= 0.1;
    }
  }

  updatePlayListIndex() {
    if (this.scPlayer._playlistIndex) {
      this.playListIndex = this.scPlayer._playlistIndex;
    } else {
      this.playListIndex = 0; // first track
    }
  }

  updateTotalTime() {
    this.updatePlayListIndex();
    this.totalTime = moment.duration(this.trackData.tracks[this.playListIndex].duration).asSeconds();
  }

  getPlayTime() {
    var time = moment.duration(this.currentTime, 'seconds');
    var seconds = time.get('seconds');
    seconds = (seconds < 10) ? ('0' + seconds) : seconds;
    return time.get('minutes') + ':' + seconds;
  }

  getTrackTitle() {
    if (this.trackData) {
      return this.trackData.tracks[this.playListIndex].title;
    }
  }

  getTrackArtist() {
    if (this.trackData) {
      return this.trackData.user.username;
    }
  }

  getLargerArtWork(url: string) {
    return url.replace('large', 'original'); // http://stackoverflow.com/a/16549098/1179865
  }
}
