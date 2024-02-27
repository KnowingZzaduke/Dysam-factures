export const infoCells = [["", "", ""]];

export const infoFirthCells = [];
for (let i = 1; i <= 34; i++) {
  const row = [
    "", // Código
    "1", // Cantidad
    `=A${i}`, // V. Unitario
    `=B${i}*C${i}`, // Valor
  ];

  // Agregar la fila al array de datos
  infoFirthCells.push(row);
}

// Agregar la fila de suma al array de datos
infoFirthCells.push(["", "", "EQUIPOS", "=SUM(D1:D34)"]);

console.log(infoFirthCells);
export const infoSecondCells = [
  ["HORA TÉCNICO", "", "0", "=B1*C1", "=B1*10", "0", "=D1", "=SUM(G1:G6)"],
  ["REPARACION BOMBA", "", "0", "=B2*C2", "=B2*10", "0", "=D2", ""],
  ["HORA TABLERO", "", "0", "=B3*C3", "=B3*10", "0", "=D3", ""],
  [
    "HORA HED - 5:30 A 10 PM – SABADOS DIA",
    "",
    "0",
    "=B4*C4",
    "=B4*10",
    "0",
    "=D4",
    "",
  ],
  [
    "HORA HEN - 10:00 PM A 6:00 AM PM",
    "",
    "0",
    "=B5*C5",
    "=B5*10",
    "0",
    "=D5",
    "",
  ],
  [
    "HORA HEF - DOMINGOS Y FESTIVOS",
    "",
    "0",
    "=B6*C6",
    "=B6*10",
    "0",
    "=D6",
    "",
  ],
];

export const infoThirdCells = [
  ["Dia Normal despues de 7:00 pm", "", "0", "0", "=D1+(B1*C1)", "=SUM(E1:E3)"],
  ["Sabado Dia", "", "0", "0", "=D2+(B2*C2)"],
  ["Sabado (6:00 pm)-Domingo-Festivo", "", "0", "0", "=D3+(B3*C3)"],
];
export const infoFourthCells = [
  [
    "TRANSPORTE DE EQUIPOS CONTRATADOS",
    "",
    "UN",
    "0",
    "0",
    "=D1*E1",
    "=SUM(F1:F2)",
  ],
  ["TRANSPORTE PROPIO", "", "UN", "0", "0", "=D2*E2"],
];

export const infoFifthCells = [
  ["PÓLIZAS", "", "0", "=B1*C1", "=SUM(D1:D6)"],
  ["INSTALACION", "", "0", "=B2*C2"],
  ["IMPREVISTOS", "", "0", "=B3*C3"],
  ["NEGOCIACION", "", "0", "=B4*C4"],
  ["COMISION A TERCEROS", "", "0", "=B5*C5"],
  ["IMPREVISTOS   EMERGENCIAS", "", "0", "=B6*C6"],
];
