import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserDetails } from 'src/app/models/userDetails.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  user:any;
  profileForm!:FormGroup

  constructor(private apiService:ApiService) {
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.apiService.getUserDetails(userId).subscribe((data)=>{
      this.user = data;
      console.log(this.user);
    })

  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName:new FormControl(""),
      lastName: new FormControl(""),
      address:new FormControl(""),
      gender:new FormControl(""),
      mobile:new FormControl(""),
      displayName:new FormControl(""),
    })
  }

  updateDetails(){
    if(this.profileForm.valid){
      var displayName = (this.profileForm.value.displayName=="")?this.user.displayName:this.profileForm.value.displayName;
      var firstName = (this.profileForm.value.firstName=="")?this.user.firstName:this.profileForm.value.firstName;
      var lastName = (this.profileForm.value.lastName=="")?this.user.lastName:this.profileForm.value.lastName;
      var address = (this.profileForm.value.address=="")?this.user.address:this.profileForm.value.address;
      var gender = (this.profileForm.value.gender=="")?this.user.gender:this.profileForm.value.gender;
      var mobile = (this.profileForm.value.mobile=="")?this.user.mobile:this.profileForm.value.mobile;

      var newUser = new UserDetails(displayName,this.user.email,"",firstName,lastName,address,mobile,gender);
      console.log(newUser);

      var currentUser = localStorage.getItem("userId");
      var userId = (currentUser==null)?0:parseInt(currentUser);

      this.apiService.updateUserDetails(newUser,userId).subscribe(data=>{
        if(data){
          location.reload();
        }
      });

    }
  }

}
