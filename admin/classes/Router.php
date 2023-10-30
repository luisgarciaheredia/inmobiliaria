<?php

class Router
{
    public static function handle($method = 'GET', $path = '/', $filename = '')
    {
        $currentMethod = $_SERVER['REQUEST_METHOD'];
        $currentUri = $_SERVER['REDIRECT_URL'];

        // verify method
        if ($currentMethod != $method) {
            return false;
        }

        // verify path
        // echo "<pre>currentUri: $currentUri. path: $path.\n</pre>"; // validate variables
        if ($currentUri == $path) {
            require_once $filename;
            exit();
        }
        return false;
    }
}
