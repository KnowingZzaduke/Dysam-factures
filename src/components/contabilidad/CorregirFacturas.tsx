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
} from "@nextui-org/react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import functions from "../../data/request";
import { CheckIcon } from "../utilities/svgComponents/CheckIcon";
import { FaFloppyDisk } from "react-icons/fa6";
function TableData() {
  const [data, setData] = useState(null);
  const [showModalNotResults, setShowModalNotResults] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reverseData, setReverseData] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({ defaultSelected: false });
  const [selectedRows, setSelectedRows] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(data?.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data ? data.slice(start, end) : [];
  }, [page, data]);

  const loadData = useCallback(async () => {
    try {
      const response = await functions.loadingvalues();
      if (response?.data.salida === "exito") {
        const filterData = response?.data?.data?.data.filter(
          (item) => item?.estado === "true" || "false"
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
          return setData(newData);
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
          updateData(idvalores_facturas, estado);
          return updatedItem;
        }
        return item;
      })
    );
  };
  const updateData = async (idvalores_facturas, estado) => {
    console.log({ idvalores_facturas, estado });
    try {
      const response = await functions.updatedata(idvalores_facturas, estado);
      if (response?.data?.salida === "exito") {
        loadData();
      }
    } catch (error) {
      console.error("Error al actualizar los datos en la base de datos", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
            <Button
              color="warning"
              onClick={() => {
                setReverseData(!reverseData);
                setData(data.slice().reverse());
              }}
              style={{ margin: "1rem 0" }}
            >
              {reverseData === false ? (
                <p>Mostrar registros recientes</p>
              ) : (
                <p>Mostrar últimos registros</p>
              )}
            </Button>
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
                <TableColumn key="nit">NIT</TableColumn>
                <TableColumn key="cliente">CLIENTE</TableColumn>
                <TableColumn key="descripcion">DESCRIPCIÓN</TableColumn>
                <TableColumn key="vr_sin_iva">V. SIN IVA</TableColumn>
                <TableColumn key="vr_con_iva">VALOR CON IVA</TableColumn>
                <TableColumn key="opciones">ESTADO</TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow
                    key={item?.idvalores_facturas}
                    style={{ color: "black" }}
                  >
                    {(columnKey) => (
                      <TableCell>
                        {columnKey === "opciones" ? (
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
                                    <p className="font-semibold">Aprobado</p>
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
    </div>
  );
}

export default TableData;
