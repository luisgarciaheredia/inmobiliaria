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
    case 'POST':

        // authentication and authorization
        if ($objAuth->isAuthenticated()) {
            if ($objAuth->isAuthorized('Order_Update')) {

                // set variables
                $objOrder->set_id(filter_input(INPUT_POST, 'id'));
                $objOrder->set_lot_id(filter_input(INPUT_POST, 'lot_id'));
                $objOrder->set_owner_id(filter_input(INPUT_POST, 'owner_id'));
                $objOrder->set_user_id(filter_input(INPUT_POST, 'user_id'));
                $objOrder->set_price(filter_input(INPUT_POST, 'price'));
                $objOrder->set_type(filter_input(INPUT_POST, 'type'));
                $objOrder->set_date(filter_input(INPUT_POST, 'date'));
                $objOrder->set_comments(filter_input(INPUT_POST, 'comments'));
                $objOrder->set_status(filter_input(INPUT_POST, 'status'));

                // update
                $rowCount = $objOrder->update();

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
