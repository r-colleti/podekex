var xmlhttp = new XMLHttpRequest(); 
var url = '../challenge-expenses-chart-component-main/data.json';
xmlhttp.open('GET',url,true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);

        day = data.infojson.map(function(el){
            return el.day;
        })

        amount = data.infojson.map(function(el){
            return el.amount;
        })

        var arrValues = [];

        data.infojson.map(function(el){
            arrValues.push(Number(el.amount))
        })

        var maxValue = Math.max.apply(null, arrValues);

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: day,
                datasets: [{
                    label: '# of Votes',
                    data: amount,
                    backgroundColor: (el)=>{
                        if (Number(el.raw) === maxValue) {
                            return 'hsl(186, 34%, 60%)';
                        } else {
                            return 'hsl(10, 79%, 65%)';
                        }
                    },
                    hoverBackgroundColor: (el)=>{
                        if (Number(el.raw) === maxValue) {
                            return 'hsl(187, 49%, 80%)';
                        } else {
                            return 'hsl(10, 100%, 76%)';
                        }
                    },
                    borderWidth: 0,
                    borderRadius: 5
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        xAlign: 'center',
                        backgroundColor: 'hsl(25, 47%, 15%)',
                        callbacks: {
                            title: function(tooltipItem) {
                                return '$'+tooltipItem[0].formattedValue;
                            },
                            label: function() {
                                return null;
                            },
                            body: function() {
                                return null;
                            },
                            footer: function() {
                                return null;
                            },
                        },
                        padding: 10,
                        yAlign: 'bottom',
                        caretSize: 0,
                        caretPadding: 10,
                    }
                }
            }
        });
    }
}