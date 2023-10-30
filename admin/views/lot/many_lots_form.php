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

            <!-- Title container -->
            <div class="row">
                <div class="col s12 title-wrapper">
                    <h5 class="blue-text text-darken-4">Formulario Varios Lotes</h5>
                </div>
            </div>

            <!-- Loader -->
            <div class="progress">
                <div class="indeterminate"></div>
            </div>

            <!-- Form -->
            <div class="card" style='display:none'>
                <form>
                    <div class="row">
                        <div class="select-field col s12">
                            <label for="project_id">Proyecto</label>
                            <select id="project_id" class="browser-default" required style="width:100%"> <!-- set with to select2 plugin -->
                                <option value="" disabled selected>Elige una opción</option>
                            </select>
                        </div>
                    </div>
                    <div class="row many_lots">
                        <div class="input-field col s4">
                            <input id="block" name="block" type="text" class="validate" value="A" required>
                            <label class="grey-text" for="block">Manzana</label>
                        </div>
                        <div class="input-field col s4">
                            <input id="lots_quantity" name="lots_quantity" type="number" class="validate" value="1" required min="1">
                            <label class="grey-text" for="lots_quantity">Lotes</label>
                        </div>
                        <div class="input-field col s4 valign-wrapper links-wrapper">
                            <a href='#' class="add"><i class='small material-icons green-text'>add_circle</i></a>
                            <a href='#' class="remove hide"><i class='small material-icons red-text'>remove_circle</i></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <a href="../../admin/lot/list" class="waves-effect waves-light btn grey" type="button"><i class="material-icons left">cancel</i>Cancelar</a>
                            <button class="waves-effect waves-light btn red" type="submit"><i class="material-icons left">save</i>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <?php require_once './views/templates/footer.php'; ?>

    <!-- Import own script -->
    <script type="text/javascript" src="../../admin/scripts/lot.js"></script>

</body>

</html>