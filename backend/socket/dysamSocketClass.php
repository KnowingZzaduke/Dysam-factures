<?php

namespace DysamFacturas\backend\socket;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class dysamSocketClass implements MessageComponentInterface {
    protected $connections = [];

    public function onOpen(ConnectionInterface $conn) {
        $this->connections[] = $conn;
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // Implementa tu lógica para manejar los mensajes recibidos
    }

    public function onClose(ConnectionInterface $conn) {
        $index = array_search($conn, $this->connections);
        if ($index !== false) {
            unset($this->connections[$index]);
        }
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        // Implementa cómo manejar los errores en la conexión
    }

    public function emitDataInsertedEvent($insertedData) {
        foreach ($this->connections as $connection) {
            $connection->send(json_encode([
                'event' => 'dataInserted',
                'data' => $insertedData
            ]));
        }
    }
}
