<?php

session_start();
session_destroy(); // logout

// set result
$result = array(
    'code' => 200,
    'message' => 'Logout exitoso.',
    'data' => ''
);
header('Content-Type: application/json');
echo $encode = json_encode($result, true);
