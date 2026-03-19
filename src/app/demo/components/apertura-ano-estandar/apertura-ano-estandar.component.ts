import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

import { MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../service/breadcrumb.service';

@Component({
  selector: 'app-apertura-ano-estandar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    BreadcrumbModule,],
  providers: [MessageService],
  templateUrl: './apertura-ano-estandar.component.html',
  styleUrls: ['./apertura-ano-estandar.component.css']
})
export class AperturaAnoEstandarComponent {
  items: any[] = [];

  anioApertura: string = '2026';
  anioBase: string = '2025';

  constructor(
    private messageService: MessageService,
    private bS: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.bS.setBreadcrumbs([
      { icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Sistema' },
      { label: 'Maestro Estandar' },
      { label: 'Apertura de año'},
    ]);

    this.bS.currentBreadcrumbs$.subscribe((bc) => {
      this.items = bc;
    });
  }

  guardar() {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Apertura ${this.anioApertura} (base ${this.anioBase}) guardada (mock).`,
      life: 2500,
    });
  }
}
