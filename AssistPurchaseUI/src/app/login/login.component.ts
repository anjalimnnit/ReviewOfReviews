import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'
@Component({
  selector: 'login-comp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string=""
  password:string=""
  errorMessage=""
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  onUserNameEdit(value){
    this.userName=value;
    
  }
    
  onPasswordEdit(value){
    this.password=value;

  }
  onLogin(){
    
    if(this.userName=="admin" && this.password=="admin@123"){
      this.errorMessage="Login Successfull";
      this.router.navigate(['/config'])
    }
    else{
      this.errorMessage="Invalid Credentials";
    }

  }
  onReset(){
    
    this.userName="";
    this.password="";
    this.errorMessage="";
  }
}
