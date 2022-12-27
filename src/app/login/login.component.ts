import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  email! : String;

  jwtFailed?: boolean;

  jwt?:string;
  
  //constructor(protected http: HttpClient) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    public http: HttpClient,
    private fb: FormBuilder
  ) {}

  login():void{
    console.log("entró")
    let username = this.loginForm.get(['username'])!.value;
    console.log("username:" + username);
    console.log("typeof username:" + typeof username);
    let password = this.loginForm.get(['password'])!.value;
    console.log("password:" + password);
    console.log("typeof password:" + typeof password);
    const headers = { 'Content-Type': 'application/json' ,
    'Access-Control-Allow-Origin': 'http://localhost:4200'};
    const body = { username: username,
                   password : password };
    this.http.post<any>('http://localhost:8050/usuario/authenticate', body, { headers }).subscribe(data => {
        this.jwt = data; console.log("es este: " + this.jwt)
        if(this.jwt == null){
          console.log("No se logró la autenticación");
          this.jwtFailed = true;
          
        }else{
          console.log("Se logró la autenticación" );
          sessionStorage.setItem('email', username );
          this.jwtFailed = false;
          const params = username;
          this.router.navigate(['/register']);
          this.http.get<any>('http://localhost:8050/usuario/obtenerRolUser?correo=' + username, { headers }).subscribe(idRol => {
            console.log(idRol);
            if(idRol == 2){
              this.router.navigate(['/upload']);
            }else{
              this.router.navigate(['/register']);
            }
          })
          


        }
    });

  }

}


