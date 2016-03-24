'use strict';

/**
 * @ngdoc function
 * @name iprogApp.controller:TodoCtrl
 * @description
 * # TodoCtrl
 * Controller of the iprogApp
 */
angular.module('iprogApp')
  .controller('TodoCtrl', function ($scope) {
    $scope.todolist = [];

    $scope.addTodo = function(){
      $scope.todolist.push($scope.todo);
      $scope.todo = "";
    };

    $scope.removeTodo = function(index){
      $scope.todolist.splice(index,1);
    };

  }
);
