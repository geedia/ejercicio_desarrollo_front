import { Component, OnInit } from '@angular/core';
import { Titular } from './titular';
import { TitularService } from './titular.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-titulares',
  templateUrl: './titular.component.html'
})
export class TitularComponent implements OnInit {
  titulares: Titular[];
  constructor(private titularService: TitularService) { }

  ngOnInit() {
    this.titularService.getTitulares().subscribe(
      titulares => this.titulares = titulares
    );
  }

  delete(titular: Titular): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    } );
    swalWithBootstrapButtons({
      title: 'Esta Seguro?',
      text: `¿Seguro que desea eliminar al Titular ${titular.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.titularService.deleteTitular(titular.cuit).subscribe(
          response => {
            this.titulares = this.titulares.filter(cli => cli !== titular );
          swalWithBootstrapButtons(
            'Eliminado!',
            'El Titular ha sido eliminado con éxito.',
            'success'
          );
          }
        );
    }
  });
     console.log('eliminado');
  }
}
