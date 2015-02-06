app.controller("mvMainCtrl", function ($scope) {
    $scope.courses =[
        {name:"C++ in 24 hours",featured:false,published:new Date('11/10/2004')},
        {name:"Java in 24 hours",featured:true,published:new Date('11/14/2013')},
        {name:"Learn NodeJs ",featured:true,published:new Date('12/17/2014')},
        {name:"Learn Scala ",featured:true,published:new Date('09/07/2014')},
        {name:"Web joy with Play2!",featured:false,published:new Date('08/10/2014')},
        {name:"MEAN stack development",featured:false,published:new Date('09/12/2014')},
        {name:"Oracle DBA training",featured:true,published:new Date('10/19/2014')},
        {name:"Spring application development",featured:true,published:new Date('12/23/2014')},
        {name:"Hibernate Spring Web Application",featured:false,published:new Date('12/10/2014')},
        {name:"Introduction to ExpressJs",featured:true,published:new Date('01/10/2015')},
        {name:"Introduction to Mongodb",featured:true,published:new Date('01/21/2015')},
        {name:"Advanced to NodeJs",featured:true,published:new Date('01/17/2015')},
    ];
});