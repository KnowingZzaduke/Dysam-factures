import axios, { Axios } from "axios";
import { TypeSigning, SigninResponse } from "../types/login";
import { TypeSignup } from "../types/signup";
import CryptoJS from "crypto-js";
import { TypeCookies } from "../types/cookies";
import { TypeLoadFile } from "../types/loadfile";
import { DataTableResponse } from "../types/table";
import { TypeUpdateReports } from "../types/updateFile";
const functions = {
  signin: async function ({ username, password }: TypeSigning) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/DysamFacturas/backend/api.php?action=signin",
        formData
      );
      return response;
    } catch (error) {
      console.log("Error");
    }
  },
  signup: async function ({ username, password, position }: TypeSignup) {
    const formData = new FormData();
    formData.append("user_name", username);
    formData.append("user_password", password); // Cambio aquí: "password" por "user_password"
    formData.append("user_level", position); // Cambio aquí: "position" por "user_level"
    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/DysamFacturas/backend/api.php?action=signup",
        formData
      );
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
        "http://127.0.0.1/DysamFacturas/backend/api.php?action=makereport",
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  loadingreport: async function () {
    try {
      const response = await axios.get<DataTableResponse>(
        "http://127.0.0.1/DysamFacturas/backend/api.php?action=loadingreport"
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  updatereport: async function (form: TypeUpdateReports) {
    const formData = new FormData();
    formData.append("status", form.status);
    formData.append("file_path", form.filepath);
    formData.append("user_name", form.username);
    formData.append("commentf", form.comment);

    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/DysamFacturas/backend/api.php?action=updatereport"
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
