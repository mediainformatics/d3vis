const height = 500,
    width = 500,
    margin = 25,
    offset = 50,
    axisWidth = width - 2*margin;

let svg;

function createSvg() {
    svg = d3.select('body').append('svg')
        .attr('class', 'axis')
        .attr('width', width)
        .attr('height', height);
}

function renderAxis(fn, scale, i) {
    const axis = fn()
        .scale(scale)
        .ticks(5);

    svg.append('g')
        .attr('transform', () => {
            if([d3.axisTop, d3.axisBottom].indexOf(fn) >= 0)
                return "translate(" + margin + "," + i*offset+ ")";
            else
                return "translate(" + i*offset +"," + margin + ")";
        }).call(axis);
}

function renderAll(fn) {
    if(svg) svg.remove();
    createSvg();

    renderAxis(fn, d3.scaleLinear().domain([0,1000]).range([0, axisWidth]), 1);
    renderAxis(fn, d3.scalePow().exponent(2).domain([0,1000]).range([0,axisWidth]), 2);
    renderAxis(fn, d3.scaleTime()
        .domain([new Date(2021,0, 1), new Date(2022, 0, 1)])
        .range([0, axisWidth])    
    , 3);
}

window.renderAll = renderAll;

