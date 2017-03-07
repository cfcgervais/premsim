angular.module('sim')
    .component('matchComponent' , {
        controller: 'matchController',
        templateUrl: 'app/components/match/match.html'
    })
    .controller('matchController', function($state, $scope, $timeout, Service){
        
        var data = Service.jsonData;
        
        this.teamName = Service.team;
        this.yourScore;
        this.opponentScore;
        this.continue = false;
        this.yourGoals;
        this.theirGoals;

        
            function massage(arr){
                for(var i = 0; i < arr.length; i++){
                    var team = arr[i];
                    goalChance(team);
                    ga(team);
                    starters(team)
                    if(team.name === data.userTeam.name){
                        team.user = true;
                        playerTeam = team;
                    }
                }
            }
            massage(Service.teams);
            
            function goalChance(team){
                for(var i = 0; i < team.players.length; i++){
                    var player = team.players[i];
                    var gpm = player.goals_scored / player.minutes;
                    var gc = gpm * 100;
                    player.gc = gc;
                }
            }

            function ga(team){
                var goalsAgainst = 0;
                var arr = [];
                for(var i = 0; i < team.players.length; i++){
                    arr.push(team.players[i].goals_conceded);
                    function conceded(arr){
                        var num = Math.max(...arr);
                        goalsAgainst = num;
                    }
                    conceded(arr)
                }
                team.ga = goalsAgainst;
            }

            function dynamicSort(property){
                var sortOrder = 1;
                if(property[0] === "-"){
                    sortOrder = -1;
                    property = property.substr(1);
                }
                return function(a,b){
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder
                }
            }

            defRank(Service.teams)
            function defRank(arr){
                arr.sort(dynamicSort("ga"));
                arr.reverse();
                var topHalf = [];
                var bottomHalf = [];
                for(var i = 0; i < arr.length; i++){
                    if(i < 10){
                        bottomHalf.push(arr[i])
                    }else{
                        topHalf.push(arr[i])
                    }
                }
                bottomHalf.reverse();
                for(var j = 0; j < topHalf.length; j++){
                    topHalf[j].def_mod = 100 + j*2;
                }
                for(var k = 0; k < bottomHalf.length; k++){
                    bottomHalf[k].def_mod = 100 - k*2;
                }
            }
            
            function starters(team){
                if(!team.starters){
                    team.players.sort(dynamicSort("minutes"));
                    team.players.reverse();
                    var starters = [];
                    for(var i = 0; i < team.players.length; i++){
                        if(i < 11){
                            starters.push(team.players[i])
                        }
                    }
                    team.starters = starters;
                }
            }

            function shuffle(arr){
                var currentIndex = arr.length, temporaryValue, randomIndex;
                while(0 !== currentIndex){
                    randomIndex = Math.floor(Math.random() * currentIndex)
                    currentIndex -= 1;
                    temporaryValue = arr[currentIndex];
                    arr[currentIndex] = arr[randomIndex];
                    arr[randomIndex] = temporaryValue;
                }
                return arr
            }

            // schedule(teamArr);
            // function schedule(arr){
            //     for(var j = 0; j < sched1.length + 1; j++){
            //         // debugger
            //         if(sched1.length < 190){
            //             shuffle(arr);
            //             for(var i = 0; i < arr.length; i++){
            //                 var match = [];
            //                 var team1 = arr[i];
            //                 var team2 = arr[i + 1];
            //                 match = team1.abrev + team2.abrev;
            //                 i++
            //                 var set = new Set(sched1);
            //                 if(set.has(team1.abrev + team2.abrev || team2.abrev + team1.abrev)){
            //                     return
            //                 }else{
            //                     team1.schedule.push(team2.name);
            //                     team2.schedule.push(team1.name);
            //                     sched1.push(match);
            //                 }
            //             }
            //         }
            //     }
            // }

            yourStarters();
            function yourStarters(){
                for(var i = 0; i < playerTeam.players.length; i++){
                    for(var j = 0; j < playerTeam.starters.length; j++){
                        if(playerTeam.players[i].web_name == playerTeam.starters[j]){
                            playerTeam.starters[j] = playerTeam.players[i];
                        }
                    }
                }
                return playerTeam;
            }

            yourSchedule();
            function yourSchedule(){
                for(var i = 0; i < Service.schedule.length + 1; i++){
                    var week = Service.schedule[i]
                    if(i + 1 === Service.matchday){
                        for(var j = 0; j < week.length; j++){
                            var match = week[j]
                            if(match[0].name === Service.team){
                                Service.currentOpponent = match[1];
                            }
                            if(match[1].name === Service.team){
                                Service.currentOpponent = match[0];
                            }
                        }
                    }
                }
            }
            this.opponent = Service.currentOpponent.name;
            
            function Match(team1, team2){
                team1.score = 0;
                team2.score = 0;
                for(var i = 0; i < 95; i++){
                    var minute = i + 1
                        for(var j = 0; j < team1.starters.length; j++){
                            if(Math.random() * team2.def_mod < team1.starters[j].gc){
                                var goal = {};
                                team1.score++;
                                team1.goals++;
                                team2.conceded++;
                                goal = {"scorer": team1.starters[j].web_name, "minute": minute}
                                if(team1.name === Service.team){
                                    Service.goals.yourGoals.push(goal);
                                }
                                if(team1 === Service.currentOpponent){
                                    Service.goals.oppGoals.push(goal);
                                }
                            }
                        }
                        for(var k = 0; k < team2.starters.length; k++){
                            if(Math.random() * team1.def_mod < team2.starters[k].gc){
                                var goal = {};
                                team2.score++;
                                team2.goals++;
                                team1.conceded++;
                                goal = {"scorer": team2.starters[k].web_name, "minute": minute}
                                if(team2.name === Service.team){
                                    Service.goals.yourGoals.push(goal);
                                }
                                if(team2 === Service.currentOpponent){
                                    Service.goals.oppGoals.push(goal);
                                }
                            }
                        }
                        if(minute > 94){
                            if(team1.score > team2.score){
                                winner = team1.name;
                                team1.wins += 1;
                                team2.losses +=1;
                                team1.points += 3;
                                team1.gd += team1.score - team2.score;
                                team2.gd += team2.score - team1.score;
                                console.log(team1.name + " beat " + team2.name + ', ' + team1.score + ' to ' + team2.score);
                            }
                            else if(team2.score > team1.score){
                                winner = team2.name;
                                team2.points += 3;
                                team1.losses += 1;
                                team2.wins += 1;
                                team1.gd += team1.score - team2.score;
                                team2.gd += team2.score - team1.score;
                                console.log(team2.name + " beat " + team1.name + ', ' + team2.score + ' to ' + team1.score)
                            }else{
                                team1.draws += 1;
                                team2.draws +=1;
                                team1.points += 1;
                                team2.points += 1;
                                console.log(team1.name + ' and ' + team2.name + ' drew' + ', ' + team1.score + ' to ' + team2.score)
                            } 
                        }
                }
                if(team1.name === Service.team){
                    Service.currentScore = team1.score;
                }
                if(team2.name === Service.team){
                    Service.currentScore = team2.score;
                }
                if(team1 === Service.currentOpponent){
                     Service.currentOppScore = team1.score;
                }
                if(team2 === Service.currentOpponent){
                    Service.currentOppScore = team2.score;
                }

            }

            //         setTimeout(function(){
            //             if(this.minute < 96){
            //                 console.log('hi');
            //                 this.minute++;
            //             }
            //         }, 300);
           
       
            this.kickoff = function(){
                this.continue = true;
                Service.goals.oppGoals = [];
                Service.goals.yourGoals = [];
                for(var i = 0; i < Service.schedule.length +1; i++){
                    var week = Service.schedule[i-1]
                    if(i === Service.matchday){
                        for(var j = 0; j < week.length; j++){
                            var match = week[j]
                            Match(match[0], match[1]);
                        }
                    }
                }
                this.yourScore = Service.currentScore;
                this.opponentScore = Service.currentOppScore;
                this.yourGoals = Service.goals.yourGoals;
                this.theirGoals = Service.goals.oppGoals;
            }
        })
    