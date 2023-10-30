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
                    <h5 class="blue-text text-darken-4">Formulario Propietario</h5>
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
                        <div class="input-field col s12">
                            <input id="document" type="text" class="validate" required>
                            <label class="grey-text" for="document">Documento</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="name" type="text" class="validate" required autocomplete="off">
                            <label class="grey-text" for="name">Nombre</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="phone" type="number" class="validate" required autocomplete="off">
                            <label class="grey-text" for="phone">Teléfono</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="address" type="text" class="validate" required autocomplete="off">
                            <label class="grey-text" for="address">Dirección</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="reference" type="text" class="validate" required>
                            <label class="grey-text" for="reference">Referencia</label>
                        </div>
                        <div class="input-field col s12 ">
                            <div class="switch">
                                <span>Estado:</span><label>Off<input id="status" type="checkbox" checked="checked"><span class="lever"></span>On</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <a href="../../admin/owner/list" class="waves-effect waves-light btn grey" type="button"><i class="material-icons left">cancel</i>Cancelar</a>
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
    <script type="text/javascript" src="../../admin/scripts/owner.js"></script>

</body>

</html>