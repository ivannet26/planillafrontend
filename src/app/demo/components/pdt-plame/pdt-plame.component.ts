import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-pdt-plame',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    PanelModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './pdt-plame.component.html',
  styleUrls: ['./pdt-plame.component.css']
})
export class PdtPlameComponent {
  items: any[] = [];
  selectedEstructuras: string[] = [];

  constructor(private bS: BreadcrumbService, private messageService: MessageService) {}
    
    ngOnInit(): void {
        this.bS.setBreadcrumbs([
          { icon: 'pi pi-home', routerLink: '/home' },
          { label: 'Sistema' },
          { label: 'Interfaces'}, 
          { label: 'PDT Plame' },
        ]);
    
        this.bS.currentBreadcrumbs$.subscribe((bc) => {
          this.items = bc;
        });
      }

  generarArchivosMock(): void {
  if (this.selectedEstructuras.length === 0) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Sin selección',
      detail: 'Debe seleccionar al menos una estructura'
    });
    return;
  }

  const archivos: string[] = [];

  if (this.selectedEstructuras.includes('14')) {
    archivos.push('.jor');
  }

  if (this.selectedEstructuras.includes('15')) {
    archivos.push('.snl');
  }

  this.messageService.add({
    severity: 'success',
    summary: 'Proceso simulado',
    detail: archivos.length > 0
      ? `Se generarían los archivos: ${archivos.join(', ')}`
      : 'Se procesaron las estructuras seleccionadas'
  });
}
}
