const height = 500, width = 500, margin = 25;
const xAxisLength = width - 2 * margin;
const yAxisLength = height - 2 * margin;

let xAxis, yAxis;


const svg = d3.select('body').append('svg')
    .attr('class', 'axis')
    .attr('width', width)
    .attr('height', height);

function renderXAxis() {
    const scale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, xAxisLength]);
    xAxis = d3.axisBottom()
        .scale(scale);

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', () => "translate(" + margin + "," + (height - margin) + ")")
        .call(xAxis);
}

function renderXGridLines() {
    d3.selectAll('g.x-axis g.tick')
        .select('line.grid-line')
        .remove();

    d3.selectAll('g.x-axis g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -yAxisLength);
}

function renderYAxis() {
    const scale = d3.scaleLinear()
        .domain([100, 0])
        .range([0, yAxisLength]);
    yAxis = d3.axisLeft()
        .scale(scale);

    svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', () => "translate(" + margin + "," + margin + ")")
        .call(yAxis);
}

function renderYGridLines() {
    d3.selectAll('g.y-axis g.tick')
        .select('line.grid-line')
        .remove();

    d3.selectAll('g.y-axis g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', xAxisLength)
        .attr('y2', 0);
}

function rescale() {
    const max = Math.round(Math.random() * 100);

    xAxis.scale()
        .domain([0, max]);
    svg.select('g.x-axis')
        .transition()
        .call(xAxis);

    yAxis.scale()
        .domain([max, 0]);
    svg.select('g.y-axis')
        .transition()
        .call(yAxis);

    renderXGridLines();
    renderYGridLines();

}

renderYAxis();
renderXAxis();
renderYGridLines();
renderXGridLines();

window.rescale = rescale;