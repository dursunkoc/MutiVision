/**
 * Created by dursun on 2/5/15.
 */
angular.module('app').factory('mvAuth', function ($http, $q, mvIdentity, mvUser) {
    return {
        authenticate: function (username, password) {
            var dfd = $q.defer();
            $http
                .post('/login', {username: username, password: password})
                .then(function (response) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    if (response.data.success) {
                        mvIdentity.currentUser = user;
                    }
                    dfd.resolve(mvIdentity.isAuthenticated());
                });
            return dfd.promise;
        },
        createUser: function (newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function () {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        updateUser: function(userFormData){
            var dfd = $q.defer();

            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, userFormData);

            clone.$update().then(function () {
                mvIdentity.currentUser = clone;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        signout: function () {
            var dfd = $q.defer();
            $http.post("/logout").then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }
        ,
        authorizeCurrentUserForRoute: function (role) {
            if (mvIdentity.isAuthorized('admin')) {
                return true;
            } else {
                return $q.reject(NOT_AUTHORIZED);
            }
        },
        authorizeAuthenticatedUserForRoute : function(){
            if (mvIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject(NOT_AUTHORIZED);
            }
        }
    }
})
;
