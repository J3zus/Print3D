var ClearData = function(){

    //Mandan al codigo html lo que deben de ingresar en la etiqueta en este caso.
    document.getElementById('n1').innerHTML = '0';
    document.getElementById('n2').innerHTML = '0';
    document.getElementById('n3').innerHTML = '0';
    document.getElementById('n4').innerHTML = '0';
    document.getElementById('n5').innerHTML = '0';
    document.getElementById('n6').innerHTML = '0';
    document.getElementById('n7').innerHTML = '0';
    document.getElementById('n8').innerHTML = '0';
    document.getElementById('n9').innerHTML = '0';
}

var GetData = function(){

    //Obtencion de variables
    var CostoMaterial = parseFloat(document.getElementById('costo-material').value);
    var CantidadMaterial = parseFloat(document.getElementById('cantidad-material').value);
    var CostoElectricidad = parseFloat(document.getElementById('costo-electricidad').value);
    var ConsumoImpresora = parseFloat(document.getElementById('consumo-impresora').value);
    var PorcentajeFallos = parseFloat(document.getElementById('porcentaje-fallos').value);
    var CostexHoraOperador = parseFloat(document.getElementById('coste-x-hora-operador').value);
    var TiempoTrabajOperador = parseFloat(document.getElementById('tiempo-trabajo-operador').value);
    var MasaPieza = parseFloat(document.getElementById('masa-pieza').value);
    var TiempoImpresion = parseFloat(document.getElementById('tiempo-impresion').value);
    var PorcentajeGanancia = parseFloat(document.getElementById('porcentaje-ganancia').value);
    var CostoTransporte = parseFloat(document.getElementById('costo-transporte').value);
    var PagoAlquiler = parseFloat(document.getElementById('pago-alquiler').value);
    var  alquilertotal = PagoAlquiler/30;
    var CosteImpresora = parseFloat(document.getElementById('coste-impresora').value);
    var TiempoAmortizacion = parseFloat(document.getElementById('tiempo-amortizacion').value);
    var DiasActiva = parseFloat(document.getElementById('dias-activa').value);
    var HorasxDia = parseFloat(document.getElementById('horas-x-dia').value);

    //Operaciones
    var CosteMaterialPlastico = MasaPieza*CostoMaterial;
    var CLuz = (CostoElectricidad*ConsumoImpresora)/60;
    var CosteMaterialElectricidad = CLuz*TiempoImpresion;
    var CosteOperarioPreparacion = CostexHoraOperador*TiempoTrabajOperador;
    var amortizacion = (CosteImpresora/(TiempoAmortizacion*DiasActiva*HorasxDia))/60;
    var CosteAmortizacion = amortizacion * TiempoImpresion;
    var CosteFallos = (CosteMaterialPlastico+CosteMaterialElectricidad+CosteOperarioPreparacion+CosteAmortizacion)*(PorcentajeFallos/100);
    var CostePieza = CosteMaterialPlastico + CosteMaterialElectricidad + CosteOperarioPreparacion + CosteAmortizacion + CosteFallos;
    var Ganancia = CostePieza*(PorcentajeGanancia/100);
    var CosteTotal = CostePieza + CostoTransporte + Ganancia;


    //Mostrar a etiquetas
    //Por si no hay datos en las cajas de texto y Eviar el NaN
    if(isNaN(CosteMaterialPlastico)){ document.getElementById('n1').innerHTML = 0; }else{ document.getElementById('n1').innerHTML = CosteMaterialPlastico.toFixed(3); }
    if(isNaN(CosteMaterialElectricidad)){ document.getElementById('n2').innerHTML = 0; }else{ document.getElementById('n2').innerHTML = CosteMaterialElectricidad.toFixed(3); }
    if(isNaN(CosteOperarioPreparacion)){ document.getElementById('n3').innerHTML = 0; }else{ document.getElementById('n3').innerHTML = CosteOperarioPreparacion.toFixed(3); }
    if(isNaN(CosteAmortizacion)){ document.getElementById('n4').innerHTML = 0; }else{ document.getElementById('n4').innerHTML = CosteAmortizacion.toFixed(3); }
    if(isNaN(CosteFallos)){ document.getElementById('n5').innerHTML = 0; }else{ document.getElementById('n5').innerHTML = CosteFallos.toFixed(3); }
    if(isNaN(CostePieza)){ document.getElementById('n6').innerHTML = 0; }else{ document.getElementById('n6').innerHTML = CostePieza.toFixed(3); }
    if(isNaN(Ganancia)){ document.getElementById('n7').innerHTML = 0; }else{ document.getElementById('n7').innerHTML = Ganancia.toFixed(3); }
    if(isNaN(CosteTotal)){ document.getElementById('n8').innerHTML = 0; }else{ document.getElementById('n8').innerHTML = CosteTotal.toFixed(3); }
    if(isNaN(alquilertotal)){ document.getElementById('n9').innerHTML = 0; }else{ document.getElementById('n9').innerHTML = alquilertotal.toFixed(3); }
    
}

function ValidarNumeros(){

    let arr = ['costo-material','cantidad-material','costo-electricidad','consumo-impresora','porcentaje-fallos',
                'coste-x-hora-operador','tiempo-trabajo-operador','masa-pieza','tiempo-impresion','porcentaje-ganancia',
                'costo-transporte','pago-alquiler','coste-impresora','tiempo-amortizacion','dias-activa','horas-x-dia'];
    
   

    for(k=0; k < arr.length; k++){

        var inputtxt = document.getElementById(arr[k]); 
        var valor = inputtxt.value;
        for(i=0;i<valor.length;i++){
            var code=valor.charCodeAt(i);
            if(code==46){
                
                //inputtxt.value=22;
            }else{

                if(code<=47 || code>=58){          
                    inputtxt.value="";
                    return;
                }
                
                var T = parseFloat(document.getElementById(arr[k]).value);
                var r = T*1;
                document.getElementById(arr[k]).value=r.toFixed(3);
            }   
        }

        
    }

}

function AboutF(){

    const BrowserWindow = require('electron').remote.BrowserWindow;
    const url = require('url');
    const path = require('path');

    let AboutWindow   //Alcanze global para despues si se elimina queda limpio los recursos del computador

    AboutWindow = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false, //Este comando es para evitar que se reescale la ventana
        webPreferences: {nodeIntegration: true}, //Para evitar problemas con el "require('electron')"
                                                 //se ocupa que las nodeIntregation sean ciertas esto por la version de electron.
        show: true
    })

    AboutWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'About.html'),
        protocol: 'file',
        slashes: true
    }))

    AboutWindow.setMenu(null);

}