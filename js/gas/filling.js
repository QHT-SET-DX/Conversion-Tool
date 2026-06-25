function calcFillingPressure(){

    const target20Pressure =
    Number(document.getElementById("target20Pressure").value);

    const targetUnit =
    document.getElementById("targetUnit").value

    const temp =
    Number(document.getElementById("currentTemp").value);

    let abs20;

    if(targetUnit === "MPa,G"){
        abs20 = target20Pressure + 0.101325;
    }

    else if(targetUnit === "MPa,abs"){
        abs20 = target20Pressure;
    }
        
    else if(targetUnit === "kgf,G"){
        abs20 = target20Pressure * 0.0980665 + 0.101325;
    }

    else if(targetUnit === "kgf,abs"){
        abs20 = target20Pressure * 0.0980665;
    }

    const gauge20 = 
    abs20 - 0.101325;

    const sf6k =
    0.0043 * gauge20
    + 0.0003
    + 0.0002 * gauge20 * gauge20;

    const gaugeNow =
    gauge20 - (sf6k * (20 - temp));

    const absNow =
    gaugeNow + 0.101325;

    const kgfGauge =
    gaugeNow * 10.1972;

    const kgfAbs =
    absNow * 10.1972;

    document.getElementById("fillingResult").innerHTML =
    `
    <div class="result-card">

        <div class="result-title">
         現在温度での充填目標圧力
        </div>

        <div class="result-value">
         MPa・G ： ${gaugeNow.toFixed(3)}
        </div>

        <div class="result-value">
         MPa・abs ： ${absNow.toFixed(3)}
        </div>

        <div class="result-value">
         kgf/cm²・G ： ${kgfGauge.toFixed(2)}
        </div>

        <div class="result-value">
         kgf/cm²・abs ： ${kgfAbs.toFixed(2)}
        </div>

    </div>
    `;

}