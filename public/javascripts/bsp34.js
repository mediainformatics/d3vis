const width = 400, height = 400;
const fullAngle = 2*Math.PI;
const colors = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3.select('body').append('svg')
    .classed('pie', true)
    .attr('width', width)
    .attr('height', height);

function render(innerRadius = 0, endAngle = fullAngle) {
    const data = [
        { startAngle: 0,            endAngle: 0.1*endAngle },
        { startAngle: 0.1*endAngle, endAngle: 0.2*endAngle },
        { startAngle: 0.2*endAngle, endAngle: 0.4*endAngle },
        { startAngle: 0.4*endAngle, endAngle: 0.6*endAngle },
        { startAngle: 0.6*endAngle, endAngle: 0.7*endAngle },
        { startAngle: 0.7*endAngle, endAngle: 0.9*endAngle },
        { startAngle: 0.9*endAngle, endAngle: endAngle }
    ];

    const arc = d3.arc().outerRadius(200).innerRadius(innerRadius);

    svg.select('g').remove();
    svg.append('g')
        .attr('transform', 'translate(200, 200)')
        .selectAll('path.arc')
        .data(data)
        .enter()
        .append('path')
        .classed('arc', true)
        .attr('fill', (_d,i) => colors(i))
        .transition().duration(1000)
        .attrTween('d', d => {
            const start = { startAngle: 0, endAngle: 0 };
            const interpolate = d3.interpolate(start, d);
            return t => arc(interpolate(t));
        });
}

window.render = render;

render(100);
