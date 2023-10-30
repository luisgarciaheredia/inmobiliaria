<?php

session_start();

// settings
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
date_default_timezone_set('America/Lima');

// includes
include_once '../../app/config/DBConnection.php';
include_once '../../app/entities/User.php';
include_once '../../app/config/Auth.php';

// set variables
$requestMethod = $_SERVER["REQUEST_METHOD"];
$objDBConnection = new DBConnection();
$objUser = new User($objDBConnection);
$objAuth = new Auth;

// controller
switch ($requestMethod) {
    case 'POST':

        // authentication and authorization
        if ($objAuth->isAuthenticated()) {
            if ($objAuth->isAuthorized('User_Update')) {

                // set variables
                $objUser->set_id(filter_input(INPUT_POST, 'id'));
                $objUser->set_name(filter_input(INPUT_POST, 'name'));
                $objUser->set_email(filter_input(INPUT_POST, 'email'));
                $objUser->set_user(filter_input(INPUT_POST, 'user'));
                $objUser->set_password(filter_input(INPUT_POST, 'password'));
                $objUser->set_role_id(filter_input(INPUT_POST, 'role_id'));
                $objUser->set_status(filter_input(INPUT_POST, 'status'));

                // update
                $rowCount = $objUser->update();

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
