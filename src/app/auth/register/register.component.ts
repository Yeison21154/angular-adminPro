import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {
  public formEnviado = false;
  public formUser = this.fb.group({
      nombre:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]],
      passwordC:['',[Validators.required,Validators.minLength(4)]],
      term:[null,Validators.required]
  }, {validators: this.passwordIguales('password1','password2')});
  constructor(public fb:FormBuilder,private _Us:UsuariosService, private _Router:Router) { }
   crearUsuario = () =>{
    this.formEnviado=true;
    console.log(this.formUser.value);
    if(this.formUser.invalid){
      return;
    }
    this._Us.crearUsuario(this.formUser.value).subscribe(resp=>{
      this._Router.navigateByUrl('/');
    }, (err)=>{      
      Swal.fire('Error', err.error.msg, "error");
    });
  }
  campoNoValido(campo:string):boolean{
    if(this.formUser.get(campo)?.invalid && this.formEnviado){
      return true;
    }else{
      return false;
    }
  }
  aceptaTerminos(){
    return !this.formUser.get('term')?.value && this.formEnviado;
  }
  contrasenaNoValido(){
    const pass1 = this.formUser.get('password')?.value;
    const passC = this.formUser.get('passwordC')?.value;
    if((pass1 != passC)){
      return true;
    }else{
      return false;
    }
  }
  passwordIguales(pass:string, passC:string){
    return (formGroup:FormGroup)=>{
      const pass1 = formGroup.get(pass);
      const pass2 = formGroup.get(passC);
      if(pass1 !== pass2){
        pass2?.setErrors(null);
      }else{
        pass2?.setErrors({noEsigual:true})
      }
    }
  }
  ngOnInit(): void {
  }

}
