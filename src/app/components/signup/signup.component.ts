import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetails } from 'src/app/models/userDetails.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!,$]).{8,32}$')]),
      confirmPassword:new FormControl(null,Validators.required)
    });
  }

  onSignUp(){
    if(this.signUpForm.valid){
        if(this.signUpForm.value.password == this.signUpForm.value.confirmPassword){
          var user = new UserDetails("",this.signUpForm.value.email,this.signUpForm.value.password,"","","","","");
          this.apiService.createUser(user).subscribe((data)=>{
            if(data){
              alert("User Registered Successfully ");
            }
            else{
              alert("User Already Exist ");
            }
          });
        }
        else{
          alert("Passwords do not match");
        }
    }
    this.signUpForm.reset();
  }


}
