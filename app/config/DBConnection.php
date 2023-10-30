<?php

class DBConnection
{

    private $server = "localhost";
    private $dbname = "inmobiliaria";
    private $user = "root";
    private $password = "";
    //private $dbname = "terren66_inmobiliaria";
    //private $user = "terren66_inmobiliaria";
    //private $password = "#@O,6tKJ*zU1";
    private $port = "3306";
    private $connection;

    // set connection
    function __construct()
    {
        try {
            $this->connection = new PDO("mysql:host=" . $this->server . ";port=" . $this->port . ";dbname=" . $this->dbname, $this->user, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->query("SET NAMES utf8");
            return $this->connection;
        } catch (PDOException $exception) {
            echo "¡Error!: " . $exception->getMessage() . "<br/>";
        }
    }

    // execute sql statement
    function query($statement)
    {
        try {
            return $this->connection->query($statement);
        } catch (PDOException $exception) {
            echo "¡Error!: " . $exception->getMessage() . "<br/>";
        }
    }

    // get the last insert id of current connection
    function lastInsertId()
    {
        try {
            return $this->connection->lastInsertId();
        } catch (PDOException $exception) {
            echo "¡Error!: " . $exception->getMessage() . "<br/>";
        }
    }
}
