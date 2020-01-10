 // document.getElementById('ul_list').style.display = 'none';
	 //  点击展开列表
    function click_ul() {               
        document.getElementById('ul_list').style.display = 'block';
    }
    function s_li_click() {
        var t_obj = event.target;
        document.getElementById('lite').value = t_obj.innerHTML;
		document.getElementById('copy').value=t_obj.innerHTML;
		setTimeout(function () {
            document.getElementById('ul_list').style.display = 'none';
        }, 1);
    }
   
  // document.onclick = function () {
   //     var cur_obj = event.target;
   //     if ('lite_s' != cur_obj.id && 'Ddlt_s' != cur_obj.id) {
   //         document.getElementById('ul_list_s').style.display="none";
   //     }
   // }
	// document.onclick = function () {
    //     var cur_obj = event.target;
    //     if ('lite' != cur_obj.id && 'Ddlt' != cur_obj.id) {
    //         document.getElementById('ul_list').style.display = 'none';
    //     }
    // }
	
	
	// document.getElementById('ul_list_t');
	
	//    function click_ul_t() {                //  点击展开
	//        document.getElementById('ul_list_t').style.display = 'block';
	//    }
	//    function s_li_click_t() {
	//        var t_obj = event.target;
	//        document.getElementById('lite_t').value = t_obj.innerHTML;
	//        setTimeout(function () {
	//            document.getElementById('ul_list_t').style.display = 'none';
	//        }, 1);
	//    }
	//    document.onclick = function () {
	//        var cur_obj = event.target;
	//        if ('lite_t' != cur_obj.id && 'Ddlt_t' != cur_obj.id) {
	//            document.getElementById('ul_list_t').style.display = 'none';
	//        }
	//    }
	   
	   // document.getElementById('ul_list_s');
	   
	   //    function click_ul_s() {                //  点击展开
	   //        document.getElementById('ul_list_s').style.display = 'block';
	   //    }
	   //    function s_li_click_s() {
	   //        var t_obj = event.target;
	   //        document.getElementById('lite_s').value = t_obj.innerHTML;
	   //        setTimeout(function () {
	   //            document.getElementById('ul_list_s').style.display = 'none';
	   //        }, 1);
	   //    }
	    