const bolas = [0, 20, 50, 200, 300]

const width = 500
const height = 300

const svg = d3.select("div#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

const elementGroup = svg.append("g").attr("class", "elementGroup")
    .attr("transform", `translate(${width * 0.1}, ${0})`)

const r = d3.scaleLinear().range([5, 40]).domain(d3.extent(bolas))
const x = d3.scaleLinear().range([0, width * 0.8]).domain([0, bolas.length])

// bolas.forEach((d, i) => {
//     elementGroup.append("circle")
//         .attr("cx", x(i))
//         .attr("cy", 100)
//         .attr("r", r(d))
// })


const elements = elementGroup.selectAll("circle").data(bolas)

elements.enter()
    .append("circle")
        .attr("cx", (d, i) => x(i))
        .attr("cy", 100)
        .attr("r", d => r(d))