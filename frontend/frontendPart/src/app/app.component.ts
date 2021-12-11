import { Component } from '@angular/core';

import { Service } from './service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendPart';

  constructor(private service : Service) { }
  visible  ;
  ngOnInit(): void {

    // test api
    /*
    this.service.test().subscribe( (data)=>{
      alert(data);
    });
     */

    /*
    this.serv.setx(false);

    alert( "val x in app = " +  this.serv.getx() ) ;
    
    if( this.serv.getx() == false  ){
      alert("pas d'image") ;
      this.visible = "none" ;
    }
    else{
      alert("oui image") ;
      this.visible = "block" ;
    }
    
    // get the active session . 

    */

  }

  username= "person" ;  // nom de photo .




}
