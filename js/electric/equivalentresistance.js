function addResistor(){

    const container = document.getElementById("resistorContainer");

    const count = container.getElementsByClassName("resistor").length;

    if(count >= 10){
        alert("最大10個まで追加できます");
        return;
    }

    const row = document.createElement("div");

    row.className = "resistor-row";

    row.innerHTML = `
     <input
        type="number"
        class="resistor"
        placeholder="R${count + 1}">

     <span class="unit">Ω</span>
    `;

    container.appendChild(row);
}

function removeResistor(){

    const container = document.getElementById("resistorContainer");
    
    const resistors = container.getElementsByClassName("resistor");

    if(resistors.length <= 2){
        return;
    }

    const rows =
    container.getElementsByClassName("resistor-row");

    container.removeChild(
     rows[rows.length - 1]
    );
}

function calcEquivalent(){

    const type = 
    document.getElementById("connectionType").value;

    const resistors = 
    document.querySelectorAll(".resistor");

    let values = [];

    resistors.forEach(r => {

        const value = Number(r.value);

        if (value > 0){
            values.push(value);
        }

    });

    if (values.length < 2){

        document.getElementById("result").innerHTML =
        "抵抗値を2つ以上入力してください";

        return;
    }

    let equivalent;

    if (type === "series"){

        equivalent = 
        values.reduce((sum, r) => sum + r, 0);
    
    }

    else{

        let inverseSum = 0;
        
        values.forEach(r => {
            inverseSum += 1 / r;
        });

        equivalent = 1 / inverseSum;
    }

    document.getElementById("result").innerHTML =
    `
    <div class="result-card">

    <div class="result-title">
        合成抵抗
    </div>

    <div class="result-value">
        ${equivalent.toFixed(2)} Ω
    </div>
    
    </div>
    `;

}