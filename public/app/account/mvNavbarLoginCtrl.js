app.controller('mvNavbarLoginCtrl', function ($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
    $scope.identity = mvIdentity;
    $scope.signin = function (username, password) {
        mvAuth.authenticate(username, password).then(function(result){
            if(result){
                mvNotifier.notify("You have successfully signed in!");
            }else{
                mvNotifier.notify("Invalid username and/or password!");
            }
        });
    }
    $scope.signout = function(){
        mvAuth.signout().then(function(){
            $scope.username = '';
            $scope.password = '';
            mvNotifier.notify("You have successfully signed out!");
            $location.path('/');
        })

    }
});