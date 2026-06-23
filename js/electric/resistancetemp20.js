function calcResistance20(){

    const resistance = 
    Number(document.getElementById("resistance").value);

    const temperature =
    Number(document.getElementById("temperature").value);

    const material =
    document.getElementById("material").value;

    const alphaTable = {
        "copper": 0.00393,
        "aluminum": 0.00429,
        "iron": 0.00651,
        "castiron": 0.005,
        "silver": 0.0038,
    }

    const alpha = alphaTable[material];

    const resistance20 =
    resistance / (1 + alpha * (temperature - 20));

    document.getElementById("temp20Result").innerHTML = 
    `
    20℃換算抵抗値:
    ${resistance20.toFixed(6)} Ω
    `;

}