import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbService } from '../../service/breadcrumb.service';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-asistente-empresa',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    StepsModule,
    CardModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './asistente-empresa.component.html',
  styleUrls: ['./asistente-empresa.component.css']
})
export class AsistenteEmpresaComponent {

  items: any[] = [];

  isViewMode = true;
  isAddMode = false;
  isEditMode = false;

  activeStep = 0;
  activeIndex = 0;

  wizardItems = [
    { label: 'Datos' },
    { label: 'Confirmación' }
  ];

  empresa = {
    empresacod: '',
    ruc: '',
    razonsocial: '',
    direccion: '',

    representanteLegal: {
      replegaldoctip: null,
      replegaldocnro: '',
      replegalapepaterno: '',
      replegalapematerno: '',
      replegalnombres: ''
    },

    responsablePlanilla: {
      encargadoplanilladoctip: null,
      encargadoplanilladocnro: '',
      encargadoplanillaapepaterno: '',
      encargadoplanillaapematerno: '',
      encargadoplanillanombres: ''
    },

    bancos: {
      ctasolespagobancocod: null,
      ctasolespagonumero: '',
      ctadolarespagobancocod: null,
      ctadolarespagonumero: ''
    }
  };

  docTipos = [
    { label: 'DOC. NACIONAL DE IDENTIDAD', value: '01' },
    { label: 'CARNE DE EXTRANJERIA', value: '04' },
    { label: 'PASAPORTE', value: '07' }
  ];

  bancosOptions = [
    { label: 'BANCO CENTRAL DE RESERVA', value: '01' },
    { label: 'BANCO DE CREDITO BCP', value: '02' },
    { label: 'BANCO CONTINENTAL', value: '03' },
    { label: 'BANCO BANBIF', value: '04' },
    { label: 'BANCO SCOTIABANK', value: '05' },
    { label: 'BANCO CITIBANK', value: '06' },
    { label: 'BANCO INTERBANK', value: '07' },
    { label: 'BANCO DEL TRABAJO', value: '08' },
    { label: 'CAJA MUNICIPAL SULLANA AG.HUARAL', value: '09' },
    { label: 'BANCO FALABELLA PERU S.A.', value: '10' },
    { label: 'CAJA RURAL DE AHORRO Y CREDITO', value: '11' },
    { label: 'CAJA MUNICIPAL DE AHORRO Y CREDITO HUANCAYO', value: '12' },
    { label: 'BANCO MINIBANCO', value: '13' },
    { label: 'BANCO MUNICIPAL', value: '14' }
  ];

  
  constructor(private bS: BreadcrumbService,private messageService: MessageService) {}

   ngOnInit(): void {
    this.bS.setBreadcrumbs([
      { icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Sistema' },
      { label: 'Procesos'}, 
      { label: 'Asistente de Empresa' },
    ]);

    this.bS.currentBreadcrumbs$.subscribe((bc) => {
      this.items = bc;
    });
  }


  isDisabled(): boolean {
    return !(this.isAddMode || this.isEditMode);
  }

  siguientePaso() {
    this.activeStep = 1;
  }

  cancelarWizard() {
 
    console.log('Cancelar wizard');
  }

  get mostrarBotonAnterior(): boolean {
    return this.activeIndex > 0;
  }
  
  get botonSiguienteTexto(): string {
    return this.activeIndex === this.wizardItems.length - 1 
    ? 'Finalizar' : 'Siguiente';
  }
  
  siguiente() {
    if (this.activeIndex < this.wizardItems.length - 1) {
      this.activeIndex++;
      return;
    }

    this.guardarEmpresa();
  }
  
  anterior() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }
  
  cancelar() {
    this.activeIndex = 0;
  }
  
  guardarEmpresa() {
    this.messageService.add({
      severity: 'success',
      summary: 'Actualizado',
      detail: 'La información de la empresa se actualizó correctamente'
    });

    this.activeIndex = 0;
  }
}
