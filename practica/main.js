var svgWidth = 800; // Ancho de la gráfica
var svgHeight = 400; // Alto de la gráfica

// Crear un contenedor SVG
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Configurar escalas
var xScale = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d.fecha; })) // Dominio de fechas
  .range([0, svgWidth]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.valorCierre; })]) // Dominio de valores de cierre
  .range([svgHeight, 0]);

// Crear la línea
var line = d3.line()
  .x(function(d) { return xScale(d.fecha); })
  .y(function(d) { return yScale(d.valorCierre); });

d3.csv("ibex.csv")
  .then(function(data) {
    data.forEach(function(d) {
      // Parsear la fecha y el valor de cierre
      d.fecha = new Date(d.fecha); // Asegúrate de que la columna de fecha esté en un formato adecuado
      d.valorCierre = +d.valorCierre; // Asegúrate de que la columna de valor de cierre sea numérica
    });

    // Dibujar la línea en el SVG después de cargar los datos
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);

    // Añadir eje x
    svg.append("g")
      .attr("transform", "translate(0," + svgHeight + ")")
      .call(d3.axisBottom(xScale));

    // Añadir eje y
    svg.append("g")
      .call(d3.axisLeft(yScale));
  })
  .catch(function(error) {
    console.log(error);
  });






