const height = 500, width = 500, margin = 25;

const svg = d3.select('body').append('svg')
    .attr('class', 'axis')
    .attr('width', width)
    .attr('height', height);

function renderXAxis() {
    const axisLength = width - 2*margin;

    const scale = d3.scaleLinear().domain([0,100]).range([0, axisLength]);
    const xAxis = d3.axisBottom().scale(scale);

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', () => "translate(" + margin + "," + (height-margin) + ")" )
        .call(xAxis);

    d3.selectAll('g.x-axis g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -(height-2*margin));
}

function renderYAxis() {
    const axisLength = height - 2*margin;

    const scale = d3.scaleLinear().domain([0,100]).range([axisLength,0]);
    const yAxis = d3.axisLeft().scale(scale);

    svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', () => "translate(" + margin + "," + margin + ")" )
        .call(yAxis);

    d3.selectAll('g.y-axis g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', axisLength)
        .attr('y2', 0);
}

renderYAxis();
renderXAxis();