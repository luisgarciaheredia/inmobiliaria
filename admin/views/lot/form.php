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
                <div class="col s12 title-wrapper">
                    <h5 class="blue-text text-darken-4">Formulario Lote</h5>
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
                        <div class="input-field col s12">
                            <input id="block" type="text" class="validate" required>
                            <label class="grey-text" for="block">Manzana</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="lot" type="text" class="validate" required>
                            <label class="grey-text" for="lot">Lote</label>
                        </div>
                        <div class="input-field col s12 ">
                            <div class="switch">
                                <span>Estado:</span><label>Off<input id="status" type="checkbox" checked="checked"><span class="lever"></span>On</label>
                            </div>
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