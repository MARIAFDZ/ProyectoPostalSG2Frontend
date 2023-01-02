import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export class Archivo {
  id!: number;
  fechaActualizacion!: String;
  idUsuario!: number;
  nombre!: String;
  nombreUsuario!: String;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent {
  archivos!: Archivo[];
  dataSource: MatTableDataSource<Archivo>;
  displayedColumns: string[] = ['id', 'fechaActualizacion', 'nombreUsuario', 'nombreArchivo'];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private router: Router,
    public http: HttpClient,
    private fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource(this.archivos);
  }
  url = 'http://localhost:8050/usuario/obtenerInfoArchivo';
  obtener() {
    this.http.get<Archivo[]>(this.url)
      .subscribe(data => {
        this.dataSource.data = data;
      })
  }
  back(): void {
    this.router.navigate(['/upload']);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
