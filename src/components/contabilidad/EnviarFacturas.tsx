import React, { useContext, useState, useEffect, useMemo } from "react";
import { DataContext } from "../../context/DataContext";
import { TypeFormFile } from "../../types/file";
import { TypeLoadFile } from "../../types/loadfile";
import { SigninResponse } from "../../types/login";
import {
  HeaderCells,
  FirtsCells,
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
import { TableInput } from "../../data/inputs";
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
  const [initialFormState, setInitialFormState] =
    useState<Record<string, any>>();
  const [updateFields, setUpdateFields] = useState<Record<string, any>>();

  function changeInputsTable(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const value = e.target.value;
    const name = e.target.name;
    //[name] acá se está usando para indicar que tome el valor de name como tal, se conoce como indexación
    //Recomendable crear un estado inicial para los formularios
    setInitialFormState((prevInitial) => ({
      ...prevInitial,
      [name]: value,
    }));
  }
  useEffect(() => {
    for (const clave in initialFormState) {
      //Primero guarda el valor
      const valorInitial = initialFormState[clave];
      //Verifica si es un string vacío, si es así, asigna el valor 0, de lo contrario, deja el valor que tenga
      const valorAsigned = valorInitial === "" ? 0 : valorInitial;
      //Asigna el valor obtenido
      if (initialFormState.hasOwnProperty(clave)) {
        switch (clave) {
          case "valorunitario":
            const valorTotal =
              parseFloat(initialFormState?.cantidad) *
              parseFloat(initialFormState?.valorunitario);
            if (!isNaN(valorTotal)) {
              setUpdateFields((prevUpdate) => ({
                ...prevUpdate,
                valortotal: valorTotal.toFixed(),
              }));
            }
            break;
          case "basicoahora":
            const totalTiempoHoras =
              parseFloat(initialFormState?.basicoahora) *
              parseFloat(initialFormState?.horest);
            const vrDia = parseFloat(initialFormState?.basicoahora) * 10;

            if (!isNaN(totalTiempoHoras) && !isNaN(vrDia)) {
              setUpdateFields((prevUpdate) => ({
                ...prevUpdate,
                totaltiempohoras: totalTiempoHoras.toFixed(),
                vrdia: vrDia.toFixed(),
              }));
            }
            break;

          case "totaltiempohoras":
            const totaltiempohoras =
              parseFloat(initialFormState?.basicoahora) *
              parseFloat(initialFormState?.horest);
            if (!isNaN(totaltiempohoras)) {
              setUpdateFields((prevUpdate) => ({
                ...prevUpdate,
                totaltiempohoras: totaltiempohoras.toFixed(),
              }));
            }
            break;
          default:
            break;
        }
      }
    }
  }, [initialFormState]);

  useEffect(() => {
    console.log(updateFields);
  }, [updateFields]);

  return (
    <div>
      <h1 className="text-center py-4">COTIZACIÓN SERVICIOS DYSAM SAS</h1>
      <form className="px-4 flex flex-col gap-4">
        <div className="border rounded-full px-4 flex flex-row justify-center items-center align-middle w-full gap-4 py-4 my-4">
          {HeaderCells?.map((item) => (
            <Input
              type={item.type}
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              className="flex-1"
              onChange={(e) => changeInputsTable(e)}
              key={`${item.id}-${item.label}`}
            />
          ))}
          <div className="flex-1">
            <div className="w-full flex justify-center">
              <Select
                label="Código"
                placeholder="Ingresa el código"
                className="w-full lg:w-auto"
                onChange={changeInputsTable}
              >
                <SelectItem key="this" value="2">
                  Cliente 1
                </SelectItem>
                <SelectItem key="3" value="3">
                  Cliente 2
                </SelectItem>
              </Select>
            </div>
          </div>
          <Textarea
            label="Descripción"
            name="descipcioncliente"
            placeholder="Ingresa una descripción"
            className="flex-1 h-14 w-"
            onChange={(e) => changeInputsTable(e)}
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
                {FirtsCells?.map((item) =>
                  item.name === "codigo" ? (
                    <TableCell>
                      <Select
                        label="Cliente"
                        placeholder="Selecciona un cliente"
                        className="w-full lg:w-auto"
                      >
                        <SelectItem key="2" value="2">
                          Cliente 1
                        </SelectItem>
                        <SelectItem key="3" value="3">
                          Cliente 2
                        </SelectItem>
                      </Select>
                    </TableCell>
                  ) : (
                    <TableCell key={`${item.id}-${item.label}`}>
                      <Input
                        type={item.type}
                        name={item.name}
                        value={
                          item.name === "codigo"
                            ? initialFormState?.codigo
                            : item.name === "cantidad"
                            ? initialFormState?.cantidad
                            : item.name === "valorunitario"
                            ? initialFormState?.valorunitario
                            : item.name === "valor"
                            ? updateFields?.valortotal
                            : initialFormState?.[item.name]
                        }
                        label={item.label}
                        placeholder={item.placeholder}
                        className="w-full"
                        onChange={(e) => changeInputsTable(e)}
                      />
                    </TableCell>
                  )
                )}
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
              <TableColumn key="manoObraDirecta">
                MANO DE OBRA DIRECTA
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay datos"} items={d}>
              <TableRow key="1">
                {SecondCells &&
                  SecondCells.map((item) => (
                    <TableCell>
                      <Input
                        type={item.type}
                        label={item.label}
                        name={item.name}
                        value={
                          item.name === "basicoahora"
                            ? initialFormState?.basicoahora
                            : item.name === "horest"
                            ? initialFormState?.horest
                            : item.name === "totaltiempohoras"
                            ? updateFields?.totaltiempohoras
                            : item.name === "vrdia"
                            ? updateFields?.vrdia
                            : item.name === "diasestimados"
                            ? initialFormState?.diasestimados
                            : item.name === "totaldias"
                            ? updateFields?.totaldias
                            : item.name === "manoobradirecta"
                            ? updateFields?.manoobradirecta
                            : initialFormState?.[item.name]
                        }
                        placeholder={item.placeholder}
                        className="w-full"
                        onChange={(e) => changeInputsTable(e)}
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
                    <TableCell key={`${item.id}-${item.label}`}>
                      <Input
                        type={item.type}
                        label={item.label}
                        name={item.name}
                        placeholder={item.placeholder}
                        className="w-full"
                        onChange={(e) => changeInputsTable(e)}
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
                        name={item.name}
                        placeholder={item.placeholder}
                        className="w-full"
                        onChange={(e) => changeInputsTable(e)}
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
                        name={item.name}
                        placeholder={item.placeholder}
                        className="w-full"
                        onChange={(e) => changeInputsTable(e)}
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
              onChange={(e) => changeInputsTable(e)}
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
              <TableColumn key="totalCostos">TOTAL COSTOS</TableColumn>
              <TableColumn key="adminitracion">ADMINISTRACIÓN</TableColumn>
              <TableColumn key="utilidadBrutaEstimada">
                UTILIDAD BRUTA ESTIMADA
              </TableColumn>
              <TableColumn key="totalSinIVA">
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
                        name={item.name}
                        placeholder={item.placeholder}
                        className="w-full"
                        onChange={(e) => changeInputsTable(e)}
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
