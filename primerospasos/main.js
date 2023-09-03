const width = 800;
const height = 600;
const margin = {
    top: 10,
    bottom: 40,
    left: 40,
    right: 10
};
const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height);
const elementGroup = svg.append("g").attr("class", "elementGroup").attr("transform", `translate(${margin.left},${0})`);

const x = d3.scaleLinear()
    .range([0, width - margin.left - margin.right]);

d3.csv("data.csv").then(data => {
    data.forEach(d => {
        d.titles = +d.titles;
    });
    
    x.domain([0, d3.max(data, d => d.titles)]);
    
    data.forEach((d, i) => {
        elementGroup.append("circle")
            .attr("cx", x(d.titles))
            .attr("cy", 100)
            .attr("r", d.titles*3)
            .attr("class", d.country);
    });
});