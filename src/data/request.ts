import axios, { Axios } from "axios";
import { TypeSigning, SigninResponse } from "../types/login";
import { TypeSignup } from "../types/signup";
import CryptoJS from "crypto-js";
import { TypeCookies } from "../types/cookies";
const functions = {
  signin: async function ({ username, password }: TypeSigning) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post<SigninResponse>(
        "http://127.0.0.1/Dysam-Facturas/backend/api.php?action=signin",
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
        "http://127.0.0.1/Dysam-Facturas/backend/api.php?action=signup",
        formData
      );
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
