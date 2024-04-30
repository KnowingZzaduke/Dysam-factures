<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require("db/MysqliDb.php");
// Crear una instancia
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
        case "sendfacture":
            $fecha = $_POST["fecha"];
            $nit = $_POST["nit"];
            $descripcion = $_POST["descripcion"];
            $vr_sin_iva = number_format(floatval(str_replace(',', '.', $_POST["total_sin_iva"])), 2, ',', '.');
            $vr_con_iva = number_format(floatval(str_replace(',', '.', $_POST["total_con_iva"])), 2, ',', '.');
            $estado = $_POST["estado"];
            $data = [
                "fecha" => $fecha,
                "nit_y_cliente" => $nit,
                "descripcion" => $descripcion,
                "vr_sin_iva" => $vr_sin_iva,
                "vr_con_iva" => $vr_con_iva,
                "estado" => $estado
            ];
            $db->insert("valores", $data);
            echo json_encode(["salida" => "exito", "data" => "Factura creada correctamente"]);
            break;
        case "loadinginventory":
            $inventarioData = $db->get("inventario");

            if (!$inventarioData || empty($inventarioData)) {
                echo json_encode(["salida" => "error", "data" => "No se encontraron datos en el inventario"]);
            } else {
                $response = [
                    "data" => array_map(function ($item) {
                        return [
                            "codigo" => $item["codigo"],
                            "descripcion" => $item["descripcion"],
                            "vunitario" => $item["vunitario"]
                        ];
                    }, $inventarioData)
                ];
                echo json_encode(["salida" => "exito", "data" => $response]);
            }
            break;
        case "loadingclients":
            $clientesdata = $db->get("clientes");

            if (!$clientesdata || empty($clientesdata)) {
                echo json_encode(["salida" => "error", "data" => "No se encontraron datos en el inventario"]);
            } else {
                $response = [
                    "data" => array_map(function ($item) {
                        return [
                            "id_cliente" => $item["id_cliente"],
                            "nombres" => $item["nombres"],
                        ];
                    }, $clientesdata)
                ];
                echo json_encode(["salida" => "exito", "data" => $response]);
            }
            break;
        case "loadingvalues":
            $valuesData = $db->get("valores");
            if (!$valuesData || empty($valuesData)) {
                echo json_encode(["salida" => "error", "data" => "No se encontraron datos en la tabla de valores de facturas"]);
            } else {
                $response = [
                    "data" => array_map(function ($item) {
                        return [
                            "idvalores_facturas" => $item["idvalores_facturas"],
                            "fecha" => $item["fecha"],
                            "nit_y_cliente" => $item["nit_y_cliente"],
                            "descripcion" => $item["descripcion"],
                            "vr_sin_iva" => $item["vr_sin_iva"],
                            "vr_con_iva" => $item["vr_con_iva"],
                            "estado" => $item["estado"]
                        ];
                    }, $valuesData)
                ];
                echo json_encode(["salida" => "exito", "data" => $response]);
            }
            break;

        case "updatedata":
            $idvalores_facturas = $_POST["idvalores_facturas"];
            $nuevoEstado = $_POST["estado"];
            $fecha = $_POST["fecha"];
            $clienteynit = $_POST["cliente_y_nit"];
            $descripcion = $_POST["descripcion"];
            $vr_sin_iva = $_POST["v_sin_iva"];
            $vr_con_iva = $_POST["v_con_iva"];

            if (isset($idvalores_facturas)) {
                // Obtener los campos que tienen valores válidos en la solicitud
                $updateData = [];
                if (isset($nuevoEstado) && $nuevoEstado !== '' && $nuevoEstado !== 'undefined') {
                    $updateData["estado"] = $nuevoEstado;
                }
                if (isset($fecha) && $fecha !== '' && $fecha !== 'undefined') {
                    $updateData["fecha"] = $fecha;
                }
                if (isset($clienteynit) && $clienteynit !== '' && $clienteynit !== 'undefined') {
                    $updateData["nit_y_cliente"] = $clienteynit;
                }
                if (isset($descripcion) && $descripcion !== '' && $descripcion !== 'undefined') {
                    $updateData["descripcion"] = $descripcion;
                }
                if (isset($vr_sin_iva) && $vr_sin_iva !== '' && $vr_sin_iva !== 'undefined') {
                    $updateData["vr_sin_iva"] = $vr_sin_iva;
                }
                if (isset($vr_con_iva) && $vr_con_iva !== '' && $vr_con_iva !== 'undefined') {
                    $updateData["vr_con_iva"] = $vr_con_iva;
                }

                if (!empty($updateData)) {
                    // Realizar la actualización solo si hay datos para actualizar
                    $actualizacionExitosa = $db->where('idvalores_facturas', $idvalores_facturas)
                        ->update("valores", $updateData);

                    if ($actualizacionExitosa) {
                        echo json_encode(["salida" => "exito", "mensaje" => "Datos actualizados correctamente"]);
                    } else {
                        echo json_encode(["salida" => "error", "mensaje" => "Error al actualizar los datos"]);
                    }
                } else {
                    // No hay datos válidos para actualizar
                    echo json_encode(["salida" => "info", "mensaje" => "No se proporcionaron datos válidos para actualizar"]);
                }
            } else {
                echo json_encode(["salida" => "error", "mensaje" => "Parámetros incompletos"]);
            }
            break;

        case "deletereport":
            $idvalores_facturas = $_POST["idvalores_facturas"];
            $nuevoEstado = $_POST["estado"];

            if (isset($idvalores_facturas, $nuevoEstado)) {
                $actualizacionExitosa = $db->where('idvalores_facturas', $idvalores_facturas)
                    ->update("valores", ["estado" => $nuevoEstado]);

                if ($actualizacionExitosa) {
                    echo json_encode(["salida" => "exito", "mensaje" => "Factura neutralizada correctamente"]);
                } else {
                    echo json_encode(["salida" => "error", "mensaje" => "Error al neutralizar la factura"]);
                }
            } else {
                echo json_encode(["salida" => "error", "mensaje" => "Parámetros incompletos"]);
            }
            break;
        case "makereport":
            $archivo_temporal = $_FILES["file"]["tmp_name"];
            $nombre_original = $_FILES["file"]["name"];
            date_default_timezone_set('America/Bogota');
            $hora_actual_colombia = new DateTime();
            $hora_actual = $hora_actual_colombia->format("H:i:s");
            $ruta_destino = "../uploads/" . uniqid() . "_" . $nombre_original;
            if (move_uploaded_file($archivo_temporal, $ruta_destino)) {
                $user_name = $_POST["user_name"];
                try {
                    $db->insert("files", [
                        "user_name" => $user_name,
                        "file_path" => $ruta_destino,
                        "date" => $_POST["date"],
                        "time" => $hora_actual,    // Guarda la hora actual
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
            $mysqli = new mysqli("localhost", "root", "", "dysam-facturas");

            if ($mysqli->connect_error) {
                echo json_encode(["salida" => "error", "data" => "Error de conexión a la base de datos: " . $mysqli->connect_error]);
            } else {
                // Consulta SQL sin paginación
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

                $db->where("id_files", $idfile);
                $db->where("user_name", $username);
                $db->update("files", $updateData);

                $db->where("id_files", $idfile);
                $db->where("user_name", $username);
                $db->update("files", $commentF);

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
        case "verifyreport":
            $idfile = $_POST["idfile"];
            $username = $_POST["username"];
            $statusfile = $_POST["statusfile"];
            $comment = $_POST["commentf"];

            $db->where("id_files", $idfile);
            $db->where("user_name", $username);
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

                $db->where("id_files", $idfile);
                $db->where("user_name", $username);
                $db->update("files", $updateData);

                $db->where("id_files", $idfile);
                $db->where("user_name", $username);
                $db->update("files", $commentF);
                echo json_encode(["salida" => "exito", "data" => "Los datos del archivo se actualizaron correctamente", "id_file" => $idfile]);
            }
            break;
        case "deletereport":
            $db->where("id_files", $_POST["idfile"]);
            $db->delete("files");
            echo json_encode(["salida" => "exito", "data" => "El reporte fue eliminado correctamente"]);
            break;
    }
    exit;
}

exit;
