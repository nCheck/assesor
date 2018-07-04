var jsonfile = {
   "jsonarray": [{
      "planet": "Nehhal",
      "gravity": 10
   }, {
      "planet": "Shreya",
      "gravity": 14
   }]
};

var labels = jsonfile.jsonarray.map(function(e) {
   return e.planet;
});
var data = jsonfile.jsonarray.map(function(e) {
   return e.gravity;
});;

var chartOptions = {
  scales: {
    xAxes: [{
      barPercentage: 1,
      categoryPercentage: 0.6
    }],
 //    yAxes: [{
 //      id: "y-axis-density"
 //    },
 // //    ticks: {
 // //   beginAtZero: true;
 // // }
 //    {
 //    id: "y-axis-gravity"
 //    }]
 yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
  }
};
var ctx = canvas.getContext('2d');
var config = {
   type: 'polarArea',
  options:chartOptions,
   data: {
      labels: labels,
      datasets: [{
         label: 'Graph Line',
         data: data,
         backgroundColor: 'rgba(0, 119, 204, 0.3)',
           borderColor: 'rgba(0, 99, 132, 1)'
      }]
   }
};
var chart = new Chart(ctx, config);
