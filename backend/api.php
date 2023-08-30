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
            $usuario = $db->getOne("signin"); // Cambio aquí: "user" por "signin"
            if (is_null($usuario) || empty($usuario)) {
                echo json_encode(["salida" => "error", "data" => "Usuario o Contraseña incorrecta"]);
            } else {
                echo json_encode(["salida" => "exito", "user" => $usuario["user_name"], "level" => 1, "iduser" => $usuario["id"]]);
            }
            break;
    }
    exit;
}

exit;
