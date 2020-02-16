// 只会加载1次

// import '../js/libs/jquery-1.9.0.min.js';

var language = localStorage.getItem("language");
$(function() {
	// console.log(language);
	if (language) {
		set_properties(language);
	}

})




function set_properties(local) {
	$.i18n.properties({
		name: 'messages', // 资源文件名称  
		path: '../js/language/', // 资源文件所在目录路径  
		mode: 'map', // Map的方式使用资源文件中的Key  
		language: local, // 设置的语言  
		cache: false,
		encoding: 'UTF-8'
	});
	if(local!="zh_CN"){
		
	
	//nav
	$('.walleat').html($.i18n.prop('walleat'));
	$('.market_application').html($.i18n.prop('market_application'));
	$('.set').html($.i18n.prop('set'));
	//walleat.html

	if ($('.wallet_title').html()) {
		$('.wallet_title').html($.i18n.prop('wallet_title'));
		$('.title_text').html($.i18n.prop('title_text'));
		$('.balance').html($.i18n.prop('balance'));
		$('.un_balance').html($.i18n.prop('un_balance'));
		$('.total_balance').html($.i18n.prop('total_balance'));
		$('.property').html($.i18n.prop('property'));
		$('.gathering').html($.i18n.prop('gathering'));
		$('.payment').html($.i18n.prop('payment'));
		$('.transaction_record').html($.i18n.prop('transaction_record'));
		$('.more').html($.i18n.prop('more'));
		$('.state').html($.i18n.prop('state'));
		$('.transaction_details').html($.i18n.prop('transaction_details'));
		$('.money').html($.i18n.prop('money'));
		$('.exchange_quotation').html($.i18n.prop('exchange_quotation'));
		$('.t_name').html($.i18n.prop('t_name'));
		$('.trading_on').html($.i18n.prop('trading_on'));
		$('.price').html($.i18n.prop('price'));
		$('.rational_rose').html($.i18n.prop('rational_rose'));
		$('.model_tip').html($.i18n.prop('model_tip'));
		$('.model_tip1').html($.i18n.prop('model_tip1'));
		$('.cancel').html($.i18n.prop('cancel'));
		$('.export_copy').html($.i18n.prop('export_copy'));

		
		$('.details_tip').html($.i18n.prop('details_tip'));
		$('.datails_to').html($.i18n.prop('datails_to'));
		$('.output_index').html($.i18n.prop('output_index'));
		$('.datails_id').html($.i18n.prop('datails_id'));
		$('.received_date').html($.i18n.prop('export_copy'));
		$('.confirm').html($.i18n.prop('confirm'));
		$('.model_tip2').html($.i18n.prop('model_tip2'));
		$('.model_tip3').html($.i18n.prop('model_tip3'));
		$('.temporary_closure').html($.i18n.prop('temporary_closure'));
		
	}
	//use_web_site.html
	if ($('.uws_title').html()) {
		$('.uws_title').html($.i18n.prop('uws_title'));
		$('.buy1').html($.i18n.prop('buy1'));
		$('.buy2').html($.i18n.prop('buy2'));
		$('.buy3').html($.i18n.prop('buy3'));
		$('.buy4').html($.i18n.prop('buy4'));
		$('.t_name').html($.i18n.prop('t_name'));
		$('.trading_on').html($.i18n.prop('trading_on'));
		$('.price').html($.i18n.prop('price'));
		$('.unit_price').html($.i18n.prop('unit_price'));
		$('.support_system').html($.i18n.prop('support_system'));
		$('.support_app').html($.i18n.prop('support_app'));
		// $('.chess_card').html($.i18n.prop('chess_card'));
		// $('.love_crack').html($.i18n.prop('love_crack'));
		// $('.classic_legend').html($.i18n.prop('classic_legend'));
		// $('.praised_source').html($.i18n.prop('praised_source'));
		// $('.romantic_fiction').html($.i18n.prop('romantic_fiction'));
		// $('.sands_macao').html($.i18n.prop('sands_macao'));
	}
	//set.html
	// console.log($('.set_title').html());
	if ($('.set_title').html()) {
		$('.set_title').html($.i18n.prop('set_title'));
		$('.export_key').html($.i18n.prop('export_key'));
		$('.set_node').html($.i18n.prop('set_node'));
		$('.change_password').html($.i18n.prop('change_password'));
		$('.language_settings').html($.i18n.prop('language_settings'));
		$('.address_book').html($.i18n.prop('address_book'));
		$('.import_wallet').html($.i18n.prop('import_wallet'));
		$('.legal_tender_units').html($.i18n.prop('legal_tender_units'));
		$('.unit_price').html($.i18n.prop('unit_price'));
		$('.default_charge').html($.i18n.prop('default_charge'));
		$('.default_place').html($.i18n.prop('default_place'));
		$('.add_trading_venu').html($.i18n.prop('add_trading_venu'));
		$('.submit_cooperation').html($.i18n.prop('submit_cooperation'));
		$('.help_center').html($.i18n.prop('help_center'));
		$('.contact_us').html($.i18n.prop('contact_us'));
		$('.zhichi').html($.i18n.prop('zhichi'));
		$('.version_information').html($.i18n.prop('version_information'));
		$('.hint').html($.i18n.prop('hint'));
		$('.original_password').html($.i18n.prop('original_password'));
		$('.new_password').html($.i18n.prop('new_password'));
		$('.repeat_password').html($.i18n.prop('repeat_password'));
		$('.cancel').html($.i18n.prop('cancel'));
		$('.confirm').html($.i18n.prop('confirm'));

	}

	//record.html
	if ($('.record_title').html()) {
		$('.record_title').html($.i18n.prop('record_title'));
		$('.state').html($.i18n.prop('state'));
		$('.transaction_details').html($.i18n.prop('transaction_details'));
		$('.money').html($.i18n.prop('money'));
		$('.total_balance').html($.i18n.prop('total_balance'));
		$('.details_tip').html($.i18n.prop('details_tip'));
		$('.datails_to').html($.i18n.prop('datails_to'));
		$('.output_index').html($.i18n.prop('output_index'));
		$('.datails_id').html($.i18n.prop('datails_id'));
		$('.received_date').html($.i18n.prop('export_copy'));
		$('.confirm').html($.i18n.prop('confirm'));

	}

	//e_received.html
	if ($('.received_title').html()) {
		$('.received_title').html($.i18n.prop('received_title'));
		$('.tip').html($.i18n.prop('tip'));
		$('.received_label').html($.i18n.prop('received_label'));
		$('.received_message').html($.i18n.prop('received_message'));
		$('.money').html($.i18n.prop('money'));
		$('.refill').html($.i18n.prop('refill'));
		$('.generate_address').html($.i18n.prop('generate_address'));
		$('.payment_history').html($.i18n.prop('payment_history'));
		$('.tip_label').attr("placeholder", $.i18n.prop('tip_label'));
		$('.tip_news').attr("placeholder", $.i18n.prop('tip_news'));
		$('.tip_money').attr("placeholder", $.i18n.prop('tip_money'));
		$('.received_date').html($.i18n.prop('received_date'));
	}

	//send.html
	if ($('.send_title').html()) {
		$('.send_title').html($.i18n.prop('send_title'));
		$('.send_tip').html($.i18n.prop('send_tip'));
		$('.send_address').html($.i18n.prop('send_address'));
		$('.send_money').html($.i18n.prop('send_money'));
		$('.send_label').html($.i18n.prop('send_label'));
		$('.tip_address').attr("placeholder", $.i18n.prop('tip_address'));
		$('.tip_s_money').attr("placeholder", $.i18n.prop('tip_s_money'));
		$('.tip_s_label').attr("placeholder", $.i18n.prop('tip_s_label'));
		$('.transaction_expenses').html($.i18n.prop('transaction_expenses'));
		$('.identify_time_targets').html($.i18n.prop('identify_time_targets'));
		$('.custom_per').html($.i18n.prop('custom_per'));
		$('.subtract').html($.i18n.prop('subtract'));
		$('.use_all').html($.i18n.prop('use_all'));
		$('.send_send').html($.i18n.prop('send_send'));
		$('.payment_record').html($.i18n.prop('payment_record'));
		$('.received_date').html($.i18n.prop('received_date'));
	}

	//export_private_key.html
	if ($('.export_key_title').html()) {
		$('.export_key_title').html($.i18n.prop('export_key_title'));
		$('.confirm').html($.i18n.prop('confirm'));
		$('.export_tip').html($.i18n.prop('export_tip'));
		$('.export_export').html($.i18n.prop('export_export'));
		$('.export_copy').html($.i18n.prop('export_copy'));
		$('.please_select').attr("placeholder", $.i18n.prop('please_select'));

	}

	//set_node.html
	if ($('.node_title').html()) {
		$('.node_title').html($.i18n.prop('node_title'));

		$('.node_tip').html($.i18n.prop('node_tip'));
		$('.current_api').html($.i18n.prop('current_api'));
		$('.height_of_node').html($.i18n.prop('height_of_node'));
		$('.block_height').html($.i18n.prop('block_height'));
		$('.custom_nodes').html($.i18n.prop('custom_nodes'));

		$('.switch_node').attr("placeholder", $.i18n.prop('switch_node'));
		$('.node_ip').attr("placeholder", $.i18n.prop('node_ip'));
		$('.node_port').attr("placeholder", $.i18n.prop('node_port'));
		$('.rpc_user').attr("placeholder", $.i18n.prop('rpc_user'));
		$('.rpc_password').attr("placeholder", $.i18n.prop('rpc_password'));
		$('.cancel').html($.i18n.prop('cancel'));
		$('.confirm').html($.i18n.prop('confirm'));
	}

	//set_language.html
	if ($('.language_title').html()) {
		$('.language_title').html($.i18n.prop('language_title'));
		$('.save').html($.i18n.prop('save'));


	}



	//---set_address_book.html
	if ($('.address_title').html()) {
		$('.address_title').html($.i18n.prop('address_title'));
		$('.address_tip').html($.i18n.prop('address_tip'));
		$('.enter_the_address').attr("placeholder", $.i18n.prop('enter_the_address'));
		$('.address').html($.i18n.prop('address'));
		$('.address_operation').html($.i18n.prop('address_operation'));
		$('.delete_all').html($.i18n.prop('delete_all'));
		$('.new_address').html($.i18n.prop('new_address'));
		$('.confirm').html($.i18n.prop('confirm'));
		$('.export_copy').html($.i18n.prop('export_copy'));
		$('.send_label').html($.i18n.prop('send_label'));
	}

	//---set_import_wallet.html
	if ($('.import_title').html()) {
		$('.import_title').html($.i18n.prop('import_title'));
		$('.import_EAC').html($.i18n.prop('import_EAC'));
		$('.paste_enter').attr("placeholder", $.i18n.prop('paste_enter'));
		$('.warning').html($.i18n.prop('warning'));
		$('.cancel').html($.i18n.prop('cance'));
		$('.to_lead').html($.i18n.prop('to_lead'));
	}

	//---set_select_money.html
	if ($('.money_title').html()) {
		$('.money_title').html($.i18n.prop('money_title'));
		$('.money_note').html($.i18n.prop('money_note'));
		$('.save').html($.i18n.prop('save'));
	}

	//---set_free.html
	if ($('.fee_title').html()) {
		$('.fee_title').html($.i18n.prop('fee_title'));
		$('.fee_Statement').html($.i18n.prop('fee_Statement'));
		$('.current_rate').html($.i18n.prop('current_rate'));
		$('.default_rate').html($.i18n.prop('default_rate'));
		$('.custom_rate').html($.i18n.prop('custom_rate'));
		$('.confirm').html($.i18n.prop('confirm'));
		$('.enter_rate').attr("placeholder", $.i18n.prop('enter_rate'));

	}

	//set_default_ex.html
	if ($('.ex_title').html()) {
		$('.ex_title').html($.i18n.prop('ex_title'));
		$('.ex_name').html($.i18n.prop('ex_name'));
		$('.ex_price').html($.i18n.prop('ex_price'));
		$('.ex_turnover').html($.i18n.prop('ex_turnover'));
		$('.ex_choose').html($.i18n.prop('ex_choose'));
		$('.ex_explanation').html($.i18n.prop('ex_explanation'));
		$('.save').html($.i18n.prop('save'));

	}

	//set_add_ex.html
	if ($('.exadd_title').html()) {
		$('.exadd_title').html($.i18n.prop('exadd_title'));
		$('.exadd_name').html($.i18n.prop('exadd_name'));
		$('.exadd_name_tip').attr("placeholder", $.i18n.prop('exadd_name_tip'));

		$('.exadd_website').html($.i18n.prop('exadd_website'));
		$('.exadd_website_tip').attr("placeholder", $.i18n.prop('exadd_website_tip'));

		$('.trade_pair_name').html($.i18n.prop('trade_pair_name'));
		$('.trade_pair_tip').attr("placeholder", $.i18n.prop('trade_pair_tip'));
		$('.eac_trade_pair').html($.i18n.prop('eac_trade_pair'));
		$('.eac_trade_pair_tip').attr("placeholder", $.i18n.prop('eac_trade_pair_tip'));
		$('.exadd_api').html($.i18n.prop('exadd_api'));
		$('.exadd_api_tip').attr("placeholder", $.i18n.prop('exadd_api_tip'));
		$('.exadd_api_key').html($.i18n.prop('exadd_api_key'));
		$('.exadd_api_key_tip').attr("placeholder", $.i18n.prop('exadd_api_key_tip'));
		$('.cancel').html($.i18n.prop('cancel'));
		$('.confirm').html($.i18n.prop('confirm'));
	}

	//set_cooperatiopn.html.html
	if ($('.cooperatiopn_title').html()) {
		$('.cooperatiopn_title').html($.i18n.prop('cooperatiopn_title'));
		$('.cooperation_categories').html($.i18n.prop('cooperation_categories'));
		$('.cooperation_model').html($.i18n.prop('cooperation_model'));
		$('.cancel').html($.i18n.prop('cancel'));
		$('.contact_information').html($.i18n.prop('contact_information'));
		$('.mobile_phone').attr("placeholder", $.i18n.prop('mobile_phone') + "(option)");
		$('.wechat').attr("placeholder", $.i18n.prop('wechat') + "(option)");
		$('.email').attr("placeholder", $.i18n.prop('email') + "(option)");
		$('.cm_tip').attr("placeholder", "Please choose" + $.i18n.prop('cooperation_model'));
		$('.c_tip').attr("placeholder", "Please choose" + $.i18n.prop('cooperation_categories'));
		$('.submit').html($.i18n.prop('submit'));
		$('.mill').html($.i18n.prop('mill'));
		$('.ore_pool').html($.i18n.prop('ore_pool'));
		$('.wallet').html($.i18n.prop('wallet'));
		$('.exchange').html($.i18n.prop('exchange'));
		$('.blockchain_browser').html($.i18n.prop('blockchain_browser'));
		$('.other').html($.i18n.prop('other'));
		$('.resources_swap').html($.i18n.prop('resources_swap'));
		$('.to_cooperation').html($.i18n.prop('to_cooperation'));
		$('.QQ').html($.i18n.prop('QQ') + "(option)");
	}

	//e_help_center.html
	if ($('.help_title').html()) {
		$('.help_title').html($.i18n.prop('help_title'));
		$('.must_read').html($.i18n.prop('must_read'));
		$('.help_operation').html($.i18n.prop('help_operation'));
		$('.help_knowledge').html($.i18n.prop('help_knowledge'));
		$('.chain_knowledge').html($.i18n.prop('chain_knowledge'));

		$('.chain_knowledge').html($.i18n.prop('chain_knowledge'));
		$('.help_key').html($.i18n.prop('help_key'));
		$('.what_eac').html($.i18n.prop('what_eac'));
		$('.matters_attention').html($.i18n.prop('matters_attention'));
		$('.why_eac').html($.i18n.prop('why_eac'));
		$('.webmasters_using').html($.i18n.prop('webmasters_using'));

		$('.site_members').html($.i18n.prop('site_members'));
		$('.how_get').html($.i18n.prop('how_get'));
	}

	//e_connact.html
	if ($('.connact_title').html()) {

		$('.connact_title').html($.i18n.prop('connact_title'));
		$('.telegram').html($.i18n.prop('telegram'));
		$('.please_refer').html($.i18n.prop('please_refer'));
		console.log($('.usage_protocol').html());
		$('.usage_protocol').html($.i18n.prop('usage_protocol'));
		$('.privacy_protocol').html($.i18n.prop('privacy_protocol'));
		$('.wechat').html($.i18n.prop('wechat'));
		$('.cancel').html($.i18n.prop('cancel'));

	}



	//excange.html
	if ($('.excange_title').html()) {

		$('.excange_title').html($.i18n.prop('excange_title'));
		$('.excange_registration').html($.i18n.prop('excange_registration'));
		$('.interesting_currency').html($.i18n.prop('interesting_currency'));

		$('.currency_egg').html($.i18n.prop('currency_egg'));
		$('.miner_pit').html($.i18n.prop('miner_pit'));
		$('.lm').html($.i18n.prop('lm'));
		$('.Zeus').html($.i18n.prop('Zeus'));
		$('.Whitebait').html($.i18n.prop('Whitebait'));
		$('.ore_pool').html($.i18n.prop('ore_pool'));
		$('.bjs').html($.i18n.prop('bjs'));
	}

	//set_app_web.html
	if ($('.web_title').html()) {

		$('.web_title').html($.i18n.prop('web_title'));
		$('.category_website').html($.i18n.prop('category_website'));
		$('.category_website_tip').attr("placeholder", $.i18n.prop('category_website_tip'));;
		$('.name_website').html($.i18n.prop('name_website'));
		$('.name_website_tip').attr("placeholder", $.i18n.prop('name_website_tip'));;
		$('.website_download').html($.i18n.prop('website_download'));
		$('.website_download_tip').attr("placeholder", $.i18n.prop('website_download_tip'));;
		$('.whether_supported').html($.i18n.prop('whether_supported'));
		$('.have_support').html($.i18n.prop('have_support'));
		$('.nonsupport').html($.i18n.prop('nonsupport'));
		$('.web_tip').html($.i18n.prop('web_tip'));
		$('.cancel').html($.i18n.prop('cancel'));
		$('.submit').html($.i18n.prop('submit'));

		$('.select2').html($.i18n.prop('select2'));
		$('.select3').html($.i18n.prop('select3'));
		$('.select4').html($.i18n.prop('select4'));
		$('.select5').html($.i18n.prop('select5'));
		$('.select6').html($.i18n.prop('select6'));
		$('.select7').html($.i18n.prop('select7'));
		$('.select8').html($.i18n.prop('select8'));
		$('.select9').html($.i18n.prop('select9'));
		$('.select10').html($.i18n.prop('select10'));
		$('.select11').html($.i18n.prop('select11'));

	}







	}


}
