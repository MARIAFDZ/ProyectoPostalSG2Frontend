import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {LoginComponent} from '../login/login.component'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})



export class UploadComponent {
  title = 'carga';
  selectedFileName = '';

  file! : any;

  @ViewChild(LoginComponent) child: any;

  dato!: string;

  constructor(
    private router: Router,
    public http: HttpClient,
    private fb: FormBuilder
  ) {}

  onFileSelected(event:any) {
    this.file = event.target.files[0];
    this.selectedFileName = this.file.name;
    
  }

  uploadFile() {
    //this.dato = this.child.email;

    const mail = sessionStorage.getItem('email');
    console.log(mail);
    const payload = new FormData();
    payload.append('file', this.file, this.selectedFileName);
    this.http.post<any>('http://localhost:8050/usuario/cargarArchivo/?correo=' + mail , payload, {

  }).subscribe((data:any) => {
    console.log("Se envió la petición")
  })
    
  
  }

  

}
