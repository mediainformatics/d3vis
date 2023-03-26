const width = 900;
const height = 500;
const r = 50;

const data = [
    [width/2 - r, height/2 - r],
    [width/2 - r, height/2 + r],
    [width/2 + r, height/2 - r],
    [width/2 + r, height/2 + r]
];

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g');

const drag = d3.drag().on('drag', move);

svg.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('r', r)
    .attr('transform', d => 'translate(' + d  + ')')
    .call(drag);

function move(event) {
    const x = event.x;
    const y = event.y;

    if(inBoundaries(x,y)) {
        d3.select(this)
            .attr('transform', () => 'translate(' + x + ',' + y + ')' );
    }
}

function inBoundaries(x, y) {
    return x >= (0+r) && x <= (width-r)
        && y >= (0+r) && y <= (height-r);
}