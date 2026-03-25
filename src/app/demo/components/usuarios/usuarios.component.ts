import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../service/breadcrumb.service';
// Importar las interfaces desde el archivo de modelo
import { Usuario, UsuarioView, EmpresaUsuario, DropdownOption } from 'src/app/demo/model/Usuario';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    DropdownModule,
    CheckboxModule,
    PasswordModule,
    ConfirmDialogModule,
    ToastModule,
    BreadcrumbModule,
    PanelModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  // --- Tabla Maestra ---
  usuarios: UsuarioView[] = [];
  selectedUsuario: UsuarioView | null = null;
  originalUsuario: UsuarioView | null = null;
  perfiles: DropdownOption[] = [];

  // --- Tabla Detalle ---
  empresasUsuario: EmpresaUsuario[] = [];
  private allEmpresasMap: Map<string, EmpresaUsuario[]> = new Map();

  private destroy$ = new Subject<void>();
  items: MenuItem[] = [];
  
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private bS: BreadcrumbService
  ) {}

  ngOnInit() {
    this.bS.setBreadcrumbs([
    { label: 'Sistema' },
    { label: 'Seguridad' },
    { label: 'Usuarios' },
  ]);

  this.bS.currentBreadcrumbs$
    .pipe(takeUntil(this.destroy$))
    .subscribe((crumbs) => (this.items = crumbs ?? []));
this.bS.setBreadcrumbs([
    { label: 'Sistema' },
    { label: 'Seguridad' },
    { label: 'Usuarios' },
  ]);

  this.bS.currentBreadcrumbs$
    .pipe(takeUntil(this.destroy$))
    .subscribe((crumbs) => (this.items = crumbs ?? []));


    this.loadPerfiles();
    this.loadAllEmpresasData();
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarios = [
      {
        id: 'admin',
        nombre: 'Administrador Master',
        clave: 'admn$1',
        perfil: 'Administrador General'
      },
      {
        id: 'melissa',
        nombre: 'Usuario de Consulta',
        clave: 'melissa',
        perfil: 'Usuario Consulta'
      }
    ];

    if (this.usuarios.length > 0) {
      this.selectedUsuario = this.usuarios[0];
      this.empresasUsuario = this.allEmpresasMap.get(this.selectedUsuario.id) || [];
    }
  }

  loadPerfiles() {
    this.perfiles = [
      { label: 'Administrador General', value: 'Administrador General' },
      { label: 'Usuario Consulta', value: 'Usuario Consulta' },
      { label: 'Usuario RRHH', value: 'Usuario RRHH' }
    ];
  }

  loadAllEmpresasData() {
    this.allEmpresasMap.set('admin', [
      { empresaCod: '00004', razonSocial: 'ADMINISTRAR Y CONFIGURAR MASTERPLA', ruc: '20602193676', direccion: 'AV. ALFREDO MALDONADO NRO 654', flagEstado: true }
    ]);
    this.allEmpresasMap.set('user01', [
      { empresaCod: '00004', razonSocial: 'ADMINISTRAR Y CONFIGURAR MASTERPLA', ruc: '20602193676', direccion: 'AV. ALFREDO MALDONADO NRO 654', flagEstado: false },
      { empresaCod: '00005', razonSocial: 'SERVICIOS GENERALES S.R.L.', ruc: '20501145234', direccion: 'AV. ALFREDO MALDONADO NRO 654', flagEstado: true }
    ]);
  }

  onUsuarioSelect(event: any) {
    if (this.usuarios.find(u => u.isEditing)) {
      this.selectedUsuario = event.previousValue;
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Guarde o cancele la edición actual antes de cambiar de usuario'
      });
      setTimeout(() => {
        this.selectedUsuario = this.usuarios.find(u => u.isEditing) || event.previousValue;
      }, 0);
      return;
    }
    this.empresasUsuario = this.allEmpresasMap.get(event.data.id) || [];
  }

  agregarNuevo() {
    const editing = this.usuarios.find(u => u.isEditing || u.isNew);
    if (editing) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Complete o cancele la edición actual antes de agregar uno nuevo'
      });
      return;
    }

    const nuevoUsuario: UsuarioView = {
      id: '',
      nombre: '',
      clave: '',
      perfil: '',
      isEditing: true,
      isNew: true
    };
    this.usuarios.push(nuevoUsuario);
    this.selectedUsuario = nuevoUsuario;
    this.empresasUsuario = [];
  }

  editar(usuario: UsuarioView) {
    const editing = this.usuarios.find(u => u.isEditing);
    if (editing && editing !== usuario) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Complete o cancele la edición actual'
      });
      return;
    }

    this.selectedUsuario = usuario;
    this.originalUsuario = { ...usuario };
    usuario.isEditing = true;
  }

  eliminar(usuario: UsuarioView, index: number) {
    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar al usuario '${usuario.nombre}'?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.usuarios.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario eliminado correctamente'
        });
        if (this.selectedUsuario === usuario) {
          this.selectedUsuario = null;
          this.empresasUsuario = [];
        }
      }
    });
  }

  cancelar(usuario: UsuarioView, index: number) {
    if (usuario.isNew) {
      this.usuarios.splice(index, 1);
      this.selectedUsuario = this.usuarios.length > 0 ? this.usuarios[0] : null;
    } else {
      if (this.originalUsuario) {
        this.usuarios[index] = { ...this.originalUsuario };
      }
      this.usuarios[index].isEditing = false;
      this.originalUsuario = null;
    }
    if (this.selectedUsuario) {
      this.empresasUsuario = this.allEmpresasMap.get(this.selectedUsuario.id) || [];
    } else {
      this.empresasUsuario = [];
    }
  }

  guardar(usuario: UsuarioView, index: number) {
    if (!usuario.id || !usuario.nombre || !usuario.clave || !usuario.perfil) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos (Id, Nombre, Clave y Perfil) son obligatorios'
      });
      return;
    }

    if (usuario.isNew) {
      const existe = this.usuarios.find((u, i) => i !== index && u.id === usuario.id);
      if (existe) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ya existe un usuario con este Id'
        });
        return;
      }
      this.allEmpresasMap.set(usuario.id, []);
    }

    usuario.isEditing = false;
    usuario.isNew = false;
    this.originalUsuario = null;

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Usuario guardado correctamente'
    });
  }

  get editingUsuario(): UsuarioView | null {
    return this.usuarios.find(u => u.isEditing) || null;
  }

  editarSeleccionado() {
    if (!this.selectedUsuario) return;
    this.editar(this.selectedUsuario); 
  }

  eliminarSeleccionado() {
    if (!this.selectedUsuario) return;

    const index = this.usuarios.findIndex(u => u.id === this.selectedUsuario?.id);
    if (index === -1) return;

    this.eliminar(this.selectedUsuario, index);
  }

  cancelarSeleccionado() {
    const usuario = this.editingUsuario;
    if (!usuario) return;

    const index = this.usuarios.findIndex(u => u === usuario);
    if (index === -1) return;

    this.cancelar(usuario, index);
  }

  guardarSeleccionado() {
    const usuario = this.editingUsuario;
    if (!usuario) return;

    const index = this.usuarios.findIndex(u => u === usuario);
    if (index === -1) return;

    this.guardar(usuario, index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
