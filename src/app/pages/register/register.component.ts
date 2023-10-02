import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

export function matchPasswordValidator(passwordkey:string, confirmPasswordKey:string): ValidatorFn{
  return (control : AbstractControl) : {[key : string] :any } | null =>{
    const password = control.get(passwordkey)?.value;
    const confirmpassword = control.get(confirmPasswordKey)?.value;
    return password === confirmpassword ? null : {passwordMismatch : true};
  }
  
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor(private router:Router, private fb:FormBuilder, private accountService:AccountService) { }

  registerForm = this.fb.group({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$')]),
    confirmpassword : new FormControl('')
  },{
    Validator : matchPasswordValidator('password','confirmPassword')
  })

  ngOnInit() {}

  backToLogin(){
    this.router.navigate(["/"])
  }

  submitForm(){
    console.log("Submit");
    this.accountService.register(this.registerForm.value);
  }

}
