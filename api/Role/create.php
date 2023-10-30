<?php

session_start();

// settings
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
date_default_timezone_set('America/Lima');

// includes
include_once '../../app/config/DBConnection.php';
include_once '../../app/entities/Role.php';
include_once '../../app/config/Auth.php';

// set variables
$requestMethod = $_SERVER["REQUEST_METHOD"];
$objDBConnection = new DBConnection();
$objRole = new Role($objDBConnection);
$objAuth = new Auth;

// controller
switch ($requestMethod) {
    case 'POST':

        // authentication and authorization
        if ($objAuth->isAuthenticated()) {
            if ($objAuth->isAuthorized('Role_Create')) {

                // set variables
                $objRole->set_role(filter_input(INPUT_POST, 'role'));
                $objRole->set_permissions(filter_input(INPUT_POST, 'permissions'));
                $objRole->set_status(filter_input(INPUT_POST, 'status'));

                // create
                $lastInsertId = $objRole->create();

                // set last inserted id as result
                if (!empty($lastInsertId)) {
                    $result = array(
                        'code' => 200,
                        'message' => 'Se registró exitosamente.',
                        'data' => $lastInsertId
                    );
                } else {
                    $result = array(
                        'code' => 200,
                        'message' => 'No se registró nada.',
                        'data' => ''
                    );
                }
            } else {
                $result = array(
                    'code' => 403,
                    'message' => 'No autorizado. Necesita permisos para completar la acción.',
                    'data' => ''
                );
            }
        } else {
            $result = array(
                'code' => 401,
                'message' => 'No autenticado. Necesita iniciar sesión.',
                'data' => ''
            );
        }
        header('Content-Type: application/json');
        echo $encode = json_encode($result, true);
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
