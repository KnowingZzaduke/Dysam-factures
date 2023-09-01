<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require("db/MysqliDb.php");
require '../vendor/autoload.php'; // Carga el autoloader de Composer
use DysamFacturas\backend\socket\dysamSocketClass; 

// Crear una instancia
$socketClass = new dysamSocketClass();
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
            if (isset($_FILES["file"]["tmp_name"]) && is_uploaded_file($_FILES["file"]["tmp_name"])) {
                $archivo = fopen($_FILES["file"]["tmp_name"], "rb");
                $contenido_archivo = fread($archivo, filesize($_FILES["file"]["tmp_name"]));
                fclose($archivo);

                $user_name = $_POST["user_name"]; // Obtén el nombre de usuario del formulario
                $_POST["file"] = $contenido_archivo;

                try {
                    $db->insert("files", [
                        "user_name" => $user_name,
                        "file" => $_POST["file"],
                        "date" => $_POST["date"], // Asegúrate de ajustar las claves según los nombres del formulario
                        "comment" => $_POST["comment"], // Asegúrate de ajustar las claves según los nombres del formulario
                        // Agrega el resto de las columnas y valores aquí
                    ]);
                    $socketClass->emitDataInsertedEvent([
                        "user_name" => $user_name,
                        "file" => $_POST["file"],
                        "date" => $_POST["date"],
                        "comment" => $_POST["comment"],
                    ]);
                    echo json_encode(["salida" => "exito"]);
                } catch (Exception $th) {
                    echo json_encode(["salida" => "error", "data" => $th->getMessage()]);
                }
            } else {
                echo json_encode(["salida" => "error", "data" => "Archivo no subido correctamente"]);
            }
            break;
    }
    exit;
}

exit;
