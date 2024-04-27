import axios, { Axios } from "axios";
import { TypeSigning, SigninResponse } from "../types/login";
import { TypeSignup } from "../types/signup";
import CryptoJS from "crypto-js";
import { TypeCookies } from "../types/cookies";
import { TypeLoadFile } from "../types/loadfile";
import { DataTableResponse } from "../types/table";
import { TypeCorrectReports } from "../types/correctFile";
import { TypeVerifyReport } from "../types/verify";
import { Params } from "../types/params";

const functions = {
  signin: async function ({ username, password }: TypeSigning) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=signin",
        formData
      );
      console.log (response);
      return response;
    } catch (error) {
      console.log("Error");
    }
  },
  signup: async function ({ username, password, position }: TypeSignup) {
    const formData = new FormData();
    formData.append("user_name", username);
    formData.append("user_password", password);
    formData.append("user_level", position.values().next().value.toString());
    console.log(formData);
    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=signup",
        formData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  makereport: async function (form: TypeLoadFile) {
    const formData = new FormData();
    if (form.file.files.name) {
      formData.append("file", form.file.files.name);
    }
    formData.append("user_name", form.file.username);
    formData.append("date", form.file.date);
    formData.append("comment", form.comment);
    formData.append("statusfile", form.file.statusfile);
    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=makereport",
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  sendfacture: async function (params: Params) {
    console.log(params)
    const formData = new FormData();
    formData.append("fecha", params.fecha);
    formData.append("nit", params.nit);
    formData.append("descripcion", params.descripcion);
    formData.append("total_sin_iva", params.totalACobrarSinIva.toString());
    formData.append("total_con_iva", params.totalConIva.toString());
    formData.append("estado", false);
    try {
      const response = await axios.post<DataTableResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=sendfacture",
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updatedata: async function (idvalores_facturas, estado) {
    const formData = new FormData();
    formData.append("idvalores_facturas", idvalores_facturas);
    formData.append("estado", estado);
    try {
      const response = await axios.post(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=updatedata",
        formData
      );
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  loadinginventory: async function () {
    try {
      const response = await axios.get<DataTableResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=loadinginventory"
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  loadingclients: async function () {
    try {
      const response = await axios.get<DataTableResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=loadingclients"
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  loadingvalues: async function () {
    try {
      const response = await axios.get<DataTableResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=loadingvalues"
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  loadingreport: async function () {
    try {
      const response = await axios.get<DataTableResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=loadingreport"
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  correctreport: async function (form: TypeCorrectReports) {
    const formData = new FormData();
    formData.append("idfile", form.id_file);
    formData.append("statusfile", form.status);
    formData.append("username", form.username);
    formData.append("filepath", form.file_path);
    formData.append("comment", form.comment);
    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=correctreport",
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  loadingbillers: async function () {
    try {
      const response = await axios.get<SigninResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=loadingbillers"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  verifyreport: async function (form: TypeVerifyReport) {
    const formData = new FormData();
    formData.append("idfile", form.id_file);
    formData.append("statusfile", form.status);
    formData.append("username", form.username);
    formData.append("commentf", form.comment);
    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=verifyreport",
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deletereport: async function (idvalores_facturas, estado) {
    const formData = new FormData();
    formData.append("idvalores_facturas", idvalores_facturas);
    formData.append("estado", estado);
    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/Dysam-factures/backend/api.php?action=deletereport",
        formData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  decryptdata: function (data: string) {
    const bytes = CryptoJS.AES.decrypt(data, "FDhfd678GHSDFS23");
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  },
  encryptData: function (data: TypeCookies) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      "FDhfd678GHSDFS23"
    );
    return encrypted;
  },
};

export default functions;
