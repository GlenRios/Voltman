export default interface Equipments {
    area:string;
    marca?:string;
    modelo?: string;
    tipo?: string;
    capacidadNominal?: number;
    fechaInstalacion?: Date;
    vidaUtilEstimada?: number;
    estadoDeMantenimiento?: string;
    sistemaDeEnergiaCritica?: number;
    frecuenciaDeUso?: number;
    eficienciaEnergetica?: number;
    consumoPromedioDiario?: number;
}