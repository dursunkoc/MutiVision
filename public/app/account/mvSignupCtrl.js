angular.module('app').controller('mvSignupCtrl', function ($scope, mvUser, mvNotifier, $location, mvAuth) {
    $scope.signup = function () {
        var newUser = {
            userName: $scope.email,
            password: $scope.password,
            firstName: $scope.first,
            lastName: $scope.last
        };

        mvAuth.createUser(newUser).then(function () {
            mvNotifier.notify('User created successfully');
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }

});