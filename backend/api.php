<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require("db/MysqliDb.php");
// Crear una instancia
date_default_timezone_set('America/Bogota');
if (isset($_POST["action"]) || isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "signin":
            $db->where("user_name", $_POST["username"]);
            $db->where("user_password", md5($_POST["password"]));
            $usuario = $db->getOne("login");
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

                try {
                    $db->insert("files", [
                        "user_name" => $user_name,
                        "file" => $contenido_archivo,
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
        case "loadingreport":
            $mysqli = new mysqli("localhost", "root", "", "dysam_facturas");

            if ($mysqli->connect_error) {
                echo json_encode(["salida" => "error", "data" => "Error de conexión a la base de datos: " . $mysqli->connect_error]);
            } else {
                $sql = "SELECT * FROM files"; // Seleccionar todos los datos de la tabla "archivos"
                $result = $mysqli->query($sql);

                if ($result->num_rows > 0) {
                    $data = array();
                    while ($row = $result->fetch_assoc()) {
                        $data[] = $row;
                    }
                    if (empty($data)) {
                        echo json_encode(["salida" => "exito", "data" => "No se encontraron registros en la tabla archivos"]);
                    } else {
                        // Serializa los datos como JSON antes de enviarlos
                        echo json_encode(["salida" => "exito", "data" => $data]);
                    }
                } else {
                    echo json_encode(["salida" => "error", "data" => "Error en la consulta SQL: " . $mysqli->error]);
                }
            }
            break;
    }
    exit;
}

exit;
