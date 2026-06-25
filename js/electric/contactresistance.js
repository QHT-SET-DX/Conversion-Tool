function contactResistance(){

    const voltage = 
    Number(document.getElementById("voltage").value);

    const current =
    Number(document.getElementById("current").value);

    const temperature =
    Number(document.getElementById("temperature").value);

    const material =
    document.getElementById("material").value;

    const alphaTable = {
        "aluminum": 0.00429,
        "copper": 0.00393,
        "iron": 0.00651,
        "castiron": 0.005,
        "silver": 0.0038,
    }

    const alpha = alphaTable[material];

    if(current <=0){
        document.getElementById("contactResistanceResult").innerHTML =
        "電流は0Aより大きい値を入力してください"
        return;
    }

    const contactResistance =
    voltage / current * 1000;

    const contactResistance20 =
    contactResistance / (1 + alpha * (temperature - 20));

    document.getElementById("contactResistanceResult").innerHTML = 
    `
    <div class="result-card">

    <div class="result-title">
        接触抵抗値
    </div>

    <div class="result-value">
        ${contactResistance.toFixed(1)} μΩ
    </div>
    
    </div>

    <div class="result-card">

    <div class="result-title">
        接触抵抗値（導体温度補正[20℃]）
    </div>

    <div class="result-value">
        ${contactResistance20.toFixed(1)} μΩ
    </div>
    
    </div>
    `;

}