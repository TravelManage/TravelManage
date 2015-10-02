/**
 * Created by spike.karky on 7/7/2015.
 */
module.controller('PersonController', function($scope, $http, AppService) {


    $scope.data =  {
        "type": "people",
        "count": "",
        "tab": "archieve"
    };
    angular.extend($scope.data, AppService.getResponseData());

    $scope.personData={};


    var url = appObject.calls.person.fetch;
    if(appObject.LOAD_STATIC){url ='data/personList.json'; }
    $scope.fetchData = function(){

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
        AppService.openEditList("person", "personEditForm");
        //app.baseNav.pushPage("pages/personEditForm.html");
    };

    $scope.showPerson = function(id){
        AppService.setId(id);
        app.baseNav.pushPage("pages/personDetails.html");
        menu.close();
    };

    ons.ready(function() {
        $scope.fetchData();
    });
});

module.controller('PersonDetailsController', function($scope, $http, AppService) {

    $scope.details=[];

    $scope.showEditForm = function(){
        AppService.setId($scope.details.profileid);
        app.baseNav.once("postpop", function(){
            $scope.fetchData();
        });
        app.baseNav.pushPage('pages/personEditForm.html');
    };

    $scope.fetchData = function(){
        $scope.data={profileid: AppService.getId()};
        var url = appObject.calls.person.fetchProfile;
        if(appObject.LOAD_STATIC){url ='data/personDetails.json';};

        $http({
            method: 'POST',
            data: $scope.data,
            url: url,
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            console.log(data);
            $scope.details = data;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.showTripDetails = function(){
        app.baseNav.pushPage("pages/tripDetails.html");
    };


    $scope.showGroupDetails = function(){
        app.baseNav.pushPage("pages/groupDetails.html");
    };

    $scope.editGroupList = function(){
        AppService.openEditList("personDetails", "groupManage");
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

            var url = appObject.calls.person.fetchProfile;
            if(appObject.LOAD_STATIC){url ='data/personDetails.json';};

            $http({
                method: 'POST',
                data: {profileid: AppService.getId()},
                url: url,
                dataType: 'json'
            }).success(function(data, status, headers, config) {
                console.log(data);
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


    $scope.fetchData= function(){
        $http({method: 'GET', url: 'data/personList.json'}).success(function(data, status, headers, config) {
            $scope.personList = data.list;

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
    $scope.peopleList = [];

    $scope.data =  {
        "type": "group",
        "count": "",
        "tab": "archieve"
    };
    angular.extend($scope.data, AppService.getResponseData());


    $scope.fetchData = function(){
        var url = appObject.calls.person.fetch;
        if(appObject.LOAD_STATIC){url ='data/groups.json'; }

        console.log($scope.data);
        $http({
            method: 'POST',
            url: url,
            'data': $scope.data,
            'dataType': 'json'
        })
            .success(function(data, status, headers, config) {
                console.log(data);
                $scope.groupList = data.list;

            }).error(function(data, status, headers, config) {
            });
    };

    $scope.fetchPeople = function(){
        $http({method: 'GET', url: 'data/personList.json'}).success(function(data, status, headers, config) {
            $scope.peopleList = data.list;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.showEditForm = function(){
        app.baseNav.pushPage("pages/groupEditForm.html");
    };

    $scope.showDetails = function(){
        app.baseNav.pushPage("pages/groupDetails.html");
        menu.close();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('GroupDetailController', function($scope, $http, AppService) {
    $scope.peopleList = [];

    $scope.showEditForm = function(){
        app.baseNav.pushPage("pages/groupEditForm.html");
    };

    $scope.fetchPeople = function(){
        $http({method: 'GET', url: 'data/groupDetails.json'}).success(function(data, status, headers, config) {
            $scope.data = data;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.editPeopleList = function(){
        AppService.openEditList("groupDetails", "personManage");
    };


    $scope.showPersonDetails = function(){
        app.baseNav.pushPage("pages/personDetails.html");
    };

    $scope.showTripDetails = function(){
        app.baseNav.pushPage("pages/tripDetails.html");
    };

    $scope.editTripList = function(){
        AppService.openEditList("groupDetails", "tripManager");
    };

    ons.ready(function(a) {
        $scope.fetchPeople();
    });

});

module.controller('GroupEditFormController', function($scope, $http, AppService) {

    $scope.setAction ={
        action:'add'
    };

    $scope.data =  {
        "notes": "Test Note",
        "groupname": "MayTestGroup2",
        "groupid": ""
    };



    $scope.submit= function(){

        //angular.extend($scope.data, AppService.getResponseData());
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
                console.log(data);
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


    $scope.fetchData= function(){
        $http({method: 'GET', url: 'data/groups.json'}).success(function(data, status, headers, config) {
            $scope.groupList = data.list;

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

module.controller('TripsController', function($scope, $http) {
    $scope.tripList=[];


    $scope.fetchData = function(){
        $http({method: 'GET', url: 'data/tripList.json'}).success(function(data, status, headers, config) {
            $scope.tripList = data;

        }).error(function(data, status, headers, config) {
        });
    };


    $scope.showEditForm = function(){
        app.baseNav.pushPage("pages/tripEditForm.html");
    };

    $scope.showDetails = function(){
        app.baseNav.pushPage("pages/tripDetails.html");
        menu.close();
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('TripDetailController', function($scope, $http, AppService) {
    $scope.tripDetails={};

    $scope.fetchData = function(){
        $http({method: 'GET', url: 'data/tripDetails.json'}).success(function(data, status, headers, config) {
            $scope.tripDetails = data;
        }).error(function(data, status, headers, config) {
        });
    };


    $scope.showEditForm = function(){
        app.baseNav.pushPage("pages/tripEditForm.html");
    };

    $scope.showGroupDetails = function(){
        app.baseNav.pushPage("pages/groupDetails.html");
    };

    $scope.editGroupList = function(){
        AppService.openEditList("tripDetails", "groupManage");
    };

    $scope.editEmpList = function(){
        AppService.openEditList("tripDetails", "employeeManager");
    };

    $scope.editSchedule= function(){
        AppService.openEditList("tripDetails", "tripScheduler");
    };

    ons.ready(function(a) {
        $scope.fetchData();
    });

});

module.controller('EditTripListController', function($scope, $http, AppService) {
    $scope.tripList = [];


    $scope.fetchData= function(){
        $http({method: 'GET', url: 'data/tripList.json'}).success(function(data, status, headers, config) {
            $scope.tripList = data;

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
    $scope.groupList = [];


    $scope.fetchData= function(){
        $http({method: 'GET', url: 'data/scheduler.json'}).success(function(data, status, headers, config) {
            $scope.scheduleList = data;

        }).error(function(data, status, headers, config) {
        });
    };

    $scope.showEditForm = function(){
        app.baseNav.pushPage("pages/tripScheduleEdit.html");
    };

    $scope.confirm = function(){
        AppService.closeEditList();
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

