<?php

require '../backend/vendor/autoload.php'; // Ajusta la ruta a tu archivo autoload.php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use DysamFacturas\backend\socket\dysamSocketClass; // Utiliza el espacio de nombres adecuado

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new dysamSocketClass() // Crea una instancia de tu clase de Socket
        )
    ),
    8080 // Puerto en el que escuchará el servidor
);

$server->run();
