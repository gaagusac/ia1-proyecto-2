document.getElementById("csv-upload").addEventListener("click", function() {
    console.log("Upload CSV button clicked");
    document.getElementById("file-input").click();
});

document.getElementById("file-input").addEventListener("change", handleFileSelect);

// Variables to store data
var names = ["clima", "temperatura", "humedad", "viento", "juega"];
var cli = [], tem = [], hum = [], vie = [], jue = [];

function handleFileSelect(event) {
    console.log("File selected");
    const file = event.target.files[0];
    if (!file) {
        console.log("No file selected");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        console.log("File loaded");
        const lines = e.target.result.split("\n").map(line => line.trim()).filter(line => line);

        // Reset the arrays
        cli = [], tem = [], hum = [], vie = [], jue = [];

        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(",");
            if (cols.length === 5) {
                cli.push(cols[0].trim());
                tem.push(cols[1].trim());
                hum.push(cols[2].trim());
                vie.push(cols[3].trim());
                jue.push(cols[4].trim());
            }
        }
        
        console.log("CSV parsed: ", {cli, tem, hum, vie, jue});
        displayTable();
        setDropdowns();
        setEventInputs();
    };
    reader.readAsText(file);
}

// Function to display the data in the table
function displayTable() {
    var table = "<tr>";
    for (const i in names) {
        table += "<th>" + names[i] + "</th>";
    }
    table += "</tr>";

    for (let i = 0; i < cli.length; i++) {
        table += `<tr><td>${cli[i]}</td><td>${tem[i]}</td><td>${hum[i]}</td><td>${vie[i]}</td><td>${jue[i]}</td></tr>`;
    }
    document.getElementById("tabla").innerHTML = table;
}

// Initialize NaiveBayes and insert causes
var naive = new NaiveBayes();
function setDropdowns() {
    naive.insertCause(names[0], cli);
    naive.insertCause(names[1], tem);
    naive.insertCause(names[2], hum);
    naive.insertCause(names[3], vie);
    naive.insertCause(names[4], jue);

    // Populate the effect dropdown
    let drop = "";
    for (const i in names) {
        drop += "<option value=" + names[i] + ">" + names[i] + "</option>";
    }
    document.getElementById("effect_dropdown").innerHTML = drop;
}

// Function to set event input selectors
function setEventInputs() {
    let event_causes = "<table>";
    let causes = naive.causes;

    for (let index = 0; index < causes.length; index++) {
        event_causes += `<tr><td><label id="label_${index + 1}">${causes[index][0]}</label></td>`;
        event_causes += `<td><select name="cause" id="cause${index + 1}_dropdown"><option value="">- - -</option>`;
        let events = Array.from(new Set(causes[index][1]));
        events.forEach(event => {
            event_causes += `<option value="${event}">${event}</option>`;
        });
        event_causes += "</select></td></tr>";
    }
    document.getElementById("events").innerHTML = event_causes;
}

// Predict function
function Predict() {
    var effect = document.getElementById("effect_dropdown").value;
    let my_causes = [];

    for (let index = 0; index < names.length - 1; index++) {
        let id = index + 1;
        let label_text = document.getElementById("label_" + id).innerText;
        if (effect != "") {
            my_causes.push([label_text, document.getElementById("cause" + id + "_dropdown").value]);
        }
    }
   
    var prediction = naive.predict(effect, my_causes);
    document.getElementById("predict_result").innerHTML = prediction[0] + " " + prediction[1];
}
