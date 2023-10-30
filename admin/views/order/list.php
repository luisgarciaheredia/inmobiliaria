<!DOCTYPE html>
<html lang="es">
<?php require_once './views/templates/head.php'; ?>

<body>

    <!-- Header -->
    <?php require_once './views/templates/header.php'; ?>

    <!-- Nav -->
    <?php require_once './views/templates/sidebar.php'; ?>

    <!-- Main -->
    <main>
        <div class="container">

            <!-- Title, Search and Buttons container -->
            <div class="row">
                <div class="col s12 m12 l6 title-wrapper">
                    <h5 class="blue-text text-darken-4">Listado de Ventas</h5>
                </div>
                <div class="col s12 m12 l6 buttons-wrapper">
                    <a class="waves-effect btn red" href="../../admin/order/create"><i class="material-icons left">add</i>Añadir Venta</a>
                </div>
            </div>

            <!-- Loader -->
            <div class="progress">
                <div class="indeterminate"></div>
            </div>

            <!-- List Table -->
            <div class="overflow-x-auto card table-card" style='display:none'>
                <table class="hover row-border nowrap order-column centered compact" style="width:100%">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Código Lote</th>
                            <th>Código Proyecto</th>
                            <th>Proyecto</th>
                            <th>Manzana</th>
                            <th>Lote</th>
                            <th>Código Propietario</th>
                            <th>Propietario</th>
                            <th>Código Usuario</th>
                            <th>Usuario</th>
                            <th>Precio</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th>Comentarios</th>
                            <th>Estado</th>
                            <th>Creado</th>
                            <th>Modificado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <?php require_once './views/templates/footer.php'; ?>

    <!-- Import own script -->
    <script type="text/javascript" src="../../admin/scripts/order.js"></script>

</body>

</html>