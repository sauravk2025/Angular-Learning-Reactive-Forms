import { Component, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



function equalValues(control:AbstractControl)
{
  const pass1 = control.get('passwordVariable')?.value;
  const pass2 = control.get('confirmPasswordVariable')?.value;

  if(pass1 == pass2)
  {
    return null
  }
  return{
    passwordNotEqual:true
  }
}



@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [FormsModule, ReactiveFormsModule]
})
export class SignupComponent {


formVariable = new FormGroup({

  emailVariable : new FormControl('',{
    validators:[Validators.email,Validators.required]
  }),

  passwordGroup:new FormGroup({

    passwordVariable: new FormControl('',{
      validators:[Validators.minLength(6),Validators.nullValidator,Validators.required]
    }),
    confirmPasswordVariable : new FormControl('',{
      validators:[Validators.minLength(6),Validators.required]
    }),
    
  },{
    validators:[equalValues]
  }),

  nameVariable:new FormGroup({
    firstNameVariable: new FormControl('',{
      validators:[Validators.required]
    }),
    lastNameVariable: new FormControl('',{
      validators:[Validators.required]
    })
  }),


  addressVariable : new FormGroup({
    
    streetVariable: new FormControl('',{
      validators:[Validators.required]
    }),
    numberVariable: new FormControl('',{
      validators:[Validators.required]
    }),
    postalCodeVariable: new FormControl('',{
      validators:[Validators.required]
    }),
    cityVariable: new FormControl('',{
      validators:[Validators.required]
    }),

  }),

  roleVariable: new FormControl<'student'|'teacher'|'employee'|'founder'|'other'>('student',{
    validators:[Validators.required]
  }),
  agreeVariable: new FormControl(false,{
    validators:[Validators.required]
  }),

  sourceVariable : new FormArray([
    new FormControl(false),
    new FormControl(false),
    new FormControl(false)
    
  ])
})

get emailInValid()
{
  return (
    this.formVariable.controls.emailVariable.dirty && 
    this.formVariable.controls.emailVariable.touched&&
    this.formVariable.controls.emailVariable.invalid
  )
}


get passwordInValid()
{
  
  return (
    this.formVariable.controls.passwordGroup.controls.passwordVariable.dirty &&
    this.formVariable.controls.passwordGroup.controls.passwordVariable.touched &&
    this.formVariable.controls.passwordGroup.controls.passwordVariable.invalid
  )
}

get checkSamePass()
{
  return ( (this.formVariable.controls.passwordGroup.controls.passwordVariable.value !=  this.formVariable.controls.passwordGroup.controls.confirmPasswordVariable.value) && this.formVariable.controls.passwordGroup.controls.passwordVariable.touched && this.formVariable.controls.passwordGroup.controls.passwordVariable.dirty && this.formVariable.controls.passwordGroup.controls.confirmPasswordVariable.value && this.formVariable.controls.passwordGroup.controls.confirmPasswordVariable.value ) 
}

onSubmit()
{
  if(this.formVariable.invalid)
  {
    console.log('Invalid form')
    return;
  }
  const enteredEmail = this.formVariable.controls.emailVariable.value
  const passwordEmail = this.formVariable.controls.passwordGroup.controls.passwordVariable.value
 
}

onReset()
{
  this.formVariable.reset()
  
}


}
