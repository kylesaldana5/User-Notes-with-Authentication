"use strict";

angular.module('notes').controller("loginCtrl", function ($scope, authFactory, $window, $rootScope) {
    $scope.test = "hello";

    // TODO: Grab the user form info and send it to AuthFactory
    // for register / login / logout -- hmm. Maybe rename this Ctrl?
    $scope.register = () => {
        authFactory.createUser($scope.account).then(user => {
            console.log("newUser", user);
            $scope.login();
        })
            .catch(function ({ code, message }) {
                console.log("Oops", code, message);
            });
    };

    $scope.login = () => {
        authFactory.loginUser($scope.account).then(user => {
            console.log("logged in user", user);
            $window.location.href = "#!/notes";
        })
            .catch((err) => {
                console.log(err);
            });
    };

    $scope.logout = () => {
        AuthFactory.logoutUser()
            .then((data) => {
                console.log("logged out", data);
            });
    };
    // $scope.logout();
});
