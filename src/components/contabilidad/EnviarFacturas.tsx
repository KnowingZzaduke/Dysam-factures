import React, { useContext, useState, useEffect, useMemo } from "react";
import { DataContext } from "../../context/DataContext";
import { TypeFormFile } from "../../types/file";
import { TypeLoadFile } from "../../types/loadfile";
import { SigninResponse } from "../../types/login";
import {
  cells,
  SecondCells,
  ThirdCells,
  FourthCells,
  FifthCells,
  SixthCells,
} from "../../data/dataCells";
import {
  Textarea,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";

import functions from "../../data/request";
function EnviarFacturas() {
  const { reloadData } = useContext(DataContext);
  const [formFile, setFormFile] = useState<TypeFormFile>({
    username: reloadData?.user,
    date: "",
    files: {
      name: null,
    },
    statusfile: "Pendiente",
  });
  const [textareaValue, setTextareaValue] = useState("");
  const [fileSuccess, setFileSuccess] = useState(false);
  const [data, setData] = useState<SigninResponse | any>();
  const [messageErrorFile, setMessageErrorFile] = useState(false);
  const [selectOtherFile, setSelectOtherFile] = useState(false);
  const [fillInputs, setFillInputs] = useState(false);
  const [p, setP] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(p?.length / rowsPerPage);
  const d = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return p.slice(start, end);
  }, [page, p]);
  const [valuesInputs, setValuesInputs] = useState<Map<string, string>>(new Map());
  const [codeSelectedValue, setCodeSelectValue] = useState<any>(new Set([]));

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    if (name === "files") {
      const newFiles: File | null = files ? files[0] : null;
      const newFilesNoSpace: File | null = newFiles
        ? new File([newFiles], newFiles.name.replace(/\s+/g, ""))
        : null;
      setFormFile({
        ...formFile,
        files: {
          ...formFile.files,
          name: newFilesNoSpace,
        },
      });
    } else {
      setFormFile({ ...formFile, [name]: value });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessageErrorFile(false);
    const fileparams: TypeLoadFile = {
      file: formFile,
      comment: textareaValue,
    };
    try {
      const response = await functions.makereport(fileparams);
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (data?.data.salida === "exito") {
      setFileSuccess(true);
      setTimeout(() => {
        setFileSuccess(false);
        setFormFile({ ...formFile, date: "", files: { name: null } });
        setTextareaValue("");
      }, 2000);
    } else if (data?.data.salida === "error") {
      setFileSuccess(false);
      setMessageErrorFile(true);
      setTimeout(() => {
        setMessageErrorFile(false);
      }, 2000);
    } else if (data === undefined) {
      setFillInputs(true);
      setTimeout(() => {
        setFillInputs(false);
      }, 3000);
    } else {
      setSelectOtherFile(true);
      setTimeout(() => {
        setSelectOtherFile(false);
      }, 3000);
    }
  }, [data]);


  function changeInputsTable(e: React.ChangeEvent<HTMLInputElement>, inputIdentifier: string) {
    const value = e.target.value;
    console.log(inputIdentifier);
    if (value !== undefined) {
      setValuesInputs((prevValues: Map<string, string>) => {
        const newValues = new Map(prevValues);
        newValues.set(inputIdentifier,value);
        return newValues;
      });
    }
  }

  useEffect(() => {
    console.log(valuesInputs);
  }, [valuesInputs]);

  return (
    // <div
    //   className="d-flex align-items-center justify-content-center my-5 bg-info.bg-gradient"
    //   style={{ minHeight: "100vh" }}
    // >
    //   {/* <form
    //     className="was-validated border border-dark p-5 rounded bg-light"
    //     onSubmit={handleSubmit}
    //     encType="multipart/form-data"
    //   >
    //     <h1>Enviar facturas</h1>
    //     <div className="my-4">
    //       <label htmlFor="username" className="form-label">
    //         Nombre de usuario
    //       </label>
    //       <input
    //         type="text"
    //         id="username"
    //         className="form-control"
    //         value={reloadData?.user}
    //         disabled
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="dateInput">Fecha</label>
    //       <input
    //         type="date"
    //         className="form-control"
    //         id="dateInput"
    //         name="date"
    //         required
    //         value={formFile.date}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="factures">Archivo</label>
    //       <input
    //         name="files"
    //         id="factures"
    //         type="file"
    //         className="form-control"
    //         aria-label="file example"
    //         required
    //         onChange={handleInputChange}
    //       />
    //       <div className="invalid-feedback">
    //         Por favor selecciona un archivo válido
    //       </div>
    //     </div>
    //     <div className="form-floating my-3">
    //       <textarea
    //         className="form-control"
    //         placeholder="Leave a comment here"
    //         id="floatingTextarea"
    //         name="comment"
    //         required
    //         value={textareaValue}
    //         onChange={(e) => setTextareaValue(e.target.value)}
    //       ></textarea>
    //       <label htmlFor="floatingTextarea">Comentarios</label>
    //     </div>

    //     <div className="mb-3">
    //       <button className="btn btn-primary" type="submit">
    //         Enviar factura
    //       </button>
    //     </div>
    //     {fileSuccess === true ? (
    //       <div
    //         className="alert alert-success d-flex align-items-center gap-2 my-3"
    //         role="alert"
    //       >
    //         <div className="text-center">Archivo enviado correctamente</div>
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //     {messageErrorFile === true ? (
    //       <div
    //         className="alert alert-danger d-flex align-items-center gap-2 my-3"
    //         role="alert"
    //       >
    //         <FaTriangleExclamation />
    //         <div className="text-center">Hubo un error al subir el archivo</div>
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //     {selectOtherFile === true ? (
    //       <div
    //         className="alert alert-danger d-flex align-items-center gap-2 my-3"
    //         role="alert"
    //       >
    //         <FaTriangleExclamation />
    //         <div className="text-center">Por favor selecciona otro archivo</div>
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //     {fillInputs === true ? (
    //       <div
    //         className="alert alert-danger d-flex align-items-center gap-2 my-3"
    //         role="alert"
    //       >
    //         <FaTriangleExclamation />
    //         <div className="text-center">Por favor llena los campos :)</div>
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //   </form> */}

    // </div>
    <div>
      <h1 className="text-center py-4">COTIZACIÓN SERVICIOS DYSAM SAS</h1>
      <form className="px-4 flex flex-col gap-4">
        <div className="border rounded-full px-4 flex flex-row justify-center items-center align-middle w-full gap-4 py-4 my-4">
          <Input
            type="date"
            label="Fecha"
            placeholder="Ingresa una fecha"
            className="flex-1"
          />
          <Input
            type="number"
            label="NIT"
            placeholder="Ingresa el NIT"
            className="flex-1"
          />
          <div className="flex-1">
            <div className="w-full flex justify-center">
              <Select
                label="Cliente"
                placeholder="Selecciona un cliente"
                className="w-full lg:w-auto"
              >
                <SelectItem key="2" value="2">
                  Hola
                </SelectItem>
              </Select>
            </div>
          </div>
          <Textarea
            label="Descripción"
            placeholder="Ingresa una descripción"
            className="flex-1 h-14 w-"
          />
        </div>
        {/* Primera tabla */}

        <div className="">
          <Table
            aria-label="Example table with client side pagination"
            bottomContent={
              pages > 0 ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              ) : null
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn key="codigo">CÓDIGO</TableColumn>
              <TableColumn key="cantidad">CANTIDAD</TableColumn>
              <TableColumn key="valorUnitario">VALOR UNITARIO</TableColumn>
              <TableColumn key="valor">VALOR</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay datos"} items={d}>
              <TableRow>
                {cells &&
                  cells.map((item) => (
                    <TableCell key={item.id}>
                      {item.label === "Código" ? (
                        <Select
                          label="Cliente"
                          placeholder="Selecciona un cliente"
                          selectedKeys={codeSelectedValue}
                          className="max-w-full"
                          onSelectionChange={setCodeSelectValue}
                        >
                          <SelectItem key="2" value="2">
                            Hola
                          </SelectItem>
                        </Select>
                      ) : (
                        <Input
                          type={item.type}
                          label={item.label}
                          placeholder={item.placeholder}
                          className="w-full"
                          onChange={(e) => changeInputsTable(e, item.label)}
                          key={item.id}
                        />
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Segunda tabla */}

        <div className="">
          <Table
            aria-label="Example table with client side pagination"
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn key="detalle">DETALLE DE M.O.D</TableColumn>
              <TableColumn key="basicoAhora ">BASICO AHORA</TableColumn>
              <TableColumn key="horEst">HOR-EST</TableColumn>
              <TableColumn key="totalTiempoHoras">
                TOTAL TIEMPO/HORAS
              </TableColumn>
              <TableColumn key="vrDia">VR DÍA</TableColumn>
              <TableColumn key="diasEstimados">DÍAS ESTIMADOS</TableColumn>
              <TableColumn key="totalDias">TOTAL DÍAS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay datos"} items={d}>
              <TableRow key="1">
                {SecondCells &&
                  SecondCells.map((item) => (
                    <TableCell>
                      <Input
                        type={item.type}
                        label={item.label}
                        placeholder={item.placeholder}
                        className="w-full"
                      />
                    </TableCell>
                  ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Tercera tabla */}

        <div className="">
          <Table
            aria-label="Example table with client side pagination"
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn key="horaAuxilio">HORA AUXILIO</TableColumn>
              <TableColumn key="valorHA">VALOR H.A</TableColumn>
              <TableColumn key="numeroHoras">NÚMERO/HORAS</TableColumn>
              <TableColumn key="transportes">TRANSPORTES</TableColumn>
              <TableColumn key="valorPagar">VALOR A PAGAR</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay datos"} items={d}>
              <TableRow key="1">
                {ThirdCells &&
                  ThirdCells.map((item) => (
                    <TableCell>
                      <Input
                        type={item.type}
                        label={item.label}
                        placeholder={item.placeholder}
                        className="w-full"
                      />
                    </TableCell>
                  ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Cuarta tabla */}

        <div className="">
          <Table
            aria-label="Example table with client side pagination"
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn key="transporteEquiposContratdos">
                TRANSPORTE DE EQUIPOS CONTRATADOS
              </TableColumn>
              <TableColumn key="transportePropio">
                TRANSPORTE PROPIO
              </TableColumn>
              <TableColumn key="unTEC">UN T.E.C</TableColumn>
              <TableColumn key="unTP">UN T.P</TableColumn>
              <TableColumn key="precioTEC">PRECIO UN T.E.C</TableColumn>
              <TableColumn key="precioTP">PRECIO UN T.P</TableColumn>
              <TableColumn key="valorTEC">VALOR UN T.E.C</TableColumn>
              <TableColumn key="valorTP">VALOR UN T.P</TableColumn>
              <TableColumn key="valorTotalTEC">
                VALOR TOTAL UN T.E.C
              </TableColumn>
              <TableColumn key="valorTotalTP">VALOR TOTAL UN T.P</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay datos"} items={d}>
              <TableRow key="1">
                {FourthCells &&
                  FourthCells.map((item) => (
                    <TableCell>
                      <Input
                        type={item.type}
                        label={item.label}
                        placeholder={item.placeholder}
                        className="w-full"
                      />
                    </TableCell>
                  ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Quinta tabla */}

        <div className="">
          <h2 className="text-center">IMPUESTOS Y OTROS GASTOS</h2>
          <Table
            aria-label="Example table with client side pagination"
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn key="descripciónImpuestos">DESCRIPCIÓN</TableColumn>
              <TableColumn key="valorImpuestos">VALOR</TableColumn>
              <TableColumn key="cantidadImpuestos">CANTIDAD</TableColumn>
              <TableColumn key="totalImpuestos">TOTAL</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay datos"} items={d}>
              <TableRow key="1">
                {FifthCells &&
                  FifthCells.map((item) => (
                    <TableCell>
                      <Input
                        type={item.type}
                        label={item.label}
                        placeholder={item.placeholder}
                        className="w-full"
                      />
                    </TableCell>
                  ))}
              </TableRow>
            </TableBody>
          </Table>
          <div className="py-4">
            <Input
              type="number"
              label="Otros gastos"
              placeholder="Ingresa otros gastos"
              className="w-full"
            />
          </div>
        </div>

        {/* Sexta tabla */}

        <div className="">
          <h2 className="text-center">VALORES FINALES</h2>
          <div className="py-4">
            <Input
              type="number"
              label="Porcentaje de utilidad bruta estimada"
              className="w-full"
              defaultValue="50%"
            />
          </div>
          <Table
            aria-label="Example table with client side pagination"
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn key="descripciónImpuestos">TOTAL COSTOS</TableColumn>
              <TableColumn key="valorImpuestos">ADMINISTRACIÓN</TableColumn>
              <TableColumn key="cantidadImpuestos">
                UTILIDAD BRUTA ESTIMADA
              </TableColumn>
              <TableColumn key="totalImpuestos">
                TOTAL A COBRAR SIN IVA
              </TableColumn>
              <TableColumn key="totalIVA">TOTAL CON IVA</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay datos"} items={d}>
              <TableRow key="1">
                {SixthCells &&
                  SixthCells.map((item) => (
                    <TableCell>
                      <Input
                        type={item.type}
                        label={item.label}
                        placeholder={item.placeholder}
                        className="w-full"
                      />
                    </TableCell>
                  ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </form>
    </div>
  );
}

export default EnviarFacturas;
