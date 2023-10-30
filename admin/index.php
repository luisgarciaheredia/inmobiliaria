<?php

session_start();

// verify login
if (!isset($_SESSION['name']) && $_SERVER['REDIRECT_URL'] != '/inmobiliaria/admin/user/login') {
    header('Location: ../../admin/user/login'); // redirect to login
}

// includes
require_once 'classes/Router.php';

// reports routes
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/reports/lots_and_orders_by_project',
    filename: './views/reports/lots_and_orders_by_project.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/reports/orders_and_payments_by_project',
    filename: './views/reports/orders_and_payments_by_project.php'
);


// lot routes
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/lot/list',
    filename: './views/lot/list.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/lot/create',
    filename: './views/lot/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/lot/update',
    filename: './views/lot/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/lot/create_many_lots',
    filename: './views/lot/many_lots_form.php'
);


// role routes
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/role/list',
    filename: './views/role/list.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/role/create',
    filename: './views/role/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/role/update',
    filename: './views/role/form.php'
);


// order routes
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/order/list',
    filename: './views/order/list.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/order/create',
    filename: './views/order/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/order/update',
    filename: './views/order/form.php'
);


// payment routes
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/payment/list',
    filename: './views/payment/list.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/payment/view',
    filename: './views/payment/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/payment/pay',
    filename: './views/payment/form.php'
);


// owner routes
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/owner/list',
    filename: './views/owner/list.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/owner/create',
    filename: './views/owner/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/owner/update',
    filename: './views/owner/form.php'
);


// project routes
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/project/list',
    filename: './views/project/list.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/project/create',
    filename: './views/project/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/project/update',
    filename: './views/project/form.php'
);


// user routes
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/user/list',
    filename: './views/user/list.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/user/create',
    filename: './views/user/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/user/update',
    filename: './views/user/form.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/user/login',
    filename: './views/user/login.php'
);
Router::handle(
    method: 'GET',
    path: '/inmobiliaria/admin/user/dashboard',
    filename: './views/user/dashboard.php'
);

/*
$routes = [];

route('/inmobiliaria/', function () {
    echo "Home Page";
});

route('/inmobiliaria/login', function () {
    echo "Login Page";
});

route('/about-us', function () {
    echo "About Us";
});

route('/404', function () {
    echo "Page not found";
});

function route(string $path, callable $callback)
{
    global $routes;
    $routes[$path] = $callback;
}

run();

function run()
{
    global $routes;
    $uri = $_SERVER['REQUEST_URI'];
    $found = false;
    foreach ($routes as $path => $callback) {
        if ($path !== $uri) continue;

        $found = true;
        $callback();
    }

    if (!$found) {
        $notFoundCallback = $routes['/404'];
        $notFoundCallback();
    }
}
*/