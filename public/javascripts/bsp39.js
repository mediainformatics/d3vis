import Chart from './chart.js';

class ScatterPlot extends Chart {
    #symbolTypes

    constructor() {
        super(500,500);
        this.#symbolTypes = d3.scaleOrdinal()
            .range([
                d3.symbolCircle,
                d3.symbolCross,
                d3.symbolDiamond,
                d3.symbolSquare,
                d3.symbolStar,
                d3.SymbolTriangle,
                d3.symbolWye
            ]);
    }

    get symbolTypes() {
        return this.#symbolTypes;
    }

    render() {
        this.renderSetup();
        this.data.forEach( (list, i) => {
            const symbols = this.bodyG.selectAll('path._'+i)
                .data(list);

            symbols.enter()
                .append('path')
                .merge(symbols)
                .attr('class', 'symbol _'+i)
                .classed(this.symbolTypes(i), true)
                .transition()
                .attr('transform', d => 'translate('+this.x(d.x)+','+this.y(d.y)+')')
                .attr('d', d3.symbol().type(this.symbolTypes(i)));
        });
    }

    addSeries(series) {
        this.data.push(series);
        return this;
    }
}

function randomData() {
    return Math.random() * 9;
}

const numberOfSeries = 5;
const numberOfDataPoints = 11;

let chart = new ScatterPlot();
chart.x = d3.scaleLinear().domain([0,10]);
chart.y = d3.scaleLinear().domain([0,10]);

for (let i = 0; i < numberOfSeries; ++i) {
    chart.addSeries(
        d3.range(numberOfDataPoints).map(
            () => { return { x: randomData(), y: randomData() }; }
        )
    );
}

chart.render();

window.update = function update() {
    chart.data.forEach(series => {
        series.forEach(d => {
            d.x = randomData();
            d.y = randomData();
        });
    });
    chart.render();
}
