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
                    <h5 class="blue-text text-darken-4">Formulario Pago</h5>
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
                        <input id="order_id" type="hidden">
                        <input id="type" type="hidden">
                        <input id="number" type="hidden">
                        <input id="amount" type="hidden">
                        <input id="due_date" type="hidden">
                        <input id="amount_in_progress" type="hidden">
                        <input id="project_id" type="hidden">
                        <input id="lot_id" type="hidden">
                        <div class="input-field col s12">
                            <input id="pay_amount" type="number" class="validate" required step=".01" min=".01">
                            <label class="grey-text" for="pay_amount">Monto</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="last_payment_date" type="date" class="validate input-date" required>
                            <label class="grey-text" for="last_payment_date">Fecha</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="invoice" type="text" class="validate" required autocomplete="false">
                            <label class="grey-text" for="invoice">Operación</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="invoice_detail" type="text" class="validate" required>
                            <label class="grey-text" for="invoice_detail">Banco</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="comments" type="text" class="validate" required>
                            <label class="grey-text" for="comments">Comentario</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <a href="../../admin/payment/list" class="waves-effect waves-light btn grey" type="button"><i class="material-icons left">cancel</i>Cancelar</a>
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
    <script type="text/javascript" src="../../admin/scripts/payment.js"></script>

</body>

</html>