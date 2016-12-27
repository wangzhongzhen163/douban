(function (angular) {
	
	// 创建自动获得焦点的自定义指令
	angular.module('moviecat.autoActive', [])
		.directive('autoActive', ['$location', function($location) {
			return {
				link: function(scope, element) {
					scope.location = $location;
					scope.$watch('location.url()', function(newValue) {
						var aLink = element.children().attr('href');
						if(aLink.indexOf(newValue) > -1) {
							element.parent().children().removeClass('active');
							element.addClass('active');
						}
					});
				}
			};
		}]);

})(angular)