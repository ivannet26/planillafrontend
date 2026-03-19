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
  selector: 'app-restaurar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    BreadcrumbModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    ButtonModule,],
  providers: [MessageService],
  templateUrl: './restaurar.component.html',
  styleUrls: ['./restaurar.component.css']
})
export class RestaurarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Breadcrumb
  items: MenuItem[] = [];

  backupNombre  = '';
  private backupFile: File | null = null;

  constructor(
    private bS: BreadcrumbService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    this.bS.setBreadcrumbs([
      { label: 'Sistema' },
      { label: 'Utilitarios' },
      { label: 'Restaurar BD' },
    ]);

    this.bS.currentBreadcrumbs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((crumbs) => (this.items = crumbs ?? []));
  }
  
  abrirSelectorBackup(fileInput: HTMLInputElement): void {
    const openPicker = (window as any).showOpenFilePicker;
    if (openPicker) {
      this.seleccionarBackup();
    } else {
      fileInput.click(); // fallback universal
    }
  }

  async seleccionarBackup(): Promise<void> {
    try {
      const openPicker = (window as any).showOpenFilePicker;

      if (!openPicker) return;

      const [handle] = await openPicker({
        multiple: false,
        types: [
          {
            description: 'Backup SQL Server',
            accept: { 'application/octet-stream': ['.bak'] },
          },
        ],
      });

      const file = await handle.getFile();
      this.backupFile = file;
      this.backupNombre = file.name;

      this.messageService.add({
        severity: 'info',
        summary: 'Backup seleccionado',
        detail: this.backupNombre,
      });
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      console.error(err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo seleccionar el backup',
      });
    }
  }

  onBackupFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.backupFile = file;
    this.backupNombre = file?.name ?? '';

    if (file) {
      this.messageService.add({
        severity: 'info',
        summary: 'Backup seleccionado',
        detail: this.backupNombre,
      });
    }
  }

  limpiar(): void {
    this.backupNombre = '';
    this.backupFile = null;

    this.messageService.add({
      severity: 'info',
      summary: 'Formulario limpiado',
      detail: 'Se limpió el backup seleccionado',
    });
  }

  restaurarBdMock(): void {
    if (!this.backupFile && !this.backupNombre.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Selecciona un archivo de backup (.bak) antes de restaurar',
      });
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Restauración (mock)',
      detail: `Se restauró la BD usando "${this.backupNombre}"`,
    });
  }

   ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
