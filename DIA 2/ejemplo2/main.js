const width = 800
const height = 600
const margin = {
    top: 10,
    right: 10,
    bottom: 40,
    left: 60,
}

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const axis = svg.append("g").attr("class", "axis")
const xAxisGroup = axis.append("g").attr("class", "xAxisGroup")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axis.append("g").attr("class", "yAxisGroup")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

const elementGroup = svg.append("g").attr("class", "elementGroup")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleLinear().range([0, width - margin.left - margin.right])
const y = d3.scaleBand().range([0, height - margin.top - margin.bottom]).padding(0.1)

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

d3.csv("data.csv").then(data => {
    data.map(d => {
        d.titles = +d.titles
    })

    x.domain([0, d3.max(data.map(d => d.titles))])
    y.domain(data.map(d => d.country))

        
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    // data binding:
    const elements = elementGroup.selectAll("rect").data(data)

    // enter:
    elements.enter()
        .append("rect")
        .attr("class", d => d.country + " bar")
        // .attr("class", d => `${d.country} bar`)
        .attr("x", 0)
        .attr("y", d => y(d.country))
        .attr("width", d => x(d.titles))
        .attr("height", y.bandwidth())


    console.log(data)
})