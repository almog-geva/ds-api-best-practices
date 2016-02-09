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
  .controller('menuController', function ($scope, appSettings, $timeout, $window) {
    $scope.activeTab = -1;
    $scope.activeSubTab = 0;
    
    $scope.menu = appSettings.menu;
    
    $scope.setActiveTab = function (activeTabIndex) {
        var isNewLink;
        if (!!$scope.menu[activeTabIndex].subMenu) {
            isNewLink = setNewLinkWithDelay($scope.menu[activeTabIndex].subMenu[0].link);
        } else {
            isNewLink = setNewLinkWithDelay($scope.menu[activeTabIndex].link);
        }
        
        if (isNewLink) {
            $scope.activeTab = activeTabIndex;
            $scope.activeSubTab = 0;
        }
        else {
            event.stopPropagation();
        }
    };
    
    function setNewLinkWithDelay(link) {
        if (link.search(/(?:^newtab:)/i) > -1) {
            $window.open(link.replace('newtab:',''));
            return false;
        }
        
        $timeout(function () {
            appSettings.currentUrl = link;
        }, 200);
        
        return true;
    };
    
    $scope.setActiveSubTab = function (activeSubTabIndex, event) {
        
        if (setNewLinkWithDelay($scope.menu[$scope.activeTab].subMenu[activeSubTabIndex].link)) {
            $scope.activeSubTab = activeSubTabIndex;
        }
        
        event.stopPropagation();
    };
  });
}());