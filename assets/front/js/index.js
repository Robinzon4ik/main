/*
* 2007-2017 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2017 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

$(document).ready(function(){

	$('#home-page-tabs li:first, #index .tab-content ul:first').addClass('active');

	$('.cross').click(function(){
		$(this).parent().addClass('hidden');
		$('.calc_overlay').addClass('hidden');
		//$('#uniform-customs_fee_switch span').removeClass('checked');
	});

	$('.senk').click(function(){
		$('.calc_customs').addClass('hidden');
		$('.calc_overlay').addClass('hidden');
		//$('#uniform-customs_fee_switch span').removeClass('checked');
	});

});
function calc(form)
{
    if ($('#form_calc').length <= 0) {
        return false;
    }

    let $form = form;
	let $lot_price_res = $form.find('input[name=lot_price_res]');

	let $vehicle_type = $form.find('input[name=vehicle_type]');
	let $departure_harbour_state = $form.find('input[name=departure_harbour_state]');
	let $destination_harbour_city = $form.find('input[name=destination_harbour_city]');
	let $vehicle_year = $form.find('input[name=vehicle_year]');
	let $vehicle_engine_volume = $form.find('input[name=vehicle_engine_volume]');
	let $broker_and_forwarder = $form.find('input[name=broker_and_forwarder_val]');

	let $auction_fee = $form.find('input[name=auction_fee]');
	let $delivery_usa = $form.find('input[name=delivery_usa]');
	let $delivery_global = $form.find('input[name=delivery_global]');
	let $delivery_ukr = $form.find('input[name=delivery_ukr]');
	let $container_insurance = $form.find('#total_loss_insurance_val');
	let $damage_insurance = $form.find('input[name=damage_insurance_val]');
	let $broker = $form.find('input[name=broker]');
	let $repairs = $form.find('input[name=repair_support_val]');
	let $service_res = $form.find('input[name=service_res]');
	let $total_res = $form.find('input[name=total_res]');
	let $tax_res = $form.find('input[name=tax_res]');
	let $tollage_res = $form.find('input[name=tollage_res]');
	let $excise_res = $form.find('input[name=excise_res]');
	let $pension_fund_res = $form.find('input[name=pension_fund_res]');
	let $total_customs_res = $form.find('input[name=total_customs_res]');
	let $customs_fee = $form.find('input[name=customs_fee]');
	let $calc_customs = $form.find('.calc_customs');
	let $calc_overlay = $form.find('.calc_overlay');
	let customs_fee_switch = $form.find('input[name=customs_fee]').prop('checked');
	let $customs_fee_val= $form.find('input[name=customs_fee_val]');
	let $us_export_clearance= $form.find('input[name=us_export_clearance]');
    let $copylink = $form.find('a.copylink');

    let dataForm = $form.serializeArray();

    if(!$('#total_loss_insurance').is(':checked')){
        dataForm.push({name: 'total_loss_insurance', value: '0'});
    }

    if(!$('#damage_insurance').is(':checked')){
        dataForm.push({name: 'damage_insurance', value: '0'});
    }

    $( "#destination_country option:selected" ).each(function() {
        let selectCountry = $(this).text();

        if(selectCountry === 'Украина') {
            if(!$('#broker_and_forwarder').is(':checked')){
                dataForm.push({name: 'broker_and_forwarder', value: '0'});
            }
        } else  if(selectCountry === 'Литва') {
            dataForm.push({name: 'broker_and_forwarder', value: '0'});
        }
    });

    if(!$('#repair_support').is(':checked')){
        dataForm.push({name: 'repair_support', value: '0'});
    }

    if(!$('#customs_fee').is(':checked')){
        dataForm.push({name: 'customs_fee', value: '0'});
    }

    $.ajax({
		url: 'api/calculator',
		data: dataForm,
		type: 'POST',
		headers: { "cache-control": "no-cache" },
		dataType: "json",
		async: true,

        success: function(data){

			if(typeof(data.success) == "undefined"){
				$form.find('.notice').text(data.error).removeClass('hidden');
			}

			else{
				let request = data.data;
				$lot_price_res.val(request.lot_price);
				$auction_fee.val(request.auction_fee);
				$delivery_usa.val(request.land_delivery);
				$delivery_global.val(request.sea_delivery);
				$delivery_ukr.val(request.ukraine_delivery);
				$container_insurance.val(request.total_loss_insurance);
				$damage_insurance.val(request.damage_insurance);
				$broker.val(request.broker_and_forwarder);
				$repairs.val(request.repair_support);
				$service_res.val(request.service);
                $us_export_clearance.val(request.us_export_clearance_fee);

                $broker_and_forwarder.val(request.broker_and_forwarder);
				$total_res.val(request.sum);

				$tax_res.val(request.tax);
				$tollage_res.val(request.tollage);
				$excise_res.val(request.excise);
				$pension_fund_res.val(request.pension_tax);
				$total_customs_res.val(request.customs_fee);
				if(customs_fee_switch) {
                    $customs_fee_val.val(request.customs_fee);
				} else {
					// $customs_fee.val(0);
				}
				$copylink.attr('data-href', indexUrl+'?calc='+data.copylink)
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
// 			alert(xhr.status);
// 			alert(thrownError);
		}
	});
	return false;

}

$(document).ready(function(){
	let $form = $(document).find('#form_calc');
	calc($form);

	let $auction_state = $form.find('#auction_state');
	let $port = $form.find('#port');
	let $destination_city = $form.find('#destination_city');
	let $country_customs = $form.find('select[name=country_customs]');
	let $city_customs = $form.find('input[name=city_customs]');

	$(document).on('change', 'select[name=auction]', function (e) {
	    e.preventDefault();
		let auction = $(this).val();

		$.ajax({
			url: '/calculator/auction-states',

            data: {
			    'action': 'auction',
                'auction': auction,
            },

			type: 'GET',
			headers: { "cache-control": "no-cache" },
			dataType: "json",
			async: false,
			success: function(data){
				if(typeof(data.success) == "undefined"){
					$form.find('.notice').text(data.error).removeClass('hidden');
				}
				else{
					if(data.data.states) {
						$auction_state.empty();
						for (let j = 0, len = data.data.states.length; j < len; j++) {
							$('<option/>', {value: data.data.states[j]}).text(data.data.states[j]).appendTo($auction_state);
						}
					}
					if(data.data.ports) {
						$port.empty();
						for (let j = 0, len = data.data.ports.length; j < len; j++) {
							$('<option/>', {value: data.data.ports[j]}).text(data.data.ports[j]).appendTo($port);
						}
					}
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});

	});

	$(document).on('change', 'select[name=auction_state]', function (e) {
		let auction = $form.find('#auction').val();
		let auction_state = $(this).val();
		$.ajax({
			url: 'calculator/departure-harbour-states',
			data: {
			    'action': 'auction_state',
                'auction': auction,
                'auction_state': auction_state
            },
			type: 'GET',
			headers: { "cache-control": "no-cache" },
			dataType: "json",
			async: false,

            success: function(data){
				if(typeof(data.success) == "undefined"){
					$form.find('.notice').text(data.error).removeClass('hidden');
				}
				else{
					if(data.data.ports) {
						$port.empty();
						for (let j = 0, len = data.data.ports.length; j < len; j++) {
							$('<option/>', {value: data.data.ports[j]}).text(data.data.ports[j]).appendTo($port);
						}
					}
				}



			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});

	});

	$(document).on('change', 'select[name=service]', function (e) {
		let $calc_cities = $form.find('#calc_cities');
		let service = $(this).val();
		if(typeof($calc_cities) !=='undefined')
		{
			if(service == 2){
				$calc_cities.fadeIn('fast');
			}
			else{
				$calc_cities.fadeOut('fast');
			}
		}
	});

	$(document).on('change', 'select[name=destination_country]', function (e) {
		let $ukraine_block = $form.find('.ukraine_block');
		let destination_country = $(this).val();
		if (destination_country == 'Украина')
		{
			$destination_city.empty().append($('<option/>', {value: 'Одесса'}).text('Одесса'));
			$city_customs.val('Одесса');
			$ukraine_block.fadeIn('fast');
		}
		if (destination_country == 'Литва')
		{
			$destination_city.empty().append($('<option/>', {value: 'Клайпеда'}).text('Клайпеда'));
			$city_customs.val('Клайпеда');
			$ukraine_block.fadeOut('fast');
		}
		$country_customs.val(destination_country);
	});

	$(document).on('change', 'select[name=country_customs]', function (e) {
		let country_customs = $(this).val();
		let $city_customs = $form.find('input[name=city_customs]');
		if (country_customs == 'Украина') $city_customs.val('Одесса');
		if (country_customs == 'Литва') $city_customs.val('Клайпеда');
	});

	$(document).on('change', 'select[name=type_engine_customs]', function (e) {
		let type_engine_customs = $(this).val();
		let all_type = $(this).attr('data-all');
		let e_type = $(this).attr('data-e');
		let $label = $form.find('label[for=vehicle_engine_volume]');
		if (type_engine_customs == '4') $label.text(e_type);
		else $label.text(all_type);
	});

	$(document).on('change', 'input.calc-customs-input, input.calc-input, input[type=checkbox], select', function (e) {
		let $this = $(this);

		if ($this.hasClass('res-check')) {
			if ($this.prop('checked')) {
                $this.parent('span').addClass('checked');
				$this.parents('.check_group').removeClass('grey');

				if($this.attr('name')=='customs_fee') {
					$this.parents('form').find('.calc_customs').removeClass('hidden');
				} else {
					$this.parents('form').find('.calc_customs').addClass('hidden');
				}

			} else {
				$this.parents('.check_group').addClass('grey');
                $this.parent('span').removeClass('checked');
			}
		}

        const url = window.location.href;
        const infoFromUrl = url.split('?')[1];
        const infoForFilter = $(this)[0].id;
        let filterPartOfUrl;
        if (infoFromUrl) {
            const arrayFromInfoFromUrl = infoFromUrl.split('&');
            if (arrayFromInfoFromUrl.indexOf(infoForFilter) === -1) {
                arrayFromInfoFromUrl.push(infoForFilter);
            } else {
                arrayFromInfoFromUrl.splice(arrayFromInfoFromUrl.indexOf(infoForFilter), 1);
            }
            for (let i = 0; i < arrayFromInfoFromUrl.length; i++) {
                if (arrayFromInfoFromUrl[i].includes('page') || arrayFromInfoFromUrl[i].includes('limit')) {
                    arrayFromInfoFromUrl.splice(i, 1);
                }
            }
            filterPartOfUrl = '?' + arrayFromInfoFromUrl.join('&');
            history.pushState(null, null, filterPartOfUrl);
        } else {
            filterPartOfUrl = '?' + infoForFilter;
            history.pushState(null, null, filterPartOfUrl);
        }
        if ($('#form_calc').length <= 0) {
            location.reload();
        }
		calc($form);
	});

	$(document).on('keyup', 'input.calc-customs-input, input.calc-input', function (e) {
		let $this = $(this);
		let field_value = String($this.val().replace(/[^\d]/g, ''));
		$this.val(field_value);
		if(e.which == 13) {
			calc($form);
		}
	});

	$(window).on('load', function () {
        const startValue = $('#start-value');
        const finishValue = $('#finish-value');

        const dataStartValue = startValue.attr('data-start-value');
        const dataFinishValue = finishValue.attr('data-finish-value');

        let startDataFromUrl = dataStartValue;
        let finishDataFromurl = dataFinishValue;

        const url = window.location.href;
        const secondPartOfUrl = url.split('?')[1];

        if (secondPartOfUrl) {
            const dataFromUrl = secondPartOfUrl.split('&');

            for (const item of dataFromUrl) {
                if (item.includes('price%5Bfrom%5D')) {
                    startDataFromUrl = item.split('=')[1];
                }
                if (item.includes('price%5Bto%5D')) {
                    finishDataFromurl = item.split('=')[1];
                }
            }
        }

        startValue.html(startDataFromUrl);
        finishValue.html(finishDataFromurl);

        $('#slider').slider({
            step: 1,
            range: true,
            values: [startDataFromUrl, finishDataFromurl],
            min: +dataStartValue,
            max: +dataFinishValue,
            stop: function( event, ui ) {
                let filterPartOfUrl;
                if (secondPartOfUrl) {
                    const dataFromUrl = secondPartOfUrl.split('&');
                    for (let i = 0; i < dataFromUrl.length; i++) {
                        if (dataFromUrl[i].includes('price%5Bfrom%5D')) {
                            dataFromUrl.splice(i, 2);
                        }
                        if (dataFromUrl[i].includes('page') || dataFromUrl[i].includes('limit')) {
                            dataFromUrl.splice(i, 1);
                        }
                    }
                    if (dataFromUrl.length) {
                        filterPartOfUrl = '?price%5Bfrom%5D=' + ui.values[0] + '&price%5Bto%5D=' + ui.values[1] + '&' + dataFromUrl.join('&');
                    } else {
                        filterPartOfUrl = '?price%5Bfrom%5D=' + ui.values[0] + '&price%5Bto%5D=' + ui.values[1];
                    }
                    history.pushState(null, null, filterPartOfUrl);
                    location.reload();
                } else {
                    filterPartOfUrl = '?price%5Bfrom%5D=' + ui.values[0] + '&price%5Bto%5D=' + ui.values[1];
                    history.pushState(null, null, filterPartOfUrl);
                    location.reload();
                }
            },
            slide: function( event, ui ) {
                startValue.html(ui.values[0]);
                finishValue.html(ui.values[1]);
            }
        });
    })

    $('#show-all').on('click', function () {
        const limit = $(this).attr('data-limit');
        const url = window.location.href;
        const secondPartOfUrl = url.split('?')[1];
        let filterPartOfUrl;
        if (secondPartOfUrl) {
            const dataFromUrl = secondPartOfUrl.split('&');
            for (let i = 0; i < dataFromUrl.length; i++) {
                if (dataFromUrl[i].includes('page')) {
                    dataFromUrl.splice(i, 1);
                }
            }
            filterPartOfUrl = '?' + dataFromUrl.join('&') + '&limit=' + limit;
        } else {
            filterPartOfUrl = '?limit=' + limit;
        }
        history.pushState(null, null, filterPartOfUrl)
        location.reload();
    })
});
