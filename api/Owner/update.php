<?php

session_start();

// settings
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
date_default_timezone_set('America/Lima');

// includes
include_once '../../app/config/DBConnection.php';
include_once '../../app/entities/Owner.php';
include_once '../../app/config/Auth.php';

// set variables
$requestMethod = $_SERVER["REQUEST_METHOD"];
$objDBConnection = new DBConnection();
$objOwner = new Owner($objDBConnection);
$objAuth = new Auth;

// controller
switch ($requestMethod) {
    case 'POST':

        // authentication and authorization
        if ($objAuth->isAuthenticated()) {
            if ($objAuth->isAuthorized('Owner_Update')) {

                // set variables
                $objOwner->set_id(filter_input(INPUT_POST, 'id'));
                $objOwner->set_document(filter_input(INPUT_POST, 'document'));
                $objOwner->set_name(filter_input(INPUT_POST, 'name'));
                $objOwner->set_phone(filter_input(INPUT_POST, 'phone'));
                $objOwner->set_address(filter_input(INPUT_POST, 'address'));
                $objOwner->set_reference(filter_input(INPUT_POST, 'reference'));
                $objOwner->set_status(filter_input(INPUT_POST, 'status'));

                // update
                $rowCount = $objOwner->update();

                // set rows affected as result
                if (!empty($rowCount)) {
                    $result = array(
                        'code' => 200,
                        'message' => 'Se modificó exitosamente.',
                        'data' => $rowCount
                    );
                } else {
                    $result = array(
                        'code' => 200,
                        'message' => 'Sin cambios.',
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
