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
                            
                            if(elem.data().city==rcity){
                                i++;
                                var currName= elem.data().Name;
                                var currNo= elem.data().number;
                                var currAdd= elem.data().Address;
            
                                bbnamearray.push(currName);
                                bbnoarray.push(currNo);
                                bbaddarray.push(currAdd);
                               
                                
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

 app.route('/donorlist')
    .get(function(req,res){
        var i = 0;
        var donorlist =[];
        const snapshot = db.collection('Donors').get()
        .then(snapshot=>{
            snapshot.docs.forEach(elem=>{
                var currData= elem.data();
                donorlist.push(currData);
                i++;
                
            });
            console.log(donorlist);
            res.render('donorlist',{
                i:i,
                DonorArray:donorlist
            })

    });
});
 app.post('/donor',function(req,res){
     var dname = req.body.dname;
     var dage = req.body.dage;
     var demail = req.body.demail;
     var dbgroup = req.body.dbgroup;
     var ref = db.collection('Donors').doc(dname);

     ref.set({
         Name : dname,
         Age : dage,
         Email : demail,
         BloodGroup : dbgroup   
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