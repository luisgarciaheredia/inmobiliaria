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
                    <h5 class="blue-text text-darken-4">Formulario Rol</h5>
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
                            <input id="role" type="text" class="validate" required>
                            <label class="grey-text" for="role">Rol</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s3">
                            <div>Propietarios:</div>
                            <div><label><input type="checkbox" class="permission" id="Owner_Create" /><span>Create</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Owner_Read" /><span>Read</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Owner_Update" /><span>Update</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Owner_Delete" /><span>Delete</span></label></div>
                        </div>
                        <div class="input-field col s3">
                            <div>Proyectos:</div>
                            <div><label><input type="checkbox" class="permission" id="Project_Create" /><span>Create</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Project_Read" /><span>Read</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Project_Update" /><span>Update</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Project_Delete" /><span>Delete</span></label></div>
                        </div>
                        <div class="input-field col s3">
                            <div>Lotes:</div>
                            <div><label><input type="checkbox" class="permission" id="Lot_Create" /><span>Create</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Lot_Read" /><span>Read</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Lot_Update" /><span>Update</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Lot_Delete" /><span>Delete</span></label></div>
                        </div>
                        <div class="input-field col s3">
                            <div>Ventas:</div>
                            <div><label><input type="checkbox" class="permission" id="Order_Create" /><span>Create</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Order_Read" /><span>Read</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Order_Update" /><span>Update</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Order_Delete" /><span>Delete</span></label></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s3">
                            <div>Cuotas:</div>
                            <div><label><input type="checkbox" class="permission" id="Payment_Create" /><span>Create</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Payment_Read" /><span>Read</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Payment_Update" /><span>Update</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Payment_Delete" /><span>Delete</span></label></div>
                        </div>
                        <div class="input-field col s3">
                            <div>Usuarios:</div>
                            <div><label><input type="checkbox" class="permission" id="User_Create" /><span>Create</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="User_Read" /><span>Read</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="User_Update" /><span>Update</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="User_Delete" /><span>Delete</span></label></div>
                        </div>
                        <div class="input-field col s3">
                            <div>Roles:</div>
                            <div><label><input type="checkbox" class="permission" id="Role_Create" /><span>Create</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Role_Read" /><span>Read</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Role_Update" /><span>Update</span></label></div>
                            <div><label><input type="checkbox" class="permission" id="Role_Delete" /><span>Delete</span></label></div>
                        </div>
                        <div class="input-field col s3">
                            <div>Reportes:</div>
                            <div><label><input type="checkbox" class="permission" id="Reports_Read" /><span>Read</span></label></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 ">
                            <div class="switch">
                                <span>Estado:</span><label>Off<input id="status" type="checkbox"><span class="lever"></span>On</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <a href="../../admin/role/list" class="waves-effect waves-light btn grey" type="button"><i class="material-icons left">cancel</i>Cancelar</a>
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
    <script type="text/javascript" src="../../admin/scripts/role.js"></script>

</body>

</html>