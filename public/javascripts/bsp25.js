const body = d3.select('body');
const duration = 5000;

const div = body.append('div')
    .classed('box', true)
    .style('background-color', 'steelblue')
    .style('color', 'white')
    .text('Warte')
    .transition().duration(duration)
    .delay(2000)
    .on('start', function() {
        d3.select(this).text( (d,i) => 'Übergang');
    })
    .on('end', function() {
        d3.select(this).text( (d,i) => 'Fertig');
    })
    .style('margin-left','600px');
