function GetInfo() {
    var newName= document.getElementById("cityInput");
    var cityName= document.getElementById("cityName");
    cityName.innerHTML="Forecast in "+newName.value;
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value +'&appid=af6b5e2f0fb1e4008717f75d7b39bb64')
    .then(response=> response.json())
    .then(data=>{
        let minTemps =[];
        let maxTemps =[];
        for (let i=0;i<7;i++) {
            let tempMin=Number(data.list[i].main.temp_min-273.15).toFixed(1);
            let tempMax=Number(data.list[i].main.temp_max-273.15).toFixed(2);
            minTemps.push(tempMin);
            maxTemps.push(tempMax);
            document.getElementById("day"+(i+1)+"Min").innerHTML="Min:"+tempMin+"°";
            document.getElementById("day"+(i+1)+"Max").innerHTML="Max:"+tempMax+"°";
            document.getElementById("img"+(i+1)).src="https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
        }
        barChart(minTemps,maxTemps);
        console.log(data);
    })
    .catch(err=>alert("Something Went Wrong, Try Checking Your Internet Connection"));
}
function DefaultScreen(){
    document.getElementById("cityInput").defaultValue="delhi";
    GetInfo();
}
const d=new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function CheckDay(day) {
    if (day+d.getDay()>6) {
        return day+d.getDay()-7;
    } else {
        return day+d.getDay();
    }
}

for (let i=0;i<7;i++){
    document.getElementById("day"+(i+1)).innerHTML=weekday[CheckDay(i)];
}
function barChart(minTemps,maxTemps) {
    const xVal=weekday.slice(d.getDay(),d.getDay()+7).concat(weekday.slice(0,(d.getDay()+7)%7));
    const barColours=["blue","red","green","orange","yellow","indigo","grey"];
    new Chart("myChart",{
        type:"bar",
        data:{
            labels:xVal,
            datasets:[
                {
                    label:'Min Temp(°C)',
                    backgroundColor:'skyblue',
                    data:minTemps
                },
                {
                    label:'Max Temp(°C)',
                    backgroundColor:'red',
                    data:maxTemps
                }
            ]
        },
        options:{
            legend:{display:true},
            title:{
                display:true,
                text:"Temperature Forecast"
            },
            scales:{
                yAxes:[{
                    ticks:{
                        beginAtZero:true,
                        
                    }
                }]
            }
        }
    });
}
DefaultScreen();
