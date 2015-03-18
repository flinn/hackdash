module.exports = function(app) {
	app.service('$p',
      function($http, $rootScope, $q) {
          function parseCall(method, parseFuncName, data) {
              var deferred = $q.defer();

              $http({
                  method: method,
                  url: 'https://api.parse.com/1/functions/' + parseFuncName,
                  headers: {
                      'X-Parse-REST-API-Key': 'b3L7AlI1rCzEsXofXzp7kbETwS8nDukouhRjmqeU',
                      'X-Parse-Application-Id': 'wTCyHepvBQOM57u3Ou13hZ2aWur65esYf8hNLm1L',
                      'Content-Type': 'application/json'
                  },
                  data: data
              }).success(function(result) {
                  deferred.resolve(result);
              }).error(function(err) {
                  deferred.reject(err);
              });

              return deferred.promise;
          }

          this.post = function(parseFuncName, data) {
              return parseCall('post', parseFuncName, data);
          };

          this.put = function(parseFuncName, data) {
              return parseCall('put', parseFuncName, data);
          };

          this.get = function(parseFuncName, data) {
              return parseCall('get', parseFuncName, data);
          };

          this.patch = function(parseFuncName, data) {
              return parseCall('patch', parseFuncName, data);
          };

          this.del = function(parseFuncName, data) {
              return parseCall('delete', parseFuncName, data);
          };
      }
  );
};