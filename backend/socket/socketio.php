<?php
require '../../vendor/autoload.php';
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use DysamFacturas\backend\socket\dysamSocketClass;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new dysamSocketClass() // Crea una instancia de tu clase de Socket
        )
    ),
    8080 // Puerto en el que escuchará el servidor
);

$server->run();
