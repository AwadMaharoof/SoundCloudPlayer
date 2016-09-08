/** @ngInject */
export function config($logProvider:angular.ILogProvider) {
  // enable log
  $logProvider.debugEnabled(true);
  // set options third-party lib
  //toastrConfig.allowHtml = true;
  //toastrConfig.timeOut = 2000;
  //toastrConfig.positionClass = 'toast-top-right';
  //toastrConfig.preventDuplicates = false;
  //toastrConfig.progressBar = true;
  //(<any>jQuery).material.init();

  //uiGmapGoogleMapApiProvider.configure({
  //    key: 'AIzaSyDXljQHIWpib8g8lBS7RmRXjxhKYegx1xY',
  //    v: '3.20', //defaults to latest 3.X anyhow
  //    libraries: 'weather,geometry,visualization'
  //});

}
