"use strict";

// MAIN PROGRAM
var oEmpresa = new Empresa();

registrarEventos();

// Registro de eventos
function registrarEventos() {
  // Opciones de menú
  document
    .querySelector("#mnuAltaVehiculo")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuAltaRegistroMantenimiento")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuBuscarRegistroMantenimiento")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuListadoMantenimientosPorVehiculo")
    .addEventListener("click", mostrarFormulario);

  // Botones
  frmAltaVehiculo.btnAceptarAltaVehiculo.addEventListener(
    "click",
    procesarAltaVehiculo
  );
  frmAltaRegistroMantenimiento.btnAceptarAltaRegistroMantenimiento.addEventListener(
    "click",
    procesarAltaRegistroMantenimiento
  );
  frmBuscarRegistroMantenimiento.btnBuscarRegistroMantenimiento.addEventListener(
    "click",
    procesarBuscarRegistroMantenimiento
  );
  frmListadoMantenimientosPorVehiculo.btnAceptarListadoPorVehiculo.addEventListener(
    "click",
    procesarListadoMantenimientosPorVehiculo
  );
}

function mostrarFormulario(oEvento) {
  let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

  ocultarFormularios();

  switch (opcionMenu) {
    case "mnuAltaVehiculo":
      frmAltaVehiculo.style.display = "block";
      break;
    case "mnuAltaRegistroMantenimiento":
      frmAltaRegistroMantenimiento.style.display = "block";
      break;
    case "mnuBuscarRegistroMantenimiento":
      frmBuscarRegistroMantenimiento.style.display = "block";
      break;
    case "mnuListadoMantenimientosPorVehiculo":
      frmListadoMantenimientosPorVehiculo.style.display = "block";
      actualizarDesplegableVehiculos(undefined);
      break;
  }
}

function ocultarFormularios() {
  frmAltaVehiculo.style.display = "none";
  frmAltaRegistroMantenimiento.style.display = "none";
  frmBuscarRegistroMantenimiento.style.display = "none";
  frmListadoMantenimientosPorVehiculo.style.display = "none";
  // Borrado del contenido de capas con resultados
  document.querySelector("#resultadoBusquedaMantenimientos").innerHTML = "";
  document.querySelector("#listadoMantenimientosPorVehiculo").innerHTML = "";
}

async function actualizarDesplegableVehiculos(idVehiculoSeleccionado) {
    try {
      let respuesta = await oEmpresa.getVehiculos();
      let options = "";
  
      for (let vehiculo of respuesta.datos) {
        if (
          idVehiculoSeleccionado &&
          idVehiculoSeleccionado == vehiculo.vehicle_id
        ) {
          options +=
            "<option selected value='" +
            vehiculo.vehicle_id +
            "' >" +
            vehiculo.license_plate +
            "</option>";
        } else {
          options +=
            "<option value='" +
            vehiculo.vehicle_id +
            "' >" +
            vehiculo.license_plate +
            "</option>";
        }
      }
  
      document.getElementById("listadoMantenimientosPorVehiculo").innerHTML = options;
    } catch (error) {
      console.error("Error al actualizar el desplegable de vehículos:", error);
    }
  }
async function procesarBuscarRegistroMantenimiento() {
  if (validarBuscarRegistroMantenimiento()) {
    let idRegistroMantenimiento = parseInt(
      frmBuscarRegistroMantenimiento.txtIdRegistroMantenimiento.value.trim()
    );

    let respuesta = await oEmpresa.buscarRegistroMantenimiento(
      idRegistroMantenimiento
    );

    if (!respuesta.error) {
      // Si NO hay error
      let resultadoBusqueda = document.querySelector(
        "#resultadoBusquedaMantenimientos"
      );

      // Escribimos resultado
      let tablaSalida = "<table class='table'>";
      tablaSalida +=
        "<thead><tr><th>RECORD_ID</th><th>FECHA</th><th>TIPO</th><th>DESCRIPCIÓN</th><th>COSTO</th><th>VEHÍCULO ID</th><th>TECHNICIAN</th><th>ASSIGNED BOX</th><th>ACCION</th></tr></thead>";
      tablaSalida += "<tbody><tr>";
      tablaSalida += "<td>" + respuesta.datos.record_id + "</td>";
      tablaSalida += "<td>" + respuesta.datos.maintenance_date + "</td>";
      tablaSalida += "<td>" + respuesta.datos.maintenance_type + "</td>";
      tablaSalida += "<td>" + respuesta.datos.maintenance_description + "</td>";
      tablaSalida += "<td>" + respuesta.datos.cost + "</td>";
      tablaSalida += "<td>" + respuesta.datos.vehicle_id + "</td>";
      tablaSalida += "<td>" + respuesta.datos.technician + "</td>";
      tablaSalida += "<td>" + respuesta.datos.assigned_box + "</td>";
      tablaSalida +=
        "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarRegistroMantenimiento' data-idregistro='" +
        respuesta.datos.record_id +
        "'></td>";
      tablaSalida += "</tr></tbody></table>";

      resultadoBusqueda.innerHTML = tablaSalida;
      resultadoBusqueda.style.display = "block";

      // Registrar evento para el botón borrar
      document
        .querySelector("#btnBorrarRegistroMantenimiento")
        .addEventListener("click", borrarRegistroMantenimiento);
    } else {
      // Si hay error
      alert(respuesta.mensaje);
    }
  }
}

async function procesarListadoMantenimientosPorVehiculo() {
  // Recuperar idVehiculo seleccionado
  let idVehiculo = frmListadoMantenimientosPorVehiculo.listadoMantenimientosPorVehiculo.value;

  let respuesta = await oEmpresa.listadoMantenimientosPorVehiculo(idVehiculo);

  let tabla =
    "<table class='table table-striped' id='listadoMantenimientosPorVehiculo'>";
  tabla +=
    "<thead><tr><th>RECORD_ID</th><th>FECHA</th><th>TIPO</th><th>DESCRIPCIÓN</th><th>COSTO</th><th>VEHÍCULO ID</th><th>TECHNICIAN</th><th>ASSIGNED BOX</th><th>ACCION</th></tr></thead><tbody>";

  for (let mantenimiento of respuesta.datos) {
    tabla += "<tr><td>" + mantenimiento.record_id + "</td>";
    tabla += "<td>" + mantenimiento.maintenance_date + "</td>";
    tabla += "<td>" + mantenimiento.maintenance_type + "</td>";
    tabla += "<td>" + mantenimiento.maintenance_description + "</td>";
    tabla += "<td>" + mantenimiento.cost + "</td>";
    tabla += "<td>" + mantenimiento.vehicle_id + "</td>";
    tabla += "<td>" + mantenimiento.technician + "</td>";
    tabla += "<td>" + mantenimiento.assigned_box + "</td>";

    tabla +=
      "<td><button class='btn btn-primary' data-mantenimiento='" +
      JSON.stringify(mantenimiento) +
      "'><i class='bi bi-pencil-square'></i></button></td></tr>";
  }

  tabla += "</tbody></table>";

  // Agregamos el contenido a la capa de listados
  document.querySelector("#lstVehiculo").innerHTML = tabla;
  // Agregar manejador de evento para toda la tabla
  document
    .querySelector("#lstVehiculo")
    .addEventListener("click", procesarBotonEditarMantenimiento);
}

function procesarBotonEditarMantenimiento(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    // 1.Ocultar todos los formularios
    ocultarFormularios();
    // 2.Mostrar el formulario de modificación de mantenimientos
    frmModificarRegistroMantenimiento.style.display = "block";
    // 3. Rellenar los datos de este formulario con los del mantenimiento
    let mantenimiento = JSON.parse(boton.dataset.mantenimiento);

    frmModificarRegistroMantenimiento.txtModIdRegistroMantenimiento.value =
      mantenimiento.record_id;
    frmModificarRegistroMantenimiento.txtModFecha.value =
      mantenimiento.maintenance_date;
    frmModificarRegistroMantenimiento.txtModTipo.value =
      mantenimiento.maintenance_type;
    frmModificarRegistroMantenimiento.txtModDescripcion.value =
      mantenimiento.maintenance_description;
    frmModificarRegistroMantenimiento.txtModCosto.value = mantenimiento.cost;
    frmModificarRegistroMantenimiento.txtModVehiculoId.value =
      mantenimiento.vehicle_id;
    frmModificarRegistroMantenimiento.txtModTechnician.value =
      mantenimiento.technician;
    frmModificarRegistroMantenimiento.txtModAssignedBox.value =
      mantenimiento.assigned_box;
    actualizarDesplegableVehiculos(mantenimiento.vehicle_id);
  }
}

async function procesarModificarRegistroMantenimiento() {
  // Recuperar datos del formulario frmModificarRegistroMantenimiento
  let idRegistroMantenimiento =
    frmModificarRegistroMantenimiento.txtModIdRegistroMantenimiento.value.trim();
  let fecha = frmModificarRegistroMantenimiento.txtModFecha.value.trim();
  let tipo = frmModificarRegistroMantenimiento.txtModTipo.value.trim();
  let descripcion =
    frmModificarRegistroMantenimiento.txtModDescripcion.value.trim();
  let costo = 
    frmModificarRegistroMantenimiento.txtModCosto.value.trim()
  ;
  let vehiculoId =
    frmModificarRegistroMantenimiento.txtModVehiculoId.value.trim();
  let technician =
    frmModificarRegistroMantenimiento.txtModTechnician.value.trim();
  let assignedBox =
    frmModificarRegistroMantenimiento.txtModAssignedBox.value.trim();

  // Validar datos del formulario
  if (validarModificarRegistroMantenimiento()) {
    let respuesta = await oEmpresa.modificarRegistroMantenimiento(
      new RegistroMantenimiento(
        idRegistroMantenimiento,
        fecha,
        tipo,
        descripcion,
        costo,
        vehiculoId,
        technician,
        assignedBox
      )
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmModificarRegistroMantenimiento.reset();
      // Ocultar el formulario
      frmModificarRegistroMantenimiento.style.display = "none";
    }
  }
}

function validarModificarRegistroMantenimiento() {
  // Recuperar datos del formulario frmModificarRegistroMantenimiento
  let idRegistroMantenimiento =
    frmModificarRegistroMantenimiento.txtModIdRegistroMantenimiento.value.trim();
  let fecha = frmModificarRegistroMantenimiento.txtModFecha.value.trim();
  let tipo = frmModificarRegistroMantenimiento.txtModTipo.value.trim();
  let descripcion =
    frmModificarRegistroMantenimiento.txtModDescripcion.value.trim();
  let costo = 
    frmModificarRegistroMantenimiento.txtModCosto.value.trim()
  ;
  let vehiculoId =
    frmModificarRegistroMantenimiento.txtModVehiculoId.value.trim();
  let technician =
    frmModificarRegistroMantenimiento.txtModTechnician.value.trim();
  let assignedBox =
    frmModificarRegistroMantenimiento.txtModAssignedBox.value.trim();

  let valido = true;
  let errores = "";

  if (isNaN(idRegistroMantenimiento) || isNaN(vehiculoId)) {
    valido = false;
    errores +=
      "Los campos ID de registro, costo y vehículo ID deben ser numéricos.";
  }

  if (
    fecha.length == 0 ||
    tipo.length == 0 ||
    descripcion.length == 0 ||
    technician.length == 0 ||
    assignedBox.length == 0||
    costo.length == 0
  ) {
    valido = false;
    errores += "Ningún campo puede estar vacío.";
  }

  if (!valido) {
    1;
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function borrarRegistroMantenimiento(oEvento) {
  let boton = oEvento.target;
  let idRegistroMantenimiento = boton.dataset.idregistro;

  let respuesta = await oEmpresa.eliminarRegistroMantenimiento(
    idRegistroMantenimiento
  );

  alert(respuesta.mensaje);

  if (!respuesta.error) {
    // Si NO hay error
    // Borrado de la tabla html
    document.querySelector("#resultadoBusquedaMantenimientos").innerHTML = "";
  }
}

function validarBuscarRegistroMantenimiento() {
  let idRegistroMantenimiento = parseInt(
    frmBuscarRegistroMantenimiento.txtIdRegistroMantenimiento.value.trim()
  );
  let valido = true;
  let errores = "";

  if (isNaN(idRegistroMantenimiento)) {
    valido = false;
    errores += "El ID de registro de mantenimiento debe ser numérico.";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function procesarAltaVehiculo() {
  // Recuperar datos del formulario frmAltaVehiculo
  let vehicle_make = frmAltaVehiculo.txtMarca.value.trim();
  let vehicle_model = frmAltaVehiculo.txtModelo.value.trim();
  let vehicle_year = frmAltaVehiculo.txtAnio.value.trim();
  let license_plate = frmAltaVehiculo.txtMatricula.value.trim();
  let owner = frmAltaVehiculo.txtPropietario.value.trim();
  let fuel_type = frmAltaVehiculo.txtCombustible.value.trim();
  let kilometers = frmAltaVehiculo.txtKilometros.value.trim();
  let color = frmAltaVehiculo.txtColor.value.trim();

  // Validar datos del formulario
  if (validarAltaVehiculo()) {
    let respuesta = await oEmpresa.altaVehiculo(
      new Vehiculo(
        undefined,
        vehicle_make,
        vehicle_model,
        vehicle_year,
        license_plate,
        owner,
        fuel_type,
        kilometers,
        color
      )
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmAltaVehiculo.reset();
      // Ocultar el formulario
      frmAltaVehiculo.style.display = "none";
    }
  }
}
function validarAltaVehiculo() {
  // Recuperar datos del formulario frmAltaVehiculo
  let vehicle_make = frmAltaVehiculo.txtMarca.value.trim();
  let vehicle_model = frmAltaVehiculo.txtModelo.value.trim();
  let vehicle_year = frmAltaVehiculo.txtAnio.value.trim();
  let license_plate = frmAltaVehiculo.txtMatricula.value.trim();
  let owner = frmAltaVehiculo.txtPropietario.value.trim();
  let fuel_type = frmAltaVehiculo.txtCombustible.value.trim();
  let kilometers = frmAltaVehiculo.txtKilometros.value.trim();
  let color = frmAltaVehiculo.txtColor.value.trim();

  let valido = true;
  let errores = "";

  if (
    vehicle_make.length == 0 ||
    vehicle_model.length == 0 ||
    owner.length == 0 ||
    fuel_type.length == 0 ||
    color.length == 0 ||
    vehicle_year.length == 0 ||
    license_plate.length == 0 ||
    kilometers.length == 0
  ) {
    valido = false;
    errores += "Ningún campo puede estar vacío.";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}
// function mostrarListadoVehiculo() {
//     let listadoVehiculo = document.querySelector("#listados");
//     listadoVehiculo.style.display = "block";
// }
async function procesarAltaRegistroMantenimiento() {
  // Recuperar datos del formulario frmAltaRegistroMantenimiento
  let maintenance_date = frmAltaRegistroMantenimiento.txtFecha.value.trim();
  let maintenance_type = frmAltaRegistroMantenimiento.txtTipo.value.trim();
  let maintenance_description =
    frmAltaRegistroMantenimiento.txtDescripcion.value.trim();
  let cost = frmAltaRegistroMantenimiento.txtCosto.value.trim();
  let vehicle_id = frmAltaRegistroMantenimiento.lstAltaVehiculo.value.trim();
  let technician = frmAltaRegistroMantenimiento.txtTechnician.value.trim();
  let assigned_box = frmAltaRegistroMantenimiento.txtAssignedBox.value.trim();

  // Validar datos del formulario
  if (validarAltaRegistroMantenimiento()) {
    let respuesta = await oEmpresa.altaRegistroMantenimiento(
      new RegistroMantenimiento(
        undefined,
        maintenance_date,
        maintenance_type,
        maintenance_description,
        cost,
        vehicle_id,
        technician,
        assigned_box
      )
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmAltaRegistroMantenimiento.reset();
      // Ocultar el formulario
      frmAltaRegistroMantenimiento.style.display = "none";
    }
  }
}

function validarAltaRegistroMantenimiento() {
  // Recuperar datos del formulario frmAltaRegistroMantenimiento
  let maintenance_date = frmAltaRegistroMantenimiento.txtFecha.value.trim();
  let maintenance_type = frmAltaRegistroMantenimiento.txtTipo.value.trim();
  let maintenance_description =
    frmAltaRegistroMantenimiento.txtDescripcion.value.trim();
  let cost = frmAltaRegistroMantenimiento.txtCosto.value.trim();
  let vehicle_id = frmAltaRegistroMantenimiento.lstAltaVehiculo.value.trim();
  let technician = frmAltaRegistroMantenimiento.txtTechnician.value.trim();
  let assigned_box = frmAltaRegistroMantenimiento.txtAssignedBox.value.trim();

  let valido = true;
  let errores = "";

  if (
    maintenance_date.length == 0 ||
    maintenance_type.length == 0 ||
    maintenance_description.length == 0 ||
    cost.length == 0 ||
    technician.length == 0 ||
    assigned_box.length == 0 ||
    vehicle_id.length == 0
  ) {
    valido = false;
    errores += "Ningún campo puede estar vacío.";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}
