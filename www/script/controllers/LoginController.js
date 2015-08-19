module.controller('LoginController', function($scope, $http, ServerCalls) {
    $scope.login = function(){

        var url = appObj.serverLink+ 'loginauth';

        var data = {
            "username": "hafiz",
            "password": "gggg"
        };

        $http({
            'method': 'POST',
            'url': url,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
                console.log(data);

            }).error(function(data, status, headers, config) {
            });
        //app.mainNav.pushPage("pages/home.html");

    }

    $scope.create = function(){
        app.mainNav.pushPage("pages/companyEditForm.html");
    }
});

/*module.controller('PersonController', function($scope) {
 $scope.personListPage ="pages/personList.html";
 });*/

