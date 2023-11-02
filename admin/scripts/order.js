order_view = {
    crud: {
        createUrl: '/inmobiliaria/api/Order/create/',
        readUrl: '/inmobiliaria/api/Order/read/',
        updateUrl: '/inmobiliaria/api/Order/update/',
        deleteUrl: '/inmobiliaria/api/Order/delete/'
    },
    init: function () {
        var _self = this;
        switch (window.location.pathname) {
            case '/inmobiliaria/admin/order/list':
                _self.list();
                break;
            case '/inmobiliaria/admin/order/create':
                _self.create();
                break;
            case '/inmobiliaria/admin/order/update':
                _self.update();
                break;
        }
    },
    list: function () {
        var _self = this;

        // set table
        let table = new DataTable('table', {
            ajax: _self.crud.readUrl,
            columns: [
                { data: 'id' },
                { data: 'lot_id' },
                { data: 'project_id' },
                { data: 'project' },
                { data: 'block' },
                { data: 'lot' },
                { data: 'owner_id' },
                { data: 'owner' },
                { data: 'user_id' },
                { data: 'user' },
                { data: 'price' },
                { data: 'type' },
                { data: 'date' },
                { data: 'comments' },
                { data: 'status' },
                { data: 'created_at' },
                { data: 'updated_at' },
                { data: null }
            ],
            columnDefs: [
                {
                    render: function (data, type, row) {
                        var color = data == "1" ? "green" : "red";
                        var label = data == "1" ? "Activo" : "Inactivo";
                        content = '<span class="new badge ' + color + '" data-badge-caption="">' + label + '</span>'; // set red and green badges
                        return content;
                    },
                    targets: 14
                },
                {
                    data: null,
                    defaultContent: "<a class='action-update' href='#'><i class='material-icons'>edit</i></a><a class='action-delete' href='#'><i class='material-icons'>delete</i></a>",
                    targets: -1
                }
            ],
            responsive: true,
            language: {
                url: '../../resources/js/es-ES.json',
                searchPlaceholder: "Escribe texto para buscar"
            },
            pageLength: 10,
            lengthMenu: [5, 10, 15, 20, 25, 30, 35, 50, 100],
            dom: 'Bfrtlip',
            buttons: [{ extend: 'copy', title: 'Inmobiliaria Titanio' }, 'csv', { extend: 'excel', title: 'Inmobiliaria Titanio' }, { extend: 'pdf', title: 'Inmobiliaria Titanio' }, { extend: 'print', title: 'Inmobiliaria Titanio' }],
            initComplete: function () {
                document.querySelectorAll(".dataTables_filter input")[0].classList.add('browser-default');                          // not materialize styles
                document.querySelectorAll(".dataTables_length select")[0].classList.add('browser-default');                         // not materialize styles
                document.querySelectorAll(".buttons-wrapper")[0].prepend(document.querySelectorAll(".dataTables_filter")[0]);       // move search filter
                document.querySelectorAll(".table-card")[0].after(document.querySelectorAll(".dataTables_info")[0]);                // move table info
                document.querySelectorAll(".dataTables_filter input")[0].setAttribute("name", "dataTables_filter");                 // fix name attribute to prevent chrome warning
                document.querySelectorAll(".table-card")[0].parentNode.insertBefore(document.querySelectorAll(".dt-buttons")[0], document.querySelectorAll(".table-card")[0]); // move buttons
                document.querySelectorAll(".dt-buttons")[0].classList.add("hide"); // hide buttons

                // responsive
                myDataTable.columns(3).header()[0].classList.add('all');    // project
                myDataTable.columns(4).header()[0].classList.add('all');    // block
                myDataTable.columns(5).header()[0].classList.add('all');    // lot
                myDataTable.columns(9).header()[0].classList.add('none');   // user
                myDataTable.columns(13).header()[0].classList.add('none');  // comments
                myDataTable.columns(14).header()[0].classList.add('all');   // status                
                myDataTable.columns(17).header()[0].classList.add('all');   // actions
                myDataTable.responsive.rebuild();
                myDataTable.responsive.recalc();

                // hide columns
                myDataTable.columns(1).visible(false);      // lot_id
                myDataTable.columns(2).visible(false);      // project_id
                myDataTable.columns(6).visible(false);      // owner_id
                myDataTable.columns(8).visible(false);      // user_id
                myDataTable.columns(14).visible(false);     // status

                _self.toggleLoader(); // hide loader
            },
            scrollX: true
        });
        window.myDataTable = table;

        // set update action
        $('table').on('click', '.action-update', function () {
            window.location.href = "update?id=" + table.row($(this).parents('tr')).data().id;
        });

        // set delete action
        $('table').on('click', '.action-delete', function () {
            if (confirm("¿Confirma que eliminará el registro?")) {
                _self.toggleLoader(); // show loader
                app.sendRequest("", "GET", _self.crud.deleteUrl + table.row($(this).parents('tr')).data().id, function (response) {
                    alert(response.message + ' Recargando el listado.');
                    window.location.href = "list"; // refresh list
                });
            };
        });
    },
    toggleLoader: function () {
        var _self = this;
        var progress = document.querySelectorAll(".progress")[0];
        var nextElements = document.querySelectorAll(".card, #payment_title");

        // toggle
        if (progress.style.display == 'none') {
            progress.style.display = '';
            nextElements.forEach(function (element) { element.style.display = 'none'; });
        } else {
            progress.style.display = 'none';
            nextElements.forEach(function (element) { element.style.display = ''; });
        }
    },
    create: function () {
        var _self = this;
        var order_form = document.querySelectorAll("form#orders")[0];
        var generate_payments_form = document.querySelectorAll("form#generate_payments")[0];
        var payment_form = document.querySelectorAll("form#payments")[0];
        var select_count = 1;

        // set default date
        order_form.querySelectorAll("#date")[0].value = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })).toISOString().slice(0, 10);

        // fill project select
        app.sendRequest("", "GET", '/inmobiliaria/api/Project/read/', function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                // set options to select
                response.data.forEach(function (element) {
                    if (element["status"] == 1) { // only enable registers
                        var option = document.createElement("option");
                        option.value = element["id"];
                        option.innerHTML = element["project"];
                        order_form.querySelectorAll("#project_id")[0].appendChild(option);
                    }
                });

                // init select2 plugin
                $('#project_id').select2({

                    // set change action
                    templateSelection: function (state) {

                        // clean select
                        order_form.querySelectorAll("#lot_id")[0].value = '';
                        order_form.querySelectorAll("#lot_id")[0].dispatchEvent(new Event('change')); // update selected option
                        order_form.querySelectorAll("#lot_id option").forEach(function (element, index) {
                            if (index > 0) { element.remove(); }
                        });

                        // fill lot select
                        _self.toggleLoader(); // show loader
                        app.sendRequest("", "GET", '/inmobiliaria/api/Lot/read/unsold', function (response) {

                            // set options to select
                            response.data.forEach(function (element) {
                                if (element["status"] == 1) { // only enable registers
                                    if (order_form.querySelectorAll("#project_id")[0].value == element["project_id"]) { // only lots of selected project
                                        var option = document.createElement("option");
                                        option.value = element["id"];
                                        option.innerHTML = element["block"] + ' - ' + element["lot"];
                                        order_form.querySelectorAll("#lot_id")[0].appendChild(option);
                                    }
                                }
                            });
                            $('#lot_id').select2({}); // init select2 plugin
                            _self.toggleLoader(); // hide loader
                        });
                        return state.text; // return label to show in select
                    }
                });
                select_count = select_count == 2 ? _self.toggleLoader() : select_count + 1; // verify count to hide loader
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // fill owner select
        app.sendRequest("", "GET", '/inmobiliaria/api/Owner/read/', function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                // set options to select
                response.data.forEach(function (element) {
                    if (element["status"] == 1) { // only enable registers
                        var option = document.createElement("option");
                        option.value = element["id"];
                        option.innerHTML = element["name"];
                        order_form.querySelectorAll("#owner_id")[0].appendChild(option);
                    }
                });
                $('#owner_id').select2(); // init select2 plugin
                select_count = select_count == 2 ? _self.toggleLoader() : select_count + 1; // verify count to hide loader
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // set order_form continue button action
        order_form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();

            // variables
            var price = order_form.querySelectorAll("#price")[0];
            var initial_payment = generate_payments_form.querySelectorAll("#initial_payment")[0];
            var other_payments_quantity = generate_payments_form.querySelectorAll("#other_payments_quantity")[0];

            order_form.querySelectorAll("button[type=submit]")[0].parentNode.parentNode.classList.add("hide");  // hide order_form buttons
            document.querySelectorAll("#payment_title")[0].classList.remove("hide");                            // show generate_payments title
            generate_payments_form.parentNode.classList.remove("hide");                                         // show generate_payments_form
            order_form.querySelectorAll("input[name=type]").forEach(function (element) {
                element.addEventListener('change', function () {
                    price.disabled = "disabled";                                                                // lock price
                    if (order_form.querySelectorAll('input[name=type]:checked')[0].value == "Contado") {
                        initial_payment.value = price.value;                                                    // same price value
                        initial_payment.disabled = "disabled";                                                  // lock initial_payment
                        other_payments_quantity.value = 0;                                                      // reset other_payments
                        other_payments_quantity.parentNode.classList.add("hide");                               // hide other_payments
                    } else {
                        initial_payment.value = 100;                                                            // default initial_payment
                        initial_payment.removeAttribute("disabled");                                            // unlock initial_payment
                        other_payments_quantity.value = 2;                                                      // reset other_payments
                        other_payments_quantity.parentNode.classList.remove("hide");                            // show other_payments
                    }
                    M.updateTextFields();                                                                       // update materialize text input
                    payment_form.parentNode.classList.add("hide");                                              // hide payment_form
                });
                element.dispatchEvent(new Event("change"));                                                     // fire event
            });
        });

        // set generate_payments button action
        generate_payments_form.querySelectorAll("#generate_payments_btn")[0].addEventListener("click", function () {

            // variables
            var price = parseFloat(order_form.querySelectorAll("#price")[0].value);
            var initial_payment = parseFloat(generate_payments_form.querySelectorAll("#initial_payment")[0].value);
            var initial_payment_quantity = parseInt(generate_payments_form.querySelectorAll("#initial_payment_quantity")[0].value);
            var other_payments_quantity = parseInt(generate_payments_form.querySelectorAll("#other_payments_quantity")[0].value);

            payment_form.parentNode.classList.remove("hide"); // show payments
            payment_form.querySelectorAll("#payments>div:not(.row)").forEach(function (element) { element.remove() }); // clear payments
            var row = `
                <div class="row">
                    <div class="input-field col s3">
                        <input name="payment_type" type="text" class="validate" required disabled>
                        <label class="grey-text">Tipo</label>
                    </div>
                    <div class="input-field col s2 m3">
                        <input name="payment_number" type="number" class="validate" required disabled>
                        <label class="grey-text">Nº</label>
                    </div>
                    <div class="input-field col s4 m3">
                        <input name="payment_due_date" type="date" class="validate input-date" required>
                        <label class="grey-text">Fecha Vcto.</label>
                    </div>
                    <div class="input-field col s3">
                        <input name="payment_amount" type="number" class="validate" required step=".01" min="1">
                        <label class="grey-text">Monto</label>
                    </div>
                </div>
            `;

            // other payments
            for (var i = 0; i < other_payments_quantity; i++) {
                var div = document.createElement('div');
                div.innerHTML = row;
                payment_form.prepend(div);
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].value = "C";
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].value = other_payments_quantity - i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].value = new Date(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })).getTime() + +((other_payments_quantity - i - 1) * 30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].value = parseFloat((price - initial_payment) / other_payments_quantity).toFixed(2);

                // fix labels and ids to prevent browser warnings
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].id = "payment_type_f_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_type_f_" + i);
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].id = "payment_number_f_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_number_f_" + i);
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].id = "payment_date_f_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_due_date_f_" + i);
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].id = "payment_amount_f_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_amount_f_" + i);
            }

            // initial payment
            for (var i = 0; i < initial_payment_quantity; i++) {
                var div = document.createElement('div');
                div.innerHTML = row;
                payment_form.prepend(div);
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].value = "I";
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].value = initial_payment_quantity - i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].value = new Date(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })).getTime() + +((initial_payment_quantity - i - 1) * 30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10)
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].value = parseFloat(initial_payment / initial_payment_quantity).toFixed(2);

                // fix labels and ids to prevent browser warnings
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].id = "payment_type_i_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].parentNode.querySelectorAll("label")[0].for = "payment_type_i_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].id = "payment_number_i_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_number_i_" + i);
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].id = "payment_due_date_i_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_due_date_i_" + i);
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].id = "payment_amount_i_" + i;
                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_amount_i_" + i);
            }

            M.updateTextFields(); // update materialize text input
        });

        // set payments submit action
        payment_form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var price = parseFloat(order_form.querySelectorAll("#price")[0].value).toFixed(2);
            var total_amount = 0;

            // get total amount
            payment_form.querySelectorAll("input[name=payment_amount]").forEach(function (element) {
                total_amount = total_amount + parseFloat(element.value);
            });

            // verify price and total amount
            if (parseFloat(total_amount - price).toFixed(2) == 0) {
                if (confirm("Precio del Lote: S/" + price + "\nMonto Total de Cuotas: S/" + parseFloat(total_amount).toFixed(2) + "\nEl Monto Total de Cuotas es igual que el Precio del Lote.\n¿Confirma que desea registrar la venta?")) {

                    // register order
                    var lot_id = order_form.querySelectorAll("#lot_id")[0].value;
                    var owner_id = order_form.querySelectorAll("#owner_id")[0].value;
                    var user_id = ""; // calculated on server-side
                    var price = order_form.querySelectorAll("#price")[0].value;
                    var date = order_form.querySelectorAll("#date")[0].value;
                    var comments = order_form.querySelectorAll("#comments")[0].value;
                    var type = order_form.querySelectorAll('input[name=type]:checked')[0].value;
                    var status = 1;
                    parameters = "lot_id=" + lot_id + "&owner_id=" + owner_id + "&user_id=" + user_id + "&price=" + price + "&date=" + date + "&comments=" + comments + "&type=" + type + "&status=" + status;
                    _self.toggleLoader(); // show loader
                    app.sendRequest(parameters, "POST", _self.crud.createUrl, function (response) {
                        if (response.code == 200 && response.data != '') {

                            // register payments
                            var order_id = response.data;
                            var total_payments = payment_form.querySelectorAll("input[name=payment_type]");
                            var last_response = {};
                            var total_payments_count = 0;
                            total_payments.forEach(function (element) {
                                var payment_order_id = order_id;
                                var payment_type = element.value;
                                var payment_number = element.parentNode.parentNode.querySelectorAll("input[name=payment_number]")[0].value;
                                var payment_amount = parseFloat(element.parentNode.parentNode.querySelectorAll("input[name=payment_amount]")[0].value).toFixed(2);
                                var payment_due_date = element.parentNode.parentNode.querySelectorAll("input[name=payment_due_date]")[0].value;
                                parameters = "order_id=" + payment_order_id + "&type=" + payment_type + "&number=" + payment_number + "&amount=" + payment_amount + "&due_date=" + payment_due_date + "&amount_in_progress=&last_payment_date=&invoice=&invoice_detail=&comments=&status=1";
                                app.sendRequest(parameters, "POST", '/inmobiliaria/api/Payment/create/', function (response) {
                                    last_response = response;
                                    total_payments_count = total_payments_count + 1;
                                });
                            });

                            // verify sent requests and total
                            var total_payments_interval = window.setInterval(function () {
                                if (total_payments_count == total_payments.length) {
                                    window.clearInterval(total_payments_interval);
                                    alert(last_response.message + ' Lo estamos enviando al listado.');
                                    window.location.href = "list"; // go to list
                                }
                            });
                        } else {
                            M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } }); // go to list
                        }
                    });
                }
            } else if (parseFloat(total_amount - price).toFixed(2) > 0) {
                alert("Precio del Lote: S/" + price + "\nMonto Total de Cuotas: S/" + parseFloat(total_amount).toFixed(2) + "\nEl Monto Total de Cuotas es mayor que el Precio del Lote por: S/" + parseFloat(total_amount - price).toFixed(2) + "\nNo se puede registrar porque ambos deben ser iguales.");
            } else {
                alert("Precio del Lote: S/" + price + "\nMonto Total de Cuotas: S/" + parseFloat(total_amount).toFixed(2) + "\nEl Monto Total de Cuotas es menor que el Precio del Lote por: S/" + parseFloat(total_amount - price).toFixed(2) + "\nNo se puede registrar porque ambos deben ser iguales.");
            }
        });
    },
    update: function () {
        var _self = this;
        var order_form = document.querySelectorAll("form#orders")[0];
        var generate_payments_form = document.querySelectorAll("form#generate_payments")[0];
        var payment_form = document.querySelectorAll("form#payments")[0];
        id = (new URL(window.location.href)).searchParams.get("id");

        // fill project select
        app.sendRequest("", "GET", '/inmobiliaria/api/Project/read/', function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                // set options to select
                response.data.forEach(function (element) {
                    if (element["status"] == 1) { // only enable registers
                        var option = document.createElement("option");
                        option.value = element["id"];
                        option.innerHTML = element["project"];
                        order_form.querySelectorAll("#project_id")[0].appendChild(option);
                    }
                });

                // init select2 plugin
                $('#project_id').select2({

                    // fill lot select
                    templateSelection: function (state) {

                        // clean select
                        order_form.querySelectorAll("#lot_id")[0].value = '';
                        order_form.querySelectorAll("#lot_id")[0].dispatchEvent(new Event('change')); // update selected option
                        order_form.querySelectorAll("#lot_id option").forEach(function (element, index) {
                            if (index > 0) { element.remove(); }
                        });
                        //_self.toggleLoader(); // show loader
                        app.sendRequest("", "GET", '/inmobiliaria/api/Lot/read/', function (response) {

                            // set options to select
                            response.data.forEach(function (element) {
                                if (element["status"] == 1) { // only enable registers
                                    if (order_form.querySelectorAll("#project_id")[0].value == element["project_id"]) { // only lots of selected project
                                        var option = document.createElement("option");
                                        option.value = element["id"];
                                        option.innerHTML = element["block"] + ' - ' + element["lot"];
                                        order_form.querySelectorAll("#lot_id")[0].appendChild(option);
                                    }
                                }
                            });
                            $('#lot_id').select2({}); // init select2 plugin
                            //_self.toggleLoader(); // hide loader
                        });
                        return state.text; // return label to show in select
                    }
                });
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // fill owner select
        app.sendRequest("", "GET", '/inmobiliaria/api/Owner/read/', function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                // set options to select
                response.data.forEach(function (element) {
                    if (element["status"] == 1) { // only enable registers
                        var option = document.createElement("option");
                        option.value = element["id"];
                        option.innerHTML = element["name"];
                        order_form.querySelectorAll("#owner_id")[0].appendChild(option);
                    }
                });
                $('#owner_id').select2(); // init select2 plugin
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // set form data
        app.sendRequest("", "GET", _self.crud.readUrl + id, function (response) {

            // verify select2 plugin is ready
            var order_update_int = window.setInterval(function () {
                if (typeof $('#project_id').select2 == 'function' && typeof $('#owner_id').select2 == 'function') {
                    window.clearInterval(order_update_int);

                    // verify response data
                    if (response.data[0] != undefined) {

                        // set form data
                        $('#project_id').val(response.data[0].project_id).trigger('change');
                        window.setTimeout(function () {
                            $('#lot_id').val(response.data[0].lot_id).trigger('change');
                        }, 250);
                        $('#owner_id').val(response.data[0].owner_id).trigger('change');
                        order_form.querySelectorAll("#user_id")[0].value = response.data[0].user_id;
                        order_form.querySelectorAll("#price")[0].value = response.data[0].price;
                        order_form.querySelectorAll("#date")[0].value = response.data[0].date;
                        order_form.querySelectorAll("#comments")[0].value = response.data[0].comments;
                        var selector = "input[value=" + response.data[0].type[0].toUpperCase() + response.data[0].type.slice(1).toLowerCase() + "]";
                        console.log(selector);
                        order_form.querySelectorAll(selector)[0].checked = "checked";
                        order_form.querySelectorAll("input[type=radio]").forEach(function (element) { element.disabled = "disabled" }); // lock order type
                        order_form.querySelectorAll("button[type=submit]")[0].parentNode.parentNode.classList.add("hide"); // hide order_form buttons
                        document.querySelectorAll("#payment_title")[0].classList.remove("hide"); // show generate_payments title
                        payment_form.parentNode.classList.remove("hide"); // show payments
                        payment_form.querySelectorAll("#payments>div:not(.row)").forEach(function (element) { element.remove() }); // clear payments
                        var row = `
                            <div class="row">
                                <input type="hidden" name="payment_id">
                                <div class="input-field col s3">
                                    <input name="payment_type" type="text" class="validate" required disabled>
                                    <label class="grey-text">Tipo</label>
                                </div>
                                <div class="input-field col s2 m3">
                                    <input name="payment_number" type="number" class="validate" required disabled>
                                    <label class="grey-text">Nº</label>
                                </div>
                                <div class="input-field col s4 m3">
                                    <input name="payment_due_date" type="date" class="validate input-date" required>
                                    <label class="grey-text">Fecha Vcto.</label>
                                </div>
                                <div class="input-field col s3">
                                    <input name="payment_amount" type="number" class="validate" required step=".01" min="1">
                                    <label class="grey-text">Monto</label>
                                </div>
                                <input type="hidden" name="amount_in_progress">
                                <input type="hidden" name="last_payment_date">
                                <input type="hidden" name="invoice">
                                <input type="hidden" name="invoice_detail">
                                <input type="hidden" name="comments">
                            </div>
                        `;

                        // get payments
                        app.sendRequest("", "GET", '/inmobiliaria/api/Payment/read/getByOrderId?order_id=' + id, function (payments_response) {
                            payments_response.data.forEach(function (payments_element) {
                                var div = document.createElement('div');
                                div.innerHTML = row;
                                payment_form.prepend(div);
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_id]")[0].value = payments_element.id; // hidden input
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].value = payments_element.type;
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].value = payments_element.number;
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].value = payments_element.due_date;
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].value = parseFloat(payments_element.amount).toFixed(2);
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=amount_in_progress]")[0].value = payments_element.amount_in_progress;  // hidden input
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=last_payment_date]")[0].value = payments_element.last_payment_date;    // hidden input
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=invoice]")[0].value = payments_element.invoice;                        // hidden input
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=invoice_detail]")[0].value = payments_element.invoice_detail;          // hidden input
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=comments]")[0].value = payments_element.comments;                      // hidden input

                                // fix labels and ids to prevent browser warnings
                                var label = payments_element.type + "_" + payments_element.number;
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].id = "payment_type_" + label;
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_type]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_type_" + label);
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].id = "payment_number_" + label;
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_number]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_number_" + label);
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].id = "payment_due_date_" + label;
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_due_date]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_due_date_" + label);
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].id = "payment_amount_" + label;
                                payment_form.querySelectorAll("#payments>div:not(.row)")[0].querySelectorAll("input[name=payment_amount]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", "payment_amount_" + label);
                            });
                            M.updateTextFields(); // update materialize text input
                            _self.toggleLoader(); // hide loader
                        });
                    } else {
                        M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
                    }
                }
            }, 100);
        });

        // set save button action
        payment_form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();

            // get total amount
            var total_amount = 0;
            payment_form.querySelectorAll("input[name=payment_amount]").forEach(function (element) {
                total_amount = total_amount + parseFloat(element.value);
            });

            // verify price and total amount
            var price = parseFloat(order_form.querySelectorAll("#price")[0].value).toFixed(2);
            if (parseFloat(total_amount - price).toFixed(2) == 0) {
                if (confirm("Precio del Lote: S/" + price + "\nMonto Total de Cuotas: S/" + parseFloat(total_amount).toFixed(2) + "\nEl Monto Total de Cuotas es igual que el Precio del Lote.\n¿Confirma que desea registrar la venta?")) {

                    var lot_id = order_form.querySelectorAll("#lot_id")[0].value;
                    var owner_id = order_form.querySelectorAll("#owner_id")[0].value;
                    var user_id = order_form.querySelectorAll('#user_id')[0].value; // hidden input
                    var price = order_form.querySelectorAll("#price")[0].value;
                    var date = order_form.querySelectorAll("#date")[0].value;
                    var comments = order_form.querySelectorAll("#comments")[0].value;
                    var type = order_form.querySelectorAll('input[name=type]:checked')[0].value;
                    var status = 1;
                    parameters = "id=" + id + "&lot_id=" + lot_id + "&owner_id=" + owner_id + "&user_id=" + user_id + "&price=" + price + "&date=" + date + "&comments=" + comments + "&type=" + type + "&status=" + status;
                    _self.toggleLoader(); // show loader
                    app.sendRequest(parameters, "POST", _self.crud.updateUrl, function (response) {

                        // register payments
                        var total_payments = payment_form.querySelectorAll("input[name=payment_type]");
                        var last_response = {};
                        var total_payments_count = 0;
                        total_payments.forEach(function (element) {
                            var payment_id = element.parentNode.parentNode.querySelectorAll("input[name=payment_id]")[0].value; // hidden input
                            var payment_order_id = id;
                            var payment_type = element.value;
                            var payment_number = element.parentNode.parentNode.querySelectorAll("input[name=payment_number]")[0].value;
                            var payment_amount = parseFloat(element.parentNode.parentNode.querySelectorAll("input[name=payment_amount]")[0].value).toFixed(2);
                            var payment_due_date = element.parentNode.parentNode.querySelectorAll("input[name=payment_due_date]")[0].value;
                            var amount_in_progress = element.parentNode.parentNode.querySelectorAll("input[name=amount_in_progress]")[0].value;     // hidden input
                            var last_payment_date = element.parentNode.parentNode.querySelectorAll("input[name=last_payment_date]")[0].value;       // hidden input
                            var invoice = element.parentNode.parentNode.querySelectorAll("input[name=invoice]")[0].value;                           // hidden input
                            var invoice_detail = element.parentNode.parentNode.querySelectorAll("input[name=invoice_detail]")[0].value;             // hidden input
                            var comments = element.parentNode.parentNode.querySelectorAll("input[name=comments]")[0].value;                         // hidden input
                            parameters = "id=" + payment_id + "&order_id=" + payment_order_id + "&type=" + payment_type + "&number=" + payment_number + "&amount=" + payment_amount + "&due_date=" + payment_due_date + "&amount_in_progress=" + amount_in_progress + "&last_payment_date=" + last_payment_date + "&invoice=" + invoice + "&invoice_detail=" + invoice_detail + "&comments=" + comments + "&status=1";
                            app.sendRequest(parameters, "POST", '/inmobiliaria/api/Payment/update/', function (response) {
                                last_response = response;
                                total_payments_count = total_payments_count + 1;
                            });
                        });

                        // verify sent requests and total
                        var total_payments_interval = window.setInterval(function () {
                            if (total_payments_count == total_payments.length) {
                                window.clearInterval(total_payments_interval);
                                alert(last_response.message + ' Lo estamos enviando al listado.');
                                window.location.href = "list"; // go to list
                            }
                        });
                    });


                }
            } else if (parseFloat(total_amount - price).toFixed(2) > 0) {
                alert("Precio del Lote: S/" + price + "\nMonto Total de Cuotas: S/" + parseFloat(total_amount).toFixed(2) + "\nEl Monto Total de Cuotas es mayor que el Precio del Lote por: S/" + parseFloat(total_amount - price).toFixed(2) + "\nNo se puede registrar porque ambos deben ser iguales.");
            } else {
                alert("Precio del Lote: S/" + price + "\nMonto Total de Cuotas: S/" + parseFloat(total_amount).toFixed(2) + "\nEl Monto Total de Cuotas es menor que el Precio del Lote por: S/" + parseFloat(total_amount - price).toFixed(2) + "\nNo se puede registrar porque ambos deben ser iguales.");
            }


        });
    }
};
order_view.init();