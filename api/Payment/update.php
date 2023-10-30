<?php

session_start();

// settings
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
date_default_timezone_set('America/Lima');

// includes
include_once '../../app/config/DBConnection.php';
include_once '../../app/entities/Payment.php';
include_once '../../app/config/Auth.php';

// set variables
$requestMethod = $_SERVER["REQUEST_METHOD"];
$objDBConnection = new DBConnection();
$objPayment = new Payment($objDBConnection);
$objAuth = new Auth;

// controller
switch ($requestMethod) {
    case 'POST':

        // authentication and authorization
        if ($objAuth->isAuthenticated()) {
            if ($objAuth->isAuthorized('Payment_Update')) {

                // set variables
                $objPayment->set_id(filter_input(INPUT_POST, 'id'));
                $objPayment->set_order_id(filter_input(INPUT_POST, 'order_id'));
                $objPayment->set_type(filter_input(INPUT_POST, 'type'));
                $objPayment->set_number(filter_input(INPUT_POST, 'number'));
                $objPayment->set_amount(filter_input(INPUT_POST, 'amount'));
                $objPayment->set_due_date(filter_input(INPUT_POST, 'due_date'));
                $objPayment->set_amount_in_progress(filter_input(INPUT_POST, 'amount_in_progress'));
                $objPayment->set_last_payment_date(filter_input(INPUT_POST, 'last_payment_date'));
                $objPayment->set_invoice(filter_input(INPUT_POST, 'invoice'));
                $objPayment->set_invoice_detail(filter_input(INPUT_POST, 'invoice_detail'));
                $objPayment->set_comments(filter_input(INPUT_POST, 'comments'));
                $objPayment->set_status(filter_input(INPUT_POST, 'status'));

                // update
                $rowCount = $objPayment->update();

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
