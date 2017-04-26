$(function() {

	// фенсибокс
	$('[fancybox]').fancybox();

	// выбор даты
	$('[datepicker]').datepicker({
		format: 'dd MM',
		startDate: '0d',
		maxViewMode: 0,
		language: "ru",
		forceParse: false,
		autoclose: true,
		todayHighlight: true
	});


	// выбор даты и времени
	$('[datepicker-time]').datepicker({
		format: 'dd.mm.yyyy',
		startDate: '0d',
		maxViewMode: 0,
		language: "ru",
		pickTime: true,
		forceParse: false,
		autoclose: true,
		pick12HourFormat: false,
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
		$(this).parent().find('.fa-warning').hide();
	});

	// открываем список городов
	$('.toggle-link').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).html('<i class="fa fa-road"></i> Еще маршруты');
			$(this).removeClass('active');
		} else {
			$(this).html('<i class="fa fa-road"></i> Скрыть все маршруты');
			$(this).addClass('active');
		}
		$(this).parent().parent().find('.toggle-block').toggleClass('active');
		return false;
	});

	// показываем весь текст
	$('.toggle-link__text').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).html('Показать все');
			$(this).removeClass('active');
		} else {
			$(this).html('Скрыть');
			$(this).addClass('active');
		}
		$(this).parent().find('.toggle-block').toggleClass('active');
		return false;
	});

	// ================ ПИСЬМА =================

	// обработка письма обратного звонка
	$(".form__form").submit(function() {
		return false;
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
						setTimeout("$.fancybox.close()", 20000);
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
						setTimeout("$.fancybox.close()", 20000);
					}
				}
			});
		} else {
			if (nameVal < 2) {
				name.addClass('error');
				name.next().show();
			}
			if (telVal < 10) {
				tel.addClass('error');
				tel.next().show();
			}
			if (cityAriveVal < 2) {
				cityArive.addClass('error');
				cityArive.next().show();
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
						setTimeout("$.fancybox.close()", 20000);
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
	(function(w, doc) {
		if (!w.__utlWdgt) {
			w.__utlWdgt = true;
			var d = doc,
				s = d.createElement('script'),
				g = 'getElementsByTagName';
			s.type = 'text/javascript';
			s.charset = 'UTF-8';
			s.async = true;
			s.src = ('https:' == w.location.protocol ? 'https' : 'http') + '://w.uptolike.com/widgets/v1/uptolike.js';
			var h = d[g]('body')[0];
			h.appendChild(s);
		}
	})(window, document);


	$('.form__block input').keyup(function() {
		$(this).removeClass('error');
	});

	// поиск на главной
	$('.search').on('click', function() {
		var inputFrom = $('input[cityFrom]').val().toLowerCase(),
			inputTo = $('input[cityTo]').val().toLowerCase(),
			wayBlock = $('.popular__block');

		// проверка на ввод данных
		$('.form__block input').each(function() {
			if ($(this).val() == '') {
				$(this).addClass('error');
				return false;
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
	$(function() {
		$.fn.scrollToTop = function() {
			if ($(window).scrollTop() >= "250")
				$(this).addClass("active")
			var scrollDiv = $(this);
			$(window).scroll(function() {
				if ($(window).scrollTop() <= "250")
					$(scrollDiv).removeClass("active")
				else
					$(scrollDiv).addClass("active")
			});
			$(this).click(function() {
				$("html, body").animate({
					scrollTop: 0
				}, "slow")
			})
		}
	});

	// вызов функции якоря
	$(function() {
		$(".toTop").scrollToTop();
	});

	// открываем моб меню
	$('.main-menu__mob-btn').on('click', function() {
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

	// collapse
	$('[data-collapse]').on('click', function() {
		$(this).toggleClass('active');
		$('#' + $(this).attr('data-collapse') + '').slideToggle(300);
		return false;
	});

	// autocomplite
	var availableTags = [
		"Донецк", "Минск", "Гомель", "Могилёв", "Артемовск", "Белгород", "Курск", "Орел", "Тула", "Москва", "Санкт-Петербург", "Горловка", "Алушта", "Феодосия", "Керчь", "Ростов", "Севастополь", "Симферополь", "Славянск на Кубани", "Ялта", "Адлер", "Кисловодск", "Ставрополь", "Волгоград", "Таганрог", "Туапсе", "Геленджик", "Сочи", "Краснодар", "Анапа", "Брянск", "Павловск", "Воронеж", "Ливны", "Нижний Новгород", "Великий Новгород", "Саратов", "Самара", "Тольятти", "Елец", "Липецк", "Тверь", "Днепропетровск", "Евпатория", "Киев", "Джубга", "Лазаревский", "Константиновка", "Краматорск", "Луганск", "Славянск", "Харьков", "Борисполь", "Димитрово", "Доброполье", "Изюм", "Красноармейск", "Красноград", "Курахово", "Лубны", "Мариуполь", "Новомосковск", "Павлоград", "Пирятин", "Полтава", "Селидово", "Волноваха", "Запорожье", "Одесса", "Бердянск", "Старый Оскол", "Железногорск", "Херсон", "Казань", "Сумы", "Люблин" , "Варшава" , "Щецин" , "Гданськ" , "Гдыня" 
	];
	$(".main__form .form__input").autocomplete({
		source: availableTags,
		minLength: 1
	});

	// клонируем ссылку обратного маршрута если большая область просмотра
	setTimeout(function(){
		if ($('[place-parent]').length >= 3) {
			$(".back__link-wrap").clone().insertAfter(".schedule__main-title").attr('style', 'margin-bottom: 15px');
		}
	}, 100);

	// запуск цели для яндекса
	setTimeout('yaCounter36626610.reachGoal("Time");', 60000);

});