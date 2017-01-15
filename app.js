(function() {

	function LineItem(item) {
		this.name = item.name;
		this.quantity = item.quantity;
		this.price = item.price;

		this.totalLinePrice = ko.computed(function () {
			return this.price * this.quantity;
		}, this);

		this.removeItem = function () {
			viewModel.lineItems.remove(this);
		};
	}

	viewModel = {
		name: ko.observable(),
		quantity: ko.observable(),
		price: ko.observable(),
		lineItems: ko.observableArray([]),
	}

	viewModel.addItem = function() {
		var item = new LineItem({ name: this.name(), quantity: this.quantity(), price: this.price() })
		this.lineItems.push(item);
	}

	viewModel.basketTotal = ko.computed(function () {
		var total = 0;

		ko.utils.arrayForEach(this.lineItems(), function(lineItem) {
			total += lineItem.totalLinePrice();
		});

		return total;

	}, viewModel);

	ko.applyBindings(viewModel);
})();
