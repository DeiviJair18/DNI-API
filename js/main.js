let boton = document.getElementById("boton");
let dniInput = document.getElementById("dni");

// Limitar entrada solo a números y un máximo de 8 dígitos
dniInput.addEventListener("input", () => {
    dniInput.value = dniInput.value.replace(/\D/g, '').slice(0, 8);
});

boton.addEventListener("click", traerdatos);

function traerdatos() {
    let dni = dniInput.value;

    // Verificar si el DNI tiene exactamente 8 dígitos
    if (dni.length !== 8) {
        alert("El DNI debe tener exactamente 8 dígitos.");
        return;
    }

    fetch(`https://apiperu.dev/api/dni/${dni}?api_token=9a2fa19e9c4adae3207a7cbf8384f5ec19256df0e9991e58e0b109b9a927df8f`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la API.");
            }
            return response.json();
        })
        .then((datos) => {
            if (datos.success && datos.data) {
                console.log(datos.data);
                document.getElementById("doc").value = datos.data.numero;
                document.getElementById("nombre").value = datos.data.nombres;
                document.getElementById("apellido").value = datos.data.apellido_paterno + " " + datos.data.apellido_materno;
                document.getElementById("cui").value = datos.data.codigo_verificacion;
            } else {
                alert("No se encontraron datos para el DNI ingresado.");
                limpiarCampos();
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Ocurrió un problema al conectar con la API.");
        });
}

function limpiarCampos() {
    document.getElementById("doc").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("cui").value = "";
}
