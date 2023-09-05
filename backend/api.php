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
            $archivo_temporal = $_FILES["file"]["tmp_name"];
            $nombre_original = $_FILES["file"]["name"];

            $ruta_destino = "../uploads/" . uniqid() . "_" . $nombre_original;

            if (move_uploaded_file($archivo_temporal, $ruta_destino)) {
                $user_name = $_POST["user_name"];
                try {
                    $db->insert("files", [
                        "user_name" => $user_name,
                        "file_path" => $ruta_destino,
                        "date" => $_POST["date"],
                        "comment" => $_POST["comment"],
                        "status_file" => $_POST["statusfile"]
                    ]);

                    echo json_encode(["salida" => "exito"]);
                } catch (Exception $th) {
                    echo json_encode(["salida" => "error", "data" => $th->getMessage()]);
                }
            } else {
                echo json_encode(["salida" => "error", "data" => "No se pudo mover el archivo al servidor"]);
            }
            break;
        case "loadingreport":
            $mysqli = new mysqli("localhost", "root", "", "dysam_facturas");

            if ($mysqli->connect_error) {
                echo json_encode(["salida" => "error", "data" => "Error de conexión a la base de datos: " . $mysqli->connect_error]);
            } else {
                $sql = "SELECT * FROM files";
                $result = $mysqli->query($sql);

                if ($result) {
                    $data = array();
                    while ($row = $result->fetch_assoc()) {
                        $data[] = $row;
                    }

                    if (empty($data)) {
                        echo json_encode(["salida" => "exito", "data" => "No se encontraron registros en la tabla archivos"]);
                    } else {
                        foreach ($data as &$row) {
                            $row["file_path"] = "" . $row["file_path"];
                        }
                        header('Content-Type: application/json');
                        echo json_encode(["salida" => "exito", "data" => $data]);
                    }
                } else {
                    echo json_encode(["salida" => "error", "data" => "Error en la consulta SQL: " . $mysqli->error]);
                }
            }
            break;
        case "correctreport":
            $idfile = $_POST["idfile"];
            $username = $_POST["username"];
            $statusfile = $_POST["statusfile"];
            $comment = $_POST["comment"];

            // Verifica si la factura existe
            $db->where("id_files", $idfile);
            $db->where("user_name", $username);
            $db->where("file_path", $_POST["filepath"]);
            $file = $db->getOne("files");

            if (is_null($file) || empty($file)) {
                echo json_encode(["salida" => "error", "data" => "El archivo no existe"]);
            } else {
                $updateData = array(
                    "status_file" => $statusfile,
                );
                $commentF = array(
                    "commentf" => $comment,
                );

                // Actualiza el estado de status_file
                $db->where("id_files", $idfile);
                $db->where("user_name", $username);
                $db->update("files", $updateData);

                // Inserta el comentario en la misma fila
                $db->where("id_files", $idfile);
                $db->where("user_name", $username);
                $db->update("files", $commentF);

                // Devuelve el ID del archivo en la respuesta JSON
                echo json_encode(["salida" => "exito", "data" => "Los datos del archivo se actualizaron correctamente", "id_file" => $idfile]);
            }
            break;
        case "loadingbillers":
            $mysqli = new mysqli("localhost", "root", "", "dysam_facturas");

            if ($mysqli->connect_error) {
                echo json_encode(["salida" => "error", "data" => "Error de conexión a la base de datos: " . $mysqli->connect_error]);
            } else {
                $sql = "SELECT * FROM billers";
                $result = $mysqli->query($sql);

                if ($result) {
                    $data = array();
                    while ($row = $result->fetch_assoc()) {
                        $data[] = $row;
                    }

                    if (empty($data)) {
                        echo json_encode(["salida" => "exito", "data" => "No se encontraron registros en la tabla billers"]);
                    } else {
                        // No es necesario convertir file_path a una cadena en blanco, ya que es un campo de texto.
                        header('Content-Type: application/json');
                        echo json_encode(["salida" => "exito", "data" => $data]);
                    }
                } else {
                    echo json_encode(["salida" => "error", "data" => "Error en la consulta SQL: " . $mysqli->error]);
                }
                // Cierra la conexión a la base de datos.
                $mysqli->close();
            }
            break;
    }
    exit;
}

exit;
