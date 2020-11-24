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

//app.get('/',function(req,res){
    
//     const snapshot = db.collection('test2').get()
//     .then(snapshot=>{
//         snapshot.docs.forEach(elem=>{
            
//             if(elem.data().City=='Pune'){
//                 console.log("IN Pune BllodBanks:- "+ elem.data().Name)
//             }
//         })
//    });
  
    //res.render("index")

//});
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
            });

var rname;
var rage;
var rcity;
var remail;

app.route('/requester')
            .post(function(req,res){
               rname  = req.body.rname;
                rage   = req.body.rage;
                rcity  = req.body.rcity;
                remail = req.body.remail;
               res.redirect('/requesterbblist')
    
});

app.route('/requesterbblist')
            .get(function(req,res){
                var i=0;
                var bbnamearray=[];
                var bbnoarray=[];
                var bbaddarray=[];


                const snapshot = db.collection('Bloodbanks').get()
                    .then(snapshot=>{
                        snapshot.docs.forEach(elem=>{
                            
                            if(elem.data().city=='Pune'){
                                i++;
                                var currName= elem.data().Name;
                                var currNo= elem.data().number;
                                var currAdd= elem.data().Address;
                               // console.log(currName)
                                bbnamearray.push(currName);
                                bbnoarray.push(currNo);
                                bbaddarray.push(currAdd);
                                // console.log("IN Pune BllodBanks:- "+ elem.data().Name+' '+i)
                                
                            }
                        })
                        console.log(" "+bbnamearray);
                        console.log(" "+bbnoarray);
                        console.log(" "+bbaddarray);
                        res.render('rbblist',{
                            i:i,
                            BBnamearray : bbnamearray,
                            BBnoarray:bbnoarray,
                            BBaddarray:bbaddarray

                        })
                }); 
 });

 app.post('/donor',function(req,res){
     var dname = req.body.dname;
     var dage = req.body.dage;
     var demail = req.body.demail;
     var ref = db.collection('Donors').doc(dname);

     ref.set({
         Name : dname,
         Age : dage,
         Email : demail
     })
     .then(function(){

        res.write('<script>window.alert("Your Request has been recorded and your information is stored in our database" );window.location="/";</script>');
          res.redirect('/')
     })
        .catch(function(err){
           console.log("ERROR IS :- " + err);
     })
     
 })

app.listen(process.env.PORT||3000,function(){
    console.log("Server started on port 3000");
});