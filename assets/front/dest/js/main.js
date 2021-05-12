// formLotBuy
function formLotBuy() {
	$('.js-form__name').mask("SSSSSSSSSSSSSSSS", {autoclear: false, 'translation': {S: {pattern: /[А-Яа-яA-Za-z]/}}});
	$('.js-form__phone').mask("+38(099)-999-99-99", {autoclear: false});

	let form = $('#form-lot-buy');
	let popUp = $('.pop-up.form-lot-buy');
	let loadOverlay = form.find('.load-overlay');

	form.on( 'submit', function(el) {
		el.preventDefault();

		let linkForm = $(location).attr("href");
        let formData = $(this).serializeArray();
        formData.push({name:'link_form', value: linkForm});

		loadOverlay.removeClass('hidden');

		$.ajax({
			'method': 'POST',
			'dataType': 'json',
			'url': '/dest/form_lot_buy.php',
			'data':  formData,
			success: function(data){//success callback
				popUp.removeClass('hidden');
				form.addClass('hidden');

			},
			error:function(data) {
				console.log(data.message);
			}
		});
	});

	let popupClose = popUp.find('.js-form__success-confirm');

	popupClose.on('click', function(){
		popUp.addClass('hidden');
		loadOverlay.addClass('hidden');

		form[0].reset();
	})
}

// formFollowLot
function formFollowLot() {
	$('.js-form__name').mask("SSSSSSSSSSSSSSSS", {autoclear: false, 'translation': {S: {pattern: /[А-Яа-яA-Za-z]/}}});
	$('.js-form__phone').mask("+38(099)-999-99-99", {autoclear: false});

	let form = $('#form-follow-lot');
	let popUp = $('.pop-up.form-follow-lot');
	let loadOverlay = form.find('.load-overlay');

	form.on( 'submit', function(el) {
		el.preventDefault();
        let linkForm = $(location).attr("href");
        let formData = $(this).serializeArray();
        formData.push({name:'link_form', value: linkForm});
		loadOverlay.removeClass('hidden');

		$.ajax({
			'method': 'POST',
			'dataType': 'json',
			'url': '/dest/form_follow_lot.php',
			'data':  formData,
			success: function(data){//success callback
				popUp.removeClass('hidden');
				form.addClass('hidden');

			},
			error:function(data) {
				console.log(data.message);
			}
		});
	});

	let popupClose = popUp.find('.js-form__success-confirm');

	popupClose.on('click', function(){
		popUp.addClass('hidden');
		loadOverlay.addClass('hidden');

		form[0].reset();
	})
}

// formBidAdd
function formBidAdd() {
	$('.js-form__name').mask("SSSSSSSSSSSSSSSS", {autoclear: false, 'translation': {S: {pattern: /[А-Яа-яA-Za-z]/}}});
	$('.js-form__phone').mask("+38(099)-999-99-99", {autoclear: false});
	$('.js-form__bid').mask("000000000000", {autoclear: false});

	let form = $('#form-bid-add');
	let popUp = $('.pop-up.form-bid-add');
	let loadOverlay = form.find('.load-overlay');

	form.on( 'submit', function(el) {
		el.preventDefault();
        let linkForm = $(location).attr("href");
        let formData = $(this).serializeArray();
        formData.push({name:'link_form', value: linkForm});
		loadOverlay.removeClass('hidden');

		$.ajax({
			'method': 'POST',
			'dataType': 'json',
			'url': '/dest/form_bid_add.php',
			'data':  formData,
			success: function(data){//success callback
				popUp.removeClass('hidden');
				form.addClass('hidden');

			},
			error:function(data) {
				console.log(data.message);
			}
		});
	});

	let popupClose = popUp.find('.js-form__success-confirm');

	popupClose.on('click', function(){
		popUp.addClass('hidden');
		loadOverlay.addClass('hidden');

		form[0].reset();
	})
}

// formConsultation
function formConsultation() {
    $('.js-form__name').mask("SSSSSSSSSSSSSSSS", {autoclear: false, 'translation': {S: {pattern: /[А-Яа-яA-Za-z]/}}});
    $('.js-form__phone').mask("+38(099)-999-99-99", {autoclear: false});

    let form = $('#form-consultation');
    let popUp = $('.pop-up.form-consultation');
    let loadOverlay = form.find('.load-overlay');

    form.on( 'submit', function(el) {
        el.preventDefault();
        let linkForm = $(location).attr("href");
        let formData = $(this).serializeArray();
        formData.push({name:'link_form', value: linkForm});
        loadOverlay.removeClass('hidden');

        $.ajax({
            'method': 'POST',
            'dataType': 'json',
            'url': '/dest/form_consultation.php',
            'data':  formData,
            success: function(data){//success callback
                popUp.removeClass('hidden');
				form.addClass('hidden');
            },
            error:function(data) {
                console.log(data.message);
            }
        });
    });

    let popupClose = popUp.find('.js-form__success-confirm');

    popupClose.on('click', function(){
        popUp.addClass('hidden');
        loadOverlay.addClass('hidden');

        form[0].reset();
    })
}

// formLotCheck
function formLotCheck() {
    $('.js-form__name').mask("SSSSSSSSSSSSSSSS", {autoclear: false, 'translation': {S: {pattern: /[А-Яа-яA-Za-z]/}}});
    $('.js-form__phone').mask("+38(099)-999-99-99", {autoclear: false});
    $('.js-form__lot-number').mask("00000000000000000000000000000000000000000", {autoclear: false});

    let form = $('#form-lot-check');
    let popUp = $('.pop-up.form-lot-check');
    let loadOverlay = form.find('.load-overlay');

    form.on( 'submit', function(el) {
        el.preventDefault();
        let linkForm = $(location).attr("href");
        let formData = $(this).serializeArray();
        formData.push({name:'link_form', value: linkForm});
        loadOverlay.removeClass('hidden');

        $.ajax({
            'method': 'POST',
            'dataType': 'json',
            'url': '/dest/form_lot_check.php',
            'data':  formData,
            success: function(data){//success callback
                popUp.removeClass('hidden');
				form.addClass('hidden');
                console.log(data.message);
            },
            error:function(data) {
                console.log(data.message);
            }
        });
    });

    let popupClose = popUp.find('.js-form__success-confirm');

    popupClose.on('click', function(){
        popUp.addClass('hidden');
        loadOverlay.addClass('hidden');
        form[0].reset();
    })
}

// formFindAuto
function formFindAuto() {
    $('.js-form__name').mask("SSSSSSSSSSSSSSSS", {autoclear: false, 'translation': {S: {pattern: /[А-Яа-яA-Za-z]/}}});
    $('.js-form__phone').mask("+38(099)-999-99-99", {autoclear: false});
    $('.js-form__maximum-budget').mask("0000000000000000000000000", {autoclear: false});

    let form = $('#form-find-auto');
    let popUp = $('.pop-up.form-find-auto');
    let loadOverlay = form.find('.load-overlay');

    form.on( 'submit', function(el) {
        el.preventDefault();
        let linkForm = $(location).attr("href");
        let formData = $(this).serializeArray();
        formData.push({name:'link_form', value: linkForm});
        loadOverlay.removeClass('hidden');

        $.ajax({
            'method': 'POST',
            'dataType': 'json',
            'url': '/dest/form_find_auto.php',
            'data':  formData,
            success: function(data){//success callback
                popUp.removeClass('hidden');
				form.addClass('hidden');
                console.log(data.message);
            },
            error:function(data) {
                console.log(data.message);
            }
        });
    });

    let popupClose = popUp.find('.js-form__success-confirm');

    popupClose.on('click', function(){
        popUp.addClass('hidden');
        loadOverlay.addClass('hidden');
        form[0].reset();
    })
}

// formWantKnowMore
function formWantKnowMore() {
    $('.js-form__name').mask("SSSSSSSSSSSSSSSS", {autoclear: false, 'translation': {S: {pattern: /[А-Яа-яA-Za-z]/}}});
    $('.js-form__phone').mask("+38(099)-999-99-99", {autoclear: false});

    let form = $('#form-want-know-more');
    let popUp = $('.pop-up.form-want-know-more');
    let loadOverlay = form.find('.load-overlay');

    form.on( 'submit', function(el) {
        el.preventDefault();
        let linkForm = $(location).attr("href");
        let formData = $(this).serializeArray();
        formData.push({name:'link_form', value: linkForm});

        loadOverlay.removeClass('hidden');

        $.ajax({
            'method': 'POST',
            'dataType': 'json',
            'url': '/dest/form_want_know_more.php',
            'data':  formData,
            success: function(data){//success callback
                popUp.removeClass('hidden');
				form.addClass('hidden');
            },
            error:function(data) {
                console.log(data.message);
            }
        });
    });

    let popupClose = popUp.find('.js-form__success-confirm');

    popupClose.on('click', function(){
        popUp.addClass('hidden');
        loadOverlay.addClass('hidden');

        form[0].reset();
    })
}

// formConsultation
function formFindSimilarLot() {
    $('.js-form__name').mask("SSSSSSSSSSSSSSSS", {autoclear: false, 'translation': {S: {pattern: /[А-Яа-яA-Za-z]/}}});
    $('.js-form__phone').mask("+38(099)-999-99-99", {autoclear: false});
    $('.js-form__my-bid').mask("0000000000000000000000000", {autoclear: false});

    let form = $('#form-find-similar-lot');
    let popUp = $('.pop-up.form-find-similar-lot');
    let loadOverlay = form.find('.load-overlay');

    form.on( 'submit', function(el) {
        el.preventDefault();
        let linkForm = $(location).attr("href");
        let formData = $(this).serializeArray();
        formData.push({name:'link_form', value: linkForm});
        loadOverlay.removeClass('hidden');
        $.ajax({
            'method': 'POST',
            'dataType': 'json',
            'url': '/dest/form_find_similar_lot.php',
            'data':  formData,
            success: function(data){//success callback
                popUp.removeClass('hidden');
				form.addClass('hidden');
            },
            error:function(data) {
                console.log(data.message);
            }
        });
    });

    let popupClose = popUp.find('.js-form__success-confirm');

    popupClose.on('click', function(){
        popUp.addClass('hidden');
        loadOverlay.addClass('hidden');

        form[0].reset();
    })
}


$(document).ready(function() {
	formLotBuy();
	formFollowLot();
	formBidAdd();
    formConsultation();
    formLotCheck();
    formFindAuto();
	formWantKnowMore();
	formFindSimilarLot();
});
