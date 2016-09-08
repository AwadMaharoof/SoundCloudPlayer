/// <reference path="../../typings/main.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { widget } from './components/widget/widget.directive';

declare var moment: moment.MomentStatic;

module sc_widget {
  'use strict';
    angular.module('sc_widget', [ 'ngRoute', 'ngMessages', 'ngMaterial'])
        .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController)
      .directive('widget', widget);
}
