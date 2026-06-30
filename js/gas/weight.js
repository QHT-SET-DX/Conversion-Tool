function calcTankCapacity(){

    const weight =
    Number(document.getElementById("gasWeight").value);

    const temp =
    Number(document.getElementById("temp").value);

    const pressure =
    Number(document.getElementById("recoveryTankPressure").value);

    if (weight <= 0 || pressure <= 0) {
    alert("重量と圧力を入力してください。");
    return;
    }

    const Z = 0.90;
    const R = 8.314462;
    const M = 0.14606;
    const fillRate = 0.80;

    const tankCapacity =
    weight * Z * R * (273.15 + temp) / (pressure * 1000000 * fillRate * M) * 1000;

    document.getElementById("tankCapacityResult").innerHTML =
    `
    <div class="result-card">

        <div class="result-title">
         回収タンク必要容量
        </div>

        <div class="result-value">
         ${tankCapacity.toFixed(3)} L
        </div>

    </div>
    `;

}

function calcGasWeight(){

    const capacity = 
    Number(document.getElementById("tankCapacity").value);

    const beforePressure =
    Number(document.getElementById("beforePressure").value);

    const beforeUnit =
    document.getElementById("beforeUnit").value;

    const beforeTemp =
    Number(document.getElementById("beforeTemp").value);

    const afterPressure =
    Number(document.getElementById("afterPressure").value);

    const afterUnit =
    document.getElementById("afterUnit").value;

    const afterTemp =
    Number(document.getElementById("afterTemp").value);

    if (
     capacity <= 0 ||
     beforePressure < 0 ||
     afterPressure < 0 ||
     isNaN(beforeTemp) ||
     isNaN(afterTemp)
    ){
     document.getElementById("gasWeightResult").innerHTML =
     "入力値を確認してください";
     return;
    }

    let beforeMPaAbs;

    if(beforeUnit === "MPa,G"){
        beforeMPaAbs = beforePressure + 0.101325;
    }
    else if(beforeUnit === "MPa,abs"){
        beforeMPaAbs = beforePressure;
    }
    else if(beforeUnit === "kgf,G"){
        beforeMPaAbs = beforePressure * 0.0980665 + 0.101325;
    }
    else if(beforeUnit === "kgf,abs"){
        beforeMPaAbs = beforePressure * 0.0980665;
    }

    let afterMPaAbs;

    if(afterUnit === "MPa,G"){
        afterMPaAbs = afterPressure + 0.101325;
    }
    else if(afterUnit === "MPa,abs"){
        afterMPaAbs = afterPressure;
    }
    else if(afterUnit === "kgf,G"){
        afterMPaAbs = afterPressure * 0.0980665 + 0.101325;
    }
    else if(afterUnit === "kgf,abs"){
        afterMPaAbs = afterPressure * 0.0980665;
    }
    
    const beforeSf6k =
    0.0043 * (beforeMPaAbs - 0.101325) + 0.0003 + 0.0002 * (beforeMPaAbs - 0.101325) * (beforeMPaAbs - 0.101325);

    const beforeMPaAbs20 =
    beforeMPaAbs + (beforeSf6k * (20 - beforeTemp));

    const beforePaAbs20 =
    beforeMPaAbs20 * 1000000;

    const afterSf6k =
    0.0043 * (afterMPaAbs - 0.101325) + 0.0003 + 0.0002 * (afterMPaAbs - 0.101325) * (afterMPaAbs - 0.101325);

    const afterMPaAbs20 =
    afterMPaAbs + (afterSf6k * (20 - afterTemp));

    const afterPaAbs20 =
    afterMPaAbs20 * 1000000;

    const Z = 0.90;
    const R = 8.314462;
    const M = 0.14606;

    const gasWeight =
    (afterPaAbs20 - beforePaAbs20) * (capacity / 1000) * M / (Z * R * 293.15)

    document.getElementById("gasWeightResult").innerHTML =
    `
    <div class="result-card">

        <div class="result-title">
         SF6ガス取扱量
        </div>

        <div class="result-value">
         ${gasWeight.toFixed(3)} kg
        </div>

    </div>
    `;

  
}