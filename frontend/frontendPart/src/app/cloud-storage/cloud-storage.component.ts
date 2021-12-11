import { Component, OnInit } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-cloud-storage',
  templateUrl: './cloud-storage.component.html',
  styleUrls: ['./cloud-storage.component.css']
})
export class CloudStorageComponent implements OnInit {

  formData = new FormData();
  img_name ; 
  
  constructor(private service : Service) { }

  username  ;
  subfold1 = "" ;  // after the root=f_name ==> f_name/sub1
  folds:String[] = [] ;
  subfolds:String[] = [] ;
  folds_and_subfolds:String[] = [] ;
  files:String[] = [] ;
  ngOnInit(): void {


  this.service.get_session_first_name().subscribe( (f_name)=>{
      this.username = f_name ;

      this.service.get_subfolders_user(this.username).subscribe( (folds)=>{
        alert("folds => " +folds) ;
        
        folds.forEach(fold => {
          this.folds.push(fold) ;
              // alert("test => " + fold);
            this.service.get_subfolders_user(this.username+"/"+fold).subscribe( (sub_fold)=>{
                alert("sub_folders => " + sub_fold);
                this.subfolds.push(sub_fold) ;
                this.folds_and_subfolds.push(fold+"/"+sub_fold);
            });

        });
    });

  });   

  // list of folders or "sub_folders" of username = firt_name . 

  


  }

  totale_folders ;
 // subfolder_of_folders ;

  click_root_folder(){

    this.files = [] ;

    alert("root folder clicked => folder_name = " + this.username) ;
      // get list of subfolders of 'root_folder' of username .
    var first_name = this.username ;

    // afficher 'files' of root folder = 'username' .

    alert("==> afficher les fichiers sous /"+this.username) ;

    this.service.get_files_from_foldername(first_name).subscribe( (files)=>{
        files.forEach(file => {
          alert("file =  " + file);
          this.files.push(file);
        });
    });

    var counter_totale_folders = 0 ;
    this.service.get_subfolders_user(first_name).subscribe( (folders)=>{
      this.subfolder_of_folders = folders ; 
      folders.forEach(element => {
        alert("fold = " + element); //
          counter_totale_folders++ ;
         // alert(counter_totale_folders);
          this.totale_folders = counter_totale_folders ;
        });
       // alert("number of folder sous : " + first_name + " = " + this.totale_folders);
        
      });
    
  }
  
  subfolder_of_folders = this.click_root_folder() ;


  
  subfolder_click(fold){
    this.files = [] ;
    var first_name_root = this.username ;
    var folder_name = first_name_root+"/"+fold ;
    alert(folder_name);

    // afficher 'files' of folder_name = username/fold .

    alert("==> afficher les fichiers sous : "+folder_name);

this.service.get_files_from_foldername(folder_name).subscribe( (files)=>{
        files.forEach(file => {
          alert("file =  " + file);
          this.files.push(file);
        });
    });


    this.subfold1 = folder_name ;
    // get subfolders in 'folder_name' .

    this.service.get_subfolders_user(folder_name).subscribe( (folders)=>{
      this.sub_of_subfolders = folders ;  
       alert("sub_folder = " + folders) ; //

    });

  }
  
  sub_of_subfolders = this.subfolder_click(this.subfold1);



  
  add_folder(){
        var number_folds = this.folds.length ;

        for(var i= 0 ; i < number_folds ;i++){
          alert("fold " + i + " = " +  this.folds[i] );
        }
        
        var number_subfolds = this.subfolds.length ;
        for(var i= 0 ; i < number_subfolds ;i++){
          alert("sub fold " + i + " = " +  this.subfolds[i] );
        }
  }
  
  test(f){
    alert("test add client");
  }

  clicked_folder ;

  root_fold_click(username){
    alert("fold clicked = " + username) ;
    this.clicked_folder = username ;
  }

 

  add_folder_in_pop_up(f){

    var folder_name = f.value['name'];

    alert(" the clicked folder is = " + this.clicked_folder + " // folder name = " + folder_name+" is added !");

    for(var i=0 ; i < this.folds_and_subfolds.length ; i++){
      alert( this.folds_and_subfolds[i] );
    }
    // add folder .

    if( this.clicked_folder == this.username ){
        
      this.service.add_folder_user(this.username+"/"+folder_name).subscribe( (data)=>{
          alert(data);
        });
        
       alert("==> add folder : " + this.username+"/"+folder_name);
    }
    else{
        
      this.service.add_folder_user(this.username+"/"+this.clicked_folder+"/"+folder_name).subscribe( (data)=>{
          alert(data);
      });
      
        alert("==> add folder : " + this.username+"/"+this.clicked_folder+"/"+folder_name);
    }

  }


  // file click function . 

  file_click(file){
    var url_file = "https://res.cloudinary.com/aminedridi/image/upload/v1638708371/";
    alert("file clicked = " + file);
    var full_url = url_file+file ;
    window.open(full_url, "_blank");
  }


   
  // add file in pop up .

  
  add_file_in_pop_up(f){

    var file_name = this.img_name ;
    var file_name1_test = "example.png";

    alert("the file is in ==> the clicked folder is = " + this.clicked_folder ) ;

    var folder_name = this.clicked_folder ;

    for(var i=0 ; i < this.folds_and_subfolds.length ; i++){
      alert( this.folds_and_subfolds[i] );
    }
    // add folder .

    if( this.clicked_folder == this.username ){

      alert("root ==> add file in : " + this.username+"/"+file_name);
      
      alert("=> folder name = " + folder_name+" / file name = " + file_name);
      
      var file_name_length = file_name.length ;

  for( var i=0 ; i < file_name_length ; i++ ){

    if( file_name[i] == "." ){
      var position_dot = i+1 ;
      var file_name_no_extension =  file_name.substring(0,position_dot-1) ;
      alert("file added in : folder = "+this.username+" / finale file_name = "
      + file_name_no_extension);
      // add file in : folder + file .

      
       this.service.test_add_file_in_folder(this.formData,this.username,file_name_no_extension).subscribe( (data)=>{
          alert("data = " + data);
       });

        
    }
    else{

    }
  }


      }

    else{
        /*
      this.service.add_folder_user(this.username+"/"+this.clicked_folder+"/"+folder_name).subscribe( (data)=>{
          alert(data);
      });
    */  
        alert("==> add file in : " + this.username+"/"+folder_name+"/"+file_name);
    
      }

  }


// select image input field in adding file .

selectImage(files: FileList){

  this.formData.delete('image');
  this.formData.append('image', files[0]);

  this.img_name = files[0].name ; 
  alert("file name = " + this.img_name);

  
}

// delete file 

delete_file(file_name){
  alert(file_name);
  this.service.delete_file_from_folder(file_name).subscribe( (data)=>{
    alert(data);
  });
}


}
