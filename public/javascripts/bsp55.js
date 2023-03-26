const width = 300, height = 300;
const translate = [width/2, height/2];

const projections = [
    { name: 'geoAzimuthalEqualArea', fn: d3.geoAzimuthalEqualArea().scale(50).translate(translate) },
    { name: 'geoConicEquidistant', fn: d3.geoConicEquidistant().scale(35).translate(translate) },
    { name: 'geoEquirectangular', fn: d3.geoEquirectangular().scale(50).translate(translate) },
    { name: 'geoMercator', fn: d3.geoMercator().scale(50).translate(translate) },
    { name: 'geoOrthographic', fn: d3.geoOrthographic().scale(90).translate(translate) },
    { name: 'geoStereographic', fn: d3.geoStereographic().scale(35).translate(translate) }
];

d3.json('/daten/world-50m.json').then( world => {
    projections.forEach( projection => {
        const path = d3.geoPath().projection(projection.fn);
        const div = d3.select('body').append('div')
            .attr('class', 'map')
        const svg = div.append('svg').attr('width', width).attr('height', height);

        svg.append('path')
            .datum(topojson.feature(world, world.objects.land))
            .attr('class', 'land')
            .attr('d', path);
        svg.append('path')
            .datum(topojson.mesh(world, world.objects.countries))
            .attr('class', 'boundary')
            .attr('d', path);
        div.append('h3').text(projection.name);
    });
});

