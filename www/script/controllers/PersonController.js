/**
 * Created by spike.karky on 7/7/2015.
 */
module.controller('PersonController', function($scope, $http) {


    $scope.data = {
        "type": "people",
        "companyid": "106",
        "count": ""
    };

    $scope.personList=[];


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
                console.log(data);
                //$scope.personList = data.list;

            })
            .error(function(data, status, headers, config) {
            });
    };

    $scope.create=function(){
        app.baseNav.pushPage("pages/personEditForm.html");
    };

    $scope.showPerson = function(){
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
        app.baseNav.pushPage("pages/personEditForm.html");
    };

    $scope.fetchData = function(){
        $http({method: 'GET', url: 'data/personDetails.json'}).success(function(data, status, headers, config) {
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

    $scope.data = {
        "action": "add",
        "object":"profile",
        "type":"people",
        "loginid": "1014",
        "companyid": "106",
        "firstname":"first",
        "lastname":"last",
        "email":"fff",
        "landline":"55555",
        "cell":"66666",
        "address1":"fasdfasdf",
        "address2":"",
        "city":"sdfsdaf",
        "state":"dsfasdf",
        "pin":"",
        "country":"",
        "profileid":""
    }
    ;


    $scope.submit= function(){
        var url = appObject.calls.person.update;

        $http({
            'method': 'POST',
            'url': url,
            'data': $scope.data,
            'dataType': 'json'
        }).success(function(data, status, headers, config) {
                //console.log(data);
                console.log(data);
                if(data.status=="success")
                {
                    //app.baseNav.popPage();
                }

            }).error(function(data, status, headers, config) {});
    };
    ons.ready(function(a) {
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

module.controller('GroupsController', function($scope, $http) {
    $scope.groupList=[];
    $scope.peopleList = [];


    $scope.fetchData = function(){
        $http({method: 'GET', url: 'data/groups.json'}).success(function(data, status, headers, config) {
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

