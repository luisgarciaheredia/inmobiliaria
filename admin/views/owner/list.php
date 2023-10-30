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
                    <h5 class="blue-text text-darken-4">Listado de Propietarios</h5>
                </div>
                <div class="col s12 m12 l6 buttons-wrapper">
                    <a class="waves-effect btn red" href="../../admin/owner/create"><i class="material-icons left">add</i>Añadir Propietario</a>
                </div>
            </div>

            <!-- Loader -->
            <div class="progress">
                <div class="indeterminate"></div>
            </div>

            <!-- List Table -->
            <div class="overflow-x-auto card table-card" style='display:none'>
                <table class="hover row-border nowrap order-column compact centered" style="width:100%">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Referencia</th>
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
    <script type="text/javascript" src="../../admin/scripts/owner.js"></script>

</body>

</html>