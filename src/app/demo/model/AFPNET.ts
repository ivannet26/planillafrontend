export interface AfpNetResumen {
  afp: string;
  altoRiesgo: string;
  remuAsegurable: number;
  aporteObligatorio: number;
  aporteTrabSinFin: number;
  aporteTrabConFin: number;
  aporteEmpVolun: number;
  fondoPensiones: number;
  seguro: number;
  comision: number;
  comisionRetribucion: number;
  aporteAltoRiesgoTrab: number;
  aporteAltoRiesgoEmple: number;
  snp: number;
}

export interface AfpNetDetalle {
  afp: string;
  trabajadorCodigo: string;
  trabajadorDoc: string;
  apellidosNombres: string;
  cuspp: string;
  remuAsegurable: number;
  aporteObligatorio: number;
  aporteTrabSinFin: number;
  aporteTrabConFin: number;
  aporteEmpVolun: number;
  seguro: number;
  comision: number;
  aporteAltoRiesgoTrab: number;
  aporteAltoRiesgoEmple: number;
  snp: number;
  altoRiesgo: number;
  relacionLaboral: number;
  relacionLaboralInicio: number;
  relacionLaboralFin: number;
}