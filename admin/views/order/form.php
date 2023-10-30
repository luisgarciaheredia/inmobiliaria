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
                    <h5 class="blue-text text-darken-4">Formulario Venta</h5>
                </div>
            </div>

            <!-- Loader -->
            <div class="progress">
                <div class="indeterminate"></div>
            </div>

            <!-- Order Form -->
            <div class="card" style='display:none'>
                <form id="orders">
                    <div class="row">
                        <div class="select-field col s6 m4">
                            <label for="project_id">Proyecto</label>
                            <select id="project_id" class="browser-default" required style="width:100%"> <!-- fixed width to select2 plugin -->
                                <option value="" disabled selected>Elige una opción</option>
                            </select>
                        </div>
                        <div class="select-field col s6 m4">
                            <label for="lot_id">Manzana y Lote</label>
                            <select id="lot_id" class="browser-default" required style="width:100%"> <!-- fixed width to select2 plugin -->
                                <option value="" disabled selected>Elige una opción</option>
                            </select>
                        </div>
                        <div class="select-field col s6 m4">
                            <label for="owner_id">Propietario</label>
                            <select id="owner_id" class="browser-default" required style="width:100%"> <!-- fixed width to select2 plugin -->
                                <option value="" disabled selected>Elige una opción</option>
                            </select>
                        </div>
                        <input id="user_id" type="hidden">
                        <div class="input-field col s6 m4">
                            <input id="price" type="number" class="validate" required step=".01" min="1">
                            <label class="grey-text" for="price">Precio</label>
                        </div>
                        <div class="input-field col s6 m4">
                            <input id="date" type="date" class="validate input-date" required>
                            <label class="grey-text" for="date">Fecha de venta</label>
                        </div>
                        <div class="input-field col s6 m4">
                            <input id="comments" type="text" class="validate" required>
                            <label class="grey-text" for="comments">Comentario</label>
                        </div>
                        <div class="radiobutton-field col s12">
                            <span>Tipo de Pago:</span>
                            <label>
                                <input type="radio" name="type" value="Contado" required />
                                <span>Contado</span>
                            </label>
                            <label>
                                <input type="radio" name="type" value="Credito" required />
                                <span>Crédito</span>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <a href="../../admin/order/list" class="waves-effect waves-light btn grey" type="button"><i class="material-icons left">cancel</i>Cancelar</a>
                            <button class="waves-effect waves-light btn red" type="submit"><i class="material-icons left">play_arrow</i>Continuar</button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Generate Payments Title -->
            <div class="row">
                <div class="col s12 title-wrapper">
                    <h5 id="payment_title" class="blue-text text-darken-4 hide">Cuotas</h5>
                </div>
            </div>

            <!-- Generate Payments Form -->
            <div class="card hide">
                <form id="generate_payments">
                    <div class="row">
                        <div id="generate_payments_container">
                            <div class="input-field col s6 m3">
                                <input id="initial_payment" type="number" class="validate" required step=".01">
                                <label class="grey-text" for="initial_payment">Monto Inicial</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <input id="initial_payment_quantity" type="number" class="validate" required step="1" min="1" value="1">
                                <label class="grey-text" for="initial_payment_quantity">Cuotas Monto Inicial</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <input id="other_payments_quantity" type="number" class="validate" required step="1" value="2">
                                <label class="grey-text" for="other_payments_quantity">Cuotas Monto Financiado</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <a id="generate_payments_btn" class="waves-effect btn">Generar Cuotas</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Payments Form -->
            <div class="card hide">
                <form id="payments">
                    <div class="row">
                        <div class="input-field col s12">
                            <a href="../../admin/order/list" class="waves-effect waves-light btn grey" type="button"><i class="material-icons left">cancel</i>Cancelar</a>
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
    <script type="text/javascript" src="../../admin/scripts/order.js"></script>

</body>

</html>