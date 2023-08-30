import axios, { Axios } from "axios";
import { TypeSigning, SigninResponse, UserData } from "../types/login";
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
  decryptdata: function (data: string) {
    const bytes = CryptoJS.AES.decrypt(data, "FDhfd678GHSDFS23");
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  },
  encryptData: function (data : TypeCookies) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      "FDhfd678GHSDFS23"
    );
    return encrypted;
  },
};

export default functions;
