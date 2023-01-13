var request = new XMLHttpRequest();
var request_real = new XMLHttpRequest();
request.open('GET', 'https://script.googleusercontent.com/macros/echo?user_content_key=gRxDdjZOVmvO2G7WeKZFIgU8SIHICGVq7Rjz6wgpaEEY8-aYsDiDraOI14-eU8FcsjMw3XRG7b-Xnr0ql1DVpTSXCYJc60hWOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHazNnvbOV55w0RsVtHYY1ZvvH9qMxe09Y9bc4aA956U7t6wK92U_zkdkbx-BDbZt9I7MGZLwgop3DU8hHdRllLdFpaU2NLWJpSwXIuFltvcj9bVKn3MpuO19m_4qgmdpvDQ&lib=MzHL0eFFhUhBN_5xdhbCQBuF_8U2xeTn-', true);
var data_real = {}, soucre = {};
var data_call = {};
var ready_data = [];
var heander_contact = [];
var option_group = [];
var option_list = [];

var viwer;




var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.countapi.xyz/hit/asnise.github.io/visits_roc");
xhr.responseType = "json";
xhr.onload = function() {


    document.getElementById("visits").innerHTML = "จำนวนผู้เข้าชมเว็บ : " +  this.response.value;

}
xhr.send();




request.send();
request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        var data = request.responseText;
        soucre = JSON.parse(data);

        for (let i in soucre) {
            data_call[soucre[i].Market_name] = {
                timestamp: soucre[i].Index_market,
                Market_name: soucre[i].Market_name,
                Item_list: soucre[i].Item_list.toString(),
                Item_list_arry: soucre[i].Item_list.split("|"),
                Item_price: soucre[i].Item_price,
                Location: soucre[i].Location,
                XY: soucre[i].XY,
                Limit: soucre[i].Limit,
                Private_key: soucre[i].PrivateKey.toString(),
            }
            heander_contact.push(i.Market_name);
        }


        for (let x in data_call) {
            for (let i in data_call[x].Item_list_arry) {
                option_group.push(data_call[x].Item_list_arry[i]);
            }
        }

        for (var i = 0; i < option_group.length; i++) {
            if (option_list.indexOf(option_group[i]) < 0) option_list.push(option_group[i]);
        }



        let txt = '<table id="main_Table" style="width:100%"><tr><th>ชื่อร้าน</th><th>ที่เมือง</th><th>X,Y</th><th>เปิดร้าน</th></tr>'
        let txt_sec = '';
        for (let x in soucre) {
            txt += "<tr><td>" + soucre[x].Market_name + "</td>" + "<td>" + soucre[x].Location + "</td>" + "<td>" + soucre[x].XY + "</td>" + "<td>" + '<a onclick="cansel_win(' + "'contact_alert'" + ",'" + soucre[x].Market_name + "'" + ")" + '"' + 'class="btn_b">ดูร้าน</a>' + "</td>" + "</tr>";
        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt + txt_sec;
    }
};


function refresh() {
    location.reload();
}


const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}



var currentTime = new Date();
currentTime.setHours(24)
var month_ = currentTime.getMonth() + 1;



function cansel_win(idtag, market_name) {
    var win_alert = document.getElementById(idtag);
    var heander = document.getElementById("heander");
    var content = document.getElementById("content");



    if (idtag == "notification_alert") {
        var Private_key = document.getElementById("pvk");
        Private_key.value = generateString(4) + "-" + generateString(4) + "-" + generateString(4);

        var time_limit = document.getElementById("time_limit");
        time_limit.value = parseInt(currentTime.getDate().toString()) + 1 + "/" + month_ + "/" + currentTime.getFullYear();
    }

    ready_data = [];
    if (win_alert.style.display === "block") {
        win_alert.style.display = "none";
    }
    else {
        win_alert.style.display = "block";
    }

    if (market_name !== undefined) {
        heander.innerHTML = data_call[market_name].Market_name;
        loc_head.innerText = data_call[market_name].Location + " " + " (" + data_call[market_name].XY + ")";
        var item = data_call[market_name].Item_list
        var item_str = item.toString();
        var list_itm = item_str.split("|");
        var price = data_call[market_name].Item_price;


        var price_str = price.toString();
        var list_price = price_str.split("|");

        for (let i in list_itm) {
            ready_data.push(list_itm[i] + " | " + list_price[i]);
        }

        //console.log(ready_data);
        content.innerHTML = "";
        let txt = '<table style="width:100%"><tr><th>ไอเทม</th><th>ราคา</th></tr>'
        let txt_sec = '';
        for (let x in ready_data) {
            var tst_sce = ready_data[x];
            tst_scet = tst_sce.split("|");
            txt += "<tr><td>" + tst_scet[0] + "</td>" + "<td>" + Intl.NumberFormat('en-US').format(tst_scet[1]) + "</td>" + "</tr>";
        }
        txt += "</table>"
        content.innerHTML = txt + txt_sec;


    }
}

function hide() {
    var x = document.getElementById("demo");
    if (x.style.display === "none") {
        document.getElementById("store_all").checked = true;
        x.style.display = "block";
    } else {
        document.getElementById("store_all").checked = false;
        x.style.display = "none";
    }
}





function send_item(event) {
    var res_send = document.getElementById("search-input").value;
    let txt = '<table id="main_Table" style="width:100%"><tr><th>ชื่อร้าน</th><th>ที่เมือง</th><th>X,Y</th><th>เปิดร้าน</th></tr>'
    let txt_sec = '';
    for (const [key, value] of Object.entries(data_call)) {
        if (value.Item_list_arry.includes(res_send)) {
            txt += "<tr><td>" + data_call[key].Market_name + "</td>" + "<td>" + data_call[key].Location + "</td>" + "<td>" + data_call[key].XY + "</td>" + "<td>" + '<a onclick="cansel_win(' + "'contact_alert'" + ",'" + data_call[key].Market_name + "'" + ")" + '"' + 'class="btn_b">ดูร้าน</a>' + "</td>" + "</tr>";
        }
    }
    txt += "</table>"
    document.getElementById("select_item").innerHTML = txt + txt_sec;
    document.getElementById("select_item").style.display = "block";
}

var item_list_dummy = [];
var Item_price_dummy = [];

function requset_get(event) {
    const form = document.forms['edit-sheet']
    var res_send = document.getElementById("PrivateKey_send");
    for (const [key, value] of Object.entries(data_call)) {
        if (value.Private_key === res_send.value) {

            form.elements['Market_name'].value = data_call[key].Market_name;

            item_list_dummy = data_call[key].Item_list.split('|');

            Item_price_dummy = data_call[key].Item_price.split('|');
        }

    }
    
    var tagsContainer = document.getElementById("tags-container");
    if(tagsContainer){
        item_list_dummy.forEach(function(value, i) {
            var tag = document.createElement("div");
            tag.classList.add("tag");
            tag.id = "tag-" + i;
    
            var p = document.createElement("p");
            p.innerHTML = value;
            tag.appendChild(p);

            var input = document.createElement("input");
            input.type = "text";
            input.style.width = "100px";
            input.style.height = "20px";
            input.value = "" + Item_price_dummy[i];
            tag.appendChild(input);
    
            var closeBtn = document.createElement("span");
            closeBtn.classList.add("close");
            closeBtn.innerHTML = "&times;";
            closeBtn.addEventListener("click", function() {
                this.parentNode.remove();
            });
    
            tag.appendChild(closeBtn);
            tagsContainer.appendChild(tag);

        });
    }


}



function removeTag(i) {
    var tag = document.getElementById("tag-" + i);
    tag.parentNode.removeChild(tag);
}







