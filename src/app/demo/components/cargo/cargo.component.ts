import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { Cargo } from 'src/app/demo/model/Empresa';
import {
  verMensajeInformativo,
  esVacio,
  aMayusculas
} from 'src/app/demo/components/utilities/funciones_utilitarias';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    CheckboxModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
    RippleModule,
    TableModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule,
    BreadcrumbModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})

export class CargoComponent implements OnInit {

  cargo: Cargo = this.initializeCargo();
  currentCodigo: string = '';

  // Lista de cargos para la tabla
  cargos: Cargo[] = [];
  rowsPerPage: number = 10;

  // Modos de edición
  isAddMode: boolean = false;
  isEditMode: boolean = false;

  editingCargo: Cargo | null = null;

  editingRowIndex: number | null = null;


  currentCargos: Cargo[] = [
    {
      pla51codigo: '000',
      pla51descripcion: 'Por defecto',
      pla51flagactivo: false
    },
    {
      pla51codigo: '001',
      pla51descripcion: 'Por defecto',
      pla51flagactivo: false
    },
  ];

  selectedCargo: Cargo | null = null;

  items: any[] = [];

  constructor(
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private bS: BreadcrumbService) { }

  ngOnInit(): void {
    // Carga inicial de datos simulados
    this.cargos = JSON.parse(JSON.stringify(this.currentCargos));

    this.bS.setBreadcrumbs([
      { icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Sistema' },
      { label: 'Maestros'}, 
      { label: 'Cargo', routerLink: '/home/maestros/cargo' },
    ]);

    this.bS.currentBreadcrumbs$.subscribe((bc) => {
      this.items = bc;
    });
  }

  private initializeCargo(): Cargo {
    return {
      pla51codigo: '',
      pla51descripcion: '',
      pla51flagactivo: false,
    };
  }

  // --- Métodos de Control de UI ---

  agregarCargo(): void {
    // Generamos un ID temporal único
    const tempId = `${Date.now()}`;

    const newCargo: Cargo = {
      ...this.initializeCargo(),
      // Usamos el ID temporal
      pla51codigo: tempId
    };

    this.cargos.push(newCargo); 

    this.editingCargo = JSON.parse(JSON.stringify(newCargo));
    this.selectedCargo = newCargo;

    this.editingRowIndex = this.cargos.findIndex(c => c.pla51codigo === tempId);

    this.isAddMode = true;
    this.isEditMode = false;

    this.cargo = this.initializeCargo();
  }

  cancelar(): void {
    // Cancela el modo de Adición 
    this.isAddMode = false;
    this.isEditMode = false;

    this.cargo = this.initializeCargo();
    this.selectedCargo = null;
  }


  /*
  onRowEditarCargo(cargo: Cargo): void {
    this.editingCargo = JSON.parse(JSON.stringify(cargo));
    this.selectedCargo = cargo;

    const rowIndex = this.cargos.findIndex(
      c => c.pla51codigo === cargo.pla51codigo
    );
    
    if (rowIndex === -1) return;

    // Clonamos profundamente el objeto para evitar modificar la tabla directamente
    this.editingCargo = JSON.parse(JSON.stringify(cargo));
    this.editingRowIndex = rowIndex;
    this.isEditMode = true;
    this.isAddMode = false;
  }
    */

  onRowEditarCargo(cargo: Cargo): void {
    this.editingCargo = JSON.parse(JSON.stringify(cargo));
    this.selectedCargo = cargo;

    this.editingRowIndex = this.cargos.findIndex(
      c => c.pla51codigo === cargo.pla51codigo
    );

    this.isEditMode = true;
    this.isAddMode = false;
  }

  /*
  onRowCancelarEdicion(cargo: Cargo): void {
    if (this.isAddMode) {
      this.cargos = this.cargos.filter(e => e.pla51codigo !== cargo.pla51codigo);
    } else {
      this.cargos = JSON.parse(JSON.stringify(this.currentCargos));
    }

    this.editingCargo = null;
    this.editingRowIndex = null;
    this.isEditMode = false;
    this.isAddMode = false;

    this.cargos = JSON.parse(JSON.stringify(this.currentCargos));
  }
    */

  onRowCancelarEdicion(cargo: Cargo): void {
    if (this.isAddMode) {
      this.cargos = this.cargos.filter(e => e.pla51codigo !== cargo.pla51codigo);
    }
    
    this.editingCargo = null;
    this.editingRowIndex = null;
    this.isEditMode = false;
    this.isAddMode = false;

    this.cargos = JSON.parse(JSON.stringify(this.currentCargos));
    this.selectedCargo = null;
  }

  onRowValidarCampos(cargo: Cargo): boolean {

    if (this.isAddMode) {
      if (esVacio(cargo.pla51codigo)) {
        verMensajeInformativo(this.messageService, 'error', 'Error', 'El Código es obligatorio para el nuevo registro.');
        return false;
      }

      if (this.currentCargos.some(e => e.pla51codigo.toUpperCase() === cargo.pla51codigo.toUpperCase())) {
        verMensajeInformativo(this.messageService, 'error', 'Error', `El Código ${cargo.pla51codigo} ya existe.`);
        return false;
      }
    }

    if (esVacio(cargo.pla51descripcion)) {
      verMensajeInformativo(this.messageService, 'error', 'Error', 'La descripción es obligatoria.');
      return false;
    }

    return true;
  }

  onRowGuardarEdicion(original: Cargo): void {
    const edited = this.editingCargo;
    if (!edited) return;

    if (!this.onRowValidarCampos(edited)) {
      return;
    }

    // Estandarización y consistencia
    edited.pla51descripcion = aMayusculas(edited.pla51descripcion);
    edited.pla51codigo = edited.pla51codigo.toUpperCase();

    let mensajeExito = '';

    if (this.isAddMode) {
      this.cargos = this.cargos.filter(e => e.pla51codigo !== original.pla51codigo);

      // 2. Agregar el nuevo establecimiento guardado al array principal de datos
      this.currentCargos.push(JSON.parse(JSON.stringify(edited)));
      mensajeExito = 'Establecimiento agregado exitosamente';

    } else {

      const index = this.currentCargos.findIndex(e => e.pla51codigo === original.pla51codigo);

      if (index > -1) {
        this.currentCargos[index] = JSON.parse(JSON.stringify(edited));
        mensajeExito = 'Cambios guardados exitosamente';
      } else {
        //verMensajeInformativo(this.messageService, 'error', 'Error', 'No se encontró el registro original para actualizar.');

        this.cargos = JSON.parse(JSON.stringify(this.currentCargos));
        this.onRowCancelarEdicion(original);
        return;
      }
    }

    this.cargos = JSON.parse(JSON.stringify(this.currentCargos));

    verMensajeInformativo(this.messageService, 'success', 'Éxito', mensajeExito);

    this.editingCargo = null;
    this.editingRowIndex = null;
    this.isEditMode = false;
    this.isAddMode = false;
  }

  eliminarCargo(cargo: Cargo): void {

    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el cargo ${cargo.pla51codigo}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button',

      accept: () => {
        const codigoAeliminar = cargo.pla51codigo;
        const initialLength = this.currentCargos.length;

        this.currentCargos = this.currentCargos.filter(e => e.pla51codigo !== codigoAeliminar);

        if (this.currentCargos.length < initialLength) {
          this.cargos = JSON.parse(JSON.stringify(this.currentCargos));
          this.selectedCargo = null;
          verMensajeInformativo(
            this.messageService, 
            'success', 
            'Éxito', 
            `Cargo ${codigoAeliminar} eliminado.`
          );
        } else {
          verMensajeInformativo(
            this.messageService, 
            'error', 
            'Error',
            `No se encontró el cargo ${codigoAeliminar} para eliminar.`);
        } 
      } 
    });
  }

  editarCargoSeleccionado(): void {
  if (!this.selectedCargo) return;
  this.onRowEditarCargo(this.selectedCargo);
}

eliminarCargoSeleccionado(): void {
  if (!this.selectedCargo) return;
  this.eliminarCargo(this.selectedCargo);
}

guardarEdicionSeleccionada(): void {
  if (this.editingRowIndex === null) return;

  const cargoOriginal = this.cargos[this.editingRowIndex];
  if (!cargoOriginal) return;

  this.onRowGuardarEdicion(cargoOriginal);
}

cancelarEdicionSeleccionada(): void {
  if (this.editingRowIndex === null) return;

  const cargoOriginal = this.cargos[this.editingRowIndex];
  if (!cargoOriginal) return;

  this.onRowCancelarEdicion(cargoOriginal);
}
}
