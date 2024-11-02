# Manual Técnico
## Descripción General

Este manual técnico describe la arquitectura, los componentes, y el funcionamiento del sitio web que actúa como frontend para los algoritmos de Machine Learning proporcionados por Tytus.js. La aplicación permite cargar datasets, seleccionar modelos, configurar parámetros, entrenar, predecir, y visualizar los resultados.

## Estructura del Proyecto

* ```index.html```: Página principal con los componentes HTML para el frontend.
* ```style.css```: Archivo CSS que define el estilo y la presentación del sitio.
* ```script.js```: Código JavaScript que gestiona la lógica de carga de archivos, selección de modelos y parámetros, y la visualización de los resultados.

## Dependencias

* ```Chart.js```: Biblioteca para gráficos interactivos.
* ```Tytus.js```: Biblioteca para implementar algoritmos de Machine Learning.

## Descripción de Funcionalidades en ```script.js```

### Carga de Archivos

```
function loadCSV(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        // Procesa el archivo CSV y extrae datos
    };
    reader.readAsText(file);
}
```
Esta función utiliza FileReader para leer el archivo CSV cargado y extrae los datos que se utilizarán en los modelos.

### Extracción de Datos para Modelos 

```
function getRegressionData() {
    // Extrae XTrain y YTrain para la regresión lineal
}
```

Dependiendo del modelo seleccionado, esta función extrae las columnas necesarias para el entrenamiento.

### Función de Entrenamiento

```
function trainModel() {
    // Llama a las funciones de Tytus.js para entrenar según el modelo seleccionado
}
```

Esta función identifica el modelo y realiza el entrenamiento en consecuencia, enviando los datos extraídos del CSV.

### Función de Predicción y Visualización

```
function drawChart(XTrain, YTrain, predictions) {
    // Utiliza Chart.js para graficar los resultados
}
```

```drawChart``` se encarga de graficar los datos de entrenamiento y las predicciones, permitiendo una mejor visualización de los resultados.


## Consideraciones de Rendimiento

Para optimizar la carga y visualización de datos:

* Utilizar solo las columnas necesarias del CSV.
* Limitar el tamaño del archivo CSV para evitar problemas de rendimiento en el navegador.


# Manual de Usuario

## Introducción

Este manual de usuario describe cómo utilizar el sitio web para cargar datasets, seleccionar y configurar algoritmos de Machine Learning, entrenar modelos, y visualizar los resultados.

## Requisitos

* Navegador web moderno.
* Archivo CSV con los datos que se desea analizar.


## Pasos para Usar el Sitio
1. Cargar Dataset
    * Haz clic en el botón de Seleccionar Archivo y elige un archivo CSV desde tu computadora.

2. Seleccionar Algoritmo

    * Usa el menú desplegable para seleccionar el modelo de Machine Learning que deseas usar (Regresión Lineal, Regresión Polinomial, Árbol de Decisión, etc.).

3. Configurar Parámetros

    * Dependiendo del modelo, selecciona los parámetros de configuración, como el porcentaje de datos de entrenamiento, las columnas de entrada y salida, o el número de clusters.

4. Entrenar el Modelo

    * Haz clic en el botón Entrenamiento. El modelo procesará los datos y se preparará para realizar predicciones.

5. Hacer Predicciones

    * Si el modelo lo permite, haz clic en Predicción para generar valores predictivos basados en el modelo entrenado.

6. Visualizar Resultados

    * El gráfico se mostrará automáticamente en el área de visualización, mostrando los datos de entrenamiento y los valores predichos.

## Descripción de los Modelos

* Regresión Lineal: Modelo para predecir valores continuos.
* Regresión Polinomial: Proporciona una curva de mejor ajuste para datos no lineales.
* Árbol de Decisión: Clasifica los datos basándose en una estructura de árbol.
* K-Means: Agrupación de datos en clusters.
* Naive Bayes y Red Neuronal: Otros modelos para clasificación y comparación.

## Resolución de Problemas Comunes

* Archivo CSV no se carga: Verifica que el archivo sea un CSV válido y tenga formato adecuado.
* Error en el entrenamiento o predicción: Revisa los parámetros y asegúrate de que los valores coincidan con el modelo seleccionado.