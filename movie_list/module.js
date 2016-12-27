;(function (angular) {
	
	angular.module('moviecat.movie_list', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {
			$routeProvider.when('/:movieType/:page?', {
				templateUrl: './movie_list/view.html',
				controller: 'MovieListController'
			});
		}])
		.controller('MovieListController', ['$scope', '$http', '$routeParams', '$route', 'itcastJSONP', 
			function($scope, $http, $routeParams, $route, itcastJSONP){
				// 加载动画
				$scope.isLoaded = true;
				// 实现分页功能
				$scope.pageSize = 5; // 表示当前页展示多少条数据
				// 根据路由获取到当前页数，然后，进行数据的获取
				$scope.curPage = $routeParams.page || 1;
				// 每一页的起始值
				var movieStart = ($scope.curPage - 1) * $scope.pageSize;

				itcastJSONP.jsonp('https://api.douban.com/v2/movie/' + $routeParams.movieType, {
					start: movieStart, 
					count: $scope.pageSize,
					q: $routeParams.q || ''	
				}, function(data) {
						$scope.movie = data;
						// 计算总页数
						$scope.totalPages = Math.ceil( data.total / $scope.pageSize );
						$scope.isLoaded = false;
						$scope.$apply();
					});

				// 实现上一页和下一页翻页的功能
				$scope.goPages = function(current) {
					if(current <= 0 || current > $scope.totalPages) {
						return;
					}
					$route.updateParams({page: current});
				};
		}]);

})(angular); 