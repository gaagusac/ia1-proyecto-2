
// Cargar archivo CSV
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = () => {
            const csvData = reader.result;
            console.log("CSV Data:", csvData); // Aquí puedes procesar el CSV con Tytus.js
        };
        reader.readAsText(file);
    } else {
        alert("Por favor, sube un archivo CSV.");
    }
}

document.getElementById('algorithmSelect').addEventListener('change', updateParameters);

function updateParameters() {
    const algorithm = document.getElementById('algorithmSelect').value;
    const paramsContainer = document.getElementById('modelSpecificParameters');
    paramsContainer.innerHTML = ""; // Limpiar parámetros previos

    switch (algorithm) {
        case 'linearRegression':
            paramsContainer.innerHTML = `
                <label for="XTrain">XTrain (Lista de valores numéricos):</label>
                <input type="text" id="XTrain" placeholder="Ej. 1, 2, 3">
                <label for="YTrain">YTrain (Lista de valores numéricos):</label>
                <input type="text" id="YTrain" placeholder="Ej. 2, 4, 6">
            `;
            break;

        case 'polynomialRegression':
            paramsContainer.innerHTML = `
                <label for="XTrain">XTrain (Lista de valores numéricos):</label>
                <input type="text" id="XTrain" placeholder="Ej. 1, 2, 3">
                <label for="YTrain">YTrain (Lista de valores numéricos):</label>
                <input type="text" id="YTrain" placeholder="Ej. 2, 4, 6">
                <label for="XToPredict">XToPredict (Lista de valores para predecir):</label>
                <input type="text" id="XToPredict" placeholder="Ej. 4, 5">
            `;
            break;

        case 'decisionTree':
            paramsContainer.innerHTML = `
                <label for="parameters">Parámetros (Lista de nombres):</label>
                <input type="text" id="parameters" placeholder="Ej. Tiempo, Clima">
                <label for="trainingData">Entrenamiento (Matriz):</label>
                <textarea id="trainingData" placeholder="Ej. [[Soleado, Calor], [Lluvia, Frío]]"></textarea>
                <label for="predictData">Datos para Predecir (Lista):</label>
                <input type="text" id="predictData" placeholder="Ej. [Nublado, Templado]">
            `;
            break;

        case 'naiveBayes':
            paramsContainer.innerHTML = `
                <label for="values">Valores (Matriz de porcentajes):</label>
                <textarea id="values" placeholder="Ej. [[80, 20], [60, 40]]"></textarea>
                <label for="desiredValues">Valores Deseados (Lista):</label>
                <input type="text" id="desiredValues" placeholder="Ej. 70, 30">
            `;
            window.open("./bayes.html", "_blank").focus();
            break;

        case 'neuralNetwork':
            paramsContainer.innerHTML = `
                <label for="num1">Num1:</label>
                <input type="number" id="num1" placeholder="Ej. 10">
                <label for="num2">Num2:</label>
                <input type="number" id="num2" placeholder="Ej. 20">
            `;
            break;

        case 'kMeans':
            paramsContainer.innerHTML = `
                <label for="numClusters">Número de Clusters:</label>
                <input type="number" id="numClusters" min="1" value="3">
                <label for="trainingData">Entrenamiento (Matriz 2x2 o Lineal):</label>
                <textarea id="trainingData" placeholder="Ej. [[1, 2], [3, 4]] o 1,2,3"></textarea>
                <label for="numIterations">Número de Iteraciones:</label>
                <input type="number" id="numIterations" min="1" value="10">
            `;
            break;

        case 'kNearestNeighbors':
            paramsContainer.innerHTML = `
                <label for="trainingData">Entrenamiento (Matriz de valores):</label>
                <textarea id="trainingData" placeholder="Ej. [[1, 2, 3], [4, 5, 6]]"></textarea>
                <label for="point">Punto (Lista de valores):</label>
                <input type="text" id="point" placeholder="Ej. [7, 8, 9]">
                <label for="euclidean">Euclidiano:</label>
                <input type="number" id="euclidean" placeholder="Ej. 5">
                <label for="manhattan">Manhattan (Lista de 2 valores):</label>
                <input type="text" id="manhattan" placeholder="Ej. 3,4">
            `;
            break;
            
        default:
            break;
    }
}

// Funciones para entrenar y predecir con cada modelo (solo una plantilla, añadirás los métodos de Tytus.js)

// Evento para botón de entrenamiento
document.getElementById('trainBtn').addEventListener('click', trainModel);

function trainModel() {
    const algorithm = document.getElementById('algorithmSelect').value;
    
    switch (algorithm) {
        case 'linearRegression':
            const { XTrain, YTrain } = getRegressionData();
            let linear = new LinearRegression();
            // Llamada a la función de entrenamiento en Tytus.js para regresión lineal
            linear.fit({ XTrain, YTrain });

            alert("Modelo entrenado");
            break;

        // Otros modelos...

        default:
            console.error("Modelo no seleccionado o no válido.");
            break;
    }
}

// Evento para botón de predicción
document.getElementById('predictBtn').addEventListener('click', predictModel);

function predictModel() {
    const algorithm = document.getElementById('algorithmSelect').value;

    switch (algorithm) {
        case 'linearRegression':
            const { XTrain, YTrain } = getRegressionData();
            let linear = new LinearRegression();
            linear.fit(XTrain, YTrain);
            let yPredict = linear.predict(XTrain);
            console.log(">>>", yPredict);
            drawChart(XTrain, YTrain, yPredict);
            break;

        // Otros modelos...

        default:
            console.error("Modelo no seleccionado o no válido.");
            break;
    }

    // displayPrediction(prediction);
}


let dataset = [];

// Función para cargar el archivo CSV
function loadCSV(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n').map(row => row.split(','));
        dataset = rows.map(row => row.map(cell => cell.trim()));
        const XTrain = dataset.map(row => parseFloat(row[0])).filter(val => !isNaN(val));
        const YTrain = dataset.map(row => parseFloat(row[1])).filter(val => !isNaN(val));
        const xtText = document.getElementById("XTrain");
        const ytText = document.getElementById("YTrain");
        xtText.value = XTrain;
        ytText.value = YTrain;
        console.log("Datos cargados:", dataset);
    };
    reader.readAsText(file);
}

// Evento para el selector de archivo
document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        loadCSV(file);
    }
});

// Función para obtener XTrain y YTrain para regresión lineal
function getRegressionData() {
    const xIndex = 0; // Índice de la columna X
    const yIndex = 1; // Índice de la columna Y
    const XTrain = dataset.map(row => parseFloat(row[xIndex])).filter(val => !isNaN(val));
    const YTrain = dataset.map(row => parseFloat(row[yIndex])).filter(val => !isNaN(val));
    return { XTrain, YTrain };
}

function drawChart(XTrain, YTrain, predictions) {
    const ctx = document.getElementById('chart').getContext('2d');
    
    const data = {
        labels: XTrain,
        datasets: [
            {
                label: 'Datos de Entrenamiento',
                data: YTrain,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                fill: false,
                pointRadius: 5,
            },
            {
                label: 'Predicciones',
                data: predictions,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: false,
                pointRadius: 5,
            },
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X Values'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y Values'
                    }
                }
            }
        }
    };

    const resultChart = new Chart(ctx, config);
}

