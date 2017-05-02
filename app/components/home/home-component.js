angular.module('sim')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ])
    .component('homeComponent', {
        controller: 'homeController',
        templateUrl: 'app/components/home/home.html'
    })
    .controller('homeController', function ($scope, $state, Service, $http) {
        var myTeam = '';
        this.setTeam = function (team) {
            myTeam = team;
            // $scope.team = Service.team;
            Service.team = myTeam;
        }
        console.log('Currently needs CORS chrome extension for http request to work');
        var dumpUrl = "https://fantasy.premierleague.com/drf/bootstrap-static";

        $http.get(dumpUrl).success(function (data) {
            var mySquad = Service.team;
            var playerTeam;
            var teamArr = [];
            var chelsea = {};
            var arsenal = {};
            var manU = {};
            var manC = {};
            var everton = {};
            var spurs = {};
            var westB = {};
            var westH = {};
            var hull = {};
            var crystalP = {};
            var sun = {};
            var bourne = {};
            var stoke = {};
            var swansea = {};
            var south = {};
            var watford = {};
            var burnley = {};
            var leicester = {};
            var boro = {};
            var liverpool = {};

            teamArr.push(chelsea);
            teamArr.push(arsenal);
            teamArr.push(manU);
            teamArr.push(manC);
            teamArr.push(everton);
            teamArr.push(spurs);
            teamArr.push(westB);
            teamArr.push(westH);
            teamArr.push(hull);
            teamArr.push(crystalP);
            teamArr.push(sun);
            teamArr.push(bourne);
            teamArr.push(stoke);
            teamArr.push(swansea);
            teamArr.push(south);
            teamArr.push(watford);
            teamArr.push(burnley);
            teamArr.push(leicester);
            teamArr.push(boro);
            teamArr.push(liverpool);

            var schedule = [
                [
                    [hull, leicester], [everton, spurs], [boro, stoke], [south, watford], [crystalP, westB], [burnley, swansea], [manC, sun], [bourne, manU], [arsenal, liverpool], [chelsea, westH]
                ],
                [
                    [manU, south], [stoke, manC], [burnley, liverpool], [spurs, crystalP], [watford, chelsea], [westB, everton], [swansea, hull], [leicester, arsenal], [sun, boro], [westH, bourne]
                ],
                [
                    [spurs, liverpool], [chelsea, burnley], [everton, stoke], [south, sun], [crystalP, bourne], [leicester, swansea], [watford, arsenal], [hull, manU], [westB, boro], [manC, westH]
                ],
                [
                    [manU, manC], [arsenal, south], [boro, crystalP], [burnley, hull], [bourne, westB], [stoke, spurs], [westH, watford], [liverpool, leicester], [swansea, chelsea], [sun, everton]
                ],
                [
                    [chelsea, liverpool], [manC, bourne], [hull, arsenal], [leicester, burnley], [westB, westH], [everton, boro], [watford, manU], [south, swansea], [crystalP, stoke], [spurs, sun]
                ],
                [
                    [manU, leicester], [sun, crystalP], [boro, spurs], [bourne, everton], [liverpool, hull], [stoke, westB], [swansea, manC], [arsenal, chelsea], [westH, south], [burnley, watford]
                ],
                [
                    [everton, crystalP], [swansea, liverpool], [sun, westB], [hull, chelsea], [watford, bourne], [westH, boro], [manU, stoke], [leicester, south], [spurs, manC], [burnley, arsenal]
                ],
                [
                    [chelsea, leicester], [manC, everton], [arsenal, swansea], [bourne, hull], [westB, spurs], [stoke, sun], [crystalP, westH], [boro, watford], [south, burnley], [liverpool, manU]
                ],
                [
                    [bourne, spurs], [arsenal, boro], [hull, stoke], [burnley, everton], [leicester, crystalP], [swansea, watford], [westH, sun], [liverpool, westB], [manC, south], [chelsea, manU]
                ],
                [
                    [sun, arsenal], [boro, bourne], [manU, burnley], [spurs, leicester], [watford, hull], [westB, manC], [crystalP, liverpool], [everton, westH], [south, chelsea], [stoke, swansea]
                ],
                [
                    [manC, boro], [burnley, crystalP], [bourne, sun], [westH, stoke], [chelsea, everton], [arsenal, spurs], [hull, south], [liverpool, watford], [swansea, manU], [leicester, westB]
                ],
                [
                    [manU, arsenal], [sun, hull], [everton, swansea], [south, liverpool], [crystalP, manC], [watford, leicester], [stoke, bourne], [spurs, westH], [boro, chelsea], [westB, burnley]
                ],
                [
                    [burnley, manC], [hull, westB], [leicester, boro], [liverpool, sun], [swansea, crystalP], [chelsea, spurs], [watford, stoke], [arsenal, bourne], [south, everton], [manU, westH]
                ],
                [
                    [manC, chelsea], [sun, leicester], [crystalP, south], [spurs, swansea], [westB, watford], [stoke, burnley], [westH, arsenal], [bourne, liverpool], [everton, manU], [boro, hull]
                ],
                [
                    [watford, everton], [arsenal, stoke], [hull, crystalP], [burnley, bourne], [swansea, sun], [leicester, manC], [chelsea, westB], [south, boro], [manU, spurs], [liverpool, westH]
                ],
                [
                    [everton, arsenal], [bourne, leicester], [sun, chelsea], [boro, liverpool], [westH, burnley], [manC, watford], [crystalP, manU], [spurs, hull], [westB, swansea], [stoke, south]
                ],
                [
                    [crystalP, chelsea], [sun, watford], [boro, swansea], [stoke, leicester], [westH, hull], [westB, manU], [bourne, south], [manC, arsenal], [spurs, burnley], [everton, liverpool]
                ],
                [
                    [watford, crystalP], [arsenal, westB], [chelsea, bourne], [burnley, boro], [leicester, everton], [manU, sun], [swansea, westH], [hull, manC], [liverpool, stoke], [south, spurs]
                ],
                [
                    [hull, everton], [chelsea, stoke], [south, westB], [burnley, sun], [leicester, westH], [manU, boro], [swansea, bourne], [liverpool, manC], [watford, spurs], [arsenal, crystalP]
                ],
                [
                    [boro, leicester], [manC, burnley], [sun, liverpool], [everton, south], [westB, hull], [westH, manU], [bourne, arsenal], [crystalP, swansea], [stoke, watford], [spurs, chelsea]
                ],
                [
                    [spurs, westB], [sun, stoke], [hull, bourne], [burnley, south], [watford, boro], [swansea, arsenal], [westH, crystalP], [leicester, chelsea], [everton, manC], [manU, liverpool]
                ],
                [
                    [liverpool, swansea], [boro, westH], [crystalP, everton], [bourne, watford], [westB, sun], [stoke, manU], [manC, spurs], [south, leicester], [arsenal, burnley], [chelsea, hull]
                ],
                [
                    [sun, spurs], [arsenal, watford], [boro, westB], [burnley, leicester], [bourne, crystalP], [swansea, south], [liverpool, chelsea], [westH, manC], [manU, hull], [stoke, everton]
                ],
                [
                    [chelsea, arsenal], [everton, bourne], [south, westH], [crystalP, sun], [hull, liverpool], [watford, burnley], [westB, stoke], [spurs, boro], [manC, swansea], [leicester, manU]
                ],
                [
                    [arsenal, hull], [sun, south], [boro, everton], [manU, watford], [stoke, crystalP], [westH, westB], [liverpool, spurs], [burnley, chelsea], [swansea, leicester], [bourne, manC]
                ],
                [
                    [chelsea, swansea], [everton, sun], [south, arsenal], [crystalP, boro], [hull, burnley], [westB, bourne], [watford, westH], [spurs, stoke], [manU, manC], [leicester, liverpool]
                ],
                [
                    [manU, bourne], [leicester, hull], [watford, south], [westB, crystalP], [stoke, boro], [swansea, burnley], [liverpool, arsenal], [spurs, everton], [sun, manC], [westH, chelsea]
                ],
                [
                    [manC, stoke], [everton, westB], [boro, sun], [crystalP, spurs], [hull, swansea], [bourne, westH], [arsenal, leicester], [south, manU], [liverpool, burnley], [chelsea, watford]
                ],
                [
                    [westB, arsenal], [sun, burnley], [everton, hull], [crystalP, watford], [stoke, chelsea], [westH, leicester], [bourne, swansea], [boro, manU], [spurs, south], [manC, liverpool]
                ],
                [
                    [arsenal, manC], [chelsea, crystalP], [south, bourne], [hull, westH], [burnley, spurs], [leicester, stoke], [liverpool, everton], [manU, westB], [watford, sun], [swansea, boro]
                ],
                [
                    [arsenal, westH], [hull, boro], [burnley, stoke], [leicester, sun], [watford, westB], [swansea, spurs], [manU, everton], [chelsea, manC], [south, crystalP], [liverpool, bourne]
                ],
                [
                    [manC, hull], [sun, manU], [everton, leicester], [boro, burnley], [crystalP, arsenal], [bourne, chelsea], [spurs, watford], [westB, south], [stoke, liverpool], [westH, swansea]
                ],
                [
                    [sun, westH], [everton, burnley], [boro, arsenal], [south, manC], [crystalP, leicester], [manU, chelsea], [spurs, bourne], [watford, swansea], [stoke, hull], [westB, liverpool]
                ],
                [
                    [manC, westB], [arsenal, sun], [chelsea, south], [hull, watford], [burnley, manU], [bourne, boro], [leicester, spurs], [liverpool, crystalP], [swansea, stoke], [westH, everton]
                ],
                [
                    [sun, bourne], [everton, chelsea], [boro, manC], [south, hull], [crystalP, burnley], [manU, swansea], [spurs, arsenal], [watford, liverpool], [westB, leicester], [stoke, westH]
                ],
                [
                    [manC, crystalP], [arsenal, manU], [chelsea, boro], [hull, sun], [burnley, westB], [bourne, stoke], [leicester, watford], [liverpool, south], [swansea, everton], [westH, spurs]
                ],
                [
                    [manC, leicester], [sun, swansea], [everton, watford], [boro, south], [crystalP, hull], [bourne, burnley], [spurs, manU], [westB, chelsea], [stoke, arsenal], [westH, liverpool]
                ],
                [
                    [arsenal, everton], [chelsea, sun], [south, stoke], [hull, spurs], [burnley, westH], [leicester, bourne], [liverpool, boro], [manU, crystalP], [watford, manC], [swansea, westB]
                ]
            ];

            addProps(teamArr)
            function addProps(arr) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].players = [];
                    arr[i].points = 0;
                    arr[i].gd = 0;
                    arr[i].position = 0;
                    arr[i].schedule = [];
                    arr[i].wins = 0;
                    arr[i].losses = 0;
                    arr[i].draws = 0;
                    arr[i].goals = 0;
                    arr[i].conceded = 0;
                }
            }

            teamSort(data)
            function teamSort(data) {
                for (var i = 0; i < data.elements.length; i++) {
                    if (data.elements[i].team_code == 8 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        chelsea.abrev = 'CHE'
                        chelsea.name = "Chelsea";
                        chelsea.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 3 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        arsenal.abrev = 'ARS'
                        arsenal.name = "Arsenal";
                        arsenal.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 91 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        bourne.abrev = 'BOU'
                        bourne.name = "Bournemouth";
                        bourne.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 90 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        burnley.abrev = 'BUR'
                        burnley.name = "Burnley";
                        burnley.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 31 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        crystalP.abrev = 'CRY'
                        crystalP.name = "Crystal Palace";
                        crystalP.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 11 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        everton.abrev = 'EVE'
                        everton.name = "Everton";
                        everton.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 88 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        hull.abrev = 'HUL'
                        hull.name = "Hull";
                        hull.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 13 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        leicester.abrev = 'LEI'
                        leicester.name = "Leicester";
                        leicester.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 14 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        liverpool.abrev = 'LIV'
                        liverpool.name = "Liverpool";
                        liverpool.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 43 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        manC.abrev = 'MNC'
                        manC.name = "Manchester City";
                        manC.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 1 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        manU.abrev = 'MNU'
                        manU.name = "Manchester United";
                        manU.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 25 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        boro.abrev = 'MID'
                        boro.name = "Middlesborough";
                        boro.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 20 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        south.abrev = 'SOU'
                        south.name = "Southampton";
                        south.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 110 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        stoke.abrev = 'STO'
                        stoke.name = "Stoke";
                        stoke.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 56 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        sun.abrev = 'SUN'
                        sun.name = "Sunderland";
                        sun.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 80 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        swansea.abrev = 'SWA'
                        swansea.name = "Swansea";
                        swansea.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 6 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        spurs.abrev = 'TOT'
                        spurs.name = "Tottenham";
                        spurs.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 57 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        watford.abrev = 'WAT'
                        watford.name = "Watford";
                        watford.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 35 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        westB.abrev = 'WBR'
                        westB.name = "West Brom";
                        westB.players.push(data.elements[i]);
                    }
                    if (data.elements[i].team_code == 21 && data.elements[i].status != "u" && data.elements[i].status != "i") {
                        westH.abrev = 'WHM'
                        westH.name = "West Ham";
                        westH.players.push(data.elements[i]);
                    };
                };
            };

            playerCap(teamArr)
            function playerCap(arr) {
                var maxTeam = [];
                for (var i = 0; i < arr.length; i++) {
                    var team = arr[i];
                    if (team.players.length > 25) {
                        team.players.sort(function (a, b) {
                            return a.minutes - b.minutes;
                        });
                        team.players.reverse();
                        maxTeam.push(team);
                    };
                };
                for (var j = 0; j < maxTeam.length; j++) {
                    var club = maxTeam[j];
                    for (var k = 0; k < club.players.length; k++) {
                        if (k > 24) {
                            club.players.splice(k, 1);
                            k--;
                        }
                    }
                }
            };

            data.userTeam = {};
            data.userTeam.name = Service.team;
            Service.schedule = schedule;
            Service.teams = teamArr;
            Service.jsonData = data;
        });
    });