import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  opcionSeleccionado! : String;
  opcionTipo! : String;
  nombre! : String;
  apellido! : String;
  numeroDocumento! : String
  email! : String
  password! : String

  constructor(
    private router: Router,
    public http: HttpClient,
    private fb: FormBuilder
  ) {}

  RegisterForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    numeroDocumento: ['', Validators.required],
    Rol: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  registrar(){
    let rol = this.opcionSeleccionado;
    let documentoTipo = this.opcionTipo;
    let nombre = this.nombre;
    let apellido = this.apellido;
    let cedula = this.numeroDocumento;
    let correo = this.email;
    let contrasenia = this.password;
    
    
    const body = { 
                    idRol : rol,
                    idTipo : documentoTipo,
                    nombre : nombre,
                    apellido : apellido,
                    correo : correo,
                    contrasenia : contrasenia,
                    cedula : cedula }
                    
    
    this.http.post<any>('http://localhost:8050/usuario/registroUsuario', body) 
    .subscribe((data:any) => {
    console.log("Se envió la petición")
  })
}

  


}


