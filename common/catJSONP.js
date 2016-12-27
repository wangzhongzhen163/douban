(function (angular) {
	
	// 创建一个服务，用来发送jsonp请求
	angular.module('moviecat.jsonp', [])
		.service('itcastJSONP', ['$window', function($window){
			var doc = $window.document;
			this.jsonp = function(url, params, callback) {
				url += '?';
				for(var k in params) {
					url += k + '=' + params[k] + '&';
				}
				var callbackName = 'itcast_jsonp_' + (new Date() - 0);
				url += 'callback=' + callbackName;

				var script = doc.createElement('script');
				script.src = url;
				doc.body.appendChild(script);
				$window[callbackName] = function(data) {
					callback(data);
				};
			};
		}])

})(angular)
