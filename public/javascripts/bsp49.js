const w = 1280, h = 800, r = 4.5;

let nodes = [], links = [];

const force = d3.forceSimulation()
    .velocityDecay(0.8)
    .alphaDecay(0)
    .force('charge', d3.forceManyBody().strength(-50).distanceMax(h/4))
    .force('collision', d3.forceCollide(r +.5).strength(1));

const duration = 10000;

const svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h);

force.on('tick', () => {
    svg.selectAll('circle')
        .attr('cx', d => boundX(d.x) )
        .attr('cy', d => boundY(d.y) );
    svg.selectAll('line')
        .attr('x1', d => boundX( d.source.x) )
        .attr('y1', d => boundY( d.source.y) )
        .attr('x2', d => boundX( d.target.x) )
        .attr('y2', d => boundY( d.target.y) )
});

function boundX(x) {
    return x > (w-r) ? (w-r) : (x > r ? x : r);
}

function boundY(y) {
    return y > (h-r) ? (h-r) : (y > r ? y : r);
}

function offset() {
    return Math.random()*100;
}

function createNodes(x, y) {
    const numberOfNodes = 1 + Math.round(Math.random()*9);
    const newNodes = [];

    for(let i=0; i<numberOfNodes; ++i) {
        newNodes.push( {
            x: x + offset(),
            y: y + offset()
        });
    }
    newNodes.forEach( e => nodes.push(e) );
    return newNodes;
}

function createLinks(nodes) {
    const newLinks = [];
    for(let i=0; i<nodes.length-1; ++i) {
        newLinks.push( { source: nodes[i], target: nodes[i+1] } );
    }
    newLinks.push( { source: nodes[nodes.length-1], target: nodes[0] } );
    newLinks.forEach( e => links.push(e) );
    return newLinks;
}

svg.on('click', (event) => {
    let [x, y] = d3.pointer(event);
    const newNodes = createNodes(x,y);
    const newLinks = createLinks(newNodes);

    newNodes.forEach( node =>
        svg.append('circle')
            .data([node])
            .attr('class', 'node')
            .attr('cx', d => d.x )
            .attr('cy', d => d.y )
            .attr('r', 1e-6)
            .call( d3.drag()
                .on('start', dragStarted)
                .on('drag',  dragged)
                .on('end',   dragEnded))
            .transition()
            .attr('r', 7)
            .transition()
            .delay(duration)
            .attr('r', 1e-6)
            .on('end', () => nodes.shift() )
            .remove()
    );

    newLinks.forEach( link =>
        svg.append('line')
        .data([link])
        .attr('x1', d => d.source.x )
        .attr('y1', d => d.source.y )
        .attr('x2', d => d.target.x )
        .attr('y2', d => d.target.y )
        .transition()
        .duration(duration)
        .style('stroke-opacity', 1e-6)
        .on('end', () => links.shift() )
        .remove()
    );

    force.nodes(nodes);
    force.force('link', d3.forceLink(links).strength(1).distance(20));
    force.restart();
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