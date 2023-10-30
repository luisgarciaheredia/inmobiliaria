payment_view = {
    crud: {
        createUrl: '/inmobiliaria/api/Payment/create/',
        readUrl: '/inmobiliaria/api/Payment/read/',
        updateUrl: '/inmobiliaria/api/Payment/update/',
        deleteUrl: '/inmobiliaria/api/Payment/delete/'
    },
    init: function () {
        var _self = this;
        switch (window.location.pathname) {
            case '/inmobiliaria/admin/payment/list':
                _self.list();
                break;
            case '/inmobiliaria/admin/payment/pay':
                _self.pay();
                break;
        }
    },
    list: function () {
        var _self = this;
        var project_id = (new URL(window.location.href)).searchParams.get("project_id");
        var lot_id = (new URL(window.location.href)).searchParams.get("lot_id");
        let table = new DataTable('table', {
            ajax: _self.crud.readUrl,
            columns: [
                { data: 'id' },
                { data: 'order_id' },
                { data: 'lot_id' },
                { data: 'type' },
                { data: 'number' },
                { data: 'amount' },
                { data: 'due_date' },
                { data: 'amount_in_progress' },
                { data: 'balance' },
                { data: 'stage' },
                { data: 'last_payment_date' },
                { data: 'invoice' },
                { data: 'invoice_detail' },
                { data: 'comments' },
                { data: 'status' },
                { data: 'created_at' },
                { data: 'updated_at' },
                { data: null }
            ],
            columnDefs: [
                {
                    render: function (data, type, row) {
                        var color = data == "Pagado" ? "green" : (data == "Vencido" ? "red" : "amber accent-4");
                        content = '<span class="new badge ' + color + '" data-badge-caption="">' + data + '</span>'; // set red and green badges
                        return content;
                    },
                    targets: 9
                },
                {
                    data: null,
                    defaultContent: "<a class='action-update' href='#'><i class='material-icons'>payment</i></a><a class='action-delete' href='#'><i class='material-icons'>delete</i></a>",
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
                myDataTable.columns(1).header()[0].classList.add('none');   // order_id
                myDataTable.columns(3).header()[0].classList.add('all');    // type
                myDataTable.columns(4).header()[0].classList.add('all');    // number
                //myDataTable.columns(5).header()[0].classList.add('none'); // amount
                myDataTable.columns(9).header()[0].classList.add('all');    // stage
                myDataTable.columns(11).header()[0].classList.add('none');  // invoice
                myDataTable.columns(12).header()[0].classList.add('none');  // invoice_detail
                myDataTable.columns(13).header()[0].classList.add('none');  // comments
                //myDataTable.columns(14).header()[0].classList.add('all'); // status                
                myDataTable.columns(17).header()[0].classList.add('all');   // actions
                myDataTable.responsive.rebuild();
                myDataTable.responsive.recalc();

                // hide columns
                myDataTable.columns(0).visible(false);      // id
                //myDataTable.columns(1).visible(false);    // order_id
                myDataTable.columns(2).visible(false);      // lot_id
                //myDataTable.columns(11).visible(false);   // invoice
                //myDataTable.columns(12).visible(false);   // invoice_detail
                //myDataTable.columns(13).visible(false);   // comments
                myDataTable.columns(14).visible(false);     // status

                document.querySelectorAll(".dataTables_info")[0].classList.add("hide"); // hide datatable info

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
                                document.querySelectorAll("#project_id")[0].appendChild(option);
                            }
                        });

                        // init select2 plugin
                        $('#project_id').select2({

                            // fill lot select
                            templateSelection: function (state) {

                                // clean select
                                document.querySelectorAll("#lot_id")[0].value = '';
                                document.querySelectorAll("#lot_id")[0].dispatchEvent(new Event('change')); // update selected option
                                document.querySelectorAll("#lot_id option").forEach(function (element, index) {
                                    if (index > 0) { element.remove(); }
                                });
                                //_self.toggleLoader(); // show loader
                                app.sendRequest("", "GET", '/inmobiliaria/api/Lot/read/', function (response) {

                                    // set options to select
                                    response.data.forEach(function (element) {
                                        if (element["status"] == 1) { // only enable registers
                                            if (document.querySelectorAll("#project_id")[0].value == element["project_id"]) { // only lots of selected project
                                                var option = document.createElement("option");
                                                option.value = element["id"];
                                                option.innerHTML = element["block"] + ' - ' + element["lot"];
                                                document.querySelectorAll("#lot_id")[0].appendChild(option);
                                            }
                                        }
                                    });
                                    //_self.toggleLoader(); // hide loader
                                });

                                // init select2 plugin
                                $('#lot_id').select2({
                                    templateSelection: function (state2) {

                                        // show or hide table
                                        if (document.querySelectorAll("#lot_id")[0].value == "") {
                                            document.querySelectorAll(".table-card")[0].classList.add("hide");
                                        } else {
                                            document.querySelectorAll(".table-card")[0].classList.remove("hide");
                                        }

                                        // search
                                        myDataTable
                                            .columns(2)
                                            .search('\\b' + document.querySelectorAll("#lot_id")[0].value + '\\b', true, false) // exactly matches
                                            .draw();

                                        // reset responsive
                                        myDataTable.responsive.rebuild();
                                        myDataTable.responsive.recalc();

                                        // order
                                        myDataTable
                                            .order([3, 'desc'], [4, 'asc']) // type and number of payment
                                            .draw();

                                        return state2.text;
                                    }
                                });
                                return state.text; // return label to show in select
                            }
                        });
                        if (project_id) { $('#project_id').val(project_id).trigger('change'); } // set project_id

                        window.setTimeout(function () {

                            // set project_id
                            console.log(lot_id);
                            if (lot_id) {
                                $('#lot_id').val(lot_id).trigger('change');
                            }

                            _self.toggleLoader(); // hide loader
                        }, 250);
                    } else {
                        M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
                    }
                });

                //_self.toggleLoader(); // hide loader
            },
            scrollX: true
        });
        window.myDataTable = table;

        // set update action
        $('table').on('click', '.action-update', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = "pay?id=" + data.id;
        });

        // set delete action
        $('table').on('click', '.action-delete', function () {
            var data = table.row($(this).parents('tr')).data();
            if (confirm("¿Confirma que eliminará el registro?")) {
                _self.toggleLoader(); // show loader
                app.sendRequest("", "GET", _self.crud.deleteUrl + data.id, function (response) {
                    alert(response.message + ' Recargando el listado.');
                    window.location.href = "list"; // refresh list
                });
            };
        });


    },
    toggleLoader: function () {
        var _self = this;
        var progress = document.querySelectorAll(".progress")[0];
        var nextElement = document.querySelectorAll(".card")[0];

        // toggle
        if (progress.style.display == 'none') {
            progress.style.display = '';
            nextElement.style.display = 'none';
        } else {
            progress.style.display = 'none';
            nextElement.style.display = '';
        }
    },
    pay: function () {
        var _self = this;
        var form = document.querySelectorAll(".container form")[0];
        id = (new URL(window.location.href)).searchParams.get("id");

        // set default last_payment_date
        form.querySelectorAll("#last_payment_date")[0].value = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })).toISOString().slice(0, 10);

        // set form data
        app.sendRequest("", "GET", _self.crud.readUrl + id, function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                // set form values
                form.querySelectorAll("#order_id")[0].value = response.data[0].order_id;                        // hidden input
                form.querySelectorAll("#type")[0].value = response.data[0].type;                                // hidden input
                form.querySelectorAll("#number")[0].value = response.data[0].number;                            // hidden input
                form.querySelectorAll("#amount")[0].value = response.data[0].amount;                            // hidden input
                form.querySelectorAll("#due_date")[0].value = response.data[0].due_date;                        // hidden input
                form.querySelectorAll("#amount_in_progress")[0].value = response.data[0].amount_in_progress;    // hidden input
                form.querySelectorAll("#project_id")[0].value = response.data[0].project_id;    // hidden input
                form.querySelectorAll("#lot_id")[0].value = response.data[0].lot_id;    // hidden input
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();

            // verify amount
            var amount_in_progress = parseFloat(parseFloat(form.querySelectorAll("#amount_in_progress")[0].value) + parseFloat(form.querySelectorAll("#pay_amount")[0].value)).toFixed(2);
            if (parseFloat(form.querySelectorAll("#amount")[0].value) >= parseFloat(amount_in_progress)) {

                // update payment
                var order_id = form.querySelectorAll("#order_id")[0].value; // hidden input
                var type = form.querySelectorAll("#type")[0].value;         // hidden input
                var number = form.querySelectorAll("#number")[0].value;     // hidden input
                var amount = form.querySelectorAll("#amount")[0].value;     // hidden input
                var due_date = form.querySelectorAll("#due_date")[0].value; // hidden input
                var last_payment_date = form.querySelectorAll("#last_payment_date")[0].value;
                var invoice = form.querySelectorAll("#invoice")[0].value;
                var invoice_detail = form.querySelectorAll("#invoice_detail")[0].value;
                var comments = form.querySelectorAll("#comments")[0].value;
                parameters = "id=" + id
                    + "&order_id=" + order_id
                    + "&type=" + type
                    + "&number=" + number
                    + "&amount=" + amount
                    + "&due_date=" + due_date
                    + "&amount_in_progress=" + amount_in_progress
                    + "&last_payment_date=" + last_payment_date
                    + "&invoice=" + invoice
                    + "&invoice_detail=" + invoice_detail
                    + "&comments=" + comments
                    + "&status=1";
                app.sendRequest(parameters, "POST", _self.crud.updateUrl, function (response) {
                    alert(response.message + ' Lo estamos enviando al listado.');
                    window.location.href = "list?project_id=" + form.querySelectorAll("#project_id")[0].value + "&lot_id=" + form.querySelectorAll("#lot_id")[0].value; // go to list
                });
            } else {
                alert("El pago superó el Monto de la Cuota. No se puede registrar el pago.");
            }
        });

    }
};
payment_view.init();