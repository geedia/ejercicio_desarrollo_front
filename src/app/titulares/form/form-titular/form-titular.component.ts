import { Component, OnInit } from '@angular/core';
import { Titular } from '../../titular';
import { TitularService } from '../../titular.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-titular',
  templateUrl: './form-titular.component.html'
})
export class FormTitularComponent implements OnInit {
  public existe: '';
  public juridica: any;
  public titular: Titular;
  public titularExiste: Titular;
  public tituloCrear: any = 'CREAR TITULAR';
  public tituloEditar: any = 'EDITAR TITULAR';
  constructor(private titularService: TitularService, private router: Router,
    private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.cargarTitular();
  }

  create(): void {
    this.titularService.getTitular(this.titular.cuit).subscribe( (titular) => {
      this.titularExiste = titular;
      console.log('titularExiste' + this.titularExiste);
      if (this.titularExiste) {
        swal('Titular Existe', `titular ${this.titularExiste.cuit} ya existe!`, 'error');
      } else {
        this.titularService.create(this.titular).subscribe(
          response => {this.router.navigate(['/titulares']);
          if (this.titular.tipo_titular === 'J') {
            swal('Nuevo Titular', `Titular ${this.titular.razon_social} creado con éxito!`, 'success');
          } else {
             swal('Nuevo Titular', `Titular ${this.titular.nombre} ${this.titular.apellido}  creado con éxito!`, 'success');
          }
        }
        );
      }
    });
    console.log('guardado');
  }



  cargarTitular(): void {
    this.activateRoute.params.subscribe(params => {
      const id = params['cuit'];
      if (id) {
        this.titularService.getTitular(id).subscribe( (titular) => {
          this.titular = titular;
        if (this.titular.tipo_titular === 'J' ) {
            this.juridica = 'J';
        }
        });
        this.existe = id;
      } else {
        this.titular = new Titular();
        this.titular.tipo_titular = 'F';
      }
    });
  }

  update(): void {
    if (this.titular.tipo_titular === 'J') {
      this.titular.nombre = '';
      this.titular.apellido = '';
      this.titular.dni = null;
    } else {
      this.titular.razon_social = '';
      this.titular.anio = null;
    }
    this.titularService.updateTitular(this.titular).subscribe(
      response => {this.router.navigate(['/titulares']);
      if (this.titular.tipo_titular === 'J') {
        swal('Titular Editado', `Titular ${this.titular.razon_social} actualizado con éxito!`, 'success');
      } else {
         swal('Titular Editado', `Titular ${this.titular.nombre} ${this.titular.apellido}  actualizado con éxito!`, 'success');
      }
    }
    );
    console.log('Editado');
  }

  dataChanged(newObj){

    if (newObj === 'J') {
      this.juridica = 'J';
    } else {
      this.juridica = '';
    }
    console.log(this.juridica);
  }

}
