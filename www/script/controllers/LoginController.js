module.controller('LoginController', function($scope) {
    $scope.login = function(){
        app.mainNav.pushPage("pages/home.html");
    }

    $scope.create = function(){
            app.mainNav.pushPage("pages/companyEditForm.html");
        }
});

/*module.controller('PersonController', function($scope) {
    $scope.personListPage ="pages/personList.html";
});*/

