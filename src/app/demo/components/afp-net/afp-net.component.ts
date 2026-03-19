import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { AfpNetDetalle,AfpNetResumen } from '../../model/AFPNET';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-afp-net',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToolbarModule,
    TooltipModule,
    BreadcrumbModule,
    PanelModule,
  ],
  providers: [MessageService],
  templateUrl: './afp-net.component.html',
  styleUrls: ['./afp-net.component.css']
})
export class AfpNetComponent implements OnInit {

  items: any[] = [];
  displayParametrosDialog: boolean = false;
  vistaSeleccionada: 'resumido' | 'detallado' = 'resumido';
  modoEdicionParametros: boolean = false;

  constructor(private bS: BreadcrumbService, private messageService: MessageService) {}
    
  
  ngOnInit(): void {
        this.bS.setBreadcrumbs([
          { icon: 'pi pi-home', routerLink: '/home' },
          { label: 'Sistema' },
          { label: 'Interfaces'},
          { label: 'AFP Net' },
        ]);
    
        this.bS.currentBreadcrumbs$.subscribe((bc) => {
          this.items = bc;
        });

      }

  resumenData: AfpNetResumen[] = [
  {
  afp: 'INTEGRA',
  altoRiesgo: 'N',
  remuAsegurable: 3000.00,
  aporteObligatorio: 300.00,
  aporteTrabSinFin: 0.00,
  aporteTrabConFin: 0.00,
  aporteEmpVolun: 0.00,
  fondoPensiones: 300.00,
  seguro: 41.10,
  comision: 46.50,
  comisionRetribucion: 87.60,
  aporteAltoRiesgoTrab: 0.00,
  aporteAltoRiesgoEmple: 0.00,
  snp: 0.00,
  },
  {
    afp: 'SIST NACIONAL',
  altoRiesgo: 'N',
  remuAsegurable: 3102.50,
  aporteObligatorio: 310.25,
  aporteTrabSinFin: 0.00,
  aporteTrabConFin: 0.00,
  aporteEmpVolun: 0.00,
  fondoPensiones: 310.25,
  seguro: 42.10,
  comision: 46.50,
  comisionRetribucion: 42.60,
  aporteAltoRiesgoTrab: 0.00,
  aporteAltoRiesgoEmple: 0.00,
  snp: 0.00,
  },
  {
    afp: 'PROFUTURO',
  altoRiesgo: 'N',
  remuAsegurable: 3002.50,
  aporteObligatorio: 310.25,
  aporteTrabSinFin: 0.00,
  aporteTrabConFin: 0.00,
  aporteEmpVolun: 0.00,
  fondoPensiones: 310.25,
  seguro: 44.10,
  comision: 46.50,
  comisionRetribucion: 42.60,
  aporteAltoRiesgoTrab: 0.00,
  aporteAltoRiesgoEmple: 0.00,
  snp: 0.00,
  }
];

detalleData: AfpNetDetalle[] = [
  {
    afp: 'SIST NACIONAL',
    trabajadorCodigo: '000001',
    trabajadorDoc: '08680851',
    apellidosNombres: 'MARTINEZ GARCIA joelalberto',
    cuspp: 'asdasd',
    remuAsegurable: 3102.50,
    aporteObligatorio: 310.25,
    aporteTrabSinFin: 0.00,
    aporteTrabConFin: 0.00,
    aporteEmpVolun: 0.00,
    seguro: 42.50,
    comision: 0.00,
    aporteAltoRiesgoTrab: 0.00,
    aporteAltoRiesgoEmple: 0.00,
    snp: 0.00,
    altoRiesgo: 0,
    relacionLaboral: 1,
    relacionLaboralInicio: 0,
    relacionLaboralFin: 0
  },
  {
    afp: 'PROFUTURO',
    trabajadorCodigo: '000002',
    trabajadorDoc: '07271641',
    apellidosNombres: 'CALDERON PEREZ PYME',
    cuspp: '535830CCRZR8',
    remuAsegurable: 3000.00,
    aporteObligatorio: 300.00,
    aporteTrabSinFin: 0.00,
    aporteTrabConFin: 0.00,
    aporteEmpVolun: 0.00,
    seguro: 41.10,
    comision: 50.70,
    aporteAltoRiesgoTrab: 0.00,
    aporteAltoRiesgoEmple: 0.00,
    snp: 0.00,
    altoRiesgo: 0,
    relacionLaboral: 1,
    relacionLaboralInicio: 0,
    relacionLaboralFin: 0
  },
  {
    afp: 'INTEGRA',
    trabajadorCodigo: '000003',
    trabajadorDoc: '10861418',
    apellidosNombres: 'SARMIENTO RENDON MYPE',
    cuspp: '586331SRJED7',
    remuAsegurable: 3000.00,
    aporteObligatorio: 300.00,
    aporteTrabSinFin: 0.00,
    aporteTrabConFin: 0.00,
    aporteEmpVolun: 0.00,
    seguro: 41.10,
    comision: 46.50,
    aporteAltoRiesgoTrab: 0.00,
    aporteAltoRiesgoEmple: 0.00,
    snp: 0.00,
    altoRiesgo: 0,
    relacionLaboral: 1,
    relacionLaboralInicio: 0,
    relacionLaboralFin: 0
  }
];

totalDetalle: AfpNetDetalle = {
  afp: '',
  trabajadorCodigo: '',
  trabajadorDoc: '',
  apellidosNombres: '',
  cuspp: '',
  remuAsegurable: 9102.50,
  aporteObligatorio: 910.25,
  aporteTrabSinFin: 0.00,
  aporteTrabConFin: 0.00,
  aporteEmpVolun: 0.00,
  seguro: 124.70,
  comision: 97.20,
  aporteAltoRiesgoTrab: 0.00,
  aporteAltoRiesgoEmple: 0.00,
  snp: 0.00,
  altoRiesgo: 0,
  relacionLaboral: 0,
  relacionLaboralInicio: 0,
  relacionLaboralFin: 0
};

totalResumen: AfpNetResumen = {
  afp: '',
  altoRiesgo: '',
  remuAsegurable: 9102.50,
  aporteObligatorio: 910.25,
  aporteTrabSinFin: 0.00,
  aporteTrabConFin: 0.00,
  aporteEmpVolun: 0.00,
  fondoPensiones: 920.50,
  seguro: 127.30,
  comision: 139.50,
  comisionRetribucion: 172.70,
  aporteAltoRiesgoTrab: 0.00,
  aporteAltoRiesgoEmple: 0.00,
  snp: 0.00
};

parametrosAfpnet = {
  remuneracionAsegurableCodigo: '2026',
  remuneracionAsegurableDesc: 'BASE SPP',

  aporteVolConFinCodigo: '',
  aporteVolConFinDesc: '???',

  aporteVolSinFinCodigo: '',
  aporteVolSinFinDesc: '???',

  aporteVolEmpleadoCodigo: '',
  aporteVolEmpleadoDesc: '???',

  aporteObligatorioCodigo: '3001',
  aporteObligatorioDesc: 'SPP Aporte Obligatorio',

  seguroCodigo: '3006',
  seguroDesc: 'SPP Prima Seguro',

  comisionCodigo: '3011',
  comisionDesc: 'SPP Comision',

  aporteAltoRiesgoTrabCodigo: '',
  aporteAltoRiesgoTrabDesc: '???',

  aporteAltoRiesgoEmpleCodigo: '',
  aporteAltoRiesgoEmpleDesc: '???',

  snpCodigo: '3016',
  snpDesc: 'SNP'
};

padRight(valor: string | number, longitud: number): string {
  return String(valor ?? '').padEnd(longitud, ' ');
}

exportarTxt(): void {
  if (this.vistaSeleccionada === 'resumido') {
    if (this.resumenData.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Sin datos',
        detail: 'No hay registros en Resumido para exportar'
      });
      return;
    }

    const contenido = this.resumenData.map((row) => {
      return [
        this.padRight(row.afp, 15),
        this.padRight(row.altoRiesgo, 5),
        this.padRight(row.remuAsegurable.toFixed(2), 12),
        this.padRight(row.aporteObligatorio.toFixed(2), 12),
        this.padRight(row.aporteTrabSinFin.toFixed(2), 12),
        this.padRight(row.aporteTrabConFin.toFixed(2), 12),
        this.padRight(row.aporteEmpVolun.toFixed(2), 12),
        this.padRight(row.fondoPensiones.toFixed(2), 12),
        this.padRight(row.seguro.toFixed(2), 10),
        this.padRight(row.comision.toFixed(2), 10),
        this.padRight(row.comisionRetribucion.toFixed(2), 12),
        this.padRight(row.aporteAltoRiesgoTrab.toFixed(2), 12),
        this.padRight(row.aporteAltoRiesgoEmple.toFixed(2), 12),
        this.padRight(row.snp.toFixed(2), 10)
      ].join('');
    }).join('\n');

    this.descargarTxt(contenido, 'AFPNet_Resumen.txt');
    return;
  }

  if (this.vistaSeleccionada === 'detallado') {
    if (this.detalleData.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Sin datos',
        detail: 'No hay registros en Detallado para exportar'
      });
      return;
    }

    const contenido = this.detalleData.map((row) => {
      const partesNombre = row.apellidosNombres.trim().split(/\s+/);

      const apellidoPaterno = partesNombre[0] || '';
      const apellidoMaterno = partesNombre[1] || '';
      const nombres = partesNombre.slice(2).join(' ') || '';

      return [
        this.padRight(row.trabajadorCodigo, 6),
        this.padRight(row.cuspp, 15),
        this.padRight(row.trabajadorDoc, 10),
        this.padRight(apellidoPaterno, 15),
        this.padRight(apellidoMaterno, 15),
        this.padRight(nombres, 20)
      ].join('');
    }).join('\n');

    this.descargarTxt(contenido, 'AFPNet_Detallado.txt');
  }
}

descargarTxt(contenido: string, nombreArchivo: string): void {
  const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = nombreArchivo;
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

abrirParametros(): void {
  this.displayParametrosDialog = true;
  this.modoEdicionParametros = false;
}

activarEdicionParametros(): void {
  this.modoEdicionParametros = true;
}

guardarParametros(): void {
  this.modoEdicionParametros = false;

  this.messageService.add({
    severity: 'success',
    summary: 'Guardado',
    detail: 'Los parámetros se actualizaron correctamente'
  });
}
}
