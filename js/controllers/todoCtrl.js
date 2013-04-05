/*global todomvc */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, todoStorage, filterFilter) {
	var todos = $scope.todos = todoStorage.get();

	$scope.newTodo = '';
	$scope.editedTodo = null;
	$scope.assignList = [
    {"name": "Jing"},
    {"name": "Brett"},
    {"name": "Andrew"},
    {"name": "Justin"}
  	];
  	$scope.section=null;
 

	$scope.$watch('todos', function () {
		$scope.remainingCount = filterFilter(todos, {completed: false}).length;
		$scope.completedCount = todos.length - $scope.remainingCount;
		$scope.allChecked = !$scope.remainingCount;
		todoStorage.put(todos);
	}, true);

	if ($location.path() === '') {
		$location.path('/');
	}

	$scope.location = $location;

	$scope.$watch('location.path()', function (path) {
		$scope.statusFilter = (path === '/active') ?
			{ completed: false } : (path === '/completed') ?
			{ completed: true } : null;
	});


	$scope.addname= function(new_name){
		console.log(new_name);
		if (!new_name.length) {
			return;
		}

		$scope.assignList.push({
			name: new_name
		});
		console.log($scope.assignList);
		$scope.new_name="";

	};

	$scope.addTodo = function () {
		if (!$scope.newTodo.length) {
			return;
		}

		todos.push({
			title: $scope.newTodo,
			completed: false, 
			assignee: ""
		});

		$scope.newTodo = '';
	};

	$scope.selectChanged = function(selection,todo) {
		todo.assignee=selection.name;
		console.log(todo.assignee);
		console.log(todo);
	}

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
	};

	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		if (!todo.title) {
			$scope.removeTodo(todo);
		}
	};

	$scope.removeTodo = function (todo) {
		todos.splice(todos.indexOf(todo), 1);
	};

	$scope.clearCompletedTodos = function () {
		$scope.todos = todos = todos.filter(function (val) {
			return !val.completed;
		});
	};

	$scope.markAll = function (completed) {
		todos.forEach(function (todo) {
			todo.completed = completed;
		});
	};
});
