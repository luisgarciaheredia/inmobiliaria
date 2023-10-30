reports_view = {
    crud: {
        lots_and_orders_by_projectUrl: '/inmobiliaria/api/Reports/lots_and_orders_by_project/',
        orders_and_payments_by_project: '/inmobiliaria/api/Reports/orders_and_payments_by_project/'
    },
    init: function () {
        var _self = this;
        switch (window.location.pathname) {
            case '/inmobiliaria/admin/reports/lots_and_orders_by_project':
                _self.lots_and_orders_by_project();
                break;
            case '/inmobiliaria/admin/reports/orders_and_payments_by_project':
                _self.orders_and_payments_by_project();
                break;
        }
    },
    toggleLoader: function () {
        var _self = this;
        var progress = document.querySelectorAll(".progress")[0];
        var nextElement = document.querySelectorAll(".progress + div")[0];

        // toggle
        if (progress.style.display == 'none') {
            progress.style.display = '';
            nextElement.style.display = 'none';
        } else {
            progress.style.display = 'none';
            nextElement.style.display = '';
        }
    },
    lots_and_orders_by_project: function () {
        var _self = this;
        var form = document.querySelectorAll(".container form")[0];

        form.querySelectorAll("#date")[0].value = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })).toISOString().slice(0, 10);

        // fill project select
        _self.toggleLoader(); // show loader
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

        // set generate report button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();

            // reset table
            if (typeof window.myDataTable == 'object') {
                myDataTable.clear();
                myDataTable.destroy();
                document.querySelectorAll(".dataTables_filter")[0].remove();
                document.querySelectorAll(".dataTables_info")[0].remove();
            }

            var project_id = form.querySelectorAll("#project_id")[0].value;
            var date = form.querySelectorAll("#date")[0].value;
            parameters = "?project_id=" + project_id + "&date=" + date;
            _self.toggleLoader(); // show loader
            app.sendRequest("", "GET", _self.crud.lots_and_orders_by_projectUrl + parameters, function (response) {

                // verify response data
                if (response.data[0] != undefined) {

                    var totalLength = response.data.length;
                    var soldLenght = 0;

                    // set rows from list elements
                    var keys = Object.keys(response.data[0]);
                    response.data.forEach(function (element) {

                        // set data
                        var tr = document.createElement("tr");
                        keys.forEach(function (key) {

                            if (key == 'payments_count') {
                                if (parseInt(element[key]) > 0) {
                                    soldLenght = soldLenght + 1
                                }
                            }

                            var td = document.createElement("td");
                            td.innerHTML = element[key];
                            tr.appendChild(td);
                        });

                        // fill table
                        document.querySelectorAll("table tbody")[0].appendChild(tr);
                    });

                } else {
                    M.toast({ html: response.message, classes: 'rounded' });
                }
                _self.toggleLoader(); // hide loader

                // init DataTable
                app.setDataTable(function () {

                    // order
                    myDataTable
                        .order([2, 'asc'], [3, 'asc']) // block an lot
                        .draw();

                    // responsive
                    /*myDataTable.columns(2).header()[0].classList.add('all');    // block
                    myDataTable.columns(3).header()[0].classList.add('all');    // lot
                    myDataTable.columns(4).header()[0].classList.add('all');    // price                
                    myDataTable.columns(6).header()[0].classList.add('all');    // date
                    myDataTable.columns(10).header()[0].classList.add('all');    // date
                    myDataTable.responsive.rebuild();
                    myDataTable.responsive.recalc();*/

                    // hide columns
                    myDataTable.columns(0).visible(false); // project_id
                    myDataTable.columns(1).visible(false); // project

                    document.querySelectorAll(".buttons-wrapper")[1].append(document.querySelectorAll(".dt-buttons")[0]);
                    document.querySelectorAll(".dt-buttons")[0].classList.remove("hide"); // reports must to show buttons
                });



                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {

                    var data = google.visualization.arrayToDataTable([
                        ['Estado', 'Lotes'],
                        ['Vendidos', soldLenght],
                        ['Sin vender', totalLength - soldLenght],
                    ]);

                    var options = {
                        title: 'Lotes Vendidos'
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                    chart.draw(data, options);
                }



            });
        });
    },
    orders_and_payments_by_project: function () {
        var _self = this;
        var form = document.querySelectorAll(".container form")[0];

        // fill project select
        _self.toggleLoader(); // show loader
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

            // reset table
            if (typeof window.myDataTable == 'object') {
                myDataTable.clear();
                myDataTable.destroy();
                document.querySelectorAll(".dataTables_filter")[0].remove();
                document.querySelectorAll(".dataTables_info")[0].remove();
            }

            var project_id = form.querySelectorAll("#project_id")[0].value;
            var date = form.querySelectorAll("#date")[0].value;
            parameters = "?project_id=" + project_id + "&date=" + date;
            _self.toggleLoader(); // show loader
            app.sendRequest("", "GET", _self.crud.orders_and_payments_by_project + parameters, function (response) {

                // verify response data
                if (response.data[0] != undefined) {

                    // set rows from list elements
                    var keys = Object.keys(response.data[0]);
                    response.data.forEach(function (element) {

                        // set data
                        var tr = document.createElement("tr");
                        keys.forEach(function (key) {
                            var td = document.createElement("td");
                            if (key == "stage") {
                                var color = element[key] == "Pagado" ? "green" : (element[key] == "Vencido" ? "red" : "amber accent-4");
                                element[key] = '<span class="new badge ' + color + '" data-badge-caption="">' + element[key] + '</span>'; // set red and green badges
                            }
                            td.innerHTML = element[key];
                            tr.appendChild(td);
                        });

                        // fill table
                        document.querySelectorAll("table tbody")[0].appendChild(tr);
                    });
                } else {
                    M.toast({ html: response.message, classes: 'rounded' });
                }
                _self.toggleLoader(); // hide loader

                // init DataTable
                app.setDataTable(function () {

                    // responsive
                    myDataTable.columns(2).header()[0].classList.add('all');    // block
                    myDataTable.columns(3).header()[0].classList.add('all');    // lot              
                    myDataTable.columns(6).header()[0].classList.add('all');    // type
                    myDataTable.columns(7).header()[0].classList.add('all');    // number
                    myDataTable.columns(11).header()[0].classList.add('all');    // stage
                    myDataTable.responsive.rebuild();
                    myDataTable.responsive.recalc();

                    // hide columns
                    myDataTable.columns(0).visible(false); // project_id
                    myDataTable.columns(1).visible(false); // project


                    // order
                    myDataTable
                        .order([6, 'desc'], [7, 'asc']) // type and number of payment
                        .draw();

                    document.querySelectorAll(".buttons-wrapper")[1].append(document.querySelectorAll(".dt-buttons")[0]);
                    document.querySelectorAll(".dt-buttons")[0].classList.remove("hide"); // reports must to show buttons
                });


                // set chart
                google.charts.load('current', { packages: ['corechart', 'bar'] });
                google.charts.setOnLoadCallback(drawChart);


                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Año', 'Saldo'],
                        ['2020', 1272],
                        ['2021', 1354],
                        ['2022', 1760],
                        ['2023', 2115]
                    ]);

                    var options = {
                        chart: {
                            title: 'Saldos por Año'
                            //,
                            //subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                        }
                    };

                    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

                    chart.draw(data, google.charts.Bar.convertOptions(options));
                }

            });
        });
    }
};
reports_view.init();