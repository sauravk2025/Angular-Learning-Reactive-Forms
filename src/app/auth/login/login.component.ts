import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';

function  mustcontainQuestionMark(control:AbstractControl)
{
  if(control.value.includes('?'))
  {
    return null
  }
  return {doesNotContainQuestionMark:true}
}

function emailIsUnique(control:AbstractControl)
{
  if(control.value !="test@example.com")
  {
    return of(null)
  }
  return of({notUnique:true})
}

let intialEmail = ''

const savedForm = localStorage.getItem('LoginInfo');
if(savedForm)
{
  const loadedForm = JSON.parse(savedForm);
  intialEmail = loadedForm.emailKey
}


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[ReactiveFormsModule]
})


export class LoginComponent implements OnInit{

  private destroy = inject(DestroyRef)


  formVariable = new FormGroup({
    emailControl:new FormControl(intialEmail,{
      validators:[Validators.email, Validators.required]
    }),
    passwordControl:new FormControl('',{
      validators:[Validators.required,Validators.minLength(6),mustcontainQuestionMark],
      asyncValidators:[emailIsUnique],
    })
  })


  onSubmit()
  {
    const enteredEmail = this.formVariable.value.emailControl
    const enteredPassword = this.formVariable
  }

  get emailIsInvalid()
  {
    return (
      this.formVariable.controls.emailControl.touched &&
      this.formVariable.controls.emailControl.dirty &&
      this.formVariable.controls.emailControl.invalid
    )
  }

  get passwordIsInvalid()
  {
    return (
      this.formVariable.controls.passwordControl.touched &&
      this.formVariable.controls.passwordControl.dirty &&
      this.formVariable.controls.passwordControl.invalid
    )
  }

  ngOnInit()
  {
    // const savedForm = localStorage.getItem('LoginInfo');

    // if(savedForm)
    // {
    //   const loadedForm = JSON.parse(savedForm)
    //  // this.formVariable.setValue({emailControl:loadedForm.emailKey, passwordControl:''}) or
    //  // this.formVariable.controls.emailControl.setValue(loadedForm.emailKey) or
    //   this.formVariable.patchValue({
    //     emailControl:loadedForm.emailKey
    //   })
      
    // } or use outside class

    console.log('inside init')
    const subscribe = this.formVariable.valueChanges.pipe(debounceTime(500)).subscribe({
      next:(value)=>{console.log('value:',value); //value: {email: 'developer@drawout.dk', password: ''}
          localStorage.setItem('LoginInfo',
            JSON.stringify({emailKey:value.emailControl,
              passwordKey:value.passwordControl}))
            }
    })

    this.destroy.onDestroy(()=>{
      subscribe.unsubscribe()
    })

  }



}
