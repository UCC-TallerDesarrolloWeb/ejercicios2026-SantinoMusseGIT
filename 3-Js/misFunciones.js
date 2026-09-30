/**
 * Conversión de unidades de metros, pies, yardas y pulgadas
 * @method convertirUnidades
 * @param {string} id - El tipo de unidad de origen
 * @param {number} valor - El valor a convertir
 * @return {void}
 */

function cambiarUnidades(id, valor) {
    var metro, pulgada, pie, yarda;

    if(valor.includes(",")) {
        valor = valor.replace(",", ".");
    }
    if(isNaN(valor)) {
        alert("Por favor ingrese un valor numérico." + id);
        metro = "";
        pulgada = "";
        pie = "";
        yarda = "";
    }else if(id === 'metro') {
        metro = valor;
        pulgada = valor * 39.3701;
        pie = valor * 3.28084;
        yarda = valor * 1.09361;
    }else if(id === 'pulgada') {
        metro = valor * 0.0254;
        pulgada = valor;
        pie = valor * 0.0833333;
        yarda = valor * 0.0277778;
    }else if(id === 'pie') {
        metro = valor * 0.3048;
        pulgada = valor * 12;
        pie = valor;
        yarda = valor * 0.333333;
    }else if(id === 'yarda') {
        metro = valor * 0.9144;
        pulgada = valor * 36;
        pie = valor * 3;
        yarda = valor;
    }

    document.lasUnidades.unid_metro.value = math.round (metro*100)/100;
    document.lasUnidades.unid_pulgada.value = math.round (pulgada*100)/100;
    document.lasUnidades.unid_pie.value = math.round (pie*100)/100;
    document.lasUnidades.unid_yarda.value = math.round (yarda*100)/100;
}

function convertirUnidades(id, valor) {
    valor = parseFloat(valor.replace(",", "."));

    if (isNaN(valor)) {
        alert("Por favor ingrese un valor numérico.");
        return;
    }

    var metro;
    if (id === 'metro') metro = valor;
    else if (id === 'pulgada') metro = valor * 0.0254;
    else if (id === 'pie') metro = valor * 0.3048;
    else if (id === 'yarda') metro = valor * 0.9144;

    if (id !== 'metro')   document.getElementById('metro').value = Math.round(metro * 100) / 100;
    if (id !== 'pulgada') document.getElementById('pulgada').value = Math.round(metro * 39.3701 * 100) / 100;
    if (id !== 'pie')     document.getElementById('pie').value = Math.round(metro * 3.28084 * 100) / 100;
    if (id !== 'yarda')   document.getElementById('yarda').value = Math.round(metro * 1.09361 * 100) / 100;
}

function convertirGradosRadianes(id) {
    var grad, rad;

    if (id === "grados") {
        grad = parseFloat(document.getElementById("grados").value.replace(",", "."));
        if (isNaN(grad)) {
            alert("Por favor ingrese un valor numérico.");
            return;
        }
        rad = grad * Math.PI / 180;
        document.getElementById("radianes").value = rad;
    } else {
        rad = parseFloat(document.getElementById("radianes").value.replace(",", "."));
        if (isNaN(rad)) {
            alert("Por favor ingrese un valor numérico.");
            return;
        }
        grad = rad * 180 / Math.PI;
        document.getElementById("grados").value = grad;
    }
}

function mostrar_ocultar(valorMO){
    if(valorMO=="val_mostrar"){
        document.getElementById("divMO").style.display="block";
    }else{
        document.getElementById("divMO").style.display="none";
    }
}

function calcularOperacion(letra) {
    var n1 = parseFloat(document.getElementById("num" + letra + "1").value.replace(",", "."));
    var n2 = parseFloat(document.getElementById("num" + letra + "2").value.replace(",", "."));
    var total = document.getElementById("total" + letra.toUpperCase());

    if (isNaN(n1) || isNaN(n2)) {
        total.value = "";
        return;
    }

    if (letra === "s") total.value = n1 + n2;
    else if (letra === "r") total.value = n1 - n2;
    else if (letra === "m") total.value = n1 * n2;
    else if (letra === "d") {
        if (n2 === 0) {
            alert("No se puede dividir por cero.");
            total.value = "";
            return;
        }
        total.value = n1 / n2;
    }
}