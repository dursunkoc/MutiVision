app.factory('mvUser', function($resource){
    var UserResource = $resource('/api/users/:id', {_id:"@id"}, {
        update: {method:'PUT', isArray:false}
    });
    UserResource.prototype.isAdmin = function(){
        console.log(this.roles);
        console.log("this.roles.indexOf('admin'):>"+this.roles.indexOf('admin'));
        console.log("RESULT> "+this.roles && this.roles.indexOf('admin') > -1);
        return this.roles && this.roles.indexOf('admin') > -1;
    };
    return UserResource;
});