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

    let afterMPaAbs;

    if(afterUnit === "Pa"){
        afterMPaAbs = afterPressure;
    }
    else if(afterUnit === "Torr"){
        afterMPaAbs = afterPressure * 133.322;
    }
    else if(afterUnit === "bar"){
        afterMPaAbs = afterPressure * 100000;
    }
    
    //SF620℃換算
    const beforeSf6k =
    0.0043 * (beforeMPaAbs - 0.101325) + 0.0003 + 0.0002 * (beforeMPaAbs - 0.101325) * (beforeMPaAbs - 0.101325);

    const beforeMPaAbs20 =
    beforeMPaAbs + (beforeSf6k * (20 - beforeTemp));

    const beforePaAbs20 =
    beforeMPaAbs20 * 1000000;

    const afterPaAbs20 =
    afterMPaAbs * (273.15 + 20) / (273.15 + afterTemp);

    //回収率計算
    const recoveryRate =
    (beforePaAbs20 - afterPaAbs20) / beforePaAbs20 * 100;

    //結果表示
    document.getElementById("recoveryRateResult").innerHTML =
    `回収率: ${recoveryRate.toFixed(2)} %`;

}