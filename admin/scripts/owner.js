owner_view = {
    crud: {
        createUrl: '/inmobiliaria/api/Owner/create/',
        readUrl: '/inmobiliaria/api/Owner/read/',
        updateUrl: '/inmobiliaria/api/Owner/update/',
        deleteUrl: '/inmobiliaria/api/Owner/delete/'
    },
    init: function () {
        var _self = this;
        switch (window.location.pathname) {
            case '/inmobiliaria/admin/owner/list':
                _self.list();
                break;
            case '/inmobiliaria/admin/owner/create':
                _self.create();
                break;
            case '/inmobiliaria/admin/owner/update':
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
                { data: 'document' },
                { data: 'name' },
                { data: 'phone' },
                { data: 'address' },
                { data: 'reference' },
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
                    targets: 6
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
                myDataTable.columns(2).header()[0].classList.add('all');    // name
                myDataTable.columns(4).header()[0].classList.add('none');   // address
                myDataTable.columns(5).header()[0].classList.add('none');   // reference
                myDataTable.columns(6).header()[0].classList.add('all');    // status                
                myDataTable.columns(9).header()[0].classList.add('all');    // actions
                myDataTable.responsive.rebuild();
                myDataTable.responsive.recalc();

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
            var document = form.querySelectorAll("#document")[0].value;
            var name = form.querySelectorAll("#name")[0].value;
            var phone = form.querySelectorAll("#phone")[0].value;
            var address = form.querySelectorAll("#address")[0].value;
            var reference = form.querySelectorAll("#reference")[0].value;
            var status = form.querySelectorAll("#status")[0].checked == true ? 1 : 0;
            parameters = "document=" + document + "&name=" + name + "&phone=" + phone + "&address=" + address + "&reference=" + reference + "&status=" + status;
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
            form.querySelectorAll("#document")[0].value = response.data[0].document;
            form.querySelectorAll("#name")[0].value = response.data[0].name;
            form.querySelectorAll("#phone")[0].value = response.data[0].phone;
            form.querySelectorAll("#address")[0].value = response.data[0].address;
            form.querySelectorAll("#reference")[0].value = response.data[0].reference;
            form.querySelectorAll("#status")[0].checked = response.data[0].status == 1 ? true : false;
            M.updateTextFields(); // update materialize text input
            _self.toggleLoader(); // hide loader
        });

        // set save button action
        form.addEventListener("submit", function (event) {
            event.stopPropagation();
            event.preventDefault();
            var document = form.querySelectorAll("#document")[0].value;
            var name = form.querySelectorAll("#name")[0].value;
            var phone = form.querySelectorAll("#phone")[0].value;
            var address = form.querySelectorAll("#address")[0].value;
            var reference = form.querySelectorAll("#reference")[0].value;
            var status = form.querySelectorAll("#status")[0].checked == true ? 1 : 0;
            parameters = "id=" + id + "&document=" + document + "&name=" + name + "&phone=" + phone + "&address=" + address + "&reference=" + reference + "&status=" + status;
            _self.toggleLoader(); // show loader
            app.sendRequest(parameters, "POST", _self.crud.updateUrl, function (response) {
                alert(response.message + ' Lo estamos enviando al listado.');
                window.location.href = "list"; // go to list
            });
        });

    }
};
owner_view.init();
