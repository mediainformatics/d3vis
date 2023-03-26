const max = 11, myData = [];
for(let i=1; i<max; ++i) myData.push(i);

const linear = d3.scaleLinear()
    .domain([1, 10])
    .range([1, 10]);

const linearCapped = d3.scaleLinear()
    .domain([1, 10])
    .range([1,20]);

const pow = d3.scalePow().exponent(2);

const powCapped = d3.scalePow()
    .exponent(2)
    .domain([1,10])
    .rangeRound([1,10]);

const log = d3.scaleLog();

const logCapped = d3.scaleLog()
    .domain([1,10])
    .rangeRound([1,10]);

function render(data, scale, selector) {
    const ts = Object.prototype.toString;

    if (ts.call(data) !== '[object Array]'
        || ts.call(scale) !== '[object Function]'
        || ts.call(selector) !== '[object String]') {
        throw new Error('Invalid parameters to render');
    }

    d3.select(selector).selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .classed("cell", true)
        .style("display", "inline-block")
        .text( d => d3.format(".2")(scale(d)));
}

function renderAll(data) {
    try {
        render(data, linear, "#linear");
        render(data, linearCapped, "#linear-capped");
        render(data, pow, "#pow");
        render(data, powCapped, "#pow-capped");
        render(data, log, "#log");
        render(data, logCapped, "#log-capped");
    } catch (err) {
        console.log(err)
    }
}

renderAll(myData);
