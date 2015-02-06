/**
 * Created by dursun on 2/5/15.
 */
angular.module('app').factory('mvAuth', function ($http, $q, mvIdentity) {
    return {
        authenticate: function (username, password) {
            var dfd = $q.defer();
            $http
                .post('/login', {username: username, password: password})
                .then(function (response) {
                    if (response.data.success) {
                        mvIdentity.currentUser = response.data.user;
                    }
                    dfd.resolve(mvIdentity.isAuthenticated());
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
    }
});
