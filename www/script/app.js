var serverLink="http://localhost:8080/JsonAPI/customer/travel/";
var appObject = {
    LOAD_STATIC:false,
    calls:{
        login:serverLink+"loginauth",
        createUser:serverLink+"usercreate",
        fetchAll:serverLink+"fetchall",
        assign:serverLink+"mapping",
        fav:serverLink+"favourite",
        person:{
            fetch:serverLink+"fetchall",
            update:serverLink+"profile",
            fetchProfile: serverLink+"fetchAdetailprofile"
        },
        group:{
            update:serverLink+"group",
            fetch:serverLink+"fetchAdetailgroup"

        },
        trip:{
            update:serverLink+"trip",
            fetch: serverLink+ "fetchAdetailtrip"
        },

        schedule:{
            update:serverLink+"schedule"
        },

        template:{
            update: serverLink+ "template"
        }
    }
};


var module = ons.bootstrap('my-app', ['onsen']);

module.factory('AppService', function($http) {
    var callFromPage = "";
    var userData={};
    var responseData = {};
    var displayID = "";
    var dataBlock = {};
    return{
        saveUser: function(data){
            userData=data;
            responseData.companyid = data.companyid;
            responseData.session_id=data.session_id;
        },

        setId: function(id){
            displayID=id;
        },

        getId: function(){
            return displayID;
        },

        getResponseData: function(){
            return responseData;
        },

        setDetailData: function(data){
            dataBlock = data;
        },
        getDetailData: function(){
            return dataBlock;
        },

        cleanDetailData: function(){
            dataBlock={};
        },
        assignFavourite: function(data){
            $http({
                'method': 'POST',
                'url': appObject.calls.fav,
                'data': data,
                'dataType': 'json'
            }).success(function(data, status, headers, config) {

            }).error(function(data, status, headers, config) {
            });
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
            app.baseNav.popPage();
        },
        openEditList: function(parentPage, goToPage){
            callFromPage = parentPage;
            app.baseNav.pushPage("pages/"+goToPage+".html");
        },
        closeEditList: function(){
            app.baseNav.popPage();
            //app.baseNav.resetToPage("pages/"+callFromPage+".html");
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

    $scope.openTemplates = function(){
        app.baseNav.pushPage("pages/templates.html");
        menu.close();
    };


});
module.controller('PageController', function($scope) {
    ons.ready(function() {
        //menu.openMenu();
    });

});