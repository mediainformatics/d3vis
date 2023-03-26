const width = 500,
    height = 500,
    margin = 50,
    x = d3.scaleLinear()
        .domain([0,10])
        .range([margin, width-margin]),
    y = d3.scaleLinear()
        .domain([0,10])
        .range([height-margin, margin]);

const myData = [
    [
        {x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7},
        {x: 3, y: 5}, {x:4, y: 3}, {x:5, y: 5},
        {x: 6, y: 4}, {x: 7, y: 2}, {x: 8, y: 3}, {x: 9, y: 2}
    ],

    d3.range(10).map( i => { return { x: i, y: Math.sin(i) + 5}; } )
];

const line = d3.line()
    .x( d => x(d.x))
    .y( d => y(d.y));

const svgElem = d3.select('body').append('svg');
svgElem.attr('height', height)
    .attr('width', width);

svgElem.selectAll('path.line')
    .data(myData)
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(d) );

renderAxis(svgElem);

function renderAxis(svg) {
    const xAxis = d3.axisBottom()
        .scale(x.range([0, quadrantWidth()]));
    const yAxis = d3.axisLeft()
        .scale(y.range([quadrantHeight(), 0]));

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