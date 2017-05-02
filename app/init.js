angular.module('sim', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/home.html',
                // controller: 'homeController'
            })
            .state('lineup', {
                url: '/lineup',
                templateUrl: 'app/components/lineup/lineup.html',
                controller: 'lineupController'
            })
            .state('match', {
                url: '/match',
                templateUrl: 'app/components/match/match.html'
                // controller: 'matchController'
            })
            .state('table', {
                url: '/table',
                templateUrl: 'app/components/table/table.html',
                controller: 'tableController'
            })
    })
    .factory('Service', function(){
        var Service = {
            team: '',
            jsonData: {},
            myEleven: [],
            teams: [],
            schedule: {},
            matchday: 1,
            currentOpponent: '',
            currentOppScore: null,
            currentScore: null,
            goals: {
                oppGoals: [],
                yourGoals: []
            }
        };
        return Service;
    })

    