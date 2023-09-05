import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { DataTableResponse } from "../../types/table";
import functions from "../../data/request";
import { TypeCorrectReports } from "../../types/correctFile";
import { useCallback } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import { SigninResponse } from "../../types/login";

function Facturas() {
  const [insertData, setInsertData] = useState<DataTableResponse | any>();
  const [selectedItems, setSelectedItems] = useState<DataTableResponse | any>();
  const [fileSuccess, setFileSuccess] = useState(false);
  const [messageErrorFile, setMessageErrorFile] = useState(false);
  const [textareaComment, settextareaComment] = useState<string>("Pendiente");
  const [messageErrorPending, setMessageErrorPending] = useState(false);
  const [messageErrorCorrect, setMessageErrorCorrect] = useState(false);
  const [textareaEmail, setTextareaEmail] = useState("");
  const [dataBillers, setDataBillers] = useState<SigninResponse | any>();
  const form = useRef<HTMLFormElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const serverUrl = "http://127.0.0.1:5173/";
  const [sendEmailSuccess, setSendEmailSuccess] = useState(false);
  import { TypeVerifyReport } from "../../types/verify";
  //Cargar facturas pendientes
  const loadReports = useCallback(async () => {
    try {
      const response = await functions.loadingreport();
      if (response) {
        const originalData = response;
        const filterData = originalData?.data?.data?.filter(
          (data: any) => data.status_file === "Pendiente"
        );
        if (filterData.length === 0) {
          setMessageErrorPending(true);
          setTimeout(() => {
            setMessageErrorPending(false);
          }, 4000);
        } else {
          setInsertData(filterData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Cargar facturas por corregir

  const loadReports2 = useCallback(async () => {
    try {
      const response = await functions.loadingreport();
      if (response) {
        const originalData = response;
        const filterData = originalData?.data?.data?.filter(
          (data: any) => data.status_file === "Corregir"
        );
        if (filterData.length === 0) {
          setMessageErrorCorrect(true);
          setTimeout(() => {
            setMessageErrorCorrect(false);
          }, 4000);
        } else {
          setInsertData(filterData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Cargar facturadores

  async function loadBillers() {
    try {
      const response = await functions.loadingbillers();
      if (response) {
        setDataBillers(response);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  function handleSelectedChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    const selectedBiller = dataBillers?.data?.data?.find(
      (biller: any) => biller.id_billers === selectedOption
    );
    if (selectedBiller) {
      console.log(selectedBiller);
      setSelectedEmail(selectedBiller.billers_email);
    }
  }

  useEffect(() => {
    loadBillers();
  }, []);

  async function updateReports(
    e: React.FormEvent<HTMLFormElement>,
    {
      status,
      user,
      id,
      comment,
      path,
    }: {
      status: string;
      user: string;
      id: string;
      path: string;
      comment: string;
    }
  ) {
    e.preventDefault();
    const updateReportsParams: TypeCorrectReports = {
      status: status,
      username: user,
      id_file: id,
      comment: comment,
      file_path: path,
    };
    try {
      const response = await functions.correctreport(updateReportsParams);
      if (response) {
        setFileSuccess(true);
        setTimeout(() => {
          setFileSuccess(false);
        }, 3000);
        loadReports();
      } else {
        setMessageErrorFile(true);
        setTimeout(() => {
          setMessageErrorFile(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          "service_tlclszm",
          "template_vud6j0p",
          form.current,
          "9Es0kUSqg2Dv28YFx"
        )
        .then(
          (result) => {
            if (result) {
              setSendEmailSuccess(true);
              setTimeout(() => {
                setSendEmailSuccess(false);
              }, 3000);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log("La referencia al formulario es null.");
    }
  };

  async function verifyReports() {
    const verifyReportsParams: TypeVerifyReport = {
      status: selectedItems.status_file,
      username: selectedItems.user_name,
      id_file: selectedItems.id_files,
    };
    try {
      const response = await functions.verifyreport(verifyReportsParams);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <h1 className="my-4">
          Tabla de facturas <FaFileAlt />
        </h1>
        <div className=" border border-dark p-2 rounded mb-4">
          <div className="d-flex flex-column flex-md-row gap-3 w-100 ">
            <div className="d-flex align-items-center">
              <p className="m-0">Filtrar por:</p>
            </div>
            <div className="d-flex justify-content-between justify-content-md-end mt-md-0 mt-2">
              <div className="d-flex gap-2">
                <button
                  className="btn bg-primary text-white btn-outline-primary px-md-4"
                  type="button"
                  onClick={loadReports}
                >
                  Pendientes
                </button>
                <button
                  className="btn bg-danger text-white px-md-4"
                  type="button"
                  onClick={loadReports2}
                >
                  Corregir
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-light">
            <thead>
              <tr className="table-light text-center">
                <th>Estado</th>
                <th>Fecha</th>
                <th>Facturas</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {insertData?.map((data: any) => (
                <tr className="table-secondary text-center" key={data.id_files}>
                  <td>{data.status_file}</td>
                  <td>{data.date}</td>
                  <td>
                    <a href={data.file_path} target="_blank">
                      <FaFileUpload
                        className="fs-4 option"
                        title="Ver factura"
                      />
                    </a>
                  </td>
                  <td>
                    {data.status_file === "Pendiente" ? (
                      <div>
                        <FaCheckCircle
                          className="fs-4 option mx-1"
                          data-bs-toggle="modal"
                          data-bs-target="#modalSendFactures"
                          title="Enviar factura"
                          onClick={() => setSelectedItems(data)}
                        />
                        <FaExclamationTriangle
                          className="fs-4 option mx-1"
                          data-bs-toggle="modal"
                          data-bs-target="#modalCorrectFactures"
                          title="Corregir factura"
                          onClick={() => setSelectedItems(data)}
                        />
                      </div>
                    ) : (
                      <>
                        <p>No Aplica</p>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {messageErrorPending === true ? (
            <div
              className="alert alert-danger d-flex align-items-center gap-2 my-3"
              role="alert"
            >
              <FaTriangleExclamation />
              <div className="text-center">No hay facturas pendientes</div>
            </div>
          ) : (
            <></>
          )}
          {messageErrorCorrect === true ? (
            <div
              className="alert alert-danger d-flex align-items-center gap-2 my-3"
              role="alert"
            >
              <FaTriangleExclamation />
              <div className="text-center">No hay facturas por corregir</div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* //Modal corregir */}
        <div
          className="modal"
          id="modalCorrectFactures"
          aria-labelledby="exampleModalLabel"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Corregir factura</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) =>
                    updateReports(e, {
                      id: selectedItems.id_files,
                      status: "Corregir",
                      path: selectedItems.file_path,
                      user: selectedItems.user_name,
                      comment: textareaComment,
                    })
                  }
                >
                  <div className="mb-3">
                    <label
                      htmlFor="recipient-name"
                      className="col-for  m-label"
                    >
                      Nombre del contador
                    </label>
                    <select className="form-select" defaultValue="0">
                      {selectedItems && (
                        <option value={selectedItems.id_files}>
                          {selectedItems.user_name}
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Mensaje
                    </label>
                    <textarea
                      className="form-control"
                      id="message-text"
                      onChange={(e) => settextareaComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={loadReports}
                    >
                      Cerrar
                    </button>
                    <button className="btn btn-primary">
                      Regresar factura
                    </button>
                  </div>
                  {fileSuccess === true ? (
                    <div
                      className="alert alert-success d-flex align-items-center gap-2 my-3"
                      role="alert"
                    >
                      <div className="text-center">
                        Reporte enviado correctamente
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {messageErrorFile === true ? (
                    <div
                      className="alert alert-danger d-flex align-items-center gap-2 my-3"
                      role="alert"
                    >
                      <FaTriangleExclamation />
                      <div className="text-center">
                        Hubo un error al enviar el archivo
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* //Modal enviar */}
        <div
          className="modal fade"
          id="modalSendFactures"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enviar factura</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form ref={form} onSubmit={sendEmail}>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Seleccionar facturador
                    </label>
                    <select
                      className="form-select"
                      defaultValue="0"
                      onChange={(e) => handleSelectedChange(e)}
                      required
                    >
                      <option value="0">Selecciona un facturador</option>
                      {dataBillers?.data?.data?.map((billers: any) => (
                        <option
                          key={billers.id_billers}
                          value={billers.id_billers}
                        >
                          {billers.billers_name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="hidden"
                      name="user_email"
                      value={selectedEmail}
                      required
                      readOnly
                    />
                    <input
                      type="hidden"
                      name="file_path"
                      value={serverUrl + selectedItems?.file_path}
                      required
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Mensaje
                    </label>
                    <textarea
                      className="form-control"
                      id="message-text"
                      onChange={(e) => setTextareaEmail(e.target.value)}
                      name="comment_fac"
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                    <button className="btn btn-primary">Enviar factura</button>
                  </div>
                  {sendEmailSuccess === true ? (
                    <div
                      className="alert alert-success d-flex align-items-center gap-2 my-3"
                      role="alert"
                    >
                      <div className="text-center">
                        Reporte enviado correctamente
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facturas;
