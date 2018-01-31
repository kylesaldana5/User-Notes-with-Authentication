"use strict";

let isAuth = (AuthFactory) =>
    new Promise((resolve, reject) => {
        AuthFactory.isAuthenticated().then(userBool => {
            console.log("user???", userBool);
            if (userBool) {
                console.log("Authenticated user. Go ahead");
                resolve();
            } else {
                console.log("Not Authenticated user. Go away");
                reject();
            }
        });
    });

const app = angular.module('notes', ['ngRoute'])
    app.constant("FBUrl", "https://ks-user-notes.firebaseio.com")
        .config($routeProvider =>{
        $routeProvider
        .when('/register',{
        templateUrl:"app/partials/registration.html",
        controller: "registrationCtrl"
        })
        .when('/login', {
        templateUrl: "app/partials/login.html",
        controller: "loginCtrl",
        
        })
        .when('/notes', {
        templateUrl: "app/partials/noteList.html",
        controller: "noteListCtrl",
       
        })
        .when('/new', {
        templateUrl: "app/partials/newNote.html",
        controller: "newNoteCtrl",
       
        })
        .otherwise("/register");
    })
        .run(FBCreds => {
            let creds = FBCreds;
            let authConfig = {
                apiKey: creds.key,
                authDomain: creds.authDomain
            };
            firebase.initializeApp(authConfig);
        });