import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { TransferenciaBancaria, BancoOption } from '../../model/TransferenciaBancaria';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-transferencia-bancaria',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    PanelModule,
    TableModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './transferencia-bancaria.component.html',
  styleUrls: ['./transferencia-bancaria.component.css']
})
export class TransferenciaBancariaComponent implements OnInit{
  items: any[] = [];

  pagos: TransferenciaBancaria[] = [];
  pagosFiltrados: TransferenciaBancaria[] = [];
  
  bancosOptions: BancoOption[] = [];
  selectedBanco: string = 'TODOS';

  displayReporteDialog: boolean = false;
  
  reporteData: any = {
    empresa: 'ADMINISTRAR Y CONFIGURAR',
    anio: '2025',
    titulo: 'Reporte de Transferencia Bancaria',
    subtitulo: '',
    rows: []
  };
  
  constructor(private bS: BreadcrumbService, private messageService: MessageService) {}
  
  ngOnInit(): void {
      this.bS.setBreadcrumbs([
        { icon: 'pi pi-home', routerLink: '/home' },
        { label: 'Sistema' },
        { label: 'Interfaces'}, 
        { label: 'Transferencia Bancaria' },
      ]);
  
      this.bS.currentBreadcrumbs$.subscribe((bc) => {
        this.items = bc;
      });

      this.cargarPagosMock();
      this.cargarBancos();
    }

  cargarPagosMock(): void {
  this.pagos = [
    {
      empleado: '000001',
      documento: '08680851',
      apellidosNombres: 'MARTINEZ GARCIA Joel alberto',
      importe: 2687.46,
      ctaRemuNumero: 'XXX',
      ctaRemBancoCod: '02',
      bancoDesc: 'BANCO DE CREDITO BCP'
    },
    {
      empleado: '000002',
      documento: '07271641',
      apellidosNombres: 'CALDERON PEREZ PYME',
      importe: 2546.59,
      ctaRemuNumero: 'XXX',
      ctaRemBancoCod: '03',
      bancoDesc: 'BANCO CONTINENTAL'
    },
    {
      empleado: '000003',
      documento: '10861418',
      apellidosNombres: 'SARMIENTO RENDON MYPE',
      importe: 2550.79,
      ctaRemuNumero: '',
      ctaRemBancoCod: '01',
      bancoDesc: 'BANCO DE CREDITO BCP'
    }
  ];

  this.pagosFiltrados = [...this.pagos];
}

  cargarBancos(): void {
  this.bancosOptions = [
    { label: 'TODOS', value: 'TODOS' },
    { label: 'BANCO CENTRAL DE RESERVA', value: 'BANCO CENTRAL DE RESERVA' },
    { label: 'BANCO DE CREDITO BCP', value: 'BANCO DE CREDITO BCP' },
    { label: 'BANCO CONTINENTAL', value: 'BANCO CONTINENTAL' },
    { label: 'BANCO BANBIF', value: 'BANCO BANBIF' },
    { label: 'BANCO SCOTIABANK', value: 'BANCO SCOTIABANK' },
    { label: 'BANCO CITIBANK', value: 'BANCO CITIBANK' },
    { label: 'BANCO INTERBANK', value: 'BANCO INTERBANK' },
    { label: 'BANCO DEL TRABAJO', value: 'BANCO DEL TRABAJO' },
    { label: 'CAJA MUNICIPAL SULLANA', value: 'CAJA MUNICIPAL SULLANA' },
    { label: 'BANCO FALABELLA PERU S.A.C.', value: 'BANCO FALABELLA PERU S.A.C.' },
    { label: 'CAJA RURAL DE AHORRO Y CREDITO', value: 'CAJA RURAL DE AHORRO Y CREDITO' },
    { label: 'CAJA MUNICIPAL DE AHORROS Y CREDITOS', value: 'CAJA MUNICIPAL DE AHORROS Y CREDITOS' },
    { label: 'BANCO MIBANCO', value: 'BANCO MIBANCO' },
  ];
}

filtrarPorBanco(): void {
  if (this.selectedBanco === 'TODOS') {
    this.pagosFiltrados = [...this.pagos];
  } else {
    this.pagosFiltrados = this.pagos.filter(
      pago => pago.bancoDesc === this.selectedBanco
    );
  }
}

vistaPreviaGeneral(): void {
  this.reporteData = {
    empresa: 'ADMINISTRAR Y CONFIGURAR',
    anio: '2025',
    titulo: 'Reporte de Transferencia Bancaria',
    subtitulo: this.selectedBanco === 'TODOS' ? 'Todos los bancos' : this.selectedBanco,
    rows: this.pagosFiltrados.map(pago => ({
      codigo: pago.empleado,
      documento: pago.documento,
      nombres: pago.apellidosNombres,
      importe: pago.importe,
      ctaRemuNumero: pago.ctaRemuNumero,
      ctaRemBancoCod: pago.ctaRemBancoCod,
      bancoDesc: pago.bancoDesc
    }))
  };

  this.displayReporteDialog = true;
}

imprimir(): void {
  window.print();
}

puedeExportarTxt(): boolean {
  return this.selectedBanco !== 'TODOS' && this.pagosFiltrados.length > 0;
}

exportarTxt(): void {
  if (this.selectedBanco === 'TODOS') {
    this.messageService.add({
      severity: 'warn',
      summary: 'Exportación no permitida',
      detail: 'Selecciona un banco específico'
    });
    return;
  }

  if (this.pagosFiltrados.length === 0) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Sin datos',
      detail: 'No hay registros para el banco seleccionado'
    });
    return;
  }

  const fechaProceso = '2025011';
  const planilla = 'Planilla Mensual';
  const rucEmpresa = '1941410677061';

  const contenido = this.pagosFiltrados.map((pago, index) => {
    const numeroLinea = index + 1;
    const importeFormateado = pago.importe.toFixed(2);

    return `${numeroLinea}|${pago.empleado}|X|C|0001|${rucEmpresa}|${importeFormateado}|${planilla}|${fechaProceso}|A|${pago.ctaRemuNumero || 'XXX'}|${pago.ctaRemBancoCod}|${pago.documento}|${pago.apellidosNombres}`;
  }).join('\n');

  const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `transferencia_${this.selectedBanco.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  this.messageService.add({
    severity: 'success',
    summary: 'Exportación exitosa',
    detail: 'El archivo TXT se descargó correctamente'
  });
}
}
