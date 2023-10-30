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
                    <h5 class="blue-text text-darken-4">Formulario Usuario</h5>
                </div>
            </div>

            <!-- Loader -->
            <div class="progress" style='display:none'>
                <div class="indeterminate"></div>
            </div>

            <!-- Form -->
            <div class="card">
                <form>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="name" type="text" class="validate" required autocomplete="off">
                            <label class="grey-text" for="name">Nombre</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="email" type="text" class="validate" required autocomplete="off">
                            <label class="grey-text" for="email">Correo electrónico</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="user" type="text" class="validate" required>
                            <label class="grey-text" for="user">Usuario</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="password" type="text" class="validate" required>
                            <label class="grey-text" for="password">Contraseña</label>
                        </div>
                        <div class="select-field col s12">
                            <label for="role_id">Rol</label>
                            <select id="role_id" class="browser-default" required>
                                <option value="" disabled selected>Elige una opción</option>
                            </select>
                        </div>
                        <div class="input-field col s12 ">
                            <div class="switch">
                                <span>Estado:</span><label>Off<input id="status" type="checkbox" checked="checked"><span class="lever"></span>On</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <a href="../../admin/user/list" class="waves-effect waves-light btn grey" type="button"><i class="material-icons left">cancel</i>Cancelar</a>
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
    <script type="text/javascript" src="../../admin/scripts/user.js"></script>

</body>

</html>