angular.module('sim')
    .component('tableComponent', {
        controller: 'tableController',
        templateUrl: 'app/components/table/table.html'
    })
    .controller('tableController', function ($state, $scope, Service) {

        Service.teams.sort(function (a, b) {
            return a.points - b.points || a.gd - b.gd || a.goals - b.goals;
        });
        Service.teams.reverse();

        for (var i = 0; i < Service.teams.length; i++) {
            Service.teams[i].position = i + 1;
        }

        this.gp = Service.matchday;
        this.teamArr = Service.teams;

        this.next = function () {
            Service.matchday += 1;
        }
    })