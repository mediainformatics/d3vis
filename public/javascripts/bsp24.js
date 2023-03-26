const data = [ 'Katze', 'Hund', 'Katze', 'Hund', 'Katze', 'Hund'];
const duration = 1500;

d3.select('body').selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'fixed-cell')
    .style('top', (d,i) => 200 + 40*i + 'px')
    .style('background-color', 'steelblue')
    .style('color', 'white')
    .style('left', '500px')
    .text( d => d)
    .transition().duration(duration)
    .style('left', '10px')
    .filter( d => d === 'Katze')
    .transition().duration(duration)
    .style('left', '500px');
