module.controller('LoginController', function($scope, $http, AppService) {

    $scope.data = {
        username: "hafiz",
        password: "gggg"
    };


    $scope.login = function(){

        var url = appObject.calls.login;

        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            //console.log(data);
            if(data.status=="success")
            {
                AppService.saveUser(data);
                app.mainNav.pushPage("pages/home.html");
            }

        }).error(function(data, status, headers, config) {});
        //

    }

    $scope.create = function(){
        app.mainNav.pushPage("pages/companyEditForm.html");
    }
});

module.controller('CompanyEditController', function($scope, $http, AppService) {

    $scope.data = {
        username: "hafiz",
        password: "gggg"
    };


});


