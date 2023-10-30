<?php

session_start();

// settings
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
date_default_timezone_set('America/Lima');

// includes
include_once '../../app/config/DBConnection.php';
include_once '../../app/entities/Order.php';
include_once '../../app/config/Auth.php';

// set variables
$requestMethod = $_SERVER["REQUEST_METHOD"];
$objDBConnection = new DBConnection();
$objOrder = new Order($objDBConnection);
$objAuth = new Auth;

// controller
switch ($requestMethod) {
    case 'GET':

        // authentication and authorization
        if ($objAuth->isAuthenticated()) {
            if ($objAuth->isAuthorized('Order_Read')) {

                // get from id or all
                if (filter_input(INPUT_GET, 'id')) {
                    $objOrder->set_id(filter_input(INPUT_GET, 'id'));
                    $rows = $objOrder->get();
                } else if (filter_input(INPUT_GET, 'query')) {
                    $rows = $objOrder->search(filter_input(INPUT_GET, 'query'));
                } else {
                    $rows = $objOrder->getAll();
                }

                // set registers as result
                if (!empty($rows)) {
                    $result = array(
                        'code' => 200,
                        'message' => 'Ok.',
                        'data' => $rows
                    );
                } else {
                    $result = array(
                        'code' => 200,
                        'message' => 'Sin registros.',
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
