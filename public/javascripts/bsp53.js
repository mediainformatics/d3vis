
const width = 960, height = 500;

const color = d3.scaleThreshold()
    .domain([0.02, 0.04, 0.06, 0.08, 0.1])
    .range(['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f']);

const projection = d3.geoAlbersUsa();

const path = d3.geoPath().projection(projection);

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const g = svg.append('g')
    .call(d3.zoom().scaleExtent([1,10]).on('zoom', zoomHandler));

d3.json('/daten/us.json').then( us => {
    d3.tsv('/daten/unemployment.tsv').then( unemployment => {
        let rateById = {};
        unemployment.forEach( d => rateById[d.id] = +d.rate );

        g.append('g')
            .attr('class', 'counties')
            .selectAll('path')
            .data(topojson.feature(us, us.objects.counties).features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('fill', d => color(rateById[d.id]) );
        g.append('path')
            .datum(topojson.mesh(us, us.objects.states, (a,b) => a !== b ))
            .attr('class', 'states')
            .attr('d', path);
    });
});

function zoomHandler(event) {
    const transform = event.transform;

    g.attr('transform', 'translate(' + transform.x + ','
        + transform.y + ') scale(' + transform.k + ')' );
}