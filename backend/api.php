<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require("db/MysqliDb.php");
date_default_timezone_set('America/Bogota');
if (isset($_POST["action"]) || isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "signin":
            $db->where("user_name", $_POST["username"]);
            $db->where("user_password", md5($_POST["password"]));
            $usuario = $db->getOne("login"); // Cambio aquí: "user" por "signin"
            if (is_null($usuario) || empty($usuario)) {
                echo json_encode(["salida" => "error", "data" => "Usuario o Contraseña incorrecta"]);
            } else {
                echo json_encode(["salida" => "exito", "user" => $usuario["user_name"], "level" => $usuario["user_level"], "iduser" => $usuario["id"]]);
            }
            break;
        case "signup":
            $db->where("user_name", $_POST["user_name"]);
            $usuario = $db->getOne("login");
            if (!is_null($usuario) || !empty($usuario)) {
                echo json_encode(["salida" => "error", "data" => "El correo ya se encuentra registrado"]);
            } else {
                $_POST["user_level"] = $_POST["user_level"];
                $_POST["user_password"] = md5($_POST["user_password"]);
                $db->insert("login", $_POST);
                echo json_encode(["salida" => "exito", "data" => "El usuario se creó correctamente"]);
            }
            break;
        case "makereport":

            $archivo = fopen($_FILES["file"]["tmp_name"], "rb");
            $contenido_archivo = fread($archivo, filesize($_FILES["file"]["tmp_name"]));
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $tipo_mime = finfo_file($finfo, $_FILES["file"]["tmp_name"]);
            $base64_archivo = 'data:' . $tipo_mime . ';base64,' . base64_encode($contenido_archivo);
            fclose($archivo);
            $_POST["iduser"] = 1;
            $_POST["file"] = $base64_archivo;
            try {
                $db->insert("files", $_POST);
                echo json_encode(["salida" => "exito"]);
            } catch (Exception $th) {
                echo json_encode(["salida" => "error", "data" => $th]);
            }
            break;
    }
    exit;
}

exit;
