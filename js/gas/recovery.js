function calcRecoveryRate(){

    //入力値取得
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

    //入力値チェック
    if (
     beforePressure <= 0 ||
     afterPressure < 0 ||
     isNaN(beforeTemp) ||
     isNaN(afterTemp)
    ){
     document.getElementById("recoveryRateResult").innerHTML =
     "入力値を確認してください";
     return;
    }
    
    //単位変換
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

    let afterPaAbs;

    if(afterUnit === "Pa"){
        afterPaAbs = afterPressure;
    }
    else if(afterUnit === "Torr"){
        afterPaAbs = afterPressure * 133.322;
    }
    else if(afterUnit === "bar"){
        afterPaAbs = afterPressure * 100000;
    }
    
    //SF620℃換算
    const beforeSf6k =
    0.0043 * (beforeMPaAbs - 0.101325) + 0.0003 + 0.0002 * (beforeMPaAbs - 0.101325) * (beforeMPaAbs - 0.101325);

    const beforeMPaAbs20 =
    beforeMPaAbs + (beforeSf6k * (20 - beforeTemp));

    const beforePaAbs20 =
    beforeMPaAbs20 * 1000000;

    const afterPaAbs20 =
    afterPaAbs * (273.15 + 20) / (273.15 + afterTemp);

    //回収率計算
    const recoveryRate =
    (beforePaAbs20 - afterPaAbs20) / beforePaAbs20 * 100;

    //結果表示
    document.getElementById("recoveryRateResult").innerHTML =
    `
    <div class="result-card">

    <div class="result-title">
        回収率
    </div>

    <div class="result-value">
        ${recoveryRate.toFixed(2)} %
    </div>
    
    </div>
    `;

}

function calcTargetPressure(){

    const pressure =
    Number(document.getElementById("targetPressure").value);

    const unit =
    document.getElementById("targetUnit").value;

    const recovery =
    Number(document.getElementById("targetRecovery").value);

    //入力値チェック
    if (
     pressure < 0 ||
     isNaN(recovery)
    ){
     document.getElementById("targetPressureResult").innerHTML =
     "入力値を確認してください";
     return;
    }

    //単位変換
    let absMPa;

    if(unit === "MPa,G"){
        absMPa = pressure + 0.101325;
    }
    else if(unit === "MPa,abs"){
        absMPa = pressure;
    }
    else if(unit === "kgf,G"){
        absMPa = pressure * 0.0980665 + 0.101325;
    }
    else if(unit === "kgf,abs"){
        absMPa = pressure * 0.0980665;
    }

    //目標値計算
    const absPa =
    absMPa * 1000000;

    const remainGasPa =
    absPa * (1 - recovery / 100);

    const remainGasTorr =
    remainGasPa / 133.322

    const remainGasBar =
    remainGasPa / 100000

    //結果表示
    document.getElementById("targetPressureResult").innerHTML =
    `
    <div class="result-card">

        <div class="result-title">
            目標残圧
        </div>

        <div class="result-value">
            ${remainGasPa.toFixed(0)} Pa
        </div>

        <div class="result-value">
            ${remainGasTorr.toFixed(1)} Torr
        </div>

        <div class="result-value">
            ${remainGasBar.toFixed(4)} bar
        </div>
        
    </div>
    `;
}