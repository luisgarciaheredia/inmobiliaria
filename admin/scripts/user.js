user_view = {
    crud: {
        createUrl: '/inmobiliaria/api/User/create/',
        readUrl: '/inmobiliaria/api/User/read/',
        updateUrl: '/inmobiliaria/api/User/update/',
        deleteUrl: '/inmobiliaria/api/User/delete/',
        loginUrl: '/inmobiliaria/api/User/login/',
        unsold_lots_by_proyect: '/inmobiliaria/api/Reports/unsold_lots_by_proyect/',
        balances_by_owner: '/inmobiliaria/api/Reports/balances_by_owner/'
    },
    init: function () {
        var _self = this;
        switch (window.location.pathname) {
            case '/inmobiliaria/admin/user/list':
                _self.list();
                break;
            case '/inmobiliaria/admin/user/create':
                _self.create();
                break;
            case '/inmobiliaria/admin/user/update':
                _self.update();
                break;
            case '/inmobiliaria/admin/user/login':
                _self.login();
                break;
            case '/inmobiliaria/admin/user/dashboard':
                _self.dashboard();
                break;
        }
    },
    list: function () {
        var _self = this;
        let table = new DataTable('table', {
            ajax: _self.crud.readUrl,
            columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'email' },
                { data: 'user' },
                { data: 'password' },
                { data: 'role_id' },
                { data: 'role' },
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
                    targets: 7
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
                myDataTable.columns(1).header()[0].classList.add('all');    // name
                myDataTable.columns(7).header()[0].classList.add('all');    // status             
                myDataTable.columns(10).header()[0].classList.add('all');   // actions
                myDataTable.responsive.rebuild();
                myDataTable.responsive.recalc();

                // hide columns
                myDataTable.columns(5).visible(false); // role_id

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
        var nextElement = document.querySelectorAll(".user-card")[0];

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

        // fill role select
        app.sendRequest("", "GET", '/inmobiliaria/api/Role/read/', function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                // set options to select
                response.data.forEach(function (element) {
                    if (element["status"] == 1) { // only enable registers
                        var option = document.createElement("option");
                        option.value = element["id"];
                        option.innerHTML = element["role"];
                        document.querySelectorAll("#role_id")[0].appendChild(option);
                    }
                });
                _self.toggleLoader(); // hide loader
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var name = form.querySelectorAll("#name")[0].value;
            var email = form.querySelectorAll("#email")[0].value;
            var user = form.querySelectorAll("#user")[0].value;
            var password = form.querySelectorAll("#password")[0].value;
            var role_id = form.querySelectorAll("#role_id")[0].value;
            var status = form.querySelectorAll("#status")[0].checked == true ? 1 : 0;
            parameters = "name=" + name + "&email=" + email + "&user=" + user + "&password=" + password + "&role_id=" + role_id + "&status=" + status;
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

        // fill role select
        app.sendRequest("", "GET", '/inmobiliaria/api/Role/read/', function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                // set options to select
                response.data.forEach(function (element) {
                    var option = document.createElement("option");
                    if (element["status"] == 1) { // only enable registers
                        var option = document.createElement("option");
                        option.value = element["id"];
                        option.innerHTML = element["role"];
                        document.querySelectorAll("#role_id")[0].appendChild(option);
                    }
                });

                // set form data
                app.sendRequest("", "GET", _self.crud.readUrl + id, function (response) {

                    // verify response data
                    if (response.data[0] != undefined) {

                        // set form values
                        form.querySelectorAll("#name")[0].value = response.data[0].name;
                        form.querySelectorAll("#email")[0].value = response.data[0].email;
                        form.querySelectorAll("#user")[0].value = response.data[0].user;
                        form.querySelectorAll("#password")[0].value = response.data[0].password;
                        form.querySelectorAll("#role_id")[0].value = response.data[0].role_id;
                        form.querySelectorAll("#role_id")[0].dispatchEvent(new Event('change')); // update selected option
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
            var name = form.querySelectorAll("#name")[0].value;
            var email = form.querySelectorAll("#email")[0].value;
            var user = form.querySelectorAll("#user")[0].value;
            var password = form.querySelectorAll("#password")[0].value;
            var role_id = form.querySelectorAll("#role_id")[0].value;
            var status = form.querySelectorAll("#status")[0].checked == true ? 1 : 0;
            parameters = "id=" + id + "&name=" + name + "&email=" + email + "&user=" + user + "&password=" + password + "&role_id=" + role_id + "&status=" + status;
            _self.toggleLoader(); // show loader
            app.sendRequest(parameters, "POST", _self.crud.updateUrl, function (response) {
                alert(response.message + ' Lo estamos enviando al listado.');
                window.location.href = "list"; // go to list
            });
        });

    },
    login: function () {
        _self = this;
        var form = document.querySelectorAll(".container form")[0];

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var user = form.querySelectorAll("#user")[0].value;
            var password = form.querySelectorAll("#password")[0].value;
            parameters = "user=" + user + "&password=" + password;
            _self.toggleLoader(); // show loader
            app.sendRequest(parameters, "POST", _self.crud.loginUrl, function (response) {
                if (response.data.length) {
                    window.location.href = "dashboard"; // go to dashboard
                } else {
                    M.toast({ html: 'Usuario o contraseña incorrecta.', classes: 'rounded' }); // nothing to do
                    form.reset();
                    _self.toggleLoader(); // hide loader
                }
            });
        });
    },
    dashboard: function () {
        var _self = this;

        // set form data
        app.sendRequest("", "GET", _self.crud.unsold_lots_by_proyect, function (response) {

            // verify response data
            if (response.data[0] != undefined) {

                var unsold_lots_by_proyect_data = Array();
                unsold_lots_by_proyect_data.push(['Proyecto', 'Lotes faltantes', { role: 'annotation' }]);
                response.data.forEach(function (element) {
                    unsold_lots_by_proyect_data.push([element.project, element.unsold_lots, element.unsold_lots]);
                });
                console.log(unsold_lots_by_proyect_data);

                google.charts.load('current', { packages: ['corechart', 'bar'] });
                google.charts.setOnLoadCallback(drawBasic);

                function drawBasic() {

                    var data = google.visualization.arrayToDataTable(unsold_lots_by_proyect_data);

                    /*data.setColumns([0, 1,
                        { calc: "stringify",
                          sourceColumn: 1,
                          type: "string",
                          role: "annotation" },
                        2])*/

                    var options = {
                        chartArea: { left:'35%',top:0,width:'60%',height:'90%'},
                        /*hAxis: {
                            minValue: 0
                        },*/
                        width: 500,
                        height: 250,
                        
        bar: {groupWidth: "200%"},
                        legend: {
                            position: 'none'
                        }

                    };

                    var chart = new google.visualization.BarChart(document.getElementById('unsold_lots_by_proyect_data_chart_div'));

                    chart.draw(data, options);
                }



                app.sendRequest("", "GET", _self.crud.balances_by_owner, function (response) {

                    // verify response data
                    if (response.data[0] != undefined) {
        
                        var balances_by_owner_data = Array();
                        balances_by_owner_data.push(['Propietario', 'Saldo', { role: 'annotation' }]);
                        response.data.forEach(function (element) {
                            balances_by_owner_data.push([element.name, element.balance, element.balance]);
                        });
                        console.log(balances_by_owner_data);
        
        
                        google.charts.load('current', { packages: ['corechart', 'bar'] });
                        google.charts.setOnLoadCallback(drawBasic);
        
                        function drawBasic() {
        
                            var data = google.visualization.arrayToDataTable(balances_by_owner_data);
        
                            var options = {
                                chartArea: { left:'45%',top:0,width:'50%',height:'90%'},
                                hAxis: {
                                    minValue: 0
                                },
                                /*'width':400,*/
                        width: 500,
                        height: 250,
                        bar: {groupWidth: "200%"},
                                        legend: {
                                            position: 'none'
                                        }
                            };
        
                            var chart = new google.visualization.BarChart(document.getElementById('balances_by_owner_data_chart_div'));
        
                            chart.draw(data, options);
                        }
        
                    } else {
                        M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
                    }
                });


                _self.toggleLoader(); // hide loader
            } else {
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } });
            }
        });





    }
};
user_view.init();