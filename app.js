(function () {
angular.module('integrationDemoApp', [])
    .controller('mainController', function ($scope, appSettings, $sce) {
        $scope.showSideBar = true;
        $scope.currentUrl = "";
        
        $scope.$watch(
            function () { 
                return appSettings.currentUrl
            },
            function(value) {
                $scope.currentUrl = $sce.trustAsResourceUrl(value);
        });
    
        $scope.toggleSideBar = function () {
            $scope.showSideBar = !$scope.showSideBar;
        };
    })
  .controller('menuController', function ($scope, appSettings, $timeout) {
    $scope.activeTab = -1;
    $scope.activeSubTab = 0;
    
    $scope.menu = appSettings.menu;
    
    $scope.setActiveTab = function (activeTabIndex) {
        $scope.activeTab = activeTabIndex;
        $scope.activeSubTab = 0;
        
        if (!!$scope.menu[activeTabIndex].subMenu) {
            $timeout(function () {
                appSettings.currentUrl = $scope.menu[activeTabIndex].subMenu[0].link;
            }, 300);
        } else {
            $timeout(function () {
                appSettings.currentUrl = $scope.menu[activeTabIndex].link;
            }, 300);
        }
    };
    
    $scope.setActiveSubTab = function (activeSubTabIndex, event) {
        $scope.activeSubTab = activeSubTabIndex;
        appSettings.currentUrl = $scope.menu[$scope.activeTab].subMenu[activeSubTabIndex].link;
        event.stopPropagation();
    };
  });
}());