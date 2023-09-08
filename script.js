(() => {
    // mocked data
    const sensors = [
        {
            "name": "SensorDevice-01",
            "temp": [42.1, 29.8, 43.3, 27.9, 44.5, 26.4, 45.2, 25.7],
            "humid": [63, 96, 65, 97, 62, 95, 64, 98],
            "battery": 40
        },
        {
            "name": "SensorDevice-02",
            "temp": [38.7, 31.2, 39.9, 28.5, 41.1, 27.1, 42.3, 26.8],
            "humid": [59, 98, 61, 96, 58, 97, 60, 99],
            "battery": 100
        },
        {
            "name": "SensorDevice-03",
            "temp": [46.0, 26.3, 47.2, 24.9, 48.4, 23.7, 49.1, 23.0],
            "humid": [68, 94, 70, 95, 67, 93, 69, 96],
            "battery": 70
        },
        {
            "name": "SensorDevice-04",
            "temp": [37.5, 32.7, 38.7, 30.3, 39.9, 29.0, 41.1, 28.4],
            "humid": [57, 99, 59, 97, 56, 98, 58, 100],
            "battery": 90
        },
        {
            "name": "SensorDevice-05",
            "temp": [44.8, 27.1, 46.0, 25.7, 47.2, 24.3, 48.4, 23.7],
            "humid": [66, 95, 68, 96, 65, 94, 67, 97],
            "battery": 30
        },
        {
            "name": "SensorDevice-06",
            "temp": [39.2, 31.8, 40.4, 29.4, 41.6, 28.1, 42.8, 27.5],
            "humid": [61, 97, 63, 95, 60, 96, 62, 98],
            "battery": 80
        },
        {
            "name": "SensorDevice-07",
            "temp": [47.1, 25.4, 48.3, 23.9, 49.5, 22.6, 50.2, 21.9],
            "humid": [69, 93, 71, 94, 68, 92, 70, 95],
            "battery": 100
        },
        {
            "name": "SensorDevice-08",
            "temp": [36.4, 33.4, 37.6, 31.9, 38.8, 30.6, 40.0, 30.0],
            "humid": [55, 100, 57, 98, 54, 99, 56, 100],
            "battery": 90
        }
    ]

    // Google Chart loader
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // element selectors
    const totalSensor = document.getElementById("totalSensor");
    const lastTempTable = document.getElementById("lastTempTable");
    const lastHumidTable = document.getElementById("lastHumidTable");
    const batteryDisplay = document.getElementById("batteryDisplay");

    function tableContentGenerator(mode) {
        const tableRows = sensors.map(sensor => `
        <tr>
            <td class='${mode !== 'battery' ? 'tb-50' : 'tb-35 tb-no-border'}'>${mode === "battery" ? "Battery " : ""}${sensor.name}</td>
            ${mode === "battery" ? `<td class='tb-50 tb-no-border'><div class='status-bar-container'><div class='status-bar' style='width: ${sensor.battery}%;'></div></div></td>` : ""}
            <td class='tb-right ${mode !== 'battery' ? '' : 'tb-no-border'}'>${mode === "temp" ? sensor.temp[sensor.temp.length-1] : mode === "humid" ? sensor.humid[sensor.humid.length-1] : mode === "battery" ? sensor.battery : "null"}</td>
        </tr>
        `).join("");

        return tableRows;
    }

    function drawChart(mode, graphName) {
        let currentDate = new Date();
        let data = new google.visualization.DataTable();
        for (let i = 0; i < sensors[0][mode].length; i++) {
            let timeLabel = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
            let row = [timeLabel];
    
            for (let j = 0; j < sensors.length; j++) {
                let val = sensors[j][mode][i];
                row.push(val);
            }
    
            data.addRow(row);
            currentDate.setHours(currentDate.getHours() + 12);
        }

        let options = {
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        let chart = new google.visualization.LineChart(document.getElementById(graphName));
        chart.draw(data, options)
    }
    
    function setup() {
        totalSensor.innerHTML = sensors.length;
        
        lastTempTable.innerHTML = tableContentGenerator("temp");
        lastHumidTable.innerHTML = tableContentGenerator("humid");
        batteryDisplay.innerHTML = tableContentGenerator("battery");

        // plotting time graphs (reuse data due to time limit)
        drawChart("temp", "tempGraph");
        drawChart("humid", "humidGraph");
        drawChart("temp", "soilTempGraph");
        drawChart("humid", "soilHumidGraph");
    }

    setup();
})();