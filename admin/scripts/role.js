role_view = {
    crud: {
        createUrl: '/inmobiliaria/api/Role/create/',
        readUrl: '/inmobiliaria/api/Role/read/',
        updateUrl: '/inmobiliaria/api/Role/update/',
        deleteUrl: '/inmobiliaria/api/Role/delete/'
    },
    init: function () {
        var _self = this;
        switch (window.location.pathname) {
            case '/inmobiliaria/admin/role/list':
                _self.list();
                break;
            case '/inmobiliaria/admin/role/create':
                _self.create();
                break;
            case '/inmobiliaria/admin/role/update':
                _self.update();
                break;
        }
    },
    list: function () {
        var _self = this;
        let table = new DataTable('table', {
            ajax: _self.crud.readUrl,
            columns: [
                { data: 'id' },
                { data: 'role' },
                { data: 'permissions' },
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
                    targets: 3
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
                myDataTable.columns(2).header()[0].classList.add('none');    // permissions
                myDataTable.columns(3).header()[0].classList.add('all');    // status             
                myDataTable.columns(6).header()[0].classList.add('all');   // actions
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

        _self.toggleLoader(); // hide loader

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var role = form.querySelectorAll("#role")[0].value;
            var status = form.querySelectorAll("#status")[0].checked == true ? 1 : 0;
            var permissionsArray = [];
            document.querySelectorAll("input[type=checkbox]").forEach(function (element) { if (element.checked) { permissionsArray.push(element.id); } }); // set permissions array
            var parameters = "role=" + role + "&permissions=" + permissionsArray.join(', ') + "&status=" + status;
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

        // set form data
        app.sendRequest("", "GET", _self.crud.readUrl + id, function (response) {
            form.querySelectorAll("#role")[0].value = response.data[0].role;
            form.querySelectorAll("#status")[0].checked = response.data[0].status == 1 ? true : false;
            response.data[0].permissions.split(",").forEach(function (element) {
                if (element) {
                    document.querySelectorAll("input[id=" + element + "]").forEach(function (input) { input.checked = "checked"; }); // check permissions
                }
            });
            M.updateTextFields(); // update materialize text input
            _self.toggleLoader(); // hide loader
        });

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var role = form.querySelectorAll("#role")[0].value;
            var status = form.querySelectorAll("#status")[0].checked == true ? 1 : 0;
            var permissionsArray = [];
            document.querySelectorAll("input[type=checkbox].permission").forEach(function (element) { if (element.checked) { permissionsArray.push(element.id); } }); // set permissions array
            var parameters = "id=" + id + "&role=" + role + "&permissions=" + permissionsArray.join(', ') + "&status=" + status;
            _self.toggleLoader(); // show loader
            app.sendRequest(parameters, "POST", _self.crud.updateUrl, function (response) {
                alert(response.message + ' Lo estamos enviando al listado.');
                window.location.href = "list"; // go to list
            });
        });
    }
};
role_view.init();
