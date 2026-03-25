import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-config-boleta-estandar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,],
  providers: [MessageService, ConfirmationService],
  templateUrl: './config-boleta-estandar.component.html',
  styleUrls: ['./config-boleta-estandar.component.css']
})
export class ConfigBoletaEstandarComponent {

  isEditMode = false;
  editingPlanillaCodigo: string | null = null;

   // Breadcrumb
  items = [
    { label: 'Sistema' },
    { label: 'Maestro estandar' },
    { label: 'Configuracion boleta estandar' }
  ];

  // Mock tabla
  planillaList = [
    { codigo: '01', descripcion: 'PLANILLA MENSUAL' },
    { codigo: '02', descripcion: 'PLANILLA VACACIONES' },
    { codigo: '03', descripcion: 'PLANILLA GRATIFICACIONES' },
    { codigo: '04', descripcion: 'PLANILLA LIQUIDACION' },
    { codigo: '05', descripcion: 'PLANILLA UTILIDAD' },
    { codigo: '06', descripcion: 'PLANILLA ADELANTO' }
  ];

  planillaSelected: any = null;

  // Mock opciones
  conceptoOptions = [
  { label: '0001', value: '0001', desc: 'Sueldo Mensual Básico' },
  { label: '0006', value: '0006', desc: 'Haber Diario Básico' },
  { label: '1001', value: '1001', desc: 'Descuento Por Inasistencias' },
  { label: '0601', value: '0601', desc: 'Suspensión Perfecta' },
  { label: '0526', value: '0526', desc: 'Dias Vacaciones Fisicas' },
  { label: '0531', value: '0531', desc: 'Dias Vacaciones Vendidas' },
  { label: '0527', value: '0527', desc: 'FECHA INI VAC' },
  { label: '0528', value: '0528', desc: 'FECHA FIN VACA' }
];

  slots = Array.from({ length: 8 }).map(() => ({
    codigoSeleccionado: null as string | null,
    descripcion: ''
  }));

  defaultsPorPlanilla: Record<string, Array<{ slotIndex: number; cod: string; desc: string }>> = {
  '01': [
    { slotIndex: 0, cod: '0001', desc: 'Sueldo Mensual Básico' },
    { slotIndex: 1, cod: '0006', desc: 'Haber Diario Básico' },
    { slotIndex: 2, cod: '1001', desc: 'Descuento Por Inasistencias' },
    { slotIndex: 3, cod: '0601', desc: 'Suspensión Perfecta' }
  ],
  '02': [
    { slotIndex: 0, cod: '0526', desc: 'Dias Vacaciones Fisicas' },
    { slotIndex: 1, cod: '0531', desc: 'Dias Vacaciones Vendidas' },
    { slotIndex: 2, cod: '0527', desc: 'FECHA INI VAC' },
    { slotIndex: 3, cod: '0528', desc: 'FECHA FIN VACA' }
  ]
};

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  onSelectPlanilla() {
  this.isEditMode = false;
  this.editingPlanillaCodigo = null;

  const cod = this.planillaSelected?.codigo;

  this.slots.forEach(s => {
    s.codigoSeleccionado = null;
    s.descripcion = '';
  });

  const defaults = this.defaultsPorPlanilla[cod];
  if (!defaults) return;

  for (const d of defaults) {
    this.slots[d.slotIndex].codigoSeleccionado = d.cod;
    this.slots[d.slotIndex].descripcion = d.desc;
  }
}

  onSlotChange(i: number) {
    const codigo = this.slots[i].codigoSeleccionado;
    const encontrado = this.conceptoOptions.find(c => c.value === codigo);
    this.slots[i].descripcion = encontrado?.desc ?? '';
  }

  limpiarSlot(i: number) {
    this.slots[i].codigoSeleccionado = null;
    this.slots[i].descripcion = '';
  }

  guardarMock() {
  const payload = {
    planilla: this.planillaSelected,
    asignados: this.slots
      .filter(s => s.codigoSeleccionado)
      .map(s => ({
        codigo: s.codigoSeleccionado,
        descripcion: s.descripcion
      }))
  };

  console.log('GUARDAR MOCK =>', payload);

  this.messageService.add({
    severity: 'success',
    summary: 'Exito',
    detail: 'Configuración guardada'
  });
}

  nuevaConfig() {
    this.planillaSelected = null;
    this.slots.forEach(s => {
      s.codigoSeleccionado = null;
      s.descripcion = '';
    });
  }

  activarEdicion(planilla: any) {
    if (!planilla) return;

    if (this.planillaSelected.codigo !== planilla.codigo) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Seleccione la planilla antes de editar.'
      });
      return;
    }

    this.planillaSelected = planilla;
    this.isEditMode = true;
    this.editingPlanillaCodigo = planilla.codigo;
  }

  guardarEdicionMock() {
    if (!this.planillaSelected || !this.isEditMode) return;

    const payload = {
      planilla: this.planillaSelected.codigo,
      asignados: this.slots
        .filter(s => s.codigoSeleccionado)
        .map(s => ({
          codigo: s.codigoSeleccionado,
          descripcion: s.descripcion
        }))
    };


    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Configuración guardada para ${this.planillaSelected.codigo} (mock).`
    });

    this.isEditMode = false;
    this.editingPlanillaCodigo = null;
  }

  eliminarPlanillaMock(planilla: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la configuración de la planilla ${planilla.codigo}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button',

      accept: () => {
        this.planillaList = this.planillaList.filter(p => p.codigo !== planilla.codigo);

        if (this.planillaSelected?.codigo === planilla.codigo) {
          this.planillaSelected = null;

          this.slots.forEach(s => {
            s.codigoSeleccionado = null;
            s.descripcion = '';
          });

          this.isEditMode = false;
          this.editingPlanillaCodigo = null;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Configuración ${planilla.codigo} eliminada (mock)`
        });
      }
    });
  }


  editarSeleccionado() {
    if (!this.planillaSelected) return;
    this.activarEdicion(this.planillaSelected);
  }

  eliminarSeleccionado() {
    if (!this.planillaSelected) return;
    this.eliminarPlanillaMock(this.planillaSelected);
  }

}
