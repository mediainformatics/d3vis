const width = 960, height = 500;

const path = d3.geoPath().projection(d3.geoAlbersUsa());

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const g = svg.append('g').call(d3.zoom().scaleExtent([0.25,10]).on('zoom', zoomHandler));

d3.json('/daten/us.json').then( us => {
    g.insert('path')
        .datum(topojson.feature(us, us.objects.land))
        .attr('class', 'land')
        .attr('d', path);

    g.selectAll('path.state')
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append('path')
        .attr('class', 'state')
        .attr('d', path);
});

function zoomHandler(event) {
    const transform = event.transform;

    g.attr('transform', 'translate(' + transform.x + ','
        + transform.y + ') scale(' + transform.k + ')' );
}