import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-apertura-ano',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    PanelModule,
    ConfirmDialogModule,
    InputTextModule,
    BreadcrumbModule,
  ],
  templateUrl: './apertura-ano.component.html',
  styleUrls: ['./apertura-ano.component.css'],
  providers: [MessageService],
})
export class AperturaAnoComponent {

  items: any[] = [];

  constructor(private messageService: MessageService, private bS: BreadcrumbService) {}

  ngOnInit(): void {
    this.bS.setBreadcrumbs([
      { icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Sistema' },
      { label: 'Maestros'}, 
      { label: 'Apertura de año', routerLink: '/home/maestros/apertura-ano' },
    ]);

    this.bS.currentBreadcrumbs$.subscribe((bc) => {
      this.items = bc;
    });
  }
  
  guardar() {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Se guardaron los cambios correctamente.',
      life: 2500,
    });
  }
}
