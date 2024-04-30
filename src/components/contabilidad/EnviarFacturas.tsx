// import React, { useContext, useState, useEffect, useMemo } from "react";
// import { cellSecondCells } from "../../data/numberCells";
// import {
//   HeaderCells,
//   FirtsCells,
//   SecondCells,
//   ThirdCells,
//   FourthCells,
//   FifthCells,
//   SixthCells,
// } from "../../data/dataCells";
// import {
//   Textarea,
//   Select,
//   SelectItem,
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Pagination,
//   Input,
// } from "@nextui-org/react";

// function EnviarFacturas() {
//   const [p, setP] = useState([]);
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;
//   const pages = Math.ceil(p?.length / rowsPerPage);
//   const d = useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     return p.slice(start, end);
//   }, [page, p]);
//   const [initialFormState, setInitialFormState] =
//     useState<Record<string, any>>();
//   const [updateFields, setUpdateFields] =
//     useState<Record<string, string | number>>();

//   function changeInputsTable(
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//     key: number
//   ) {
//     const value = e.target.value;
//     const name = e.target.name;
//     console.log(key);
//     //Recomendable crear un estado inicial para los formularios
//     //[name] acá se está usando para indicar que tome el valor de name como tal, se conoce como indexación
//     setInitialFormState((prevInitial) => ({
//       ...prevInitial,
//       [name]: e.type === "number" ? parseFloat(value) || 0 : value,
//     }));
//   }

//   useEffect(() => {
//     console.log(initialFormState);
//     //Primera fila
//     const cantidad = parseFloat(initialFormState?.cantidad) || 0;
//     const valorunitario = parseFloat(initialFormState?.valorunitario) || 0;
//     const valorTotal = cantidad * valorunitario;

//     //Segunda fila
//     const basicoahora = parseFloat(initialFormState?.basicoahora) || 0;
//     const horest = parseFloat(initialFormState?.horest) || 0;

//     //Tercera fila
//     const valorHa = parseFloat(initialFormState?.valorha || 0);
//     const numeroHoras = parseFloat(initialFormState?.numerohoras || 0);
//     const transportes = parseFloat(initialFormState?.transportes || 0);

//     //Cuarta fila
//     const transporteEquiposContratdos = parseInt(
//       initialFormState?.transporteequiposcontratados || 0
//     );
//     const transportePropio = parseInt(initialFormState?.transportepropio || 0);
//     const precioUnTec = parseInt(initialFormState?.preciountec || 0);
//     const precioUnTp = parseInt(initialFormState?.preciountp || 0);
//     const valorUnTec = parseInt(initialFormState?.valoruntec || 0);
//     const valorUnTp = parseInt(initialFormState?.valoruntp || 0);

//     //Quinta fila
//     const valorFc = parseInt(initialFormState?.valorfc || 0);
//     const cantidadFc = parseInt(initialFormState?.cantidadfc || 0);

//     //Sexta fila
//     const porcentajeUbe = parseInt(
//       initialFormState?.porcentajeutilidadbrutaestimada || "50%"
//     );

//     //Operaciones segunda fila
//     const totalTiempoHoras = basicoahora * horest;
//     const vrDia = basicoahora * 10;
//     const totalDias = totalTiempoHoras;
//     const manoObraDirecta = totalDias;

//     //Operaciones tercera fila
//     const valorPagarHa = valorHa * numeroHoras + transportes;

//     //Operaciones cuarta fila
//     const valorTotalUnTec = precioUnTec * valorUnTec;
//     const valorTotalUnTp = precioUnTp * valorUnTp;
//     const valorTotalUn = valorTotalUnTec * valorTotalUnTp;

//     //Operaciones quinta fila
//     const totalFc = valorFc * cantidadFc;
//     const totalOtrosGastosFc = totalFc;

//     //Operaciones sexta fila
//     const porcentajeDeUtilidadBrutaEstimada = 0.5;
//     const totalCostos =
//       totalOtrosGastosFc + valorTotalUn + valorPagarHa + valorTotal;
//     const administracion = totalCostos * 0.05;
//     const utilidadBrutaEstimada = administracion * 0.5;
//     const totalSinIVA = utilidadBrutaEstimada + administracion + totalCostos;
//     const totalConIVA = totalSinIVA * 0.19 + totalSinIVA;

//     setUpdateFields((prevUpdate) => ({
//       ...prevUpdate,
//       valortotal: !isNaN(valorTotal) ? valorTotal.toFixed() : "0",
//       porcentajeutilidadbrutaestimada: isNaN(porcentajeDeUtilidadBrutaEstimada)
//         ? porcentajeDeUtilidadBrutaEstimada
//         : "0.50",
//       totalcostos: !isNaN(totalCostos) ? totalCostos.toFixed() : "0",
//       administracion: !isNaN(administracion) ? administracion.toFixed() : "0",
//       utilidadbrutaestimada: !isNaN(utilidadBrutaEstimada)
//         ? utilidadBrutaEstimada.toFixed()
//         : "0",
//       totalcobrarsiniva: !isNaN(totalSinIVA) ? totalSinIVA.toFixed() : "0",
//       totalconiva: !isNaN(totalConIVA) ? totalConIVA.toFixed() : "0",
//       totaltiempohoras: !isNaN(totalTiempoHoras)
//         ? totalTiempoHoras.toFixed()
//         : "0",
//       vrdia: !isNaN(vrDia) ? vrDia.toFixed() : "0",
//       totaldias: !isNaN(totalDias) ? totalDias.toFixed() : "0",
//       manoobradirecta: !isNaN(manoObraDirecta)
//         ? manoObraDirecta.toFixed()
//         : "0",
//       valorpagar: !isNaN(valorPagarHa) ? valorPagarHa.toFixed() : "0",
//       valortotaluntec: !isNaN(valorTotalUnTec)
//         ? valorTotalUnTec.toFixed()
//         : "0",
//       valortotaluntp: !isNaN(valorTotalUnTp) ? valorTotalUnTp.toFixed() : "0",
//       valorfinalun: !isNaN(valorTotalUn) ? valorTotalUn.toFixed() : "0",
//       totalfc: !isNaN(totalFc) ? totalFc.toFixed() : "0",
//       totalotrosgastos: !isNaN(totalOtrosGastosFc)
//         ? totalOtrosGastosFc.toFixed()
//         : "0",
//     }));
//     cellSecondCells.map((item) => console.log(item.key));
//   }, [initialFormState]);

//   useEffect(() => {
//     console.log(updateFields);
//   }, [updateFields]);

//   return (
//     <div className="bg-teal-100 min-h-screen w-full">
//       <h1 className="text-center pt-6 font-bold">
//         COTIZACIÓN SERVICIOS DYSAM SAS
//       </h1>
//       <div className="">
//         <form className="px-4 flex flex-col gap-4">
//           <div className="border rounded-full bg-white px-4 flex flex-row justify-center items-center align-middle w-full gap-4 py-4 my-4">
//             {HeaderCells?.map((item) => (
//               <Input
//                 type={item.type}
//                 label={item.label === "Fecha" ? (item.label = "") : item.label}
//                 name={item.name}
//                 className="flex-1"
//                 onChange={(e) => changeInputsTable(e)}
//                 key={`${item.id}-${item.label}`}
//               />
//             ))}
//             <div className="flex-1">
//               <div className="w-full flex justify-center">
//                 <Select
//                   label="Código"
//                   placeholder="Ingresa el código"
//                   className="w-full"
//                   onChange={changeInputsTable}
//                 >
//                   <SelectItem key="this" value="2">
//                     Cliente 1
//                   </SelectItem>
//                   <SelectItem key="3" value="3">
//                     Cliente 2
//                   </SelectItem>
//                 </Select>
//               </div>
//             </div>
//             <Textarea
//               label="Descripción"
//               name="descipcioncliente"
//               placeholder="Ingresa una descripción"
//               className="flex-1 h-14 w-"
//               onChange={(e) => changeInputsTable(e)}
//             />
//           </div>
//           {/* Primera tabla */}

//           <div className="">
//             <Table
//               aria-label="Example table with client side pagination"
//               bottomContent={
//                 pages > 0 ? (
//                   <div className="flex w-full justify-center">
//                     <Pagination
//                       isCompact
//                       showControls
//                       showShadow
//                       color="primary"
//                       page={page}
//                       total={pages}
//                       onChange={(page) => setPage(page)}
//                     />
//                   </div>
//                 ) : null
//               }
//               classNames={{
//                 wrapper: "min-h-[222px]",
//               }}
//             >
//               <TableHeader>
//                 <TableColumn key="codigo">CÓDIGO</TableColumn>
//                 <TableColumn key="cantidad">CANTIDAD</TableColumn>
//                 <TableColumn key="valorUnitario">VALOR UNITARIO</TableColumn>
//                 <TableColumn key="valor">VALOR</TableColumn>
//               </TableHeader>
//               <TableBody emptyContent={"No hay datos"} items={d}>
//                 <TableRow key="1">
//                   {FirtsCells?.map((item) =>
//                     item.name === "codigo" ? (
//                       <TableCell>
//                         <Select
//                           label="Cliente"
//                           placeholder="Selecciona un cliente"
//                           className="w-full"
//                         >
//                           <SelectItem key="2" value="2">
//                             Cliente 1
//                           </SelectItem>
//                           <SelectItem key="3" value="3">
//                             Cliente 2
//                           </SelectItem>
//                         </Select>
//                       </TableCell>
//                     ) : (
//                       <TableCell key={`${item.id}-${item.label}`}>
//                         <Input
//                           type={item.type}
//                           name={item.name}
//                           value={
//                             item.name === "codigo"
//                               ? initialFormState?.codigo
//                               : item.name === "cantidad"
//                               ? initialFormState?.cantidad
//                               : item.name === "valorunitario"
//                               ? initialFormState?.valorunitario
//                               : item.name === "valor"
//                               ? updateFields?.valortotal
//                               : initialFormState?.[item.name]
//                           }
//                           label={item.label}
//                           className="w-full"
//                           onChange={(e) => changeInputsTable(e)}
//                         />
//                       </TableCell>
//                     )
//                   )}
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>

//           {/* Segunda tabla */}

//           <div className="">
//             <Table
//               aria-label="Example table with client side pagination"
//               classNames={{
//                 wrapper: "min-h-[222px]",
//               }}
//             >
//               <TableHeader>
//                 <TableColumn key="detalle">DETALLE DE M.O.D</TableColumn>
//                 <TableColumn key="basicoAhora ">BASICO AHORA</TableColumn>
//                 <TableColumn key="horEst">HOR-EST</TableColumn>
//                 <TableColumn key="totalTiempoHoras">
//                   TOTAL TIEMPO/HORAS
//                 </TableColumn>
//                 <TableColumn key="vrDia">VR DÍA</TableColumn>
//                 <TableColumn key="diasEstimados">DÍAS ESTIMADOS</TableColumn>
//                 <TableColumn key="totalDias">TOTAL DÍAS</TableColumn>
//                 <TableColumn key="manoObraDirecta">
//                   MANO DE OBRA DIRECTA
//                 </TableColumn>
//               </TableHeader>
//               <TableBody emptyContent={"No hay datos"} items={d}>
//                 {cellSecondCells?.map((itemCell) => (
//                   <TableRow key={itemCell.key}>
//                     {SecondCells &&
//                       SecondCells?.map((item) => (
//                         <TableCell key={item.id}>
//                           <Input
//                             type={item.type}
//                             label={item.label}
//                             name={item.name}
//                             key={item.id}
//                             value={
//                               item.name === "basicoahora"
//                                 ? initialFormState?.basicoahora
//                                 : item.name === "horest"
//                                 ? initialFormState?.horest
//                                 : item.name === "totaltiempohoras"
//                                 ? updateFields?.totaltiempohoras
//                                 : item.name === "vrdia"
//                                 ? updateFields?.vrdia
//                                 : item.name === "diasestimados"
//                                 ? initialFormState?.diasestimados
//                                 : item.name === "totaldias"
//                                 ? updateFields?.totaldias
//                                 : item.name === "manoobradirecta"
//                                 ? updateFields?.manoobradirecta
//                                 : initialFormState?.[item.name]
//                             }
//                             className="w-full"
//                             onChange={(
//                               e: React.ChangeEvent<
//                                 HTMLInputElement | HTMLSelectElement
//                               >
//                             ) => changeInputsTable(e, itemCell.key)}
//                           />
//                         </TableCell>
//                       ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Tercera tabla */}

//           <div className="">
//             <Table
//               aria-label="Example table with client side pagination"
//               classNames={{
//                 wrapper: "min-h-[222px]",
//               }}
//             >
//               <TableHeader>
//                 <TableColumn key="horaAuxilio">HORA AUXILIO</TableColumn>
//                 <TableColumn key="valorHA">VALOR H.A</TableColumn>
//                 <TableColumn key="numeroHoras">NÚMERO/HORAS</TableColumn>
//                 <TableColumn key="transportes">TRANSPORTES</TableColumn>
//                 <TableColumn key="valorPagar">VALOR A PAGAR</TableColumn>
//               </TableHeader>
//               <TableBody emptyContent={"No hay datos"} items={d}>
//                 <TableRow key="1">
//                   {ThirdCells &&
//                     ThirdCells.map((item) => (
//                       <TableCell key={`${item.id}-${item.label}`}>
//                         <Input
//                           type={item.type}
//                           label={item.label}
//                           value={
//                             item.name === "horaauxilio"
//                               ? initialFormState?.horaauxilio
//                               : item.name === "valora"
//                               ? initialFormState?.valora
//                               : item.name === "numerohoras"
//                               ? updateFields?.numerohoras
//                               : item.name === "transportes"
//                               ? updateFields?.transportes
//                               : item.name === "valorpagar"
//                               ? updateFields?.valorpagar
//                               : initialFormState?.[item.name]
//                           }
//                           name={item.name}
//                           className="w-full"
//                           onChange={(e) => changeInputsTable(e)}
//                         />
//                       </TableCell>
//                     ))}
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>

//           {/* Cuarta tabla */}

//           <div className="">
//             <Table
//               aria-label="Example table with client side pagination"
//               classNames={{
//                 wrapper: "min-h-[222px]",
//               }}
//             >
//               <TableHeader>
//                 <TableColumn key="transporteEquiposContratdos">
//                   TRANSPORTE DE EQUIPOS CONTRATADOS
//                 </TableColumn>
//                 <TableColumn key="transportePropio">
//                   TRANSPORTE PROPIO
//                 </TableColumn>
//                 <TableColumn key="unTEC">UN T.E.C</TableColumn>
//                 <TableColumn key="unTP">UN T.P</TableColumn>
//                 <TableColumn key="precioTEC">PRECIO UN T.E.C</TableColumn>
//                 <TableColumn key="precioTP">PRECIO UN T.P</TableColumn>
//                 <TableColumn key="valorTEC">VALOR UN T.E.C</TableColumn>
//                 <TableColumn key="valorTP">VALOR UN T.P</TableColumn>
//                 <TableColumn key="valorTotalTEC">
//                   VALOR TOTAL UN T.E.C
//                 </TableColumn>
//                 <TableColumn key="valorTotalTP">VALOR TOTAL UN T.P</TableColumn>
//                 <TableColumn key="valorfinalUn">VALOR FINAL U.N</TableColumn>
//               </TableHeader>
//               <TableBody emptyContent={"No hay datos"} items={d}>
//                 <TableRow key="1">
//                   {FourthCells &&
//                     FourthCells.map((item) => (
//                       <TableCell>
//                         <Input
//                           type={item.type}
//                           label={item.label}
//                           value={
//                             item.name === "transporteequiposcontratados"
//                               ? initialFormState?.transporteequiposcontratados
//                               : item.name === "transportepropio"
//                               ? initialFormState?.transportepropio
//                               : item.name === "untec"
//                               ? updateFields?.untec
//                               : item.name === "untp"
//                               ? updateFields?.untp
//                               : item.name === "preciountec"
//                               ? initialFormState?.preciountec
//                               : item.name === "preciountp"
//                               ? initialFormState?.preciountp
//                               : item.name === "valoruntec"
//                               ? initialFormState?.valoruntec
//                               : item.name === "valoruntp"
//                               ? initialFormState?.valoruntp
//                               : item.name === "valortotaluntec"
//                               ? updateFields?.valortotaluntec
//                               : item.name === "valortotaluntp"
//                               ? updateFields?.valortotaluntp
//                               : item.name === "valorfinalun"
//                               ? updateFields?.valorfinalun
//                               : initialFormState?.[item.name]
//                           }
//                           name={item.name}
//                           className="w-full"
//                           onChange={(e) => changeInputsTable(e)}
//                         />
//                       </TableCell>
//                     ))}
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>

//           {/* Quinta tabla */}

//           <div className="">
//             <h2 className="text-center py-6 font-bold">
//               IMPUESTOS Y OTROS GASTOS
//             </h2>
//             <Table
//               aria-label="Example table with client side pagination"
//               classNames={{
//                 wrapper: "min-h-[222px]",
//               }}
//             >
//               <TableHeader>
//                 <TableColumn key="descripciónImpuestos">
//                   DESCRIPCIÓN
//                 </TableColumn>
//                 <TableColumn key="valorImpuestos">VALOR</TableColumn>
//                 <TableColumn key="cantidadImpuestos">CANTIDAD</TableColumn>
//                 <TableColumn key="totalImpuestos">TOTAL</TableColumn>
//               </TableHeader>
//               <TableBody emptyContent={"No hay datos"} items={d}>
//                 <TableRow key="1">
//                   {FifthCells &&
//                     FifthCells.map((item) => (
//                       <TableCell>
//                         <Input
//                           type={item.type}
//                           label={item.label}
//                           value={
//                             item.name === "descripcionfc"
//                               ? initialFormState?.descripcionfc
//                               : item.name === "valorfc"
//                               ? initialFormState?.valorfc
//                               : item.name === "cantidadfc"
//                               ? updateFields?.cantidadfc
//                               : item.name === "totalfc"
//                               ? updateFields?.totalfc
//                               : initialFormState?.[item.name]
//                           }
//                           name={item.name}
//                           className="w-full"
//                           onChange={(e) => changeInputsTable(e)}
//                         />
//                       </TableCell>
//                     ))}
//                 </TableRow>
//               </TableBody>
//             </Table>
//             <div className="py-4">
//               <Input
//                 type="number"
//                 label="Otros gastos"
//                 name="totalgastos"
//                 value={updateFields?.totalotrosgastos}
//                 placeholder="Ingresa otros gastos"
//                 className="w-full"
//                 onChange={(e) => changeInputsTable(e)}
//               />
//             </div>
//           </div>

//           {/* Sexta tabla */}

//           <div className="">
//             <h2 className="text-center pt-6 font-bold">VALORES FINALES</h2>
//             <div className="py-4">
//               <Input
//                 type="number"
//                 label="Porcentaje de utilidad bruta estimada"
//                 name="parcentajeutilidadbrutaestimada"
//                 value={updateFields?.porcentajeutilidadbrutaestimada}
//                 className="w-full"
//                 onChange={(e) => changeInputsTable(e)}
//               />
//             </div>
//             <Table
//               aria-label="Example table with client side pagination"
//               classNames={{
//                 wrapper: "min-h-[222px]",
//               }}
//             >
//               <TableHeader>
//                 <TableColumn key="totalCostos">TOTAL COSTOS</TableColumn>
//                 <TableColumn key="adminitracion">ADMINISTRACIÓN</TableColumn>
//                 <TableColumn key="utilidadBrutaEstimada">
//                   UTILIDAD BRUTA ESTIMADA
//                 </TableColumn>
//                 <TableColumn key="totalSinIVA">
//                   TOTAL A COBRAR SIN IVA
//                 </TableColumn>
//                 <TableColumn key="totalIVA">TOTAL CON IVA</TableColumn>
//               </TableHeader>
//               <TableBody emptyContent={"No hay datos"} items={d}>
//                 <TableRow key="1">
//                   {SixthCells &&
//                     SixthCells.map((item) => (
//                       <TableCell>
//                         <Input
//                           type={item.type}
//                           label={item.label}
//                           value={
//                             item.name === "totalcostos"
//                               ? updateFields?.totalcostos
//                               : item.name === "administracion"
//                               ? updateFields?.administracion
//                               : item.name === "utilidadbrutaestimada"
//                               ? updateFields?.utilidadbrutaestimada
//                               : item.name === "totalcobrarsiniva"
//                               ? updateFields?.totalcobrarsiniva
//                               : item.name === "totalconiva"
//                               ? updateFields?.totalconiva
//                               : initialFormState?.[item.name]
//                           }
//                           name={item.name}
//                           className="w-full"
//                           onChange={(e) => changeInputsTable(e)}
//                         />
//                       </TableCell>
//                     ))}
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EnviarFacturas;
