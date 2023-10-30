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
                    <h5 class="blue-text text-darken-4">Listado de Pagos</h5>
                </div>
                <div class="col s12 m12 l6 buttons-wrapper hide">
                </div>
            </div>

            <!-- Loader -->
            <div class="progress">
                <div class="indeterminate"></div>
            </div>

            <div class="card search-card" style='display:none'>
                <div class="row">
                    <div class="select-field col s6">
                        <label for="project_id">Proyecto</label>
                        <select id="project_id" class="browser-default" required style="width:100%"> <!-- fixed width to select2 plugin -->
                            <option value="" disabled selected>Elige una opción</option>
                        </select>
                    </div>
                    <div class="select-field col s6">
                        <label for="lot_id">Manzana y Lote</label>
                        <select id="lot_id" class="browser-default" required style="width:100%"> <!-- fixed width to select2 plugin -->
                            <option value="" disabled selected>Elige una opción</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- List Table -->
            <div class="overflow-x-auto card table-card hide">
                <table class="hover row-border nowrap order-column centered compact" style="width:100%">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Código Venta</th>
                            <th>Código Lote</th>
                            <th>Tipo</th>
                            <th>N°</th>
                            <th>Monto</th>
                            <th>Fecha Vcto.</th>
                            <th>Pagado</th>
                            <th>Saldo</th>
                            <th>Estado</th>
                            <th>Última Fecha Pago</th>
                            <th>Recibo</th>
                            <th>Detalle</th>
                            <th>Comentario</th>
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
    <script type="text/javascript" src="../../admin/scripts/payment.js"></script>

</body>

</html>