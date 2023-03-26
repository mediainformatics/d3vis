const r = 4.5;
let nodes = [];

const force = d3.forceSimulation()
    .velocityDecay(0.1)
    .alphaDecay(0)
    .force('collision', d3.forceCollide(r+0.5).strength(1));

const svg = d3.select('body').append('svg:svg');

force.on('tick', () => svg.selectAll('circle')
    .attr('cx', d => d.x )
    .attr('cy', d => d.y)
);

let prevX = 0;
let prevY = 0;

svg.on('mousemove', (event) => {
    let [x, y] = d3.pointer(event);
    const node = {
        x: x,
        y: y,
        vx: x-prevX,
        vy: y-prevY
    };
    prevX = x;
    prevY = y;

    svg.append('svg:circle')
        .data([node])
        .attr('class', 'node')
        .attr('cx', d => d.x )
        .attr('cy', d => d.y )
        .attr('r', 1e-6)
        .transition()
        .attr('r', r)
        .transition()
        .delay(5000)
        .attr('r', 1e-6)
        .on('end', () => {
            node.shift();
            force.nodes(nodes);
        })
        .remove();

    nodes.push(node);
    force.nodes(nodes);
});
