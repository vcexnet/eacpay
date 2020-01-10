/* EAC行情应用 */
$(function() {
	showDTransactions();

});


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

			var dataList = datas.data.eac;
			var htmls="";
			console.log(dataList);
			htmls += " <td style='color: #15D655;'>AEX</td>";
			htmls += "<td >" +dataList.ticker.sell + "</td>";
			htmls += "<td >" + dataList.ticker.vol.toFixed(4) + "</td>";
			htmls += "<td '><input type='radio' name='radio'  checked='checked' ></td>";

					
				
				
			
			$('#aex_data').append(htmls);

		},
		dataType: 'json'
	});

}