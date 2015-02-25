(function(window, undefined) {
  "use-strict";

	var Thorsent_PlanningPoker = namespace("Thorsent.PlanningPoker");
	extend(Thorsent_PlanningPoker, {
		Decks: [
	    {
	      name: "Mountain Goat",
	      cards: [
	        {
	          text: "0",
	          val: 0
	        },
	        {
	          text: "1/2",
	          val: 0.5
	        },
	        {
	          text: "1",
	          val: 1
	        },
	        {
	          text: "2",
	          val: 2
	        },
	        {
	          text: "3",
	          val: 3
	        },
	        {
	          text: "5",
	          val: 5
	        },
	        {
	          text: "8",
	          val: 8
	        },
	        {
	          text: "13",
	          val: 13
	        },
	        {
	          text: "20",
	          val: 20
	        },
	        {
	          text: "40",
	          val: 40
	        },
	        {
	          text: "100",
	          val: 100
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "Fibonacci",
	      cards: [
	        {
	          text: "0",
	          val: 0
	        },
	        {
	          text: "1",
	          val: 1
	        },
	        {
	          text: "2",
	          val: 2
	        },
	        {
	          text: "3",
	          val: 3
	        },
	        {
	          text: "5",
	          val: 5
	        },
	        {
	          text: "8",
	          val: 8
	        },
	        {
	          text: "13",
	          val: 13
	        },
	        {
	          text: "21",
	          val: 21
	        },
	        {
	          text: "34",
	          val: 34
	        },
	        {
	          text: "55",
	          val: 55
	        },
	        {
	          text: "89",
	          val: 89
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "Sequential",
	      cards: [
	        {
	          text: "0",
	          val: 0
	        },
	        {
	          text: "1",
	          val: 1
	        },
	        {
	          text: "2",
	          val: 2
	        },
	        {
	          text: "3",
	          val: 3
	        },
	        {
	          text: "4",
	          val: 4
	        },
	        {
	          text: "5",
	          val: 5
	        },
	        {
	          text: "6",
	          val: 6
	        },
	        {
	          text: "7",
	          val: 7
	        },
	        {
	          text: "8",
	          val: 8
	        },
	        {
	          text: "9",
	          val: 9
	        },
	        {
	          text: "10",
	          val: 10
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "T-Shirt",
	      cards: [
	        {
	          text: "XS",
	          val: 1
	        },
	        {
	          text: "S",
	          val: 2
	        },
	        {
	          text: "M",
	          val: 3
	        },
	        {
	          text: "L",
	          val: 4
	        },
	        {
	          text: "XL",
	          val: 5
	        },
	        {
	          text: "?",
	          val: -1
	        },
	        {
	          text: "coffee",
	          val: -2,
	          fa: "coffee"
	        }
	      ]
	    },
	    {
	      name: "Charities",
	      type: "nominal",
	      cards: [
	        {
	          text: "MN Armed Forces",
	          val: 1
	        },
	        {
	          text: "Humane Society",
	          val: 2
	        },
	        {
	          text: "Pride in Living",
	          val: 3
	        },
	        {
	          text: "Second Harvest",
	          val: 4
	        },
	        {
	          text: "Conservation MN",
	          val: 5
	        },
	        {
	          text: "Leonardo's Basement",
	          val: 6
	        }
	      ]
	    }
	  ]
	});
 })(window);