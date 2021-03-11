var data;
$.ajax({
    url: "asset/data.json",
    method: "GET",
    dataType: "json",
    success: function(re) {
        data = re;
        console.log(data);
        loading(data);
    }
})

function cl(x) {
    $(x).fadeOut();
    $('#cvr').empty();
}

function loading(data) {
    for (let i = 0; i <= data.length - 1; i++) {
        row = data[i];

        code = `${`
        <div class="col-lg-3 col-md-6 col-12 my-3">
        <div class="card">
            <div class="piccontainer"><img style="width:100%; height:100%; object-fit" src="${row.img}"  alt="${row.title}"></div>
            <div class="d-flex justify-content-center row card-body">
                <h5 class="card-title" style="inline-block">${row.title}</h5>
                <small style="display:block; text-align:right">${row.type}</small> 

                <p class="card-text">`+row.info.slice(0,15)}...${` </p>
                <button style="width:70" class="align-self-end mx-3 btn btn-primary" onclick="moreinfo('#cover','#cvr',${i})">More Info</button>
            </div>
        </div>
        </div>
        `}`

        $('#content').append(code);
    }
}


for (i = 2; i <= 10; i++) {
    $('#img' + i).hide();
}

var a = 2;

function picshow() {
    var stop = setInterval(() => {
        $('#img' + a).fadeIn();
        console.log(a);
        a++;

        if (a == 11) {
            allhide()
        }
    }, 2000);
}

function allhide() {
    clearInterval(stop)
    for (i = 2; i <= 10; i++) {
        $('#img' + i).fadeOut(2000, (() => {
            for (i = 2; i <= 10; i++) {
                $('#img' + i).hide();
                a = 2
            }
        }))
    }
}

picshow();


function moreinfo(a, b, id){
    $(a).fadeIn();
    if (b) $(b).fadeIn();
    if (b && id)
        detail = ''
    if (data[id].link.length==0){
        link = "<span style='font-weight:bold; color:red'>無<span>"
    }else{
        link = `<a href='${data[id].link}' target="_blank">點我</a>`
    }
        detail = `
        <a class="d-flex justify-content-center align-items-center" href='#'>
        <div class="placepic" style="background-image:url('${data[id].img}');" ></div>
        </a>

        <h2 style="background:#666" class="mt-1 text-center">${data[id].title}</h2>
        <table width=100%>
            <tr>
                <td style="text-align:center" width=20%>類型:</td>
                <td width=80%>${data[id].type}</td>
            </tr>
            <tr>
                <td style="text-align:center" >使用:</td>
                <td>${data[id].technique}</td>
            </tr>
            <tr>
                <td style="text-align:center" >說明:</td>
                <td>${data[id].info}</td>
            </tr>
            <tr>
                <td style="text-align:center" >連結:</td>
                <td>${link}</td>
            </tr>
            
        </table>
        `

        $("#cvr").append(detail);
}