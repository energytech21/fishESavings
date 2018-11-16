function toggle(){
    $('.ui.sidebar').sidebar('toggle');
}
var balance = 0;
$(document).ready(()=>{
    $('#member').removeClass('item').addClass('active orange item');

    var tables = $("#tbl_members").DataTable({
        processing: true,
        serverSide: true,
        ajax: {
          type: "get",
          url: "/coop/members"
        },
        columns: [
          { data: "account_number" },
          { data: "fullname" },
          { data: "cnum" },
          { data: "account_number",
            render: (data, type, row, meta) => {
               return `
               <div class="ui grid">
                    <div class="ui column">
                        <div class="ui vertical two buttons">
                            <button class="ui yellow button" onclick="deposit(`+data+`)">Deposit</button>
                            <button class="ui green button" onclick="withdraw(`+data+`)">Withdraw</button>
                        </div>
                    </div>
               </div>`;
            } }
        ]
    });
})

function deposit(data){
    sessionStorage.setItem('acc_num', data);
    $.ajax({
        url: '/auth',
        data: {scope:"accounts_sandbox"},
        success: (response)=>{
            window.open(response, '_blank', 'resizable=yes,top=20,left=500,width=400,height=400');
        }
      });
}


function withdraw(data){
    sessionStorage.setItem('acc_num', data);
    $.ajax({
        url: '/auth',
        data: {scope:"transfers"},
        success: (response)=>{
            window.open(response, '_blank', 'resizable=yes,top=20,left=500,width=400,height=400');
        }
      });
}