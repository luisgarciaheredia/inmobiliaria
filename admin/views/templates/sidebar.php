<!-- Desktop -->
<nav class="blue darken-2">
    <div class="nav-wrapper">
        <span class="brand-logo">Inmobiliaria Titanio</span>
        <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li><a href="../../admin/owner/list">Propietarios</a></li>
            <li><a href="../../admin/project/list">Proyectos</a></li>
            <li><a href="../../admin/lot/list">Lotes</a></li>
            <li><a href="../../admin/order/list">Ventas</a></li>
            <li><a href="../../admin/payment/list">Pagos</a></li>
            <li><a class="dropdown-trigger" href="#!" data-target="reports-dropdown">Reportes<i class="material-icons right">arrow_drop_down</i></a></li>

            <!-- reports dropdown Structure -->
            <ul id="reports-dropdown" class="dropdown-content">
                <li><a href="../../admin/reports/lots_and_orders_by_project"><i class="material-icons left">description</i>Lotes vendidos por Proyecto</a></li>
                <li class="divider"></li>
                <li><a href="../../admin/reports/orders_and_payments_by_project"><i class="material-icons left">description</i>Pagos por Proyecto</a></li>
            </ul>

            <li><a href="../../admin/role/list">Roles</a></li>
            <li><a href="../../admin/user/list">Usuarios</a></li>
            <li><a class="dropdown-trigger" href="#!" data-target="user-dropdown"><?= $_SESSION['name'] ?? '(Ninguno)' ?> (<?= $_SESSION['user'] ?? '-' ?>)<i class="material-icons right">arrow_drop_down</i></a></li>

            <!-- user dropdown Structure -->
            <ul id="user-dropdown" class="dropdown-content">
                <li><a href="../../admin/user/dashboard"><i class="material-icons left">person</i>Dashboard</a></li>
                <li class="divider"></li>
                <li><a href="#" class="logout"><i class="material-icons left">logout</i>Cerrar Sesión</a></li>
            </ul>

        </ul>
    </div>
</nav>

<!-- Mobile -->
<ul class="sidenav" id="mobile-nav">
    <li>
        <div class="user-view">
            <div class="background"><img src="../../resources/img/bg.png"></div>
            <a href="../../admin/user/dashboard"><img class="circle" src="../../resources/img/user_icon.png"></a>
            <a href="../../admin/user/dashboard"><span class="white-text name"><?= $_SESSION['name'] ?? '-' ?> (<?= $_SESSION['user'] ?? '-' ?>)</span></a>
            <a href="../../admin/user/dashboard"><span class="white-text email"><?= $_SESSION['email'] ?? '-' ?></span></a>
        </div>
    </li>
    <li><a href="../../admin/owner/list">Propietarios</a></li>
    <li><a href="../../admin/project/list">Proyectos</a></li>
    <li><a href="../../admin/lot/list">Lotes</a></li>
    <li><a href="../../admin/order/list">Ventas</a></li>
    <li><a href="../../admin/payment/list">Pagos</a></li>
    <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
            <li>
                <a class="collapsible-header">Reportes<i class="material-icons right">arrow_drop_down</i></a>
                <div class="collapsible-body">
                    <ul>
                        <li><a href="../../admin/reports/lots_and_orders_by_project"><i class="material-icons left">description</i>Lotes vendidos por Proyecto</a></li>
                        <li><a href="../../admin/reports/orders_and_payments_by_project"><i class="material-icons left">description</i>Pagos por Proyecto</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </li>
    <li><a href="../../admin/role/list">Roles</a></li>
    <li><a href="../../admin/user/list">Usuarios</a></li>
    <li><a href="#" class="logout"><i class="material-icons right">logout</i>Cerrar Sesión</a></li>
</ul>