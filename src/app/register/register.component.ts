import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, NgModel,  ValidationErrors, ValidatorFn,  AbstractControl, FormControl, FormGroup,} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  opcionSeleccionado!: String;
  opcionTipo!: String;
  nombre!: String;
  apellido!: String;
  numeroDocumento!: String;
  email!: String;
  password!: String;
  registerSucess=false;
  registerFailed?: boolean;

  constructor(
    private router: Router,
    public http: HttpClient
  ) {}

  RegisterForm = new FormGroup({
    nombre: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]),
    apellido: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]),
    numeroDocumento: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    rol:new FormControl( '', [Validators.required]),
    email:new FormControl( '', [Validators.required, Validators.email]),
    password:new FormControl( '', [Validators.required, Validators.pattern('(?=.*[A-Z]).{8,}')]),
    opcionTipo:new FormControl( '', [Validators.required]),
  });

  logout(): void {
    this.router.navigate(['/login']);
  }

  registrar() {
    if (this.RegisterForm.valid) {
      let rol = this.opcionSeleccionado;
      let documentoTipo = this.opcionTipo;
      let nombre = this.nombre;
      let apellido = this.apellido;
      let cedula = this.numeroDocumento;
      let correo = this.email;
      let contrasenia = this.password;


      const body = {
        idRol: rol,
        idTipo: documentoTipo,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasenia: contrasenia,
        cedula: cedula,
      };

      this.http
        .post<any>('http://localhost:8050/usuario/registroUsuario', body)
        .subscribe((data:any) => {
          console.log("Se envió la petición")
          this.registerSucess=true;
          this.registerFailed=false;
        },err =>{
          this.registerFailed=true;
        });
        setTimeout(() => {
          this.registerSucess = false;
        }, 3000);
        this.clear_form();
    }
  }

  clear_form(){
    this.RegisterForm.reset();
  }

}
