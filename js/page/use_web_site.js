/* EAC行情应用 */
$(function() {
	showDanDu();
	showEAC();
	showDTransactions();
});



// 显示交易所行情
function showEAC() {
	$.ajax({
		url: "https://api.aex.zone/v3/trades.php",
		method: "post",
		data: {
			"mk_type": "cnc",
			"coinname": "eac"
		},
		success: function(datas) {

			var dataList = datas.data;
					// console.log(dataList);
					
			$("#eacMoney").text(dataList[0].price);
			
			//var e=document.getElementById("eacNumebr").textContent=dataList[0].price;
			
			var e=$("#eacNumebr").text(dataList[0].price);

		},
		dataType: 'json'
	});

}
// 显示交易所行情
function showDTransactions() {
	$.ajax({
		url: "https://api.aex.zone/v3/ticker.php",
		method: "post",
		data: {
			"mk_type": "cnc",
			"coinname": "all"
		},
		success: function(datas) {
			console.log(datas);
			var dataList = datas.data;
			var htmls="";
			var i=0;
			//var arr=[];			
				for (let item in dataList) {
					// arr.push(dataList[item]);
					++i;
					if(i<=4){
						htmls += "<tr style='border-bottom:1px #ccc solid'> <td style='color: #1EB032;font-size: 1rem;'>" +item.toUpperCase() + "</td>"
						htmls += "<td style='text-align: center;'>" +item.toUpperCase() + "/CNC</td>"
						htmls += "<td style='text-align: center;'>" +dataList[item].ticker.buy + "</td>",
						htmls += "<td style='color: #1EB032;'>" + dataList[item].ticker.sell + "</td></tr>"
						
					}
					
				}
				
			
			$('#showExchanges').append(htmls);

		},
		dataType: 'json'
	});

}

function showDanDu() {
	$.ajax({
		url: "https://api.aex.zone/v3/depth.php",
		method: "post",
		data: {
			"mk_type": "cnc",
			"coinname": "eac"
		},
		success: function(datas) {
			console.log(datas);
			var dataList = datas.data;
			$("#buy1").text(dataList.asks[0][0]);
			$("#buy_2").text(dataList.asks[1][0]);
			$("#buy_1").text(dataList.bids[0][0]);
			$("#buy2").text(dataList.bids[1][0]);		



		},
		dataType: 'json'
	});

}
