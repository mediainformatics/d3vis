const body = d3.select('body');
const duration = 5000;

body.append('div')
    .append('input')
    .attr('type', 'button')
    .attr('class', 'countdown')
    .attr('value', '0')
    .style('width', '150px')
    .transition().duration(duration).ease(d3.easeLinear)
    .style('width', '400px')
    .attr('value', '9');

body.append('div')
    .append('input')
    .attr('type', 'button')
    .attr('class', 'countdown')
    .attr('value', '0')
    .style('width', '150px')
    .transition().duration(duration).ease(d3.easeLinear)
    .styleTween('width', widthTween)
    .attrTween('value', valueTween);

function valueTween() {
    const interpolate = d3.scaleQuantize()
        .domain([0, 1])
        .range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return t => interpolate(t);
}

function widthTween() {
    const interpolate = d3.scaleQuantize()
        .domain([0, 1])
        .range([150, 200, 250, 300, 350, 400]);
    return t => interpolate(t)+'px';
}
