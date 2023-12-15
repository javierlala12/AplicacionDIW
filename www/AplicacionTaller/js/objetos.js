class Vehiculo {
    constructor(vehicle_id, vehicle_make, vehicle_model, vehicle_year, license_plate, owner, fuel_type, kilometers, transmission_type, color) {
        this.vehicle_id = vehicle_id;
        this.vehicle_make = vehicle_make;
        this.vehicle_model = vehicle_model;
        this.vehicle_year = vehicle_year;
        this.license_plate = license_plate;
        this.owner = owner;
        this.fuel_type = fuel_type;
        this.kilometers = kilometers;
        this.transmission_type = transmission_type;
        this.color = color;
    }
}

class RegistroMantenimiento {
    constructor(record_id, maintenance_date, maintenance_type, maintenance_description, cost, vehicle_id, technician, assigned_box) {
        this.record_id = record_id;
        this.maintenance_date = maintenance_date;
        this.maintenance_type = maintenance_type;
        this.maintenance_description = maintenance_description;
        this.cost = cost;
        this.vehicle_id = vehicle_id;
        this.technician = technician;
        this.assigned_box = assigned_box;
    }
}

class Empresa {
    async altaVehiculo(oVehiculo) {
        let datos = new FormData();
        datos.append("vehicle_make", oVehiculo.vehicle_make);
        datos.append("vehicle_model", oVehiculo.vehicle_model);
        datos.append("vehicle_year", oVehiculo.vehicle_year);
        datos.append("license_plate", oVehiculo.license_plate);
        datos.append("owner", oVehiculo.owner);
        datos.append("fuel_type", oVehiculo.fuel_type);
        datos.append("kilometers", oVehiculo.kilometers);
        datos.append("color", oVehiculo.color);

        let respuesta = await peticionPOST("alta_vehiculo.php", datos);

        return respuesta;
    }

    async altaRegistroMantenimiento(oRegistroMantenimiento) {
        let datos = new FormData();
        datos.append("maintenance_date", oRegistroMantenimiento.maintenance_date);       datos.append("maintenance_type", oRegistroMantenimiento.maintenance_type);
        datos.append("maintenance_description", oRegistroMantenimiento.maintenance_description);
        datos.append("vehicle_id", oRegistroMantenimiento.vehicle_id);
        datos.append("cost", oRegistroMantenimiento.cost);
        datos.append("technician", oRegistroMantenimiento.technician);
        datos.append("assigned_box", oRegistroMantenimiento.assigned_box);

        let respuesta = await peticionPOST("alta_registro_mantenimiento.php", datos);
        console.log(respuesta);
        return respuesta;
    }

    async getVehiculos() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_vehiculos.php", datos);

        return respuesta;
    }

    async buscarRegistroMantenimiento(idRegistroMantenimiento) {
        let datos = new FormData();
        datos.append("record_id", idRegistroMantenimiento);

        let respuesta = await peticionPOST("buscar_registro_mantenimiento.php", datos);

        return respuesta;
    }
        async modificarRegistroMantenimiento(oRegistroMantenimiento) {
            let datos = new FormData();
            datos.append("record_id", oRegistroMantenimiento.record_id);
            datos.append("maintenance_date", oRegistroMantenimiento.maintenance_date);
            datos.append("maintenance_type", oRegistroMantenimiento.maintenance_type);
            datos.append("maintenance_description", oRegistroMantenimiento.maintenance_description);
            datos.append("vehicle_id", oRegistroMantenimiento.vehicle_id);
            datos.append("technician", oRegistroMantenimiento.technician);
            datos.append("assigned_box", oRegistroMantenimiento.assigned_box);

    
            let respuesta = await peticionPOST("modificar_registro_mantenimiento.php", datos);
    
            return respuesta;
        }
    
        async eliminarRegistroMantenimiento(idRegistroMantenimiento) {
            let datos = new FormData();
            datos.append("record_id", idRegistroMantenimiento);
        
            let respuesta = await peticionPOST("eliminar_registro_mantenimiento.php", datos);
        
            return respuesta;
        }
        
    
        async listadoMantenimientosPorVehiculo(idVehiculo) {
            let datos = new FormData();
            datos.append("vehicle_id", idVehiculo);
    
            let respuesta = await peticionGET("get_mantenimientos_por_vehiculo.php", datos);
    
            return respuesta;
        }
    }
    