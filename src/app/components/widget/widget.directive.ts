/**
 * Created by awadm on 9/6/2016.
 */

/** @ngInject */
export function widget():angular.IDirective {
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

  private scPlayer:any;
  private trackData:any;
  private currentTime:number;
  private totalTime:number;
  private $scope:ng.IScope;
  private playListIndex:number;
  private isLoaded:boolean;
  private playTime:boolean;

  constructor($scope:ng.IScope) {
    this.playListIndex = 0;
    this.$scope = $scope;

    // create new instance of audio
    this.scPlayer = new SoundCloudAudio('f0e69b1d085b0327788e6e7768a20653');
    this.initZoneCastPlayList();
  }

  initZoneCastPlayList() {
    this.isLoaded = true;

    // Load track and resolve it's data
    this.scPlayer.resolve('https://soundcloud.com/zone24x7/sets/zonecast/s-qEq9z', angular.bind(this, function (track) {
      // inspect objects
      //console.log(track);
      //console.log(this.scPlayer);
      this.bindTrackData(track);
      this.isLoaded = false;
    }));
    this.bindTimeUpdateEvent();
    this.bindEndAction();
  }

  bindEndAction() {
    //try and play next
    this.scPlayer.on('ended', angular.bind(this, function () {
      this.next();
    }));
  }

  bindTimeUpdateEvent() {
    this.scPlayer.on('timeupdate', angular.bind(this, function () {
      this.currentTime = this.scPlayer.audio.currentTime;
      this.playTime = moment.duration(moment.duration(this.currentTime).asSeconds()).asMinutes();
      this.$scope.$apply();
    }));
  }

  play() {
    this.updatePlayListIndex();
    this.scPlayer.play({playlistIndex: this.playListIndex});
    this.updateTotalTime();
  }

  playFromIndex(index:number) {
    this.scPlayer.play({playlistIndex: index});
    this.updateTotalTime();
  }

  pause() {
    this.scPlayer.pause();
  }

  next() {
    this.scPlayer.next();
    this.updateTotalTime();
  }

  previous() {
    this.scPlayer.previous();
    this.updateTotalTime();
  }

  stop() {
    this.scPlayer.stop();
  }

  bindTrackData(track:any) {
    this.trackData = track;
  }

  seek(event:any) {
    this.scPlayer.seek(event);
  }

  volUp() {
    if (this.scPlayer.audio.volume < 1.0)
      this.scPlayer.audio.volume += 0.1;
  }

  volDown() {
    if (this.scPlayer.audio.volume > 0.1)
      this.scPlayer.audio.volume -= 0.1;
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
}
