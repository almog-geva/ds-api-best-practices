(function() {
angular.module('integrationDemoApp', [])
  .controller('menuController', function($scope, $sce, appSettings, $timeout) {
    $scope.activeTab = -1;
    $scope.activeSubTab = 0;
    $scope.currentUrl = "";
    $scope.showSideBar = true;
    
    $scope.menu = appSettings.menu;
    
    $scope.setActiveTab = function(activeTabIndex, $event) {
        $scope.activeTab = activeTabIndex;
        $scope.activeSubTab = 0;
        
        if (!!$scope.menu[activeTabIndex].subMenu) {
            $timeout(function(){
                $scope.currentUrl = $sce.trustAsResourceUrl($scope.menu[activeTabIndex].subMenu[0].link);
            }, 600);
            
            //angular.element($event.currentTarget.querySelector('.subMenu')).css('height', $scope.options[activeTabIndex].subMenu.length * 36 + 'px');
            //angular.element('.subMenu')[activeTabIndex].css('height', angular.element('.subMenu')[activeTabIndex].height());
        }
        else {
            $timeout(function(){
                $scope.currentUrl = $sce.trustAsResourceUrl($scope.menu[activeTabIndex].link);
            }, 600);
        }
    };
    
    $scope.setActiveSubTab = function(activeSubTabIndex, event) {
        $scope.activeSubTab = activeSubTabIndex;
        $scope.currentUrl = $sce.trustAsResourceUrl($scope.menu[$scope.activeTab].subMenu[activeSubTabIndex].link);
        event.stopPropagation();
    };
    
    $scope.toggleSideBar = function() {
        $scope.showSideBar = !$scope.showSideBar;
    }
  });
}());