const w = 1200, h = 600, r = 4.5;
const forceStrength = 1;
const forceDistance = 20;

const colors = d3.scaleOrdinal(d3.schemeSet3);

const force = d3.forceSimulation()
    .velocityDecay(0.8)
    .alphaDecay(0)
    .force('charge', d3.forceManyBody())
    .force('x', d3.forceX(w/2))
    .force('y', d3.forceY(h/2));

const svg = d3.select('body').append('svg')
    .attr('height', h)
    .attr('width', w);

d3.json('/daten/flare.json').then( data => {
    const root = d3.hierarchy(data);
    const nodes = root.descendants();
    const links = root.links();

    force.nodes(nodes);
    force.force('link', d3.forceLink(links).strength(forceStrength).distance(forceDistance));

    const link = svg.selectAll('line')
        .data(links)
        .enter().insert('line')
        .style('stroke', '#999')
        .style('stroke-width', '1px');

    const nodeElements = svg.selectAll('circle.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', r)
        .style('fill', d => colors(d.parent && d.parent.data.name))
        .style('stroke', '#000')
        .call( d3.drag()
            .on('start', dragStarted)
            .on('drag',  dragged)
            .on('end',   dragEnded));
    force.on('tick', () => {
        link.attr('x1', d => d.source.x )
            .attr('y1', d => d.source.y )
            .attr('x2', d => d.target.x )
            .attr('y2', d => d.target.y );
        nodeElements.attr('cx', d => d.x )
            .attr('cy', d => d.y);
    });
});

function dragStarted(_event, d) {
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(_event, d) {
    d.fx = null;
    d.fy = null;
}
