$(function() {

	// фенсибокс
	$('[fancybox]').fancybox();

	// выбор даты
	$('[datepicker]').datepicker({
		format: 'dd.mm.yyyy',
		startDate: '0d',
		maxViewMode: 0,
		language: "ru",
		forceParse: false,
		autoclose: true,
		todayHighlight: true
	});

	
	// только цифры для телефонов
	$('[only-numbers]').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9\+]/g, '')) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});

	//  обрабатываем форму выбора направления
	$('.schedule__btn').on('click', function() {
		var placeFrom = $('[place-from]'),
			placeTo = $('[place-to]'),
			inpFrom = $('input[place-from]'),
			inpTo = $('input[place-to]'),
			citys = $('input[name="citys"]'),
			price = $('[price]'),
			modalWindow = $('#order');

		modalWindow.find(placeFrom).html($(this).parents('[place-parent]').find(placeFrom).html()); // заносим пункт отправления в модальное
		modalWindow.find(placeTo).html($(this).parents('[place-parent]').find(placeTo).html()); // заносим пункт прибытия в модальное
		modalWindow.find(inpFrom).val($(this).parents('[place-parent]').find(placeFrom).text()); // заносим в инпут
		modalWindow.find(inpTo).val($(this).parents('[place-parent]').find(placeTo).text()); // заносим в инпут
		modalWindow.find(price).val($(this).parents('[place-parent]').find(price).text()); // заносим в инпут
		modalWindow.find(citys).val($('[citys]').text()); // заносим города от и до
	});

	// убираем класс ошибки с инпутов
	$('.form__input').keyup(function() {
		$(this).removeClass('error');
	});

	// открываем список городов
	$('.toggle-link').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).html('Еще маршруты');
			$(this).removeClass('active');
		} else {
			$(this).html('Скрыть все маршруты');
			$(this).addClass('active');
		}
		$(this).parent().parent().find('.toggle-block').toggleClass('active');
		return false;
	});

	// ================ ПИСЬМА =================

	// обработка письма обратного звонка
	$(".form__form").submit(function() {
		return false;
	});

	// обратная связь
	$(".callback").on("click", function() {
		var tel = $(this).parents('.form__form').find('input[name="phone"]'),
			// name = $(this).parents('.form__form').find('input[name="name"]'),
			// nameVal = $(this).parents('.form__form').find('input[name="name"]').val().length,
			telVal = $(this).parents('.form__form').find('input[name="phone"]').val().length;
		// обратный звонок
		// if ((nameVal >= 2) && (telVal >= 10)) {
		if ((telVal >= 10)) {
			$.ajax({
				type: 'POST',
				url: '/callback.php',
				data: $(this).parents('.form__form').serialize(),
				success: function(data) {
					if (data == "true") {
						$.fancybox.close();
						$.fancybox($('#thanks'));
						setTimeout("$.fancybox.close()", 12000);
					}
				}
			});
		} else {
			// if (nameVal < 2) {
			// 	name.addClass('error');
			// }
			if (telVal < 10) {
				tel.addClass('error');
			}
		}

	});

	// форма сотрудничества
	$(".form__submit-partner").on("click", function() {
		var name = $(this).parents('.form__form').find('input[name="name"]'),
			tel = $(this).parents('.form__form').find('input[name="phone"]'),
			nameVal = $(this).parents('.form__form').find('input[name="name"]').val().length,
			telVal = $(this).parents('.form__form').find('input[name="phone"]').val().length;
		if ((nameVal >= 2) && (telVal >= 10)) {
			$.ajax({
				type: 'POST',
				url: 'partner.php',
				data: $(this).parents('.form__form').serialize(),
				success: function(data) {
					if (data == "true") {
						$.fancybox.close();
						$.fancybox($('#thanks'));
						setTimeout("$.fancybox.close()", 5000);
					}
				}
			});
		} else {
			if (nameVal < 2) {
				name.addClass('error');
			}
			if (telVal < 10) {
				tel.addClass('error');
			}
		}
	});


	// бронь со страницы города
	$(".order__submit").on("click", function() {
		var name = $(this).parents('.form__form').find('input[name="name"]'),
			tel = $(this).parents('.form__form').find('input[name="phone"]'),
			nameVal = $(this).parents('.form__form').find('input[name="name"]').val().length,
			telVal = $(this).parents('.form__form').find('input[name="phone"]').val().length,
			cityArive = $(this).parents('.form__form').find('input[name="city-arive"]'),
			cityAriveVal = $(this).parents('.form__form').find('input[name="city-arive"]').val().length;

		// бронь мест с главной
		if ((nameVal >= 2) && (telVal >= 10) && (cityAriveVal >= 2)) {
			$.ajax({
				type: 'POST',
				url: '/city-order.php',
				data: $(this).parents('.form__form').serialize(),
				success: function(data) {
					if (data == "true") {
						$.fancybox.close();
						$.fancybox($('#thanks'));
						setTimeout("$.fancybox.close()", 5000);
					}
				}
			});
		} else {
			if (nameVal < 2) {
				name.addClass('error');
			}
			if (telVal < 10) {
				tel.addClass('error');
			}
			if (cityAriveVal < 2) {
				cityArive.addClass('error');
			}
		}
	});

	// форма заказа трансфера
	$(".service__form-btn").on("click", function() {
		var name = $(this).parents('.form__form').find('input[name="name"]'),
			tel = $(this).parents('.form__form').find('input[name="phone"]'),
			date = $(this).parents('.form__form').find('input[name="date"]'),
			cityDep = $(this).parents('.form__form').find('input[name="city-departure"]'),
			cityArr = $(this).parents('.form__form').find('input[name="city-arrive"]'),
			quantity = $(this).parents('.form__form').find('input[name="quantity"]'),
			nameVal = $(this).parents('.form__form').find('input[name="name"]').val().length,
			telVal = $(this).parents('.form__form').find('input[name="phone"]').val().length;
			dateVal = $(this).parents('.form__form').find('input[name="date"]').val().length;
			cityDepVal = $(this).parents('.form__form').find('input[name="city-departure"]').val().length;
			cityArrVal = $(this).parents('.form__form').find('input[name="city-arrive"]').val().length;
			quantityVal = $(this).parents('.form__form').find('input[name="quantity"]').val().length;
		if ((nameVal >= 2) && (telVal >= 10) && (dateVal >= 6) && (cityDepVal >= 5) && (cityArrVal >= 5) && (quantityVal >= 1)) {
			$.ajax({
				type: 'POST',
				url: '/transfer.php',
				data: $(this).parents('.form__form').serialize(),
				success: function(data) {
					if (data == "true") {
						$.fancybox.close();
						$.fancybox($('#thanks'));
						setTimeout("$.fancybox.close()", 5000);
					}
				}
			});
		} else {
			if (nameVal < 2) { 
				name.addClass('error');
			}
			if (telVal < 10) {
				tel.addClass('error');
			}
			if (dateVal < 6) {
				date.addClass('error');
			}
			if (cityDepVal < 5) {
				cityDep.addClass('error');
			}
			if (cityArrVal < 5) {
				cityArr.addClass('error');
			}
			if (quantityVal < 1) {
				quantity.addClass('error');
			}
		}
	});



	// Up to Like
	(function(w,doc) {
		if (!w.__utlWdgt ) {
		    w.__utlWdgt = true;
		    var d = doc, s = d.createElement('script'), g = 'getElementsByTagName';
		    s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
		    s.src = ('https:' == w.location.protocol ? 'https' : 'http')  + '://w.uptolike.com/widgets/v1/uptolike.js';
		    var h=d[g]('body')[0];
		    h.appendChild(s);
		}})(window,document);


	$('.form__block input').keyup(function() {
		$(this).removeClass('error');
	});

	// поиск на главной
	$('.search').on('click', function() {
		var inputFrom = $('input[cityFrom]').val().toLowerCase(),
			inputTo = $('input[cityTo]').val().toLowerCase(),
			wayBlock = $('.popular__block');

		// проверка на ввод данных
		$('.form__block input').each(function(){
			if ($(this).val() == '') {
				$(this).addClass('error');
				return	false;
			}
		});

		wayBlock.each(function() {
			var cityFrom = $(this).find('[cityFrom]').text().toLowerCase(),
				cityTo = $(this).find('[cityTo]').text().toLowerCase();

			if ((inputFrom == cityFrom) && (inputTo == cityTo)) {
				$('.form__result').html($(this).html());
				return false;
			} else {
				$('.form__result').html("<div class='text-center' style='font-size: 18px;'>Поиск результатов не дал.<br>Проверьте правильность ввода.</div>");
			}
		});

		$('.form__result').slideDown(200);

	});

	// показываем кнопку вверх
    $(function () {
        $.fn.scrollToTop = function () {
            if ($(window).scrollTop() >= "250")
                $(this).addClass("active")
            var scrollDiv = $(this);
            $(window).scroll(function () {
                if ($(window).scrollTop() <= "250")
                    $(scrollDiv).removeClass("active")
                else
                    $(scrollDiv).addClass("active")
            });
            $(this).click(function () {
                $("html, body").animate({
                    scrollTop: 0
                }, "slow")
            })
        }
    });

    // вызов функции якоря
    $(function () {
        $(".toTop").scrollToTop();
    });

    // открываем моб меню
    $('.main-menu__mob-btn').on('click', function(){
    	$(this).toggleClass('active');
    	$('.main-menu__list').slideToggle(200);
    });

    // плавный скролл к якорю
    $('[anchor-trigger]').bind("click", function(e) {
    	var anchor = $(this);
    	$('html, body').stop().animate({
    		scrollTop: $(anchor.attr('href')).offset().top
    	}, 1000);
    	e.preventDefault();
    });

});