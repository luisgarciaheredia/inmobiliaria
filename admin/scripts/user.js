user_view = {
    crud: {
        createUrl: '/inmobiliaria/api/User/create/',
        readUrl: '/inmobiliaria/api/User/read/',
        updateUrl: '/inmobiliaria/api/User/update/',
        deleteUrl: '/inmobiliaria/api/User/delete/',
        loginUrl: '/inmobiliaria/api/User/login/'
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
        }
    },
    list: function () {
        var _self = this;

        _self.toggleLoader(); // show loader
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
                                M.toast({ html: response.message + ' Recargando el listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } }); // refresh list
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
            _self.toggleLoader(); // hide loader

            // init DataTable
            app.setDataTable(function () {

                // responsive
                myDataTable.columns(1).header()[0].classList.add('all');    // name
                myDataTable.columns(7).header()[0].classList.add('all');    // status             
                myDataTable.columns(10).header()[0].classList.add('all');   // actions
                myDataTable.responsive.rebuild();
                myDataTable.responsive.recalc();

                // hide columns
                myDataTable.columns(5).visible(false); // role_id
            });
        });
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
    create: function () {
        var _self = this;
        var form = document.querySelectorAll(".container form")[0];

        // fill role select
        _self.toggleLoader(); // show loader
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
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } }); // go to list
            });
        });
    },
    update: function () {
        var _self = this;
        var form = document.querySelectorAll(".container form")[0];
        id = (new URL(window.location.href)).searchParams.get("id");

        // fill role select
        _self.toggleLoader(); // show loader
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
                M.toast({ html: response.message + ' Lo estamos enviando al listado.', classes: 'rounded', completeCallback: function () { window.location.href = "list"; } }); // go to list
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
    }
};
user_view.init();