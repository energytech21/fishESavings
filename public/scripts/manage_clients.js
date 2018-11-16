$(document).ready(()=>{
    $('#manage').removeClass('item').addClass('active orange item');

    var tables = $("#clients").DataTable({
        processing: true,
        serverSide: true,
        ajax: {
          type: "get",
          url: "/admin/clients"
        },
        columns: [
          { data: "account_number" },
          { data: "fullname" },
          { data: "coop_name" }
        ]
    });
});

function toggle(){
    $('.ui.sidebar').sidebar('toggle');
}