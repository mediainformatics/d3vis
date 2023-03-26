const body = d3.select('body');

function teleport(s) {
    s.transition().duration(1000)
        .style('width', '200px')
        .style('height', '1px')
        .transition().duration(500)
        .style('left', '600px')
        .transition().duration(1000)
        .style('left', '800px')
        .style('height', '80px')
        .style('width', '80px');
}

body.append('div')
    .style('position', 'fixed')
    .style('background-color', 'steelblue')
    .style('left', '10px')
    .style('width', '80px')
    .style('height', '80px')
    .call(teleport);
