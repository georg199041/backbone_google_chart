
var Model = Backbone.Model.extend({
	initialize: function(){
		
	}
});

var Collection = Backbone.Collection.extend({
	model: Model
});

var data1 = ['Year', 'Sales', 'Expenses'];
var data2 =	['2004',  1000,      400];
var data3 =	['2005',  1170,      460];
var data4 =	['2006',  660,       1120];
var data5 =	['2007',  1030,      540];

var myCollection = new Collection([ data1, data2, data3, data4, data5]);


var AppRouter = Backbone.Router.extend({
    routes: {
        "*actions": "defaultRoute" 
    }
});

// Initiate the router
var app_router = new AppRouter;
app_router.on('route:defaultRoute', function(actions) {
	
    google.load("visualization", "1", {packages:["corechart"]});
      	google.setOnLoadCallback(drawChart);
		function drawChart() {
			for (var i = 0;i<2;i++) {
				var barLi = document.createElement("li");
				var pieLi = document.createElement("li");
				document.getElementById('list').appendChild(barLi);
				document.getElementById('list').appendChild(pieLi);

				var collection = $.map(myCollection.models, function(k, v) {
				    return [$.map(k.attributes, function(j, b) {
				    	return [j];
				    })]
				});

				var data = google.visualization.arrayToDataTable(collection);

				var chart = new google.visualization.BarChart(barLi);
				chart.draw(data);
				var pieChart = new google.visualization.PieChart(pieLi);
				pieChart.draw(data);
			}
		}
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

MainView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        // Compile the template using underscore
        var template = _.template( $("#base_structure").html(), {} );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    },
    events: {
    	"click li": "alert"
    },
    alert: function( event ) {
    	alert('Click on chart detected');
    }
});

var main_view = new MainView({ el: $("body") });