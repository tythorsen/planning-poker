(function(window, undefined) {
	"use strict";

	module("Thorsent Global Functions", {
		setup: function() {
			window.NS = null;
		}
	});

	test("NS object is initially null", function() {
		equal(NS, null);
	});

	test("NS object created using namespace()", function() {
		namespace("NS");
		deepEqual(NS, {});
	});

	test("Nested object created using namespace()", function() {
		namespace("NS.Nested");
		deepEqual(NS.Nested, {});
	});

	test("Nested object creation using namespace() does not overwrite parent properties", function() {
		NS = {
			prop: "val"
		};
		namespace("NS.Nested");
		strictEqual(NS.prop, "val");
	});

})(window);