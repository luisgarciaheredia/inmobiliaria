<!DOCTYPE html>
<html lang="es">
<?php require_once './views/templates/head.php'; ?>

<body>

    <!-- Header -->
    <?php require_once './views/templates/header.php'; ?>

    <!-- Nav -->
    <header class="center blue darken-4 white-text section"><span id="logo"></span>Inmobiliaria Titanio</header>

    <!-- Main -->
    <main>
        <div class="container" style="width:300px">

            <!-- Title, Search and buttons container -->
            <div class="row">
                <div class="col s12 title-wrapper">
                    <h5 class="blue-text text-darken-4">Inicia sesión</h5>
                </div>
            </div>

            <!-- Loader -->
            <div class="progress" style='display:none'>
                <div class="indeterminate"></div>
            </div>

            <!-- Form -->
            <div class="card user-card">
                <form>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="user" type="text" class="validate" required>
                            <label class="grey-text" for="user">Usuario</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate" required>
                            <label class="grey-text" for="password">Contraseña</label>
                        </div>
                        <div class="input-field col s12">
                            <button class="waves-effect waves-light btn red" type="submit"><i class="material-icons left">login</i>Iniciar Sesión</button>
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