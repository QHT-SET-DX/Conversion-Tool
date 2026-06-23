function calc20deg(){

    //入力取得
    const inputPressure =
    Number(document.getElementById("gaugePressure").value);

    const unit =
    document.getElementById("pressureUnit").value;

    const temp =
    Number(document.getElementById("currentTemp").value);
 
    //入力値チェック
    if (
     inputPressure <= 0 ||
     isNaN(temp)
    ){
     document.getElementById("temp20Result").innerHTML =
     "入力値を確認してください";
     return;
    }

    //単位変換
    let gaugeMPa;

    if(unit === "MPa"){
        gaugeMPa = inputPressure;
    }
    else{
        gaugeMPa = inputPressure / 10.1972;
    }

    //絶対値換算
    const absPressure = 
    gaugeMPa + 0.101325;

    //SF6換算
    const sf6k =
    0.0043 * gaugeMPa + 0.0003 + 0.0002 * gaugeMPa * gaugeMPa;

    const sf6abs20 =
    absPressure + (sf6k * (20 - temp));

    const sf6gauge20 =
    sf6abs20 - 0.101325;

    //理想気体換算
    const abs20 =
    absPressure * (273.15 + 20) / (273.15 + temp);

    const gauge20 =
    abs20 - 0.101325;

    //表示単位変換
    let displaySf6Gauge20;
    let displaySf6Abs20;

    if(unit === "MPa"){
    displaySf6Gauge20 = sf6gauge20;
    displaySf6Abs20 = sf6abs20;
    }
    else{
    displaySf6Gauge20 = sf6gauge20 * 10.1972;
    displaySf6Abs20 = sf6abs20 * 10.1972;
    }

    let displayGauge20;
    let displayAbs20;
    let displayUnit;

    if(unit === "MPa"){
        displayGauge20 = gauge20;
        displayAbs20 = abs20;
        displayUnit = "MPa";
    }

    else{
        displayGauge20 = gauge20 * 10.1972;
        displayAbs20 = abs20 * 10.1972;
        displayUnit = "kgf/cm²";
    }

    //絶対圧の表示単位変換
    let displayAbsPressure;

    if(unit === "MPa"){
        displayAbsPressure = absPressure;
    }
    else{
        displayAbsPressure = absPressure * 10.1972;
    }

    //結果表示
    document.getElementById("temp20Result").innerHTML = 
    `
    絶対圧: ${displayAbsPressure.toFixed(3)} ${displayUnit}<br>
    <br>
    SF6 20℃換算ゲージ圧:${displaySf6Gauge20.toFixed(3)} ${displayUnit}<br>
    SF6 20℃換算絶対圧:${displaySf6Abs20.toFixed(3)} ${displayUnit}<br>
    <br>
    理想気体 20℃換算ゲージ圧: ${displayGauge20.toFixed(3)} ${displayUnit}<br>
    理想気体 20℃換算絶対圧: ${displayAbs20.toFixed(3)} ${displayUnit}
    `;
}