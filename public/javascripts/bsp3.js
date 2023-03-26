const w = 500;
const h = 250;

const daten = [5, 10, 15, 20, 25];

const svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

const circles = svg.selectAll("circle")
    .data(daten)
    .enter()
    .append('circle');

circles.attr("cx", (_d, i) => { return 25 + 50 * i; })
    .attr("cy", h / 2)
    .attr("r", (d) => { return d; });
