import { Component, OnInit } from '@angular/core';

import{Service} from '../service' ;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  img_name ; 

  formData = new FormData();

  constructor(private service : Service) { }

  ngOnInit(): void {
  }

  selectImage(files: FileList){

    this.formData.delete('image');
    this.formData.append('image', files[0]);

    this.img_name = files[0].name ; 

    // alert("img name = " + this.img_name);

    // alert("form data = " + this.formData);
    

  }

  btn_register(f){

    var first_name = f.value['firstname'];
    var last_name = f.value['lastname'];
    var email = f.value['email'];
    var password = f.value['password'];

    var photo = f.value['image'] ;

    alert(" f_name = " + first_name + " / l_name = " + last_name + " / email = " + email + " / password = " + password) ;

    alert(" photo user = " + photo);

    //  add user + add photo .

    // 1 - add user (registration) .

    
    this.service.register_user(first_name,last_name,email,password,first_name+"_"+last_name).subscribe( (data)=>{
        alert(data) ;
    });

    
    // 2 - upload photo of user .

    this.service.img_upload(this.formData,first_name,last_name).subscribe( (data)=>{
        alert(data);
    });

    // 3 - add folder to cloudinary with : folder_name = first_name .

    this.service.add_folder_username(first_name).subscribe( (data)=>{
        alert(data);
    });
    

  }

}
