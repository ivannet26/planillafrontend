export interface TransferenciaBancaria {
  empleado: string;
  documento: string;
  apellidosNombres: string;
  importe: number;
  ctaRemuNumero: string;
  ctaRemBancoCod: string;
  bancoDesc: string;
}

export interface BancoOption {
  label: string;
  value: string;
}