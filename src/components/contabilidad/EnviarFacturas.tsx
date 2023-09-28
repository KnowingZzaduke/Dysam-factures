import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { TypeFormFile } from "../../types/file";
import { TypeLoadFile } from "../../types/loadfile";
import { SigninResponse } from "../../types/login";
import { FaTriangleExclamation } from "react-icons/fa6";
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
  return (
    <div
      className="d-flex align-items-center justify-content-center my-5 bg-info.bg-gradient"
      style={{ minHeight: "100vh" }}
    >
      <form
        className="was-validated border border-dark p-5 rounded bg-light"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1>Enviar facturas</h1>
        <div className="my-4">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={reloadData?.user}
            disabled
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateInput">Fecha</label>
          <input
            type="date"
            className="form-control"
            id="dateInput"
            name="date"
            required
            value={formFile.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="factures">Archivo</label>
          <input
            name="files"
            id="factures"
            type="file"
            className="form-control"
            aria-label="file example"
            required
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">
            Por favor selecciona un archivo válido
          </div>
        </div>
        <div className="form-floating my-3">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            name="comment"
            required
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea">Comentarios</label>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Enviar factura
          </button>
        </div>
        {fileSuccess === true ? (
          <div
            className="alert alert-success d-flex align-items-center gap-2 my-3"
            role="alert"
          >
            <div className="text-center">Archivo enviado correctamente</div>
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
            <div className="text-center">Hubo un error al subir el archivo</div>
          </div>
        ) : (
          <></>
        )}
        {selectOtherFile === true ? (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 my-3"
            role="alert"
          >
            <FaTriangleExclamation />
            <div className="text-center">Por favor selecciona otro archivo</div>
          </div>
        ) : (
          <></>
        )}
        {fillInputs === true ? (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 my-3"
            role="alert"
          >
            <FaTriangleExclamation />
            <div className="text-center">Por favor llena los campos :)</div>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default EnviarFacturas;
