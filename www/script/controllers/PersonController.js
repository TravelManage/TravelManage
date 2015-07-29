/**
 * Created by spike.karky on 7/7/2015.
 */
module.controller('PersonController', function($scope, $http) {

    $scope.personList=[];

    $scope.fetchData = function(){
        $http({method: 'GET', url: 'data/personList.json'}).success(function(data, status, headers, config) {
            $scope.personList = data.list;

        }).error(function(data, status, headers, config) {
        });
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
        AppService.openEditList("groupDetails", "tripManage");
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
    $scope.groupList = [];


    $scope.fetchData= function(){
        $http({method: 'GET', url: 'data/tripList.json'}).success(function(data, status, headers, config) {
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

