lot_view = {
    crud: {
        createUrl: '/inmobiliaria/api/Lot/create/',
        readUrl: '/inmobiliaria/api/Lot/read/',
        updateUrl: '/inmobiliaria/api/Lot/update/',
        deleteUrl: '/inmobiliaria/api/Lot/delete/'
    },
    init: function () {
        var _self = this;
        switch (window.location.pathname) {
            case '/inmobiliaria/admin/lot/list':
                _self.list();
                break;
            case '/inmobiliaria/admin/lot/create':
                _self.create();
                break;
            case '/inmobiliaria/admin/lot/update':
                _self.update();
                break;
            case '/inmobiliaria/admin/lot/create_many_lots':
                _self.create_many_lots();
                break;
        }
    },
    list: function () {
        var _self = this;
        let table = new DataTable('table', {
            ajax: _self.crud.readUrl,
            columns: [
                { data: 'id' },
                { data: 'project_id' },
                { data: 'project' },
                { data: 'block' },
                { data: 'lot' },
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
                    targets: 5
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
                myDataTable.columns(2).header()[0].classList.add('all');    // project
                myDataTable.columns(3).header()[0].classList.add('all');   // block
                myDataTable.columns(4).header()[0].classList.add('all');   // lot

                myDataTable.columns(5).header()[0].classList.add('all');    // status                
                myDataTable.columns(8).header()[0].classList.add('all');    // actions
                myDataTable.responsive.rebuild();
                myDataTable.responsive.recalc();

                _self.toggleLoader(); // hide loader
            },
            scrollX: true
        });
        window.myDataTable = table;

        // set update action
        $('table').on('click', '.action-update', function () {
            var data = table.row($(this).parents('tr')).data();
            window.location.href = "update?id=" + data.id;
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


        /*
                var _self = this;
        
                app.sendRequest("", "GET", _self.crud.readUrl, function (response) {
        
                    // verify response data
                    if (response.data[0] != undefined) {
        
                        // set rows from list elements
                        var keys = Object.keys(response.data[0]);
                        response.data.forEach(function (element) {
        
                            // set data
                            var tr = document.createElement("tr");
                            keys.forEach(function (key) {
                                var td = document.createElement("td");
                                if (key == "status") {
                                    var color = element[key] == "1" ? "green" : "red";
                                    var label = element[key] == "1" ? "Activo" : "Inactivo";
                                    element[key] = '<span class="new badge ' + color + '" data-badge-caption="">' + label + '</span>'; // set red and green badges
                                }
                                td.innerHTML = element[key];
                                tr.appendChild(td);
                            });
        
                            // set update and delete links
                            var actionsTd = document.createElement("td");
                            var id = element['id'];
                            actionsTd.innerHTML = "<a class='action-update' data-id='" + id + "' href='#'><i class='material-icons'>edit</i></a>";
                            actionsTd.innerHTML += "<a class='action-delete' data-id='" + id + "' href='#'><i class='material-icons'>delete</i></a>";
                            tr.appendChild(actionsTd);
        
                            // fill table
                            document.querySelectorAll("table tbody")[0].appendChild(tr);
                        });
        
                        // set delete action
                        document.querySelectorAll(".action-delete").forEach(function (element) {
                            element.addEventListener("click", function (event) {
                                event.stopPropagation();
                                event.preventDefault();
                                if (confirm("¿Confirma que eliminará el registro?")) {
                                    _self.toggleLoader(); // show loader
                                    app.sendRequest("", "GET", _self.crud.deleteUrl + element.getAttribute("data-id"), function (response) {
                                        alert(response.message + ' Recargando el listado.');
                                        window.location.href = "list"; // refresh list
                                    });
                                };
                            });
                        });
        
                        // set update action
                        document.querySelectorAll(".action-update").forEach(function (element) {
                            element.addEventListener("click", function (event) {
                                event.stopPropagation();
                                event.preventDefault();
                                window.location.href = "update?id=" + element.getAttribute("data-id");
                            });
                        });
                    } else {
                        M.toast({ html: response.message, classes: 'rounded' });
                    }
        
                    // init DataTable
                    app.setDataTable(function () { 
        
                        // responsive
                        myDataTable.columns(2).header()[0].classList.add('all');    // project
                        myDataTable.columns(3).header()[0].classList.add('all');    // block
                        myDataTable.columns(4).header()[0].classList.add('all');    // lot
                        myDataTable.columns(5).header()[0].classList.add('all');    // status                
                        myDataTable.columns(8).header()[0].classList.add('all');    // actions
                        myDataTable.responsive.rebuild();
                        myDataTable.responsive.recalc();
        
                        // hide columns
                        myDataTable.columns(1).visible(false); // project_id
                    });
        
                    _self.toggleLoader(); // hide loader
                });*/
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
    create: function () {
        var _self = this;
        var form = document.querySelectorAll(".container form")[0];

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
                $('#project_id').select2(); // init select2 plugin
                _self.toggleLoader(); // hide loader
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var project_id = form.querySelectorAll("#project_id")[0].value;
            var block = form.querySelectorAll("#block")[0].value;
            var lot = form.querySelectorAll("#lot")[0].value;
            var status = form.querySelectorAll("#status")[0].checked == true ? 1 : 0;
            parameters = "project_id=" + project_id + "&block=" + block + "&lot=" + lot + "&status=" + status;
            _self.toggleLoader(); // show loader
            app.sendRequest(parameters, "POST", _self.crud.createUrl, function (response) {
                alert(response.message + ' Lo estamos enviando al listado.');
                window.location.href = "list"; // go to list
            });
        });
    },
    update: function () {
        var _self = this;
        var form = document.querySelectorAll(".container form")[0];
        id = (new URL(window.location.href)).searchParams.get("id");

        // fill project select
        app.sendRequest("", "GET", '/inmobiliaria/api/Project/read/', function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                // set options to select
                response.data.forEach(function (element) {
                    var option = document.createElement("option");
                    if (element["status"] == 1) { // only enable registers
                        var option = document.createElement("option");
                        option.value = element["id"];
                        option.innerHTML = element["project"];
                        document.querySelectorAll("#project_id")[0].appendChild(option);
                    }
                });

                // set form data
                app.sendRequest("", "GET", _self.crud.readUrl + id, function (response) {

                    // verify response data
                    if (response.data[0] != undefined) {

                        // set form values
                        form.querySelectorAll("#project_id")[0].value = response.data[0].project_id;
                        form.querySelectorAll("#project_id")[0].dispatchEvent(new Event('change')); // update selected option
                        $('#project_id').select2(); // init select2 plugin
                        form.querySelectorAll("#block")[0].value = response.data[0].block;
                        form.querySelectorAll("#lot")[0].value = response.data[0].lot;
                        form.querySelectorAll("#status")[0].checked = response.data[0].status == 1 ? true : false;
                        M.updateTextFields(); // update materialize text input
                        _self.toggleLoader(); // hide loader
                    } else {
                        M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
                    }
                });
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var project_id = form.querySelectorAll("#project_id")[0].value;
            var block = form.querySelectorAll("#block")[0].value;
            var lot = form.querySelectorAll("#lot")[0].value;
            var status = form.querySelectorAll("#status")[0].checked == true ? 1 : 0;
            parameters = "id=" + id + "&project_id=" + project_id + "&block=" + block + "&lot=" + lot + "&status=" + status;
            _self.toggleLoader(); // show loader
            app.sendRequest(parameters, "POST", _self.crud.updateUrl, function (response) {
                alert(response.message + ' Lo estamos enviando al listado.');
                window.location.href = "list"; // go to list
            });
        });

    },
    create_many_lots: function () {
        var _self = this;
        var form = document.querySelectorAll(".container form")[0];
        _self.blocks_count = 1;
        _self.blocks_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        _self.blocks_and_lots_count = 0;
        _self.blocks_and_lots_total = 0;

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
                $('#project_id').select2(); // init select2 plugin
                _self.toggleLoader(); // hide loader
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // set add button action
        document.querySelectorAll(".add")[0].addEventListener("click", cloneLastLote.bind(_self));
        function cloneLastLote(event) {
            event.stopPropagation();
            event.preventDefault();
            var clone = [].slice.call(document.querySelectorAll(".many_lots")).pop().cloneNode(true); // clone element
            clone.querySelectorAll("input[name=block]")[0].value = _self.blocks_letters[_self.blocks_count];
            clone.querySelectorAll("input[name=block]")[0].id = clone.querySelectorAll("input[name=block]")[0].id + '_' + _self.blocks_count;                                               // unique id to prevent browser warnings
            clone.querySelectorAll("input[name=block]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", clone.querySelectorAll("input[name=block]")[0].id);                  // fix label to prevent browser warnings
            clone.querySelectorAll("input[name=lots_quantity]")[0].id = clone.querySelectorAll("input[name=lots_quantity]")[0].id + '_' + _self.blocks_count;                               // unique id to prevent browser warnings
            clone.querySelectorAll("input[name=lots_quantity]")[0].parentNode.querySelectorAll("label")[0].setAttribute("for", clone.querySelectorAll("input[name=lots_quantity]")[0].id);  // fix label to prevent browser warnings
            if (_self.blocks_count == 1) {
                clone.querySelectorAll(".add")[0].remove();
                document.querySelectorAll(".remove")[0].classList.remove('hide');
            }
            [].slice.call(document.querySelectorAll(".many_lots")).pop().after(clone); // put element
            _self.blocks_count = _self.blocks_count + 1;
        }

        // set remove button action
        document.querySelectorAll(".remove")[0].addEventListener("click", removeLastLote.bind(_self));
        function removeLastLote(event) {
            event.stopPropagation();
            event.preventDefault();
            if (_self.blocks_count > 1) {
                [].slice.call(document.querySelectorAll(".many_lots")).pop().remove(); // remove element
            }
            if (_self.blocks_count == 2) {
                document.querySelectorAll(".remove")[0].classList.add('hide') // hide remove button
            }
            _self.blocks_count = _self.blocks_count - 1;
        }

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var project_id = form.querySelectorAll("#project_id")[0].value;

            // get total
            document.querySelectorAll("input[name=lots_quantity]").forEach(function (element) { _self.blocks_and_lots_total = _self.blocks_and_lots_total + parseInt(element.value) });

            // multiple create requests
            var last_response = {};
            _self.toggleLoader(); // show loader
            document.querySelectorAll(".many_lots").forEach(function (element) {
                var block = element.querySelectorAll("input[name=block]")[0].value;
                var lot_quantity = element.querySelectorAll("input[name=lots_quantity]")[0].value;
                for (var i = 1; i <= lot_quantity; i++) {
                    parameters = "project_id=" + project_id + "&block=" + block + "&lot=" + i + "&status=1";
                    app.sendRequest(parameters, "POST", _self.crud.createUrl, function (response) {
                        last_response = response;
                        _self.blocks_and_lots_count = _self.blocks_and_lots_count + 1;
                    });
                }
            });

            // verify sent requests and total
            var block_and_lots_interval = window.setInterval(function () {
                if (_self.blocks_and_lots_count == _self.blocks_and_lots_total) {
                    window.clearInterval(block_and_lots_interval);
                    alert(last_response.message + ' Lo estamos enviando al listado.');
                    window.location.href = "list"; // go to list
                }
            }, 500);
        });

    }
};
lot_view.init();