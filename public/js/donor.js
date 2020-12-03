

  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyChl5P81AbqjAu3ePUeO4fdOeB_Qfvxmms",
//     authDomain: "dbmsproject-ass.firebaseapp.com",
//     databaseURL: "https://dbmsproject-ass.firebaseio.com",
//     projectId: "dbmsproject-ass",
//     storageBucket: "dbmsproject-ass.appspot.com",
//     messagingSenderId: "134138453400",
//     appId: "1:134138453400:web:46f14ac1cd906189bd5fed",
//     measurementId: "G-21SZDW1GWP"
//   };
  
      function deletefun(name){

        firebase.initializeApp({
            apiKey: 'AIzaSyChl5P81AbqjAu3ePUeO4fdOeB_Qfvxmms',
            authDomain: 'dbmsproject-ass.firebaseapp.com',
            projectId: 'dbmsproject-ass'
          });
          var db = firebase.firestore();
        
        console.log(name);
        window.location('/')
        db.collection("Donors").doc(name).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

      }
  
      

