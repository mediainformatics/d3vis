const height = 500,
    width = 500,
    margin = 25,
    axisWidth = width - 2*margin;

const svg = d3.select('body').append('svg')
    .attr('class', 'axis')
    .attr('width', width)
    .attr('height', height);

const scale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, axisWidth]);

const axis = d3.axisBottom()
    .scale(scale)
    .ticks(10)
    .tickSize(8)
    .tickPadding(10)
    .tickFormat(d3.format(".0%"));

svg.append('g')
    .attr('transform', () => "translate(" + margin + "," + margin + ")" )
    .call(axis);