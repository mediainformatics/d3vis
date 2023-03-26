
const r = 400;

const svg = d3.select('body')
    .append('svg')
    .attr('width', 1800)
    .attr('height', 800)
    ;

const positionLabel = svg.append('text')
    .attr('x', 10)
    .attr('y', 30);

svg.on('mousemove', (event) => {
    let [x, y] = d3.pointer(event);
    positionLabel.text( Math.round(x) + ', ' + Math.round(y) ) ;
});

svg.on('click', (event) => {
    let [x,y] = d3.pointer(event);
    for(let i=1; i<5; ++i) {
        svg.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 0)
            .style('stoke-width', 5 / (i))

            .transition()
            .delay(Math.pow(i, 2.5) * 50)
            .duration(2000)
            .ease(d3.easeQuadIn)
            .attr('r', r)
            .style('stroke-opacity', 0)

            .on('end', () => d3.select(this).remove())
            ;
    }
});
