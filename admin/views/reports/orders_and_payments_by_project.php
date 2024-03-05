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
                    <h5 class="blue-text text-darken-4">Reporte Pagos por Proyecto</h5>
                </div>
                <div class="col s12 m12 l6 buttons-wrapper hide">
                </div>
            </div>

            <!-- Loader -->
            <div class="progress" style='display:none'>
                <div class="indeterminate"></div>
            </div>

            <!-- Search Form -->
            <div class="card">
                <form>
                    <div class="row">
                        <div class="select-field col s12 m4">
                            <label for="project_id">Proyecto</label>
                            <select id="project_id" class="browser-default" required style="width:100%"> <!-- set with to select2 plugin -->
                                <option value="" disabled selected>Elige una opción</option>
                            </select>
                        </div>
                        <div class="input-field col s12 m4">
                            <input id="date" type="date" class="validate input-date" required>
                            <label class="grey-text" for="date">Fecha de venta</label>
                        </div>
                        <div class="input-field col s12 m4">
                            <button class="waves-effect waves-light btn red" type="submit"><i class="material-icons left">play_arrow</i>Generar Reporte</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="buttons-wrapper"></div>

            <div class="row">
                <div class="select-field col s12 m8">

                    <!-- List Table -->
                    <div class="overflow-x-auto card table-card">
                        <table class="hover row-border nowrap order-column centered compact" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Código Proyecto</th>
                                    <th>Proyecto</th>
                                    <th>Manzana</th>
                                    <th>Lote</th>
                                    <th>Propietario</th>
                                    <th>Teléfono</th>
                                    <th>Tipo</th>
                                    <th>N°</th>
                                    <th>Fecha Vcto.</th>
                                    <th>Monto Pagado</th>
                                    <th>Saldo</th>
                                    <th>Estado</th>
                                    <th>Mes</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                </div>


                <div class="select-field col s12 m4">
                    <div id="columnchart_material" style="width: 400px; height: 300px; margin: 0 auto 2rem;"></div>
                </div>

            </div>
    </main>

    <!-- Footer -->
    <?php require_once './views/templates/footer.php'; ?>

    <!-- Import own script -->
    <script type="text/javascript" src="../../admin/scripts/reports.js"></script>

</body>

</html>