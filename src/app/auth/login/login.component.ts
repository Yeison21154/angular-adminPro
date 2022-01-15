import { Component, NgZone, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  declare auth2:any;
  constructor(private _Router:Router, private fb:FormBuilder, private _Us:UsuariosService,private ngZone:NgZone) { }
  ngOnInit(): void {
    this.renderButton();
  }
  loginForm = this.fb.group({
    email:[localStorage.getItem('email') || '',[Validators.email,Validators.required]],
    password:['',Validators.required],
    recordar:[false]
  })
  login(){
    console.log(this.loginForm.value);
    this._Us.Login(this.loginForm.value).subscribe(res=>{
      if(this.loginForm.get('recordar')?.value){
          localStorage.setItem('email',this.loginForm.get('email')?.value);
      }else{
        localStorage.removeItem('email');
      }
      this._Router.navigateByUrl('/');
    },(err)=>{
      Swal.fire('Error',err.error.msg,'error')
    });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp(); 
  }
  async startApp() {
    this._Us.initGoogle();
    this.auth2 = this._Us.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };
  attachSignin(element:any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) =>{
         const id_token = googleUser.getAuthResponse().id_token;
         this._Us.LoginGoogle(id_token).subscribe(res=>{
           this.ngZone.run(()=>{
             this._Router.navigateByUrl('/');
           })
         });
        }, (error:any)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
