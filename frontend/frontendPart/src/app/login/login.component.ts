import { Component, OnInit } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  link="login";
  
  constructor(private service : Service) { }

  ngOnInit(): void {
   
  }

  btn_login(f){
    this.link="login" ;
    
    //this.link="storage" ;
    // activer la session de user x .

    var email = f.value['email'] ;
    var password = f.value['password'] ;

    // alert("email = " + email + " / password = " + password) ;

    // api login

    this.service.login(email,password).subscribe( (data)=>{
        //alert(data);
        if( data == "no" ){
          alert("login not correct") ;
          this.link="register" ;
        }
        else{
          alert("welcome") ;
          this.link="storage" ;
        }
    });

  }

}
