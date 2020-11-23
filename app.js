const express = require('express');
const admin = require('firebase-admin');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static("public"));

app.get('/',function(req,res){
    
    // const snapshot = db.collection('test2').get()
    // .then(snapshot=>{
    //     snapshot.docs.forEach(elem=>{
            
    //         if(elem.data().City=='Pune'){
    //             console.log("IN Pune BllodBanks:- "+ elem.data().Name)
    //         }
    //     })
   // });
  
    res.render("index")

});
// app.post('/',function(req,res){
//     var a = req.body.firstname;
//     var b = req.body.city;
//     console.log(a+' '+b);

//     var ref = db.collection('test2').doc('2');

//     ref.set({
//         Donor_Name : a,
//         Donor_City : b,
//         Message : 'I want to break free'
//     })
//     .then(function(){
//         console.log("Zala re");
//     })
//     .catch(function(err){
//         console.log("ERROR IS :- " + err);
//     })
//     res.redirect('/')
// });

app.route('/')
            .get(function(req,res){
                res.render("index")
            })
            .post(function(req,res){
                var name = req.body.fname;
                var city = req.body.city;
                console.log(name + city);
                const docRef = db.collection('test').doc('1');
                docRef.set({
                    Name: name,
                    BBCity : city,
                    Message: "I want to break free"
                }) 
                .then(function(){
                    console.log('Zala re!!')

                })
                .catch(function(err){
                    console.log("Error is :- "+err)

                });  
                res.redirect('/')
            });

app.listen(process.env.PORT||3000,function(){
    console.log("Server started on port 3000");
});