import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',  // le service partagable dans tt l'app .
  })


  export class Service {


    constructor(private http: HttpClient) { }

     // test route 


     test(){
      const url_test_route = "/api/test_route" ;
  
        return this.http.get<any>(url_test_route) ; // observable object
     }


      login(email,password) : Observable<any>  {

        // let postData_user = {email : email ,password :password};
         
        const url_login = "/api/login" ;
         return  this.http.post(url_login,{
          email:email,
          password:password
         });
        }


        // get session active : first name .
 

     get_session_first_name(){
      const url_get_session_first_name = "/api/test_get_session" ;
  
        return this.http.get<any>(url_get_session_first_name) ; // observable object
     }



     // register = add user .


     
     register_user(firstname , lastname , email,password , photo) : Observable<any>  {

      // let postData_user = {email : email ,password :password};
       
      const url_login = "/api/register" ;
       return  this.http.post(url_login,{
         firstname:firstname,
         lastname:lastname,
        email:email,
        password:password,
        photo:photo
       });
      }


      // upload photo of user .

      img_upload(img_photo_file , first_name , last_name){
        const url_upload = "/api/upload_photo_user/"+first_name+"/"+last_name ;
        return this.http.post(url_upload , img_photo_file) ;

      }


      // add folder in cloudinary .




     add_folder_username(first_name){
       // firstname of user is the folder name .
      const url_add_folder = "/api/add_folder/"+first_name ;
  
        return this.http.get<any>(url_add_folder) ; // observable object
     }


     // list of folders of username by : firstname. 

     get_subfolders_user(firstname) : Observable<any>  {

      const url_login = "/api/get_list_folders" ;
       return  this.http.post(url_login,{
         first_name:firstname
       });
      }

      
      // add folder api .

      
     add_folder_user(folder_name) : Observable<any>  {

      const url_add_folder = "/api/add_folder" ;
       return  this.http.post(url_add_folder,{
         folder_name:folder_name
       });
      }


      // get files from 'folder_name' x .

      get_files_from_foldername(folder_name) : Observable<any>  {

        const url_get_files = "/api/get_all_files_from_foldername" ;
         return  this.http.post(url_get_files,{
           folder_name:folder_name
         });
        }

        // add file in folder x .

        add_file_in_folder(folder_name , file_name , image) : Observable<any>  {

          const url_add_file_in_folder = "/api/add_file_in_folder" ;
           return  this.http.post(url_add_file_in_folder,{
             folder_name:folder_name,
             file_name:file_name,
           } , image);
          }
  

          // test add file in folder 

          test_add_file_in_folder(file,folder_name,file_name) : Observable<any>  {
           
            const url_add_file_in_folder = "/api/test_add_file_in_folder/"+folder_name+"/"+file_name ;
             return  this.http.post(url_add_file_in_folder,file ) ;
            
            } 


            // delete file in folde .

            delete_file_from_folder( file_in_folder ) : Observable<any>  {

              const url_get_files = "/api/delete_file_in_folder" ;
               return  this.http.post(url_get_files,{
                file_in_folder:file_in_folder
     
               });
              }

        }


  

