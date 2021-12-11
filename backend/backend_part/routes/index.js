const { application } = require('express');
var express = require('express');
const session = require('express-session');

// conf multer 

const multer = require('multer');
const path = require('path') ;

const upload = multer({

    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{

        let ext = path.extname(file.originalname);
        /*
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" ){
            cb(new Error("file type is not supported !"),false) ;
            return ;
        }
        */
        cb(null,true);
    },

});

// config cloudinary 


const cloudinary = require('cloudinary').v2 ;

cloudinary.config({
    cloud_name : "aminedridi" ,
    api_key : "838649188588491" ,
    api_secret : "kBj4o1Va2ZiwjPp_1ZzIIt_7hhg"
}) 



var router = express.Router();

// requires multer.js and cloudinary.js


/* GET home page. */
router.get('/api/test_route', function(req, res, next) {
  res.json("hello app amine");
});


// upload image file in cloudinary .


router.post('/test_add_file', upload.single("image") , async(req, res) => {
 // balise input file => name = "image" .
  try{

      const result = await cloudinary.uploader.upload(req.file.path ,
         {public_id: 'amine2/exmemple_pub22'} );

      res.json(result) ;

  }catch(error){
    console.log(error);
  }


});


// delete file from cloudinary . 


// deleting file with : result.public_id .

router.get('/test_delete_file/:img_id' , async(req, res) => {
  // balise input file => name = "image" .
   try{
 
       const result = await cloudinary.uploader.destroy(req.params.img_id);
       res.json(result) ;
 
   }catch(error){
     console.log(error);
   }
 
 
 });


 // research api :
 // how to search to specific file in cloudinary .

 router.get('/api/get_all_files', function(req, res, next)  {

  cloudinary.search
  .expression('resource_type:image')
  .sort_by('public_id','desc')
  .max_results(30)
  .execute().then(result=>res.json(result));

 });
 


 // url to show the image of file ...

 // url = https://res.cloudinary.com/aminedridi/image/upload/v1638372165/cv_amine.png

 // cv_amine = public_id 
 // aminedridi = cloud_name



 // ADD AND DELETE folder .

 // create folder for each user . 

 router.post('/api/add_folder', function(req, res, next)  {

      var folder_name = req.body.folder_name ;
      cloudinary.api.create_folder(folder_name);  // amine/fold1/fold11...
      res.json("folder = " + folder_name + " added successfuly");
 });
 

 // delete folder for user . 

 
 router.post('/api/delete_folder', function(req, res, next)  {

  var folder_name = req.body.folder_name ;
  cloudinary.api.delete_folder(folder_name);

  res.json("folder = " + folder_name + " deleted successfuly");
});



// add and delete file in a folder x .


// add file x in folder x . 




router.post('/api/add_file_in_folder', upload.single("image") , async(req, res) => {
  // balise input file => name = "image" .

  var folder_name = req.body.folder_name ;
  var file_name = req.body.file_name ;


   try{
 
       const result = await cloudinary.uploader.upload(req.file.path ,
          {public_id: folder_name+"/"+file_name} );
 
       res.json(result) ;
 
   }catch(error){
     console.log(error);
   }
 
 
 });




// delete file x in folder x .

router.post('/api/delete_file_in_folder' , async(req, res) => {
  
  var file_in_folder = req.body.file_in_folder ;
 

  // enlever l'extension de fichier pour supprimer .

  var file_name_length = file_in_folder.length ;

  for( var i=0 ; i < file_name_length ; i++ ){

    if( file_in_folder[i] == "." ){
      console.log("==> filename contain '.' in  i = " + i);
        
      var position_dot = i+1 ;
        /*
      for(position_dot ; position_dot < file_name_length ; position_dot++){
          console.log("**> supprimer l'element " + position_dot + " ==> " + file_name[position_dot]);
          // supprimer le char ..

        //  file_name.substring( position_dot ,'');
      }
*/
      console.log("=> mél position " + position_dot + " enleve "
      + (file_name_length-position_dot) + " mots ") ;

    
      var file_name_no_extension =  file_in_folder.substring(0,position_dot-1) ;
      console.log("finale : file_name = " + file_name_no_extension);
      break ;

    }
    else{
      console.log("==> file_name not contain '.' ");
    }
  }

  console.log("-----------------------");
  console.log("finale : file name in folder = " + file_name_no_extension );

  var public_id = file_name_no_extension ;

   try{
 
       const result = await cloudinary.uploader.destroy(public_id);
       res.json("file is deleted ") ;
 
   }catch(error){
     console.log(error);
   }
 
 
 });



 // login + regsiter for clients "mongo db" .


  // test 

  router.post('/api/login' , function(req, res, next){
    
    var db =req.db;
    var c = db.get('clients'); // collection 'clients' .  
  
    email = req.body.email ; 
    password = req.body.password ; 


    c.find({"email":email,"password":password},{},function(e,docs){
      if(docs ==''){
        res.json("no");
      }  
      else{
          req.session.firstname = docs[0].firstname ;
  
          req.session.lastname = docs[0].lastname ;

          req.session.email = docs[0].email ;

          req.session.password = docs[0].password ;
  
          req.session.save() ;
  
          console.log("first name = " + req.session.firstname + " // last name = " + req.session.lastname) ;
  
          var result_login = "f_name = " + req.session.firstname +" / f_name = " + req.session.lastname ;
        
          res.json("yes");
      }
      
      });
    
   });
  


   // register . 

   router.post('/api/register' , function(req, res, next){

   var db = req.db ; 
   var c = db.get('clients') ;   

  var first_name = req.body.firstname ;
  var last_name = req.body.lastname;
  var email_user = req.body.email;
  var password_user = req.body.password ;
  var photo_user = req.body.photo ;

  var mon_user = { firstname: first_name ,
                  lastname : last_name ,
                  email : email_user ,
                  password : password_user ,
                  photo : photo_user 
          
  };

  
  c.insert(mon_user,function(err,result){

  console.log(mon_user);

  if (err){
    res.json("erreur d'ajouter user ");
  }
  else{
    res.json("User added Successfully ") ;
  }
   

  });

});



  
   // test session . 
   
router.get('/api/test_get_session', function(req, res) {

  var first_name = req.session.firstname ; 
  var last_name = req.session.lastname ; 
  var email = req.session.email ;
  var password  = req.session.password ; 

  req.session.save() ;

  var result = first_name+" / "+last_name+" / "+email+" / "+password ;

  res.json(first_name);
});


// logout session .

router.get('/api/logout', function(req, res, next) { 

  req.session.destroy();

  res.json('you are logged out') ;

});



// test upload photo method .



const storage = multer.diskStorage({
  destination:(req,file,callBack)=>{
    var dest = 'C:/Users/dridi family/Desktop/VS_CODE/project_google_tools_clone/frontend/frontendPart/src/assets/template/img/users' ;
    callBack(null,dest) ;
  },

  filename:(req,file,callBack)=>{
    var extension = file.originalname.substring(file.originalname.length-4,file.originalname.length) ;
    var file_name = req.params.first_name +"_"+ req.params.last_name+extension ;

    callBack(null, file_name ) ;
  }

}) // we define here : upload img : destination folder + img file name .

var upload2 = multer({ storage:storage })


// now , create the file upload route .

router.post('/api/upload_photo_user/:first_name/:last_name', upload2.single('image'), function(req, res) { 

  var first_name = req.params.first_name ;
  var last_name = req.params.last_name ;

    const file = req.file ;

   // file.filename = first_name + " " + last_name ;

    console.log(file.filename) ;

    // console.log("storage filename === " + storage.filename) ;

    if(!file){
      return res.json("erreur img upload !")
    }
    else{
      res.send("file is uploaded successfuly ");
    }

});



// list of folders of 'user x' .

// get the subfolders of any folder in the hierarchy .

router.post('/api/get_list_folders', function(req, res, next)  {

  var resultat = [] ;
  var folder_name = req.body.first_name ; // folder name = first name of user .
  
  cloudinary.api.sub_folders(folder_name).then(
    result=>{
      
      var totale_folders = result['total_count'] ;
     console.log("number of subfolder of "+folder_name+" = "+totale_folders ) ;
      
      for(var i=0 ; i<totale_folders;i++ ){
          console.log("folder number "+(i+1)+" = " + result['folders'][i].name ) ;
          resultat.push( result['folders'][i].name )  ;
      }
      
      res.json(resultat) ;
    }
    ) ;

   // sub folders of the user .

});



// function to find : all folders . 

function get_list_folders(first_name ){

 // console.log("**************************************");

  var folder_name = first_name ;
  var resultat = [] ;
  // first_name = folder_name .
  cloudinary.api.sub_folders(folder_name).then(

    result => {
      
       var totale_folders = result['total_count'] ;
       
       for(var i=0 ; i<totale_folders;i++ ){
        console.log("folder number "+(i+1)+" = " + result['folders'][i].name ) ;
        resultat.push( result['folders'][i].name )  ;

        // search /amine/amine_sub1 ==> folder_name/result['folder'].name

        cloudinary.api.sub_folders(folder_name+"/"+result['folders'][i].name).then(
          
          result =>{
            var totale_folders = result['total_count'] ;
            for(var i=0 ; i<totale_folders;i++ ){
              console.log("folder number "+(i+1)+" = " + result['folders'][i].name ) ;
              resultat.push( result['folders'][i].name )  ;
      
          }
          /* */
          var finale_result = [];

          console.log("--------- ***** --------------------");
          for(var j = 0 ; j < resultat.length ; j++){
            console.log(resultat[j]);
            finale_result.push(resultat[j]);
          }

          /* res.json(fianle_result) ; */
         
        }

        )};


    });

      
   // console.log("final result ===> " + resultat);
 
}


router.get('/api/test_all_folders', function(req, res, next)  {
  var finale_result = [];

 // console.log("**************************************");

 var resultat = [] ;
 var test_folder_name = "amine" ; 
 // first_name = folder_name .
 cloudinary.api.sub_folders(test_folder_name).then(

   result => {
     
      var totale_folders = result['total_count'] ;
      
      for(var i=0 ; i<totale_folders;i++ ){
       console.log("folder number "+(i+1)+" = " + result['folders'][i].name ) ;
       resultat.push( result['folders'][i].name )  ;

       // search /amine/amine_sub1 ==> folder_name/result['folder'].name

       cloudinary.api.sub_folders(test_folder_name+"/"+result['folders'][i].name).then(
         
         result =>{
           var totale_folders = result['total_count'] ;
           for(var i=0 ; i<totale_folders;i++ ){
             console.log("folder number "+(i+1)+" = " + result['folders'][i].name ) ;
             resultat.push( result['folders'][i].name )  ;
     
         }
         /* */
         

         console.log("--------- ***** --------------------");
         for(var j = 0 ; j < resultat.length ; j++){
           console.log("f_result => " + resultat[j]);
           finale_result.push(resultat[j]);
         }


         res.json(finale_result); 
          
       }

       )};
       console.log(" finale 0 ===> " + finale_result[0]);
      
               /* */ 
        
   });

   // finale . 

   /*
   console.log("--------- FINALE --------------------");
         for(var j = 0 ; j < resultat.length ; j++){
           console.log(resultat[j]);
           finale_result.push(resultat[j]);
         }

    res.json(finale_result) ; 

         */
});

// get the root folder . 

router.post('/api/get_root_folder', function(req, res, next)  {

  var folder_name = req.body.folder_name ;
  cloudinary.api.root_folders(folder_name).then(

    result =>{
        res.json(result);
    }

  )

});


// test list of files . 

router.post('/api/get_all_files_from_foldername', function(req, res, next)  {


  var folder_name = req.body.folder_name ;

  cloudinary.search
  .expression('resource_type:image')
  .sort_by('public_id','desc')
  .max_results(10)
  .execute().then(result=>{

    var list_of_files = [] ;

    console.log(" totale number of files ==> " + result['total_count'] ) ;
    var number_of_files = result['total_count'] ;
    for(var i = 0 ; i < number_of_files ; i++ ){
        if( result['resources'][i].folder == folder_name ){
              list_of_files.push( result['resources'][i].public_id+"."+result['resources'][i].format ) ;
        }
    }

    res.json(list_of_files);
  });

 });


 // redirection to file in new tab browser .

 const open = require('open');

 router.get('/api/new_tab_test',  async(req, res) =>  {
  
  await open('https://google.com', {
    app: {
      name: open.apps.chrome
    }
  });
  
  res.json("new tab");
 });



// test add file in folder 'test'



router.post('/api/test_add_file_in_folder/:user_name/:file_name', upload.single("image") , async(req, res) => {
  // balise input file => name = "image" .
  var folder_name = req.params.user_name ;
  var file_name = req.params.file_name ;
   try{
 
       const result = await cloudinary.uploader.upload(req.file.path ,
        {public_id: folder_name+"/"+file_name} 
        
          ); 
 
       res.json("file added successfuly") ;

   }catch(error){
     console.log(error);
   }
 });






module.exports = router;












