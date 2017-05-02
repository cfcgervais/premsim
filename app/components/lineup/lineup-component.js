angular.module('sim')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ])
    .component('lineupComponent', {
        controller: 'lineupController',
        templateUrl: 'app/components/lineup/lineup.html'
    })
    .controller('lineupController', function ($scope, $http, $state, Service) {
        this.myEleven = [];
        this.message = '';
        this.crest = '';
        var roster = [];
        var myEleven = [];
        var myBench = [];
        var myFormation = [];
        this.check = false;
        Service.myEleven = this.myEleven;

        var players = [];
        for (var i = 0; i < Service.teams.length; i++) {
            if (Service.teams[i].name == Service.team) {
                players = Service.teams[i].players
            }
        }
// ________________ANGULAR VERSION__________________

        for(var i = 0; i < Service.teams.length; i++){
            if(Service.teams[i].name == Service.team){
                Service.teams[i].starters = this.myEleven;
                this.team = Service.teams[i];
            };
        };

        var defCount = 0;
        this.start = function(player){
            for(var i = 0; i < this.team.players.length; i++){
                var yourPlayer = this.team.players[i];
                if(yourPlayer.web_name === player){
                    if(yourPlayer.element_type === 1){
                        defCount++;
                    }else if(yourPlayer.element_type === 2){
                        defCount++;
                    }
                }
            }
            if(this.myEleven.length < 11){
                for(var i = 0; i < this.team.players.length; i++){
                    if(this.team.players[i].web_name === player){
                        this.myEleven.push(this.team.players[i]);
                    }
                }
                this.message = '';
            };
            if(this.myEleven.length > 10){
                for(var i = 0; i < this.myEleven.length; i++){
                    if(defCount > 3){
                        this.done = true;
                    }else{
                        this.done = false;
                        this.message = 'You need 1 goalkeeper and at least 3 defenders, try again';
                        this.myEleven = [];
                    }
                }
            };
        };


// _________JQUERY WITH DRAG AND DROP_________
        // var rosterElem = $('#player-list');
        // var template = '';


        // for (var i = 0; i < players.length; i++) {
        //     var player = players[i];
        //     template += `<span id="${player.web_name}"><button class="btn-success start-btn" id="${player.web_name}">Start</button> ${player.web_name}<br></span>`
        // }
        // rosterElem.html(template);

        // $('.start-btn').on('click', function () {
        //     myEleven.push(this.id);
        //     myStartingEleven(myEleven);

        // });
        // // $('.remove-btn').on('click', function () {
        // //     for (var i = 0; i < myEleven.length; i++) {
        // //         if (myEleven[i] == this.id) {
        // //             myEleven.splice(i, 1);
        // //         }
        // //     }
        // //     myStartingEleven(myEleven);
        // // })
        // // $('.bench-btn').on('click', function(){
        // //     myBench.push(this.name);
        // //     myStartingBench(myBench);
        // // });


        // function myStartingEleven(myEleven) {
        //     var playerElem = $('#draggable');
        //     var template = '';
        //     var myPlayer;
        //     for (var j = 0; j < myEleven.length; j++) {
        //         myPlayer = myEleven[j];
        //         template += `<div class="ui-widget-content drag"><h5>${myPlayer}</h5><i class="fa fa-futbol-o fa-2x" aria-hidden="true"></i></div>`
        //         if (myEleven.length > 11) {
        //             return
        //         }
        //     }

        //     playerElem.html(template);

        //     $(function () {
        //         // event.preventDefault();
        //         $(".drag").draggable();
        //         $(".drag").droppable({
        //             drop: function (event, ui) {
        //                 $(this)
        //                     .addClass("ui-state-highlight")
        //                     .find("h4");
        //             }
        //         });
        //     });
        // }

        // function myStartingBench(myBench) {
        //     var players = playerService.getPlayers();
        //     var benchElem = $('#bench');
        //     var template = '';
        //     for (var i = 0; i < myBench.length; i++) {
        //         if (myBench.length > 7) {
        //             return
        //         }
        //         var myBenchWarmer = myBench[i];
        //         template += `<h4 id="${myBenchWarmer}">${myBenchWarmer}</h4>`
        //     }
        //     benchElem.html(template);
        // }

    });





