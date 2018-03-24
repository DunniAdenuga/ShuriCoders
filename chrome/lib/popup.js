function init() {
	$('.working').hide();

	$('#send-cart').click(function() {
		$('#working').show();

		browser.sendMessage({
			'action': 'send-cart'
		});
	});

	$('#receive-cart').click(function() {
		$('#button-row').hide();
		$('#entry-row').show();
	});

	$('#get-cart').click(function() {
		$('#working-get-cart').show();
		var id = $('#cart-id').val();

		if (id) {
			browser.sendMessage({
				'action': 'receive-cart',
				'id': id
			});
		}
	});

	$('#back').click(function() {
		$('#entry-row').hide();
		$('#button-row').show();
	});

	$('#halp').click(function() {
		chrome.tabs.create({url: "halp.html"});
	});

	function compareItems(allItems, cartItems){
		var results = []
		resultList = ""
		for(i = 0; i < cartItems.length; i++){
			for(j = 0; j < allItems.length; j++){
				if(cartItems[i].asin == allItems[j].asin ){
					results.push(allItems[j])
				}
			}
		}
			/*for(j = 0; j < results.length; j++){
				resultList = "<li>" + results[j] + "</li>";
				document.getElementById("my-cart-id").innerHTML += resultList;
			}*/
			return results
	}

	browser.onMessage(
		function(request, sender, sendResponse) {
			if (request.action == 'my-cart-id') {
				var id = request.id;
				//cartItems = getItems(id);
				var dataSet = compareItems(request.data, request.cart);
				//compareItems(request.data, request.cart);
				var resultList = ""
				for(var j = 0; j < dataSet.length; j++){
					resultList = "<li class=\"list-group-item\">" + dataSet[j].itemName   + "<span class=\"badge badge-success badge-pill\"> " + dataSet[j].carbonFootPrint+ "</span></li>";
					document.getElementById("my-cart-id").innerHTML += resultList;
				}
				//$('#my-cart-id').html(JSON.stringify(dataSet));

				$('#my-row').show();
				$('#working').hide();
			} else if (request.action == 'show-error') {
				$('#error-row').html(request.error).show();
				$('#working').hide();
			}
		});

		browser.sendMessage({'action': 'get-initial'});
}




$(document).ready(function() {
	init();
});
