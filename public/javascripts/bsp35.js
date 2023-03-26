/**
 * Alternative Klassenrepräsentation mit Closures
 */

function pieChart(w, h) {
    let _chart = {}; // Enthält public Methoden
    let _private = {}; // Enthält private Methoden

    let _width = w, _height = h,
    _data = [],
    _colors = d3.scaleOrdinal(d3.schemeCategory10),
    _svg,
    _bodyG,
    _pieG,
    _radius = 200,
    _innerRadius = 100,
    _duration = 1000;

    _private.renderSlices = function(pie, arc) {
        const slices = _pieG.selectAll('path.arc')
            .data(pie(_data));
        slices.enter()
            .append('path')
            .merge(slices)
            .attr('class', 'arc')
            .attr('fill', (_d,i) => _colors(i))
            .transition()
            .duration(_duration)
            .attrTween('d', function(d) {
                 let currentArc = this._currentArc; // Zuerst: undefined

                 if(!currentArc) {
                     currentArc = { startAngle: 0, endAngle: 0 };
                 }
                 let interpolate = d3.interpolate(currentArc, d);
                 this._currentArc = interpolate(1);
                 return t => arc(interpolate(t));
            });
    }

    _private.renderLabels = function(pie, arc) {
        const labels = _pieG.selectAll('text.label')
            .data(pie(_data));
        labels.enter()
            .append('text')
            .merge(labels)
            .attr('class', 'label')
            .transition()
            .duration(_duration)
            .attr('transform', d => 'translate(' + arc.centroid(d) + ')')
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .text( d => d.data.id);

    }

    _private.renderPie = function() {
        const pie = d3.pie()
            .sort( d => d.id )
            .value( d => d.value );
        const arc = d3.arc()
            .outerRadius(_radius)
            .innerRadius(_innerRadius);

        if(!_pieG) {
            _pieG = _bodyG.append('g')
                .attr('class', 'pie')
                .attr('transform', 'translate(' + _radius +',' + _radius + ')');
        }
        _private.renderSlices(pie, arc);
        _private.renderLabels(pie, arc);
    }

    _private.renderBody = function(svg) {
        if(!_bodyG) {
            _bodyG = svg.append('g').attr('class', 'body');
        }
        _private.renderPie();

    }

    _chart.render = function() {
        if(!_svg) {
            _svg = d3.select('body').append('svg')
                .attr('height', _height)
                .attr('width', _width);
        }
        _private.renderBody(_svg);
    }

    // setter und getter Methoden
    _chart.width = function(width) {
        if(!arguments.length) return _width;
        _width = width;
        return _chart;
    }

    _chart.height = function(height) {
        if(!arguments.length) return _height;
        _height = height;
        return _chart;
    }

    _chart.colors = function(colors) {
        if(!arguments.length) return _colors;
        _colors = colors;
        return _chart;
    }

    _chart.radius = function(radius) {
        if(!arguments.length) return _radius;
        _radius = radius;
        return _chart;
    }

    _chart.innerRadius = function(radius) {
        if(!arguments.length) return _innerRadius;
        _innerRadius = radius;
        return _chart;
    }

    _chart.data = function(dat) {
        if(!arguments.length) return _data;
        _data = dat;
        return _chart;
    }

    return _chart;
}

function randomData() {
    return Math.random()*9 + 1;
}


const numberOfDataPoints = 6;
let data = d3.range(numberOfDataPoints).map(
    i => { return { id: i, value: randomData() };
});

let chart = pieChart(500, 500)
    .radius(200)
    .innerRadius(100)
    .data(data);

chart.render();

function update() {
    data.forEach(d => d.value = randomData());
    chart.render();
}

window.update = update;
