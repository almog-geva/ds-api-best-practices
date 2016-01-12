(function () {
angular.module('integrationDemoApp', [])
    .controller('mainController', function ($scope, appSettings, $sce, $timeout) {
        $scope.showSideBar = true;
        $scope.currentUrl = "";
    
        $scope.$watch(
            function () { 
                return appSettings.currentUrl
            },
            function(value) {
                $scope.currentUrl = value;
            }
        );
    
        $scope.toggleSideBar = function () {
            $scope.showSideBar = !$scope.showSideBar;
        };
        
        $timeout(function () {
            angular.element(document.body).removeClass("preload");
        }, 0);
    
        $scope.isExternalLink = function () {
            return $scope.currentUrl.search(/(?:^https?:\/\/|^external:)/i) > -1;
        }
        
        $scope.getTrustedUrl = function () {
            return $sce.trustAsResourceUrl($scope.currentUrl.replace('external:',''));
        }
    })
  .controller('menuController', function ($scope, appSettings, $timeout) {
    $scope.activeTab = -1;
    $scope.activeSubTab = 0;
    
    $scope.menu = appSettings.menu;
    
    $scope.setActiveTab = function (activeTabIndex) {
        $scope.activeTab = activeTabIndex;
        $scope.activeSubTab = 0;
        
        if (!!$scope.menu[activeTabIndex].subMenu) {
            setNewLinkWithDelay($scope.menu[activeTabIndex].subMenu[0].link);
        } else {
            setNewLinkWithDelay($scope.menu[activeTabIndex].link);
        }
    };
    
    function setNewLinkWithDelay(link) {
        $timeout(function () {
            appSettings.currentUrl = link;
        }, 300);
    };
    
    $scope.setActiveSubTab = function (activeSubTabIndex, event) {
        $scope.activeSubTab = activeSubTabIndex;
        appSettings.currentUrl = $scope.menu[$scope.activeTab].subMenu[activeSubTabIndex].link;
        event.stopPropagation();
    };
  });
}());