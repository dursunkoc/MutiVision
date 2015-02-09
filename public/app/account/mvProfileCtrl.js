angular.module('app').controller('mvProfileCtrl',function($scope, mvIdentity, mvAuth, mvNotifier, $location){
    $scope.email = mvIdentity.currentUser.userName;
    $scope.first = mvIdentity.currentUser.firstName;
    $scope.last = mvIdentity.currentUser.lastName;

    $scope.update = function(){
        var userFormData = {
            userName: $scope.email,
            firstName: $scope.first,
            lastName: $scope.last
        };
        if($scope.password && !$scope.password.isEmpty()){
            userFormData.password = $scope.password;
        }
        mvAuth.updateUser(userFormData).then(function () {
            mvNotifier.notify('User updated successfully');
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});