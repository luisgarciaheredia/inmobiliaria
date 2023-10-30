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

        // login
        if (filter_input(INPUT_POST, 'user') && filter_input(INPUT_POST, 'password')) {
            $objUser->set_user(filter_input(INPUT_POST, 'user'));
            $objUser->set_password(filter_input(INPUT_POST, 'password'));
            $rows = $objUser->login();
            if (!empty($rows)) {

                // success login and init session
                $objAuth->initSession(
                    $rows[0]['id'],
                    filter_input(INPUT_POST, 'user'),
                    $rows[0]['name'],
                    $rows[0]['email'],
                    $rows[0]['permissions']
                );
            }
        } else {
            $rows = [];
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
        header('Content-Type: application/json');
        echo $encode = json_encode($result, true);
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
