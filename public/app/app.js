const NOT_AUTHORIZED = 'not authorized';
var app = angular.module("app", ["ngResource", "ngRoute"]);
app.config(
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
        var routeRoleChecks = {
            admin : {
                auth: function(mvAuth){
                    return mvAuth.authorizeCurrentUserForRoute('admin')
                }
            }
        };
        $routeProvider
            .when("/", {
                templateUrl: '/partials/main/main',
                controller: 'mvMainCtrl'
            })
            .when("/admin/users", {
                templateUrl: '/partials/admin/user-list',
                controller: 'mvUserListCtrl',
                resolve : routeRoleChecks.admin
            })
            .when("/signup", {
                templateUrl: '/partials/account/signup',
                controller: 'mvSignupCtrl'
            });
    }
);

app.run(
    function($rootScope, $location){
        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
            if(NOT_AUTHORIZED === rejection){
                $location.path('/');
            }
        });
    }
);