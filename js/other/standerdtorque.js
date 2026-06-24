function showTorque(){

    const size =
    document.getElementById("boltSize").value;

    const torqueTable = {

        M3:  { spanner: 5.5, torqueNm: 0.6, torqueKgf: 6 },
        M4:  { spanner: 7,   torqueNm: 1.6, torqueKgf: 16 },
        M5:  { spanner: 8,   torqueNm: 2.9, torqueKgf: 30 },
        M6:  { spanner: 10,  torqueNm: 4.9, torqueKgf: 50 },
        M7:  { spanner: 11,  torqueNm: 8.8, torqueKgf: 90 },
        M8:  { spanner: 13,  torqueNm: 11.8, torqueKgf: 120 },
        M10: { spanner: 17,  torqueNm: 23.5, torqueKgf: 240 },
        M12: { spanner: 19,  torqueNm: 41.2, torqueKgf: 420 },
        M14: { spanner: 22,  torqueNm: 67.6, torqueKgf: 690 },
        M16: { spanner: 24,  torqueNm: 100, torqueKgf: 1020 },
        M18: { spanner: 27,  torqueNm: 147, torqueKgf: 1500 },
        M20: { spanner: 30,  torqueNm: 203, torqueKgf: 2070 },
        M22: { spanner: 32,  torqueNm: 263, torqueKgf: 2680 },
        M24: { spanner: 36,  torqueNm: 338, torqueKgf: 3450 }

    };

    const data = torqueTable[size];

    document.getElementById("torqueResult").innerHTML =

    `
    <div class="result-card">

        <div class="result-title">
            標準締付トルク
        </div>

        <div class="result-value">
            ${data.torqueNm} N・m
        </div>

        <div class="result-value">
            ${data.torqueKgf} kgf・cm
        </div>

        <br>

        <div>
            ${size}
        </div>

        <div>
            二面幅：${data.spanner} mm
        </div>

    </div>
    `;
}