// init materialize components
document.addEventListener('DOMContentLoaded', function () {

    // init sidenav
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});

    // init dropdown
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { constrainWidth: false });

    // init collapsible (accordions)
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
});

// functions
var app = {

    // send async xml http request
    sendRequest: async function (parameters, method, url, callback) {
        try {
            if (method == 'GET') {
                const response = await fetch(url);
                const data = await response.json();
                callback(data);
            } else if (method = 'POST') {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                    body: parameters
                });
                const data = await response.json();
                callback(data);
            }
        } catch (error) {
            console.log(error);
        }
    },
    
    /*sendRequest: function (parameters, method, url, callback) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3) {
                callback(JSON.parse(xhr.response));
            }
        };
        xhr.send(parameters);
    },*/

    // set datatable plugin to the main table of the view
    setDataTable: function (callback) {
        var self = this;
        let table = new DataTable('table', {
            responsive: true,
            language: {
                url: '../../resources/js/es-ES.json',
                searchPlaceholder: "Escribe texto para buscar"
            },
            pageLength: 10,
            lengthMenu: [5, 10, 15, 20, 25, 30, 35, 50, 100],
            //dom: 'ft<"footer-wrapper"l<"paging-info"p>>i',
            dom: 'Bfrtlip',
            buttons: [{ extend: 'copy', title: 'Inmobiliaria Titanio' }, 'csv', { extend: 'excel', title: 'Inmobiliaria Titanio' }, { extend: 'pdf', title: 'Inmobiliaria Titanio' }, { extend: 'print', title: 'Inmobiliaria Titanio' }],
            initComplete: function () {
                document.querySelectorAll(".dataTables_filter input")[0].classList.add('browser-default');                          // not materialize styles
                document.querySelectorAll(".dataTables_length select")[0].classList.add('browser-default');                         // not materialize styles
                //document.querySelectorAll(".card")[0].before(document.querySelectorAll(".dataTables_filter")[0]);
                document.querySelectorAll(".buttons-wrapper")[0].prepend(document.querySelectorAll(".dataTables_filter")[0]);    // move search filter
                document.querySelectorAll(".table-card")[0].after(document.querySelectorAll(".dataTables_info")[0]);                // move table info
                document.querySelectorAll(".dataTables_filter input")[0].setAttribute("name", "dataTables_filter");                 // fix name attribute to prevent chrome warning
                document.querySelectorAll(".table-card")[0].parentNode.insertBefore(document.querySelectorAll(".dt-buttons")[0], document.querySelectorAll(".table-card")[0]); // move buttons
                document.querySelectorAll(".dt-buttons")[0].classList.add("hide"); // hide buttons
                callback();
            },
            scrollX: true
        });
        window.myDataTable = table;
    }
}

// logout
document.querySelectorAll(".logout").forEach(function (element) {
    element.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (confirm("¿Confirma que cerrará sesión?")) {
            app.sendRequest("", "GET", '/inmobiliaria/api/User/logout/', function () { // logout
                window.location.href = "../user/login"; // go to login
            });
        }
    });
});