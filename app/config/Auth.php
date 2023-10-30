<?php

class Auth
{

    // after success login set user and permissions on the session
    public function initSession($id, $user, $name, $email, $permissions)
    {
        session_regenerate_id(); // new session id for more secutiry
        $_SESSION['user_id'] = $id;
        $_SESSION['user'] = $user;
        $_SESSION['name'] = $name;
        $_SESSION['email'] = $email;
        $_SESSION['permissions'] = $permissions;
    }

    // verify user session variable
    public function isAuthenticated()
    {
        if (isset($_SESSION['user'])) {
            return true;
        } else {
            return false;
        }
    }

    // verify permissions session variable
    public function isAuthorized($permission)
    {
        if (str_contains($_SESSION['permissions'], $permission)) {
            return true;
        } else {
            return false;
        }
    }
}
