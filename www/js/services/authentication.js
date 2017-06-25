starter.factory('Authentication',
  ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
  function($rootScope, $location, $firebaseObject, $firebaseAuth) {

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  var myObject;

  auth.$onAuthStateChanged(function(authUser) {
    if(authUser) { //if an authenticated user exists...
      var userRef = ref.child('users').child(authUser.uid); // gets a reference of the current user
      var userObj = $firebaseObject(userRef); //stores that into this variable
      $rootScope.currentUser = userObj; // puts that into the rootScope so its accesible from everywhere
    } else {
      $rootScope.currentUser = ''; // otherwhise it gives it an empty string
    }
  });

  myObject = {
    login: function(user) {
      auth.$signInWithEmailAndPassword( //this is a firebase Method
      user.email, //sends the user information to the database and compares
        user.password
      ).then(function(user) {
        $location.path('tab/home'); //redirects the user to the home page after logging in
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //signInWithEmailAndPassword
    }, //login

    logout: function() {
      return auth.$signOut();
    }, //logout

    requireAuth: function() {
      return auth.$requireSignIn();
    }, //require Authentication

    register: function(user) {
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(regUser) {//the server sends a promise, after which the app reacts:
        var regRef = ref.child('users')
          .child.child(regUser.uid).set({
            date: firebase.database.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          }); //userinfo
          myObject.login(user);
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //createUserWithEmailAndPassword
    } //register

  }; //return


  return myObject;

}]); //factory
