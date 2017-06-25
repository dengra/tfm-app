starter.controller('ListController',
  ['$scope', '$http', '$state',
      function ($scope, $http, $state) {
        $http.get('js/data.json').success(function (data) {
          $scope.modules = data.modules;
          $scope.whichmodule = $state.params.mId;
          $scope.cameras = data.cameras;
          $scope.whichcamera = $state.params.cId;
          $scope.data = {showDelete: false, showReorder: false};
          $scope.whichlevel = data.modules.level;

          //Nested Loop in JavaScript Way
          /*$scope.temparray = [];
           var listElement = null;
           for (var i = 0; i < $scope.module.length; i++) {
           for (var j = 0; j < $scope.cameras.length; j++) {


           if (i.relevantmodels == cameras.shortname) {
           var listElement =
           {
           shortname: camera.shortname,
           relev: i.relevantmodels
           };
           $scope.temparray.push(listElement)
           }
           }
           }*/

          $scope.onItemDelete = function (module) {
            $scope.modules.splice($scope.modules.indexOf(module), 1);
          };
          $scope.doRefresh = function () {
            $http.get('js/data.json').success(function (data) {
              $scope.modules = data.modules;
              $scope.$broadcast('scroll.refreshComplete');
            });
          };
          $scope.toggleStar = function (module) {
            module.star = !module.star;
          };
          $scope.moveItem = function (module, fromIndex, toIndex) {
            $scope.modules.splice(fromIndex, 1);
            $scope.modules.splice(toIndex, 0, module);
          };
        });

  }]); //Controller
