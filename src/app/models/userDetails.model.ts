export class UserDetails{
  public DisplayName: string;
  public Email:string;
  public Password:string;
  public FirstName:string;
  public LastName:string;
  public Address:string;
  public Mobile:string;
  public Gender:string;


  constructor(displayName:string,email:string,password:string,fname:string,lname:string,address:string,mobile:string,gender:string){
    this.DisplayName=displayName;
    this.Email=email;
    this.Password=password;
    this.FirstName=fname;
    this.LastName=lname;
    this.Address=address;
    this.Mobile=mobile;
    this.Gender=gender;
  }
}
