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
            <h4 class="blue-text">¡Bienvenido!</h4>

            <!-- Loader -->
            <div class="progress">
                <div class="indeterminate"></div>
            </div>

            <div class="row user-card" style='display:none'>
                <div class="col s12 m6">
                    <div class="card">
                            <div id="unsold_lots_by_proyect_data_chart_div"></div>
                        <div class="card-content">
                            <span class="card-title">Lotes faltantes por Proyecto</span>
                            <p>Estos son los proyectos con sus respectivos lotes que faltan vender.</p>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="card">
                            <div id="balances_by_owner_data_chart_div"></div>
                        <div class="card-content">
                            <span class="card-title">Saldos por Propietario</span>
                            <p>Estos son los saldos de los propietarios de mayor a menor.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <?php require_once './views/templates/footer.php'; ?>

    <!-- Import own script -->
    <script type="text/javascript" src="../../admin/scripts/user.js"></script>

</body>

</html>