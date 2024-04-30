import {
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
  useCheckbox,
  Chip,
  VisuallyHidden,
  tv,
  Input,
} from "@nextui-org/react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import functions from "../../data/request";
import { CheckIcon } from "../utilities/svgComponents/CheckIcon";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Cookies from "js-cookie";
function TableData() {
  const [data, setData] = useState(null);
  const [showModalNotResults, setShowModalNotResults] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [reverseData, setReverseData] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const { isSelected, isFocusVisible } = useCheckbox({
    defaultSelected: false,
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(data?.length / rowsPerPage);
  const [editValues, setEditValues] = useState({
    idvalores_facturas: null,
    fecha: null,
    nit_y_cliente: null,
    descripcion: null,
    vr_sin_iva: null,
    vr_con_iva: null,
  });
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data ? data.slice(start, end) : [];
  }, [page, data]);
  const [activeOptions, setActiveOptions] = useState(true);
  const [showTextConfirm, setShowTextConfirm] = useState(false);

  useEffect(() => {
    const SESION = Cookies.get("dysam-fac");
    if (SESION === undefined) {
      alert("Sin cookies, por favor contacta al programador");
    } else {
      const SESIONDECRYPT = functions.decryptdata(SESION);
      if (SESIONDECRYPT.level === 0) {
        setActiveOptions(false);
      } else if (SESIONDECRYPT.level === 1) {
        setActiveOptions(true);
      }
    }
  }, []);

  const loadData = useCallback(async () => {
    try {
      const response = await functions.loadingvalues();
      if (response?.data.salida === "exito") {
        const filterData = response?.data?.data?.data.filter(
          (item) => item?.estado === "true" || item?.estado === "false"
        );
        if (filterData) {
          const newData = filterData.map((item) => ({
            ...item,
            estado:
              item.estado === "true"
                ? true
                : item.estado === "false"
                ? false
                : false,
          }));
          return setData(newData.slice().reverse());
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  const handleCheckboxClick = async (id: number) => {
    setData((prevData) =>
      prevData?.map((item) => {
        if (item.idvalores_facturas === id) {
          const updatedItem = {
            ...item,
            estado: !item.estado,
          };
          const { idvalores_facturas, estado } = updatedItem;
          updateData(idvalores_facturas, estado, "", "", "", "", "");
          return updatedItem;
        }
        return item;
      })
    );
  };
  const updateData = async (
    idvalores_facturas,
    estado,
    fecha_factura,
    cliente_y_nit,
    descripcion,
    v_sin_iva,
    v_con_iva
  ) => {
    try {
      const response = await functions.updatedata(
        idvalores_facturas,
        estado,
        fecha_factura,
        cliente_y_nit,
        descripcion,
        v_sin_iva,
        v_con_iva
      );
      if (response?.data?.salida === "exito") {
        loadData();
        setShowTextConfirm(true);
        setShowConfirmationMessage(true);
        setTimeout(() => {
          setShowConfirmationMessage(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Error al actualizar los datos en la base de datos", error);
    }
  };

  function eliminarFacturas(id: number) {
    setData((prevData) =>
      prevData?.map((item) => {
        if (item.idvalores_facturas === id) {
          const updatedItem = {
            ...item,
            estado: undefined,
          };
          const { idvalores_facturas, estado } = updatedItem;
          deleteData(idvalores_facturas, estado);
          return updatedItem;
        }
        return item;
      })
    );
  }

  const deleteData = async (idvalores_facturas, estado) => {
    try {
      const response = await functions.deletereport(idvalores_facturas, estado);
      if (response?.data?.salida === "exito") {
        loadData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const editFactures = (id: number) => {
    const filterData = data?.filter((item) => item.idvalores_facturas === id);
    if (filterData) {
      filterData.map((item) => {
        setEditValues((prevData) => {
          const object = {
            ...prevData,
            idvalores_facturas: item.idvalores_facturas,
            fecha: item.fecha,
            nit_y_cliente: item.nit_y_cliente,
            descripcion: item.descripcion,
            vr_sin_iva: item.vr_sin_iva,
            vr_con_iva: item.vr_con_iva,
          };
          return object;
        });
      });
    }
    onOpen();
  };

  const checkbox = tv({
    slots: {
      base: "border-default hover:bg-default-200",
      content: "text-default-500",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
          content: "text-primary-foreground pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <div
      className="flex flex-col justify-center relative"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <div>
        {showModalNotResults === false ? (
          <div className="p-4">
            <h1 className="py-3 font-semibold" style={{ fontSize: "30px" }}>
              Tabla de facturas
            </h1>
            <div className="flex gap-2 my-4">
              <Button
                color="warning"
                onClick={() => {
                  setReverseData(!reverseData);
                  setData(data.slice().reverse());
                }}
              >
                {reverseData === true ? (
                  <p>Mostrar registros recientes</p>
                ) : (
                  <p>Mostrar últimos registros</p>
                )}
              </Button>
              <Button color="primary" onPress={loadData}>
                Cargar datos
              </Button>
            </div>
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
                <TableColumn key="fecha">FECHA DE LA FACTURA</TableColumn>
                <TableColumn key="nit_y_cliente">CLIENTE Y NIT</TableColumn>
                <TableColumn key="descripcion">DESCRIPCIÓN</TableColumn>
                <TableColumn key="vr_sin_iva">V. SIN IVA</TableColumn>
                <TableColumn key="vr_con_iva">VALOR CON IVA</TableColumn>
                <TableColumn key="opciones">ESTADO</TableColumn>
              </TableHeader>
              <TableBody
                items={items}
                emptyContent={"Por favor agrega facturas"}
              >
                {(item) => (
                  <TableRow
                    key={item?.idvalores_facturas}
                    style={{ color: "black" }}
                  >
                    {(columnKey) => (
                      <TableCell>
                        {activeOptions === false && columnKey === "opciones" ? (
                          <p className="font-semibold text-red-600">
                            Sin acceso
                          </p>
                        ) : columnKey === "opciones" &&
                          activeOptions === true ? (
                          <div className="flex gap-4 items-center">
                            <label>
                              <VisuallyHidden>
                                <input
                                  type="checkbox"
                                  checked={item?.estado || false}
                                  onChange={() =>
                                    handleCheckboxClick(
                                      item?.idvalores_facturas
                                    )
                                  }
                                />
                              </VisuallyHidden>
                              <Chip
                                className={
                                  item?.estado === true ||
                                  item?.estado === "true"
                                    ? "bg-yellow-400 hover:cursor-pointer"
                                    : "bg-blue-400 hover:cursor-pointer"
                                }
                                color="primary"
                                variant="faded"
                              >
                                {item?.estado === "true" ||
                                item?.estado === true ? (
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold">
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aprobado
                                    </p>
                                    <CheckIcon className="ml-1" />
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold">No aprobado</p>
                                    <CheckIcon className="ml-1" />
                                  </div>
                                )}
                              </Chip>
                            </label>
                            <Button
                              color="danger"
                              onClick={() =>
                                eliminarFacturas(item?.idvalores_facturas)
                              }
                            >
                              <FaRegTrashCan className="text-black" />
                            </Button>
                            <Button
                              onClick={() =>
                                editFactures(item?.idvalores_facturas)
                              }
                            >
                              <FaPenToSquare />
                            </Button>
                          </div>
                        ) : (
                          getKeyValue(item, columnKey)
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div
            className="content_welcome flex flex-col items-center justify-center"
            style={{ minHeight: "100vh" }}
          >
            <h1 style={{ fontSize: "2rem" }}>¡Mensaje!</h1>
            <p className="mt-4 text-center">
              Debes agregar datos de las facturas en el formulario <br /> paras
              poder visualizar registros en la tabla
            </p>
            <div>
              <Link to="/dashboard/formulario-enviar-facturas">
                <p
                  style={{
                    backgroundColor: "red",
                    padding: "8px",
                    borderRadius: "10px",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Registrar facturas
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        {editValues && (
          <form>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Editar datos
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-6">
                      <Input
                        type="text"
                        label="Identificador de factura"
                        defaultValue={
                          editValues?.idvalores_facturas ||
                          "Error al traer los datos"
                        }
                        value={editValues?.idvalores_facturas}
                        readOnly
                      />
                      <Input
                        type="text"
                        label="Fecha"
                        defaultValue={
                          editValues?.fecha || "Error al traer los datos"
                        }
                        value={editValues?.fecha}
                        onChange={(e) =>
                          setEditValues((prevData) => ({
                            ...prevData,
                            fecha: e.target.value,
                          }))
                        }
                      />
                      <Input
                        type="text"
                        label="Cliente y Nit"
                        defaultValue={
                          editValues?.nit_y_cliente ||
                          "Error al traer los datos"
                        }
                        value={editValues?.nit_y_cliente}
                        onChange={(e) =>
                          setEditValues((prevData) => ({
                            ...prevData,
                            nit_y_cliente: e.target.value,
                          }))
                        }
                      />
                      <Input
                        type="text"
                        label="Descripción"
                        defaultValue={
                          editValues?.descripcion || "Error al traer los datos"
                        }
                        value={editValues?.descripcion}
                        onChange={(e) =>
                          setEditValues((prevData) => ({
                            ...prevData,
                            descripcion: e.target.value,
                          }))
                        }
                      />
                      <Input
                        type="text"
                        label="Valor sin IVA"
                        defaultValue={
                          editValues?.vr_sin_iva || "Error al traer los datos"
                        }
                        value={editValues?.vr_sin_iva}
                        onChange={(e) =>
                          setEditValues((prevData) => ({
                            ...prevData,
                            vr_sin_iva: e.target.value,
                          }))
                        }
                      />
                      <Input
                        type="text"
                        label="Valor con IVA"
                        defaultValue={
                          editValues?.vr_con_iva || "Error al traer los datos"
                        }
                        value={editValues?.vr_con_iva}
                        onChange={(e) =>
                          setEditValues((prevData) => ({
                            ...prevData,
                            vr_con_iva: e.target.value,
                          }))
                        }
                      />
                      {showConfirmationMessage === true ? (
                        <p className="text-green-500 underline text-sm my-2 text-center">
                          Datos actualizados correctamente
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() =>
                        updateData(
                          editValues.idvalores_facturas,
                          "",
                          editValues.fecha,
                          editValues.nit_y_cliente,
                          editValues.descripcion,
                          editValues.vr_sin_iva,
                          editValues.vr_con_iva
                        )
                      }
                    >
                      Actualizar
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Cerrar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default TableData;
