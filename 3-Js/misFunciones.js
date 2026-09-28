/**
 * Conversión de unidades de metros, pies, yardas y pulgadas
 * @method convertirUnidades
 * @param {string} id - El tipo de unidad de origen
 * @param {number} valor - El valor a convertir
 * @return {void}
 */


function convertirUnidades(id, valor) {
    if(isNaN(valor)) {
        alert("Por favor ingrese un valor numérico." + id);
        return;
    }else if(id === 'metro') {
        document.getElementById('pulgada').value = valor * 39.3701;
        document.getElementById('pie').value = valor * 3.28084;
        document.getElementById('yarda').value = valor * 1.09361;
    }else if(id === 'pulgada') {
        document.getElementById('metro').value = valor * 0.0254;
        document.getElementById('pie').value = valor * 0.0833333;
        document.getElementById('yarda').value = valor * 0.0277778;
    }else if(id === 'pie') {
        document.getElementById('metro').value = valor * 0.3048;
        document.getElementById('pulgada').value = valor * 12;
        document.getElementById('yarda').value = valor * 0.333333;
    }else if(id === 'yarda') {
        document.getElementById('metro').value = valor * 0.9144;
        document.getElementById('pulgada').value = valor * 36;
        document.getElementById('pie').value = valor * 3;
    }
}

function convertirGradosRadianes() {
    var grad, rad;

    if(id=="grados") {
        grad= document.getElementById("grados").value;
        rad=grad*Math.PI/180;
        document.getElementById("radianes").value=rad;
    }else{
        rad= document.getElementById("radianes").value;
        grad=rad*180/Math.PI;
        document.getElementById("grados").value=grad;
    }
    document.getElementById("grados").value = grad;
    document.getElementById("radianes").value = rad;
}    

function mostrar_ocultar(valorMO){
    if(valorMO=="val_mostrar"){
        document.getElementById("divMO").style.display="block";
    }else{
        document.getElementById("divMO").style.display="none";
    }
}