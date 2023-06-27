import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private service:ApiService,private route:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,Validators.required)
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      var loginDetails = new Login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );

      this.service.login(loginDetails).subscribe(data=>{
        var res = data.toString();
        if(res=="User Do not exists"){
          alert("User doesnot exist, please register to login");
        }
        else{
          localStorage.setItem("token",res.substring(0,res.length-1));
          localStorage.setItem("userId",res.charAt(res.length-1));
          this.route.navigate(["/","home"]);
        }
      });

    }
    else{
      alert("Enter Valid Details");
    }

  }

}
