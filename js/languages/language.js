var LANGUAGE_Index = "zh_CN"; //标识语言  
  
jQuery(document).ready(function () {  
    // alert("页面加载时调用的方法");  
  
  LANGUAGE_Index = jQuery.i18n.normaliseLanguageCode({}); //获取浏览器的语言  
  loadProperties(LANGUAGE_Index);  
});  
  
  
$(".lan_select").change(function () {  
  
  
    if (($(".lan_select").val() === "英文") || ($(".lan_select").val() === "English")) {  
        LANGUAGE_Index = "en_US";  
  } else {  
        LANGUAGE_Index = "zh_CN";  
  }  
  
    loadProperties(LANGUAGE_Index);  
  
});  
  
  
function loadProperties(type) {  
    jQuery.i18n.properties({  
        name: 'strings', // 资源文件名称  
        path: 'Languages/', // 资源文件所在目录路径  
        mode: 'map', // 模式：变量或 Map  
        language: type, // 对应的语言  
        cache: false,  
        encoding: 'UTF-8',  
        callback: function () { // 回调方法  
            $('.lan_zh').html($.i18n.prop('lan_zh'));  
            $('.lan_en').html($.i18n.prop('lan_en'));  
            $('.username').html($.i18n.prop('username'));  
            $('.password').html($.i18n.prop('password'));  
        }  
    });  
}