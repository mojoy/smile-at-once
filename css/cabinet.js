jQuery(document).ready(function($) {
	jQuery.datetimepicker.setLocale('ru');	
	$( "#form_date" ).datetimepicker({		
		 format:'d.m.Y H:i',
		  inline:true,
		  lang:'ru',
		  minDate:0,
		  minTime:'10:00',
		  maxTime:'21:15',
		  step:15
		  
	});   
	
	 CKEDITOR.replace('manager', {
	        height: 260,
	        width: 700,
	    });
	
	var form = $('form#addConsult');
	$('form#addConsult .button').bind(
				'click',
				function() {			
					insertPreloader(jQuery(form));
					$("#addConsult").ajaxSubmit({
						success : function(
								data,status) {
							
							if(data.success)location.href="/cabinet/";
			
						},
						beforeSubmit : function() {	
							var err = true;					
							
							if(jQuery(form).find(".name").val()==""){																	
								insertErrorCode2Form("Заполните обязательное поле",jQuery(form).find(".name"));
								err = false;
								dropPreloader();	
								return err;		
							}else{
								dropErrorCode2Form(jQuery(form).find(".name"));
								err = true;	
							}
							if(jQuery(form).find(".date_start").val()==""){																	
								insertErrorCode2Form("Заполните обязательное поле",jQuery(form).find(".date_start"));
								err = false;
								dropPreloader();	
								return err;		
							}else{
								dropErrorCode2Form(jQuery(form).find(".date_start"));
								err = true;	
							}
							return err;		
						},
						dataType : 'json'
					});
					return false;
	});	
	
	  $(document).on('click', '.link-chat', function () {
	        var aux = $('<input>');
	        $('body').append( aux );
	        aux.val( this.innerHTML ).select();
	        document.execCommand("copy");
	        aux.remove();
	        $(this).parent().find("i").html("Скопировано");
	        el = $(this).parent();
	        setTimeout(function(){
	        	$(el).find("i").html("Нажмите, чтобы скопировать строку в буфер обмена");
	        },1000);
	    });


});

function confirmDelete(id, ask, url) {
	var temp = window.confirm(ask);
	if (temp) {
	window.location=url+id;
	}
	}