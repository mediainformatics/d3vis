const width = 500,
    height = 500,
    margin = 50,
    duration = 500,
    x = d3.scaleLinear()
        .domain([0,10])
        .range([margin, width-margin]),
    y = d3.scaleLinear()
        .domain([0,1])
        .range([height-margin, margin]);

const data =
    d3.range(10).map( i => { return { x: i, y: (Math.sin(i*3) + 1)/2}; } );



const svg = d3.select('body').append('svg');
svg.attr('height', height)
    .attr('width', width);

renderAxis(svg);
render(1);
window.render = render;


function render(tension) {
    const line = d3.line()
        .curve(d3.curveCardinal.tension(tension))
        .x( d => x(d.x))
        .y( d => y(d.y));

    svg.selectAll('path.line')
        .data([tension])
        .enter()
        .append('path')
        .attr('class', 'line');

    svg.selectAll('path.line')
        .data([tension])
        .transition().duration(duration)
        .ease(d3.easeLinear)
        .attr('d', _d => line(data) );

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 4.5);
}

function renderAxis(svg) {
    const xAxis = d3.axisBottom()
        .scale(d3.scaleLinear().domain([0,10]).range([0, quadrantWidth()]));
    const yAxis = d3.axisLeft()
        .scale(d3.scaleLinear().domain([0,1]).range([quadrantHeight(), 0]));

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', () => 'translate(' + xStart() + ',' + yStart() + ')' )
        .call(xAxis);
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', () => 'translate(' + xStart() + ',' + yEnd() + ')')
        .call(yAxis);
}

function xStart() {
    return margin;
}

function xEnd() {
    return width - margin;
}

function yStart() {
    return height - margin;
}

function yEnd() {
    return margin;
}

function quadrantWidth() {
    return width - 2*margin;
}

function quadrantHeight() {
    return height - 2*margin;
}
