/**
 * Created by spike.karky on 7/7/2015.
 */
module.controller('PersonController', function($scope, $http, AppService) {


    $scope.data =  {
        "type": "people",
        "count": "",
        "tab": "all"
    };
    $scope.currentTab = "all";

    angular.extend($scope.data, AppService.getResponseData());
    $scope.personData={};


    var url = appObject.calls.person.fetch;
    if(appObject.LOAD_STATIC){url ='data/personList.json'; }

    $scope.fetchData = function(){

        $scope.data.tab = $scope.currentTab;
        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        })
            .success(function(data, status, headers, config) {
                if(data.status="success"){
                    $scope.personData= data;
                }

            })
            .error(function(data, status, headers, config) {
            });
    };

    $scope.create=function(){
        AppService.setId("");
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
        AppService.openEditList("person", "personEditForm");
    };

    $scope.selectTab = function(tab){
        $scope.currentTab = tab;
        $scope.fetchData();
    };

    $scope.showPerson = function(id){
        AppService.setId(id);
        app.baseNav.pushPage("pages/personDetails.html");
        /*app.baseNav.once("postpop", function(){
         $scope.fetchData();
         });*/
    };

    ons.ready(function() {
        $scope.fetchData();
    });
});

module.controller('PersonDetailsController', function($scope, $http, AppService) {

    $scope.details=[];
    $scope.groups = [];
    $scope.trips = [];

    $scope.showEditForm = function(){
        AppService.setId($scope.details.profileid);
        app.baseNav.once("postpop", function(){
            alert(1);
            $scope.fetchData();
        });
        app.baseNav.pushPage('pages/personEditForm.html');
    };

    $scope.fetchData = function(){
        $scope.data={profileid: AppService.getId()};
        angular.extend($scope.data, AppService.getResponseData());

        var url = appObject.calls.person.fetchProfile;
        if(appObject.LOAD_STATIC){url ='data/personDetails.json';};

        $http({
            method: 'POST',
            data: $scope.data,
            url: url,
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            $scope.details = data;
            $scope.fetchGroups(data.profileid);
            $scope.fetchTrips(data.profileid);

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.fetchGroups = function(id){
        var data = {
            "type": "group",
            "count": "",
            "tab": "selected",
            "profileid":id
        };
        angular.extend(data, AppService.getResponseData());

        $http({
            'method': 'POST',
            'url': appObject.calls.person.fetch,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            if(data.status="success"){
                //$scope.people = data.listModel;
                $scope.groups = data.listModel;
            }

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.fetchTrips = function(id){
        var data = {
            "type": "trip",
            "count": "",
            "tab": "selected",
            "profileid":id
        };
        angular.extend(data, AppService.getResponseData());

        $http({
            'method': 'POST',
            'url': appObject.calls.person.fetch,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            if(data.status="success"){
                $scope.trips = data.listModel;
            }

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.showTripDetails = function(id){
        AppService.setId(id);
        app.baseNav.pushPage("pages/tripDetails.html");
    };


    $scope.showGroupDetails = function(){
        app.baseNav.pushPage("pages/groupDetails.html");
    };

    $scope.editGroupList = function(){
        AppService.setDetailData({profileid:$scope.data.profileid});
        AppService.openEditList("personDetails", "groupManage");
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });

    };

    $scope.assignFavourite = function(isFav){

        var data = {
            "action": "assign",
            "object": "people",
            "profileid": $scope.details.profileid
        };

        if(isFav)
        {
            data.action = "unassign";
            $scope.details.favourite=false;
        }else
        {
            $scope.details.favourite=true;
        }


        angular.extend(data, AppService.getResponseData());

        AppService.assignFavourite(data);
    };

    $scope.delete = function(){

        var data = {
            "type": "people",
            "action": "delete",
            "profileid":$scope.data.profileid
        };

        angular.extend(data, AppService.getResponseData());
        AppService.delete(data, "person");
    };

    ons.ready(function() {
        $scope.fetchData();
    });
});

module.controller('PersonEditFormController', function($scope, $http, AppService) {

    $scope.setAction ={
        action:'add',
        object:"profile",
        "type":"people"
    };

    $scope.data = {
        "firstname":"",
        "lastname":"",
        "email":"",
        "landline":"",
        "cell":"",
        "address1":"",
        "address2":"",
        "city":"",
        "state":"",
        "pin":"",
        "country":"",
        "profileid":""
    };



    $scope.submit= function(){

        angular.extend($scope.data, AppService.getResponseData());
        angular.extend($scope.data, $scope.setAction);

        var url = appObject.calls.person.update;

        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            if(data.status=="success")
            {
                AppService.closeEditList();
            }

        }).error(function(data, status, headers, config) {});
    };

    $scope.fetchData= function(){
        if(AppService.getId()!="")
        {
            $scope.setAction.action='update';
            var data = {profileid: AppService.getId()};
            angular.extend(data, AppService.getResponseData());
            var url = appObject.calls.person.fetchProfile;
            if(appObject.LOAD_STATIC){url ='data/personDetails.json';};

            $http({
                method: 'POST',
                data: data,
                url: url,
                dataType: 'json'
            }).success(function(data, status, headers, config) {
                $scope.data = data;

            }).error(function(data, status, headers, config) {
            });
        }
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('EditPersonListController', function($scope, $http, AppService) {
    $scope.groupList = [];

    $scope.data =  {
        "type": "people",
        "count": "",
        "tab": "all"
    };

    angular.extend($scope.data, AppService.getResponseData());
    $scope.personData={};


    var url = appObject.calls.person.fetch;
    if(appObject.LOAD_STATIC){url ='data/personList.json'; }


    $scope.fetchData= function(){
        angular.extend($scope.data, AppService.getDetailData());
        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.personList = data.listModel;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.setAssign = function(id, selected){
        var data={
            "action": "assign",
            "object": "profile",
            "profileid": id
        };

        angular.extend(data, AppService.getResponseData(), AppService.getDetailData());

        if(!selected){data.action = "unassign"}
        $http({
            'method': 'POST',
            'url': appObject.calls.assign,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
        });


    };

    $scope.confirm = function(){
        AppService.closeEditList();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('GroupsController', function($scope, $http, AppService) {
    $scope.groupList=[];

    $scope.data =  {
        "type": "group",
        "count": "",
        "tab": "all"
    };
    $scope.currentTab = "all";

    angular.extend($scope.data, AppService.getResponseData());


    $scope.fetchData = function(){
        $scope.data.tab = $scope.currentTab;

        var url = appObject.calls.person.fetch;
        if(appObject.LOAD_STATIC){url ='data/groups.json'; }

        $http({
            method: 'POST',
            url: url,
            'data': $scope.data,
            'dataType': 'json'
        })
            .success(function(data, status, headers, config) {
                $scope.groupList = data.listModel;

            }).error(function(data, status, headers, config) {
            });
    };


    $scope.showEditForm = function(){
        AppService.setDetailData({});
        app.baseNav.pushPage("pages/groupEditForm.html");
    };

    $scope.showDetails = function(id){
        AppService.setId(id);
        app.baseNav.pushPage("pages/groupDetails.html");
        menu.close();
    };

    $scope.selectTab = function(tab){
        $scope.currentTab = tab;
        $scope.fetchData();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('GroupDetailController', function($scope, $http, AppService) {
    $scope.data =   {
        "groupid": "3",
        "companyid":""
    };
    $scope.data.groupid = AppService.getId();
    angular.extend($scope.data, AppService.getResponseData());

    $scope.details ={};
    $scope.people = [];
    $scope.trips = [];

    $scope.showEditForm = function(){
        AppService.setDetailData($scope.details);
        app.baseNav.pushPage("pages/groupEditForm.html");
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
    };

    $scope.fetchData = function(){
        var url = appObject.calls.group.fetch;
        if(appObject.LOAD_STATIC){url ='data/groupDetails.json'; }

        $http({
            method: 'POST',
            url: url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.details = data;
            $scope.fetchPeople(data.groupid);
            $scope.fetchTrips(data.groupid);

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.fetchPeople = function(id){
        var data = {
            "type": "people",
            "count": "",
            "tab": "selected",
            "groupid":id
        };
        angular.extend(data, AppService.getResponseData());


        $http({
            'method': 'POST',
            'url': appObject.calls.fetchAll,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            console.log(data);
            if(data.status="success"){
                $scope.people = data.listModel;
            }

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.fetchTrips = function(id){
        var data = {
            "type": "trip",
            "count": "",
            "tab": "selected",
            "groupid":id
        };
        angular.extend(data, AppService.getResponseData());

        $http({
            'method': 'POST',
            'url': appObject.calls.fetchAll,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            if(data.status="success"){
                $scope.trips = data.listModel;
            }

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.editPeopleList = function(){
        AppService.setDetailData({groupid:$scope.data.groupid});
        AppService.openEditList("groupDetails", "personManage");
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
    };


    $scope.showPersonDetails = function(id){
        AppService.setId(id);
        app.baseNav.pushPage("pages/personDetails.html");
    };

    $scope.showTripDetails = function(id){
        AppService.setId(id);
        app.baseNav.pushPage("pages/tripDetails.html");
    };

    $scope.editTripList = function(){
        AppService.setDetailData({groupid:$scope.data.groupid});
        AppService.openEditList("groupDetails", "tripManager");
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });

    };

    $scope.assignFavourite = function(isFav){

        var data = {
            "action": "assign",
            "object": "group",
            "groupid": $scope.details.groupid
        };

        if(isFav)
        {
            data.action = "unassign";
            $scope.details.favourite=false;
        }else
        {
            $scope.details.favourite=true;
        }


        angular.extend(data, AppService.getResponseData());

        AppService.assignFavourite(data);
    };

    $scope.delete = function(){
        var data = {
            "type": "group",
            "action": "delete",
            "groupid":$scope.data.groupid
        };
        angular.extend(data, AppService.getResponseData());
        AppService.delete(data);
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('GroupEditFormController', function($scope, $http, AppService) {

    $scope.setAction ={
        action:'add'
    };

    $scope.data =  {
        "notes": "Team 02",
        "groupname": "Team 02",
        "groupid": ""
    };



    $scope.submit= function(){

        angular.extend($scope.data, AppService.getResponseData());
        angular.extend($scope.data, $scope.setAction);

        var url = appObject.calls.group.update;

        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            if(data.status=="success")
            {
                AppService.closeEditList();
            }

        }).error(function(data, status, headers, config) {});
    };

    $scope.fetchData= function(){


        if(AppService.getDetailData().groupid)
        {
            $scope.data = AppService.getDetailData();
            $scope.setAction.action='update';

        }
        return;
        if(AppService.getId()!="")
        {
            $scope.setAction.action='update';

            var url = appObject.calls.person.fetchProfile;
            if(appObject.LOAD_STATIC){url ='data/personDetails.json';};

            $http({
                method: 'POST',
                data: {profileid: AppService.getId()},
                url: url,
                dataType: 'json'
            }).success(function(data, status, headers, config) {
                $scope.data = data;

            }).error(function(data, status, headers, config) {
            });
        }
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('EditGroupListController', function($scope, $http, AppService) {
    $scope.groupList = [];
    $scope.data =  {
        "type": "group",
        "count": "",
        "tab": "all"
    };
    angular.extend($scope.data, AppService.getResponseData(), AppService.getDetailData());

    $scope.fetchData= function(){
        var url = appObject.calls.fetchAll;
        if(appObject.LOAD_STATIC){url ='data/groups.json'; }

        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {

            $scope.groupList = data.listModel;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.setAssign = function(id, selected){

        var data={
            "action": "assign",
            "object": "group",
            "groupid": id
        };

        var parentData = AppService.getDetailData();

        if(parentData.profileid){
            data.object = "profile";
        }


        angular.extend(data, AppService.getResponseData(), parentData);

        if(!selected){data.action = "unassign"}

        $http({
            'method': 'POST',
            'url': appObject.calls.assign,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
        });


    };

    $scope.confirm = function(){
        AppService.closeEditList();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('TripsController', function($scope, $http, AppService) {
    $scope.tripList=[];

    $scope.data =  {
        "type": "trip",
        "tab": "tracking"
    };
    $scope.currentTab = "all";
    angular.extend($scope.data, AppService.getResponseData());


    $scope.fetchData = function(){
        $scope.data.tab = $scope.currentTab;
        var url = appObject.calls.fetchAll;
        if(appObject.LOAD_STATIC){url ='data/tripList.json'; }
        $http({
            method: 'POST',
            url: url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.tripList = data.listModel;
            console.log(data);

        }).error(function(data, status, headers, config) {
        });
    };


    $scope.showEditForm = function(){
        AppService.setDetailData({});
        app.baseNav.pushPage("pages/tripEditForm.html");
    };

    $scope.showDetails = function(id){
        AppService.setId(id);
        app.baseNav.pushPage("pages/tripDetails.html");
        menu.close();
    };

    $scope.selectTab = function(tab){
        $scope.currentTab = tab;
        $scope.fetchData();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('TripDetailController', function($scope, $http, AppService) {
    $scope.tripDetails={};
    $scope.groups=[];
    $scope.schedules=[];

    $scope.data = {
        "tripid": "0"
    };
    $scope.data.tripid = AppService.getId();
    angular.extend($scope.data, AppService.getResponseData());

    $scope.fetchData = function(){
        var url = appObject.calls.trip.fetch;
        if(appObject.LOAD_STATIC){url ='data/tripDetails.json'; }

        $http({
            method: 'POST',
            url: url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.tripDetails = data;
            $scope.fetchGroup(data.tripid);
            $scope.fetchSchedule(data.tripid);


        }).error(function(data, status, headers, config) {
        });
    };

    $scope.showEditForm = function(){
        AppService.setDetailData($scope.tripDetails);
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
        app.baseNav.pushPage('pages/tripEditForm.html');
    };

    $scope.showGroupDetails = function(){
        app.baseNav.pushPage("pages/groupDetails.html");
    };

    $scope.fetchGroup = function(id){
        var data = {
            "type": "group",
            "count": "",
            "tab": "selected",
            "tripid":id
        };
        angular.extend(data, AppService.getResponseData());

        $http({
            'method': 'POST',
            'url': appObject.calls.fetchAll,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.groups = data.listModel;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.editGroupList = function(){
        AppService.setDetailData({tripid:$scope.data.tripid});
        AppService.openEditList("tripDetails", "groupManage");
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
    };

    $scope.editEmpList = function(){
        AppService.openEditList("tripDetails", "employeeManager");
    };

    $scope.fetchSchedule = function(id){
        var data = {
            "type": "schedule",
            "count": "",
            "tab": "trip",
            "tripid":id
        };
        angular.extend(data, AppService.getResponseData());

        $http({
            'method': 'POST',
            'url': appObject.calls.fetchAll,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.schedules = data.listModel;

        }).error(function(data, status, headers, config) {});
    };

    $scope.editScheduleList= function(){
        AppService.setId($scope.tripDetails.tripid);
        //AppService.setDetailData($scope.schedules);
        AppService.openEditList("tripDetails", "tripScheduler");
    };

    $scope.saveAsTemplate = function(){
        AppService.setDetailData($scope.tripDetails);
        AppService.openEditList("tripDetails", "templateEditForm");
    };

    $scope.assignFavourite = function(isFav){

        var data = {
            "action": "assign",
            "object": "trip",
            "tripid": $scope.tripDetails.tripid
        };

        if(isFav)
        {
            data.action = "unassign";
            $scope.tripDetails.favourite=false;
        }else
        {
            $scope.tripDetails.favourite=true;
        }


        angular.extend(data, AppService.getResponseData());

        AppService.assignFavourite(data);
    };

    $scope.delete = function(){
            var data = {
                "type": "trip",
                "action": "delete",
                "tripid":$scope.data.tripid
            };

            angular.extend(data, AppService.getResponseData());

            AppService.delete(data);
        };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('TripEditFormController', function($scope, $http, AppService) {

    $scope.setAction ={
        action:'add'
    };

    $scope.data =
    {
        "notes": "TRIP Notes",
        "tripname": "Trip number 6",
        "tripid": ""
    };



    $scope.submit= function(){

        angular.extend($scope.data, AppService.getResponseData());
        angular.extend($scope.data, $scope.setAction);

        var url = appObject.calls.trip.update;

        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {

            if(data.status=="success")
            {
                AppService.closeEditList();
            }

        }).error(function(data, status, headers, config) {});
    };

    $scope.fetchData= function(){


        if(AppService.getDetailData().tripid)
        {
            $scope.data = AppService.getDetailData();
            $scope.setAction.action='update';

        }
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('EditTripListController', function($scope, $http, AppService) {
    $scope.tripList = [];

    $scope.groupList = [];
    $scope.data =  {
        "type": "trip",
        "count": "",
        "tab": "all"
    };

    angular.extend($scope.data, AppService.getResponseData(), AppService.getDetailData());


    $scope.fetchData= function(){

        var url = appObject.calls.fetchAll;
        if(appObject.LOAD_STATIC){url ='data/tripList.json'; }

        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.tripList = data.listModel;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.setAssign = function(id, selected){

        var data={
            "action": "assign",
            "object": "group",
            "tripid": id
        };

        var parentData = AppService.getDetailData();


        angular.extend(data, AppService.getResponseData(), parentData);

        if(!selected){data.action = "unassign"}

        console.log(data);
        $http({
            'method': 'POST',
            'url': appObject.calls.assign,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
        });


    };

    $scope.confirm = function(){
        AppService.closeEditList();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('SchedulerController', function($scope, $http, AppService) {
    $scope.scheduleList = [];
    $scope.tripId = "0";


    $scope.fetchData= function(){
        var data = {
            "type": "schedule",
            "count": "",
            "tab": "trip",
            "tripid":$scope.tripId
        };
        angular.extend(data, AppService.getResponseData());

        $http({
            'method': 'POST',
            'url': appObject.calls.fetchAll,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.scheduleList = data.listModel;

        }).error(function(data, status, headers, config) {});
        //$scope.scheduleList = AppService.getDetailData();
    };

    $scope.showEditForm = function(data){
        if(data)
        {
            var scheduleId = data.id;
            data.scheduleid = scheduleId;
            delete data.$$hashKey;
            delete data.selected;
            delete data.session_id;
            delete data.tab;
            delete data.id;
        }

        AppService.setDetailData(data);
        AppService.setId($scope.tripId);
        AppService.openEditList("tripScheduler", "tripScheduleEdit");
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
    };

    $scope.confirm = function(){
        AppService.closeEditList();
    };

    ons.ready(function(a) {
        $scope.tripId = AppService.getId();
        $scope.fetchData();
    });

});

module.controller('EditScheduleController', function($scope, $http, AppService) {

    $scope.setAction = {action:"add"};

    $scope.data ={
        "notes": "schdeule",
        "schedulename": "schedule number 5fff",
        "action": "add",
        "scheduleid": "",
        "startdate": "2011-5-30",
        //"enddate": "2011-5-30",
        "starttime": "16:13:47",
        //"endtime": "16:13:47",
        "tripid":"1"

    };

    $scope.fetchData= function(){
        if(AppService.getDetailData())
        {
            $scope.setAction.action = 'update';
            $scope.data = AppService.getDetailData();
        }
    };

    $scope.close = function(){
        AppService.closeEditList();
    };

    $scope.submit = function(){
        angular.extend($scope.data, AppService.getResponseData());
        angular.extend($scope.data, $scope.setAction);

        $scope.data.tripid = AppService.getId();

        var url = appObject.calls.schedule.update;

        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            if(data.status=="success")
            {
                AppService.closeEditList();
            }

        }).error(function(data, status, headers, config) {});

    };

    $scope.delete = function(){
        var data = {
            "type": "schedule",
            "action": "delete",
            "scheduleid":AppService.getDetailData().scheduleid
        };
        angular.extend(data, AppService.getResponseData());
        AppService.delete(data);
    };

    ons.ready(function(a) {
        //$scope.tripId = AppService.getId();
        $scope.fetchData();
    });

});

module.controller('TemplatesController', function($scope, $http, AppService) {
    $scope.templateList=[];

    $scope.data =  {
        "type": "template",
        "tab": "all"
    };
    angular.extend($scope.data, AppService.getResponseData());


    $scope.fetchData = function(){

        var url = appObject.calls.fetchAll;
        if(appObject.LOAD_STATIC){url ='data/tripList.json'; }
        $http({
            method: 'POST',
            url: url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.templateList = data.listModel;

        }).error(function(data, status, headers, config) {
        });
    };


    $scope.showDetails = function(id){
        AppService.setId(id);
        app.baseNav.pushPage("pages/templateDetails.html");
        menu.close();
    };

    $scope.selectTab = function(tab){
        $scope.currentTab = tab;
        $scope.fetchData();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('TemplateDetailController', function($scope, $http, AppService) {
    $scope.tripDetails={};
    $scope.groups=[];
    $scope.schedules=[];

    $scope.data = {
        "tripid": "0"
    };
    $scope.data.tripid = AppService.getId();
    angular.extend($scope.data, AppService.getResponseData());

    $scope.fetchData = function(){
        var url = appObject.calls.trip.fetch;
        if(appObject.LOAD_STATIC){url ='data/tripDetails.json'; }

        $http({
            method: 'POST',
            url: url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.tripDetails = data;
            $scope.fetchGroup(data.tripid);
            $scope.fetchSchedule(data.tripid);


        }).error(function(data, status, headers, config) {
        });
    };

    $scope.showEditForm = function(){
        AppService.setDetailData($scope.tripDetails);
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
        app.baseNav.pushPage('pages/tripEditForm.html');
    };

    $scope.showGroupDetails = function(){
        app.baseNav.pushPage("pages/groupDetails.html");
    };

    $scope.fetchGroup = function(id){
        var data = {
            "type": "group",
            "count": "",
            "tab": "selected",
            "tripid":id
        };
        angular.extend(data, AppService.getResponseData());

        $http({
            'method': 'POST',
            'url': appObject.calls.fetchAll,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.groups = data.listModel;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.editGroupList = function(){
        AppService.setDetailData({tripid:$scope.data.tripid});
        AppService.openEditList("tripDetails", "groupManage");
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
    };

    $scope.editEmpList = function(){
        AppService.openEditList("tripDetails", "employeeManager");
    };

    $scope.fetchSchedule = function(id){
        var data = {
            "type": "schedule",
            "count": "",
            "tab": "trip",
            "tripid":id
        };
        angular.extend(data, AppService.getResponseData());

        $http({
            'method': 'POST',
            'url': appObject.calls.fetchAll,
            'data': data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
            $scope.schedules = data.listModel;

        }).error(function(data, status, headers, config) {});
    };

    $scope.editScheduleList= function(){
        AppService.setId($scope.tripDetails.tripid);
        //AppService.setDetailData($scope.schedules);
        AppService.openEditList("tripDetails", "tripScheduler");
    };

    $scope.saveAsTrip = function(){
        var data = $scope.tripDetails;
        data.duplicate = true;
        AppService.setDetailData(data);
        AppService.openEditList("tripDetails", "templateEditForm");
    };

    $scope.assignFavourite = function(isFav){

        var data = {
            "action": "assign",
            "object": "trip",
            "tripid": $scope.tripDetails.tripid
        };

        if(isFav)
        {
            data.action = "unassign";
            $scope.tripDetails.favourite=false;
        }else
        {
            $scope.tripDetails.favourite=true;
        }


        angular.extend(data, AppService.getResponseData());

        AppService.assignFavourite(data);
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('TemplateEditFormController', function($scope, $http, AppService) {

    $scope.setAction ={
        action:'update'
    };

    $scope.url = appObject.calls.template.update;

    $scope.data ={
        "notes": "TRIP",
        "tripname": "Trip number 5",
        "action": "add",
        "tripid": "8",
        "istemplate": "Y"
    };

    $scope.submit= function(){

        angular.extend($scope.data, AppService.getResponseData());
        angular.extend($scope.data, $scope.setAction);

        //var url = appObject.calls.template.update;
        $http({
            'method': 'POST',
            'url': $scope.url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {

            if(data.status=="success")
            {
                AppService.closeEditList();
            }

        }).error(function(data, status, headers, config) {});
    };

    $scope.fetchData= function(){
        var tripData = AppService.getDetailData();
        if(tripData.duplicate){
            $scope.url = appObject.calls.template.duplicate;
        }


        $scope.data.tripid = tripData.tripid;
        $scope.data.tripname = tripData.tripname;
        $scope.data.notes = tripData.notes;
        /*if(AppService.getDetailData().tripid)
         {
         $scope.data = AppService.getDetailData();
         $scope.setAction.action='update';

         }*/
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('EditEmployeeListController', function($scope, $http, AppService) {
    $scope.groupList = [];


    $scope.fetchData= function(){
        $http({method: 'GET', url: 'data/employee.json'}).success(function(data, status, headers, config) {
            $scope.empList = data;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.confirm = function(){
        AppService.closeEditList();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});