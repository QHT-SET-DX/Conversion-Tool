function convertPressure(){

    const value =
    Number(document.getElementById("pressure").value);

    const unit =
    document.getElementById("unit").value;

    let mpa;

    //入力値をMPaへ統一
    if(unit === "mpa"){
        mpa = value;
    }
    else if(unit === "pa"){
        mpa =value / 1000000;
    }
    else if(unit === "kgf"){
        mpa = value / 10.1972;
    }
    else if(unit === "torr"){
        mpa = value * 133.322 / 1000000;
    }
    else if(unit === "bar"){
        mpa = value / 10;
    }
    else if(unit === "psi"){
        mpa = value / 145.038;
    }

    //全単位へ変換
    const kgf = mpa * 10.1972;
    const torr = mpa * 7500.62;
    const bar = mpa * 10;
    const psi = mpa * 145.038;
    const kpa = mpa * 1000;
    const pa = mpa * 1000000;

    document.getElementById("result").innerHTML =
    `
    <div class="result-card">

    <div class="result-title">
        換算値
    </div>

    <div class="result-value">
     MPa：${mpa.toFixed(3)}<br>
     kgf/cm²：${kgf.toFixed(3)}<br>
     Torr：${torr.toFixed(3)}<br>
     bar：${bar.toFixed(3)}<br>
     psi：${psi.toFixed(3)}<br>
     kPa：${kpa.toFixed(1)}<br>
     Pa：${pa.toFixed(0)}
    </div>
    
    </div>
    
    `;   

}