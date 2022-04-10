var request = new XMLHttpRequest();
var request_real = new XMLHttpRequest();
request.open('GET', 'https://sheet.best/api/sheets/7f838c29-2a59-4a74-9069-c1bf189e5597', true);
var data_real = {}, soucre = {};
var data_call = {};
var ready_data = [];
var heander_contact = [];
request.send();
request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        var data = request.responseText;
        soucre = JSON.parse(data);

        for(let i in soucre)
        {
            data_call[soucre[i].Market_name] = {
                timestamp: soucre[i].Index_market,
                Market_name: soucre[i].Market_name,
                Item_list: soucre[i].Item_list,
                Item_price: soucre[i].Item_price,
                Location: soucre[i].Location,
                XY: soucre[i].XY,
                Limit: soucre[i].Limit,
            }
            heander_contact.push(i.Market_name);
        }
    

        let text_op = ''
        for (let x in soucre) {
            text_op += "<option>" + soucre[x].Item_list;
        }
        text_op += "</select>"
        document.getElementById("browsers").innerHTML = text_op;

        let txt = '<table style="width:100%"><tr><th>ชื่อร้าน</th><th>ที่เมือง</th><th>X,Y</th><th>เปิดร้าน</th></tr>'
        let txt_sec = '';
        for (let x in soucre) {
            txt += "<tr><td>" + soucre[x].Market_name + "</td>" + "<td>" + soucre[x].Location + "</td>" + "<td>" + soucre[x].XY + "</td>" + "<td>" + '<a onclick="cansel_win(' + "'contact_alert'"+",'"+ soucre[x].Market_name +"'"+")" +'"'+ 'class="btn_b">ดูร้าน</a>' + "</td>" +"</tr>";
        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt + txt_sec;
    }
};


function hide() {
    var x = document.getElementById("demo");
    if (x.style.display === "none") {
    document.getElementById("hide_bt").innerHTML = "ซ่อนร้านค้าทั้งหมด"
      x.style.display = "block";
    } else {
        document.getElementById("hide_bt").innerHTML = "ดูร้านค้าทั้งหมด"
      x.style.display = "none";
    }
  }

  function cansel_win(idtag,market_name) {
	var win_alert = document.getElementById(idtag);
    var heander = document.getElementById("heander");
    var content = document.getElementById("content");

    ready_data = [];
	if (win_alert.style.display === "block") {
		win_alert.style.display = "none";
	}
	else {
		win_alert.style.display = "block";
	}

    heander.innerText = data_call[market_name].Market_name;

    var item = data_call[market_name].Item_list
    var item_str = item.toString();
    var list_itm = item_str.split("|");

    var price = data_call[market_name].Item_price
    var price_str = price.toString();
    var list_price = price_str.split("|");

    for(let i in list_itm)
    {
        ready_data.push(list_itm[i] + " | " + list_price[i]);
    }
    
    console.log(ready_data);
    content.innerHTML ="";
    let txt = '<table style="width:100%"><tr><th>ไอเทม</th><th>ราคา</th></tr>'
    let txt_sec = '';
    for (let x in ready_data) {
        var tst_sce = ready_data[x];
        tst_scet = tst_sce.split("|");
        txt += "<tr><td>" + tst_scet[0] + "</td>"+ "<td>" + tst_scet[1] + "</td>" + "</tr>";
    }
    txt += "</table>"
    content.innerHTML = txt + txt_sec;


};
