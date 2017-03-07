angular.module('sim')
    .component('homeComponent', {
        controller: 'homeController',
        templateUrl: 'app/components/home/home.html'
    })
    .controller('homeController', function($scope, $state, Service){
        var myTeam = '';
        this.setTeam = function(team){
            myTeam = team;
            $scope.team = Service.team;
            Service.team = myTeam;
        }
    })