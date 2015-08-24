var serverLink="http://52.11.28.99:8080/JsonAPI/customer/travel/";
var appObject = {
    calls:{
        login:serverLink+"loginauth"
    }
};


var module = ons.bootstrap('my-app', ['onsen']);

module.factory('AppService', function() {
    var callFromPage = "";
    var userData={};
    return{
        saveUser: function(data){
            userData=data;
        },
        editGroupList: function(pageLink){
            callFromPage = pageLink;
            app.baseNav.pushPage("pages/groupManage.html");
        },
        closeGroupList: function(){
            app.baseNav.resetToPage(callFromPage);
        },
        editEmpList: function(pageLink){
            callFromPage = pageLink;
            app.baseNav.pushPage("pages/employeeManage.html");
        },
        closeEmpList: function(){
            app.baseNav.resetToPage(callFromPage);
        },
        openEditList: function(parentPage, goToPage){
            callFromPage = parentPage;
            app.baseNav.pushPage("pages/"+goToPage+".html");
        },
        closeEditList: function(){
            app.baseNav.resetToPage("pages/"+callFromPage+".html");
        }
    }
});


module.controller('AppController', function($scope, AppService) {
    $scope.openPersonList = function(){
        app.baseNav.pushPage("pages/person.html");
        menu.close();
    };

    $scope.openGroups = function(){
        app.baseNav.pushPage("pages/groups.html");
        menu.close();
    };

    $scope.openTrips = function(){
        app.baseNav.pushPage("pages/trips.html");
        menu.close();
    };


});
module.controller('PageController', function($scope) {
    ons.ready(function() {
        //menu.openMenu();
    });

});