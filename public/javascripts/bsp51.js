const w = 1200, h = 600, r = 4.5;
let nodes = [];

const force = d3.forceSimulation()
    .velocityDecay(0.8)
    .alphaDecay(0)
    .force('collision', d3.forceCollide(r+0.5).strength(1));

const svg = d3.select('body').append('svg:svg')
    .attr('width', w)
    .attr('height', h);

force.on('tick', () => svg.selectAll('circle')
    .attr('cx', d => d.x )
    .attr('cy', d => d.y)
);


svg.on('mousemove', (event) => {
    let [x, y] = d3.pointer(event);
    const node = { x, y };

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
            nodes.shift();
            force.nodes(nodes);
        })
        .remove();

    nodes.push(node);
    force.nodes(nodes);
});

window.noForce = function noForce() {
    force.force('charge');
    force.force('x', undefined);
    force.force('y', undefined);
    force.restart();
}

window.repulsion = function repulsion() {
    force.force('charge', d3.forceManyBody().strength(-10));
    force.force('x', undefined);
    force.force('y', undefined);
    force.restart();
}

window.gravity = function gravity() {
    force.force('charge', d3.forceManyBody().strength(1));
    force.force('x', undefined);
    force.force('y', undefined);
    force.restart();
}

window.positionWithGravity = function positionWithGravity() {
    force.force('charge', d3.forceManyBody().strength(0.5));
    force.force('x', d3.forceX(w/2));
    force.force('y', d3.forceY(h/2));
    force.restart();
}

window.positionWithRepulsion = function positionWithRepulsion() {
    force.force('charge', d3.forceManyBody().strength(-20));
    force.force('x', d3.forceX(w/2));
    force.force('y', d3.forceY(h/2));
    force.restart();
}
