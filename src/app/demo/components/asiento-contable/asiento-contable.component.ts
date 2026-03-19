import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-asiento-contable',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    ToastModule,
    TableModule,
  ],
  providers: [MessageService],
  templateUrl: './asiento-contable.component.html',
  styleUrls: ['./asiento-contable.component.css']
})
export class AsientoContableComponent {
  items: any[] = [];
  filaSeleccionada: any = null;
  detalleAsiento: any[] = [];

  totalDebe: number = 0;
  totalHaber: number = 0;

  periodosMock = [
    {
      id: 1,
      tipo: 'Planilla Mensual',
      planillaGrupo: 'PLANILLA EMPLEADOS',
      periodo: 'Planilla Mensual'
    }
  ];

  constructor(private bS: BreadcrumbService, private messageService: MessageService) {}
      
    
    ngOnInit(): void {
          this.bS.setBreadcrumbs([
            { icon: 'pi pi-home', routerLink: '/home' },
            { label: 'Sistema' },
            { label: 'Interfaces'},
            { label: 'Asiento Contable' },
          ]);
      
          this.bS.currentBreadcrumbs$.subscribe((bc) => {
            this.items = bc;
          });
    }

  seleccionarFila(fila: any) {
    this.filaSeleccionada = fila;
  }

  mostrarDetalle() {
    if (!this.filaSeleccionada) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Selecciona una fila de la tabla izquierda.'
      });
      return;
    }

    if (this.filaSeleccionada.id === 1) {
      this.detalleAsiento = [
        { cuenta: '40173', debe: 0.00, haber: 185.51 },
        { cuenta: '4031',  debe: 0.00, haber: 549.22 },
        { cuenta: '4111',  debe: 0.00, haber: 9102.50 },
        { cuenta: '4111',  debe: 1317.66, haber: 0.00 },
        { cuenta: '417',   debe: 0.00, haber: 1132.15 },
        { cuenta: '6221',  debe: 9102.50, haber: 0.00 },
        { cuenta: '6271',  debe: 549.22, haber: 0.00 }
      ];

      this.calcularTotales();
    } else {
      this.detalleAsiento = [];
    }

    this.calcularTotales();
  }

  calcularTotales() {
    this.totalDebe = this.detalleAsiento.reduce(
      (acc, item) => acc + Number(item.debe || 0), 0
    );

    this.totalHaber = this.detalleAsiento.reduce(
      (acc, item) => acc + Number(item.haber || 0), 0
    );
  }

  exportarExcel() {
  if (!this.detalleAsiento || this.detalleAsiento.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(this.detalleAsiento);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Detalle');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data = new Blob(
    [excelBuffer],
    { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
  );

  saveAs(data, 'asiento_contable_detalle.xlsx');
}
}
