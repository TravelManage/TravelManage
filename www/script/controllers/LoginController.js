module.controller('LoginController', function($scope, $http, AppService) {

    $scope.data = {
        username: "angeres",
        password: "goosefraba"
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

    }

    $scope.create = function(){
        app.mainNav.pushPage("pages/companyEditForm.html");
    }
});

module.controller('CompanyEditController', function($scope, $http, AppService) {

    $scope.data = {
        "companyname":"Test Inc",
        "companyemail":"angeres@gmail.com",
        "landline":"3253263201",
        "cell":"8632632521",
        "address1":"gggg",
        "address2":"10",
        "city":"Hafiz",
        "state":"abuth",
        "pin":"abu",
        "username":"angeres",
        "firstname":"angeres",
        "lastname":"sammael",
        "emailid":"angeres@gmail.com",
        "password":"goosefraba",
        "phonenumber":"8322363262"

    };

    $scope.submit = function(){
        var link = serverLink +"companycreate";
   
        $http({
            'method': 'POST',
            'url': link,
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
    };


});


