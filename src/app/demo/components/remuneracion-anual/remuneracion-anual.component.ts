import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

import { MessageService, MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { RemuneracionAnual } from '../../model/RemuneracionAnual';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-remuneracion-anual',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    TableModule,
    DialogModule,
    TagModule,
    DropdownModule,
  ],
  providers: [MessageService,ConfirmationService],
  templateUrl: './remuneracion-anual.component.html',
  styleUrls: ['./remuneracion-anual.component.css']
})
export class RemuneracionAnualComponent implements OnInit{
  items: MenuItem[] = [];
  showPreviewModal = false;
  selectedRemu?: RemuneracionAnual;

  remuneracionList: RemuneracionAnual[] = [
    { codigo: '000001', docIdentidad: '08680851', apellidosNombres: 'JOEL ALBERTO MARTINEZ GARCIA', estado: 'A' },
    { codigo: '000002', docIdentidad: '07271641', apellidosNombres: 'PYME CALDERON PEREZ', estado: 'A' },
    { codigo: '000003', docIdentidad: '10861418', apellidosNombres: 'MYPE SARMIENTO RENDON', estado: 'A' },
    { codigo: '000007', docIdentidad: '10207645', apellidosNombres: 'REGGENERALRP AFPCOMISIONFLUJO DEBAJODELTOPE', estado: 'A' },
    { codigo: '000018', docIdentidad: '10765432', apellidosNombres: 'SCRTSALUD  APORTE SCRTSALUD', estado: 'A' },
    { codigo: '000023', docIdentidad: '10706118', apellidosNombres: 'ENRICO RODRIGUEZ PAMAOA', estado: 'A' },
  ];

  selectedRow?: RemuneracionAnual;

  meses = [
    { label: 'ENERO', value: 1 },
    { label: 'FEBRERO', value: 2 },
    { label: 'MARZO', value: 3 },
    { label: 'ABRIL', value: 4 },
    { label: 'MAYO', value: 5 },
    { label: 'JUNIO', value: 6 },
    { label: 'JULIO', value: 7 },
    { label: 'AGOSTO', value: 8 },
    { label: 'SETIEMBRE', value: 9 },
    { label: 'OCTUBRE', value: 10 },
    { label: 'NOVIEMBRE', value: 11 },
    { label: 'DICIEMBRE', value: 12 },
  ];
  
  mesInicio: number | null = 2;
  mesFinal: number | null = 3;
  
  
  constructor(
    private messageService: MessageService,
    private bS: BreadcrumbService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.bS.setBreadcrumbs([
      { icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Sistema' },
      { label: 'Reporte' },
      { label: 'Remuneracion Anual' },
    ]);

    this.bS.currentBreadcrumbs$.subscribe((bc: MenuItem[]) => {
      this.items = bc;
    });
  }

  verPreview(row: RemuneracionAnual) {
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Vista previa', 
      detail: `Vista previa de ${row.codigo}`, 
      life: 2000 
    });
  }
  
  openPreview(row: RemuneracionAnual) {
    this.selectedRemu = row; 
    this.showPreviewModal = true;
  }
  
  closePreview() {
    this.showPreviewModal = false;
    this.selectedRemu = undefined;
  }

  
  confirmEliminar(row: RemuneracionAnual) {
    this.confirmationService.confirm({
      message: `¿Eliminar el registro ${row.codigo}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      
      accept: () => {
        this.remuneracionList = this.remuneracionList.filter(x => x.codigo !== row.codigo);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Registro eliminado', life: 2000 });
      }
    });
  }
}
