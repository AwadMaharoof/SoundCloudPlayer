export class MainController {
  public classAnimation: string;
  public creationDate: number;

  /* @ngInject */
  constructor ($timeout: angular.ITimeoutService) {
    this.classAnimation = '';
    this.creationDate = 1470032186565;
    this.activate($timeout);
  }

  /** @ngInject */
  activate($timeout: angular.ITimeoutService) {
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  //showToastr() {
  //  this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
  //  this.classAnimation = '';
  //}
}
