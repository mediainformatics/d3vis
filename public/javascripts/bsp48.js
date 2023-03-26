const width = 900;
const height = 500;
const r = 50;

const data = [
    [width/2 - r, height/2 - r],
    [width/2 - r, height/2 + r],
    [width/2 + r, height/2 - r],
    [width/2 + r, height/2 + r]
];


const zoom = d3.zoom()
    .scaleExtent([0.1, 10])
    .on('zoom', zoomHandler)
    ;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black')
    .call(zoom)
    .append('g')
    ;

svg.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('r', r)
    .attr('transform', d => 'translate(' + d + ')')
    ;

function zoomHandler(event) {
    const transform = event.transform;

    svg.attr('transform', 'translate(' +
        transform.x + ',' + transform.y + ')'
        + ' scale(' + transform.k + ')'
    );
}
