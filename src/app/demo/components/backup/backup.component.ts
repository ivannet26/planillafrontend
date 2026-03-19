import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MenuItem, MessageService } from 'primeng/api';

import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbService } from '../../service/breadcrumb.service';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    BreadcrumbModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
   ],
  providers: [MessageService],
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  // Breadcrumb
  items: MenuItem[] = [];

  ruta = '';
  nombre = 'BckMasterpla';


  rutaDialogVisible = false;
  rutaTemp = '';
  private directoryHandle: any = null;

  constructor(
    private bS: BreadcrumbService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    this.bS.setBreadcrumbs([
      { label: 'Sistema' },
      { label: 'Utilitarios' },
      { label: 'Generar Backup BD' },
    ]);

    this.bS.currentBreadcrumbs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((crumbs) => (this.items = crumbs ?? []));
  }
  
  async seleccionarCarpeta(): Promise<void> {
    try {
      
      const picker = (window as any).showDirectoryPicker;
      if (!picker) {
        this.ruta = 'Selección de carpeta no soportada en este navegador';
        return;
      }
      
      this.directoryHandle = await picker();
      
      this.ruta = this.directoryHandle?.name ? `${this.directoryHandle.name}/` : 'Carpeta seleccionada';
    
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      console.error(err);
      this.ruta = 'No se pudo seleccionar carpeta';
    }
  }

  limpiar() {
    this.ruta = '';
    this.nombre = 'BckMasterpla';

    this.messageService.add({
      severity: 'info',
      summary: 'Formulario limpiado',
      detail: 'Se reiniciaron Ruta y Nombre',
    });
  }
  
  generarBackupMock(){
    if (!this.ruta?.trim() || !this.nombre?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Completa Ruta y Nombre antes de generar',
      });
      return;
    }
    
    this.messageService.add({
      severity: 'success',
      summary: 'Backup (mock)',
      detail: `Se generó "${this.nombre.trim()}.bak"`,
    });
 
   }

   ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
