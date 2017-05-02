var app = angular.module('shortUrlApp',[]);
    app.controller('shortAppController', ($scope)=>{
    $scope.urlToShorten = 'Hello World';
});