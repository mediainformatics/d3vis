function simpleShape() {
    const width = 600, height = 500;

    const svg = d3.select('body').append('svg')
        .attr('height', height)
        .attr('width', width)
        ;

    svg.append('line')
        .attr('x1', 0)
        .attr('y1', 200)
        .attr('x2', 100)
        .attr('y2', 100)
        ;

    svg.append('circle')
        .attr('cx', 200)
        .attr('cy', 150)
        .attr('r', 50)
        ;

    svg.append('rect')
        .attr('x', 300)
        .attr('y', 100)
        .attr('width', 100)
        .attr('height', 100)
        .attr('rx', 5)
        ;

    svg.append('polygon')
        .attr('points', '450,200 500,100 550,200')
        ;
}

simpleShape();