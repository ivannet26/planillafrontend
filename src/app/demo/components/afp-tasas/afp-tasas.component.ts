import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-afp-tasas',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    StepsModule,
    TooltipModule,
    PanelModule,
    TableModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
],
  providers: [MessageService, ConfirmationService],
  templateUrl: './afp-tasas.component.html',
  styleUrls: ['./afp-tasas.component.css']
})
export class AfpTasasComponent {

  items: any[] = [];

  constructor(private bS: BreadcrumbService, private messageService: MessageService) { }



    /*
    afpTasas = [
      {
        afp: 'HABITAT',
        aporteObligatorio: 10.0,
        primaSeguros: 1.37,
        comisionSobreFlujo: 1.47,
        comisionMixtaFlujo: 0.0,
        comisionMixtaSaldo: 1.25,
        remuneracionMaxima: 12027.91
      },
      
      {
        afp: 'INTEGRA',
        aporteObligatorio: 10.0,
        primaSeguros: 1.37,
        comisionSobreFlujo: 1.55,
        comisionMixtaFlujo: 0.0,
        comisionMixtaSaldo: 0.78,
        remuneracionMaxima: 12027.91
      },
      
      {
        afp: 'PRIMA',
        aporteObligatorio: 10.0,
        primaSeguros: 1.37,
        comisionSobreFlujo: 1.60,
        comisionMixtaFlujo: 0.0,
        comisionMixtaSaldo: 1.25,
        remuneracionMaxima: 12027.91
      },
      
      {
        afp: 'PROFUTURO',
        aporteObligatorio: 10.0,
        primaSeguros: 1.37,
        comisionSobreFlujo: 1.69,
        comisionMixtaFlujo: 0.0,
        comisionMixtaSaldo: 1.20,
        remuneracionMaxima: 12027.91
      }
    ];

    */

    afpTasasPorPeriodo: { [key: string]: any[] } = {
  '2025-01': [
    {
      afp: 'HABITAT',
      aporteObligatorio: 10.0,
      primaSeguros: 1.37,
      comisionSobreFlujo: 1.47,
      comisionMixtaFlujo: 0.0,
      comisionMixtaSaldo: 1.25,
      remuneracionMaxima: 12027.91
    },
    {
      afp: 'INTEGRA',
      aporteObligatorio: 10.0,
      primaSeguros: 1.37,
      comisionSobreFlujo: 1.55,
      comisionMixtaFlujo: 0.0,
      comisionMixtaSaldo: 0.78,
      remuneracionMaxima: 12027.91
    },
    {
      afp: 'PRIMA',
      aporteObligatorio: 10.0,
      primaSeguros: 1.37,
      comisionSobreFlujo: 1.60,
      comisionMixtaFlujo: 0.0,
      comisionMixtaSaldo: 1.25,
      remuneracionMaxima: 12027.91
    },
    {
      afp: 'PROFUTURO',
      aporteObligatorio: 10.0,
      primaSeguros: 1.37,
      comisionSobreFlujo: 1.69,
      comisionMixtaFlujo: 0.0,
      comisionMixtaSaldo: 1.20,
      remuneracionMaxima: 12027.91
    }
  ],

  '2025-02': [
    {
      afp: 'HABITAT',
      aporteObligatorio: 0,
      primaSeguros: 0,
      comisionSobreFlujo: 0,
      comisionMixtaFlujo: 0,
      comisionMixtaSaldo: 0,
      remuneracionMaxima: 0
    },
    {
      afp: 'INTEGRA',
      aporteObligatorio: 0,
      primaSeguros: 0,
      comisionSobreFlujo: 0,
      comisionMixtaFlujo: 0,
      comisionMixtaSaldo: 0,
      remuneracionMaxima: 0
    },
    {
      afp: 'PRIMA',
      aporteObligatorio: 0,
      primaSeguros: 0,
      comisionSobreFlujo: 0,
      comisionMixtaFlujo: 0,
      comisionMixtaSaldo: 0,
      remuneracionMaxima: 0
    },
    {
      afp: 'PROFUTURO',
      aporteObligatorio: 0,
      primaSeguros: 0,
      comisionSobreFlujo: 0,
      comisionMixtaFlujo: 0,
      comisionMixtaSaldo: 0,
      remuneracionMaxima: 0
    }
  ],

  '2025-03': [
    {
      afp: 'HABITAT',
      aporteObligatorio: 9.8,
      primaSeguros: 1.35,
      comisionSobreFlujo: 1.40,
      comisionMixtaFlujo: 0,
      comisionMixtaSaldo: 1.20,
      remuneracionMaxima: 12027.91
    },
    {
      afp: 'INTEGRA',
      aporteObligatorio: 9.8,
      primaSeguros: 1.35,
      comisionSobreFlujo: 1.50,
      comisionMixtaFlujo: 0,
      comisionMixtaSaldo: 0.75,
      remuneracionMaxima: 12027.91
    },
    {
      afp: 'PRIMA',
      aporteObligatorio: 9.8,
      primaSeguros: 1.35,
      comisionSobreFlujo: 1.58,
      comisionMixtaFlujo: 0,
      comisionMixtaSaldo: 1.22,
      remuneracionMaxima: 12027.91
    },
    {
      afp: 'PROFUTURO',
      aporteObligatorio: 9.8,
      primaSeguros: 1.35,
      comisionSobreFlujo: 1.65,
      comisionMixtaFlujo: 0,
      comisionMixtaSaldo: 1.18,
      remuneracionMaxima: 12027.91
    }
  ]
};


    periodoDevengueOptions = [
      { label: '2025-01', value: '2025-01' },
      { label: '2025-02', value: '2025-02' },
      { label: '2025-03', value: '2025-03' },
      { label: '2025-04', value: '2025-04' },
      { label: '2025-05', value: '2025-05' },
      { label: '2025-06', value: '2025-06' },
      { label: '2025-07', value: '2025-07' },
      { label: '2025-08', value: '2025-08' },
      { label: '2025-09', value: '2025-09' },
      { label: '2025-10', value: '2025-10' },
      { label: '2025-11', value: '2025-11' },
      { label: '2025-12', value: '2025-12' },
    ];
    
    
    selectedPeriodoDevengue = '2025-01';
    afpTasas: any[] = [];

    modoEdicion = false;
    afpTasasOriginal: any[] = [];

    displayCopiarPeriodoDialog = false;
    periodoAnteriorSeleccionado: any = null;

    periodosPopup: any[] = [];

     ngOnInit(): void {
    this.bS.setBreadcrumbs([
      { icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Sistema' },
      { label: 'Procesos' },
      { label: 'AFP Tasas y Comisiones' },

    ]);

    this.bS.currentBreadcrumbs$.subscribe((bc) => {
      this.items = bc;
    });

    this.periodosPopup = this.periodoDevengueOptions.map((item, index) => ({
      codigo: String(index + 1).padStart(2, '0'),
      descripcion: item.label,
      value: item.value
    }));

    this.cargarTasasPorPeriodo(this.selectedPeriodoDevengue);
    }
    
    cargarTasasPorPeriodo(periodo: string): void {
      const data = this.afpTasasPorPeriodo[periodo];
      
      if (data) {
        this.afpTasas = JSON.parse(JSON.stringify(data));
      } else {
        this.afpTasas = [];
      }
    }

    editarPeriodo(): void {
      this.modoEdicion = true;
      this.afpTasasOriginal = JSON.parse(JSON.stringify(this.afpTasas));

      this.messageService.add({
        severity: 'info',
        summary: 'Edición',
        detail: 'Se habilitó el modo edición',
        life: 3000
      });
    }

    guardarCambiosTabla(): void {
      this.modoEdicion = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: 'Se guardaron los cambios correctamente',
        life: 3000
      });
      console.log('Guardar cambios AFP', this.afpTasas);
    }

    cancelarEdicionTabla(): void {
      this.afpTasas = JSON.parse(JSON.stringify(this.afpTasasOriginal));
      this.modoEdicion = false;
    }
    
    copiarPeriodoAnterior(): void {
      this.periodoAnteriorSeleccionado = null;
      this.displayCopiarPeriodoDialog = true;
    }

    cancelarCopiaPeriodo(): void {
      this.displayCopiarPeriodoDialog = false;
      this.periodoAnteriorSeleccionado = null;
    }
    
    aceptarCopiaPeriodo(): void {
      if (!this.periodoAnteriorSeleccionado) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Selección requerida',
          detail: 'Debe seleccionar un período',
          life: 3000
        });
        return;
      }

      const periodoOrigen = this.periodoAnteriorSeleccionado.value;
      const periodoDestino = this.selectedPeriodoDevengue;
      const dataOrigen = this.afpTasasPorPeriodo[periodoOrigen];
      
      if (!dataOrigen) {
        this.messageService.add({
          severity: 'error',
          summary: 'Sin datos',
          detail: 'No hay datos en el período origen seleccionado',
          life: 3000
        });
        return;
      }

      this.afpTasasPorPeriodo[periodoDestino] = JSON.parse(JSON.stringify(dataOrigen));
      this.afpTasas = JSON.parse(JSON.stringify(dataOrigen));
      this.displayCopiarPeriodoDialog = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Período copiado',
        detail: `Se copiaron los datos de ${periodoOrigen} al período ${periodoDestino}`,
        life: 3000
      });

    }

    /*
    get periodosPopup() {
      return this.periodoDevengueOptions.map((item, index) => ({
        codigo: String(index + 1).padStart(2, '0'),
        descripcion: item.label,
        value: item.value
      }));
    }
      */
    
    onPeriodoChange(periodo: string): void {
      this.cargarTasasPorPeriodo(periodo);
    }

}
