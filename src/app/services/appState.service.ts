export class AppStateService {

  //public state: any;
  //public config: any;
  //private locationChangeCallbaks: any[];
  //private locationFoundChangeCallbaks: any[];
  //private displayBranchListChangeCallbaks: any[];
  //private noOfBranchesChangeCallbacks: any[];
  //private currentCoordinatesChangeCallbacks: any[];
  //private selectedServicesChangeCallbacks: any[];
  //
  //
  ///** @ngInject */
  //constructor($rootScope: any) {
  //  this.state = {
  //    location: '',
  //    locationFound: '',
  //    displayBranchList: [],
  //    noOfBranches: 3,
  //    currentCoordinates: {},
  //    selectedServices: [],
  //    servicesList: [],
  //    selectedBranchId: 0,
  //    confirmationNumber: ''
  //  };
  //
  //
  //  this.config = {
  //    serviceUrlBase: '//Dimuthu-N/OnlineCheckInApi'
  //  };
  //
  //
  //  this.locationChangeCallbaks = [];
  //  $rootScope.$watch(() => {
  //    return this.state.location;
  //  }, (n: any, o: any) => {
  //    for (var i = 0; i < this.locationChangeCallbaks.length; i++) {
  //      this.locationChangeCallbaks[i](this.state.location);
  //    }
  //  }, true);
  //
  //  this.locationFoundChangeCallbaks = [];
  //  $rootScope.$watch(() => {
  //    return this.state.locationFound;
  //  }, (n: any, o: any) => {
  //    //if(n !== o){
  //    for (var i = 0; i < this.locationFoundChangeCallbaks.length; i++) {
  //      this.locationFoundChangeCallbaks[i](this.state.locationFound);
  //    }
  //    // }
  //  }, true);
  //
  //  this.displayBranchListChangeCallbaks = [];
  //  $rootScope.$watch(() => {
  //    return this.state.displayBranchList;
  //  }, (n: any, o: any) => {
  //    if (n !== o) {
  //      for (var i = 0; i < this.displayBranchListChangeCallbaks.length; i++) {
  //        this.displayBranchListChangeCallbaks[i](this.state.displayBranchList);
  //      }
  //    }
  //  }, true);
  //
  //  this.noOfBranchesChangeCallbacks = [];
  //  $rootScope.$watch(() => {
  //    return this.state.noOfBranches;
  //  }, (n: any, o: any) => {
  //    if (n !== o) {
  //      for (var i = 0; i < this.noOfBranchesChangeCallbacks.length; i++) {
  //        this.noOfBranchesChangeCallbacks[i](this.state.noOfBranches);
  //      }
  //    }
  //  }, true);
  //
  //
  //  this.selectedServicesChangeCallbacks = [];
  //  $rootScope.$watch(() => {
  //    return this.state.selectedServices;
  //  }, (n: any, o: any) => {
  //    if (n !== o) {
  //      for (var i = 0; i < this.selectedServicesChangeCallbacks.length; i++) {
  //        this.selectedServicesChangeCallbacks[i](this.state.selectedServices);
  //      }
  //    }
  //  }, true);
  //
  //}
  //
  //public onLocationChange = (callback: any) => {
  //  this.locationChangeCallbaks.push(callback);
  //};
  //public onLocationFoundChange = (callback: any) => {
  //  this.locationFoundChangeCallbaks.push(callback);
  //};
  //public onDisplayBranchListChange = (callback: any) => {
  //  this.displayBranchListChangeCallbaks.push(callback);
  //};
  //public onNoOfBranchesChange = (callback: any) => {
  //  this.noOfBranchesChangeCallbacks.push(callback);
  //};
  //public onselectedServicesChange = (callback: any) => {
  //  this.selectedServicesChangeCallbacks.push(callback);
  //};
}
