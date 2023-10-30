<?php

session_start();

// settings
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
date_default_timezone_set('America/Lima');

// includes
include_once '../../app/config/DBConnection.php';
include_once '../../app/entities/Lot.php';
include_once '../../app/config/Auth.php';

// set variables
$requestMethod = $_SERVER["REQUEST_METHOD"];
$objDBConnection = new DBConnection();
$objLot = new Lot($objDBConnection);
$objAuth = new Auth;

// controller
switch ($requestMethod) {
    case 'GET':

        // authentication and authorization
        if ($objAuth->isAuthenticated()) {
            if ($objAuth->isAuthorized('Lot_Read')) {
                
                // get from id or all
                if (filter_input(INPUT_GET, 'id')) {
                    $objLot->set_id(filter_input(INPUT_GET, 'id'));
                    $rows = $objLot->get();
                } else if (filter_input(INPUT_GET, 'query')) {
                    $rows = $objLot->search(filter_input(INPUT_GET, 'query'));
                } else if (filter_input(INPUT_GET, 'unsold')) {
                    $rows = $objLot->getUnsold();
                } else {
                    $rows = $objLot->getAll();
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
