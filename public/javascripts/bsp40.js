import Chart from './chart.js';

class BubbleChart extends Chart {
    #r

    constructor() {
        super(500, 500);
        this.#r = null;
    }

    get r() {
        return this.#r;
    }

    set r(r) {
        this.#r = r;
    }

    renderXAxis(axesG) {
        const xAxis = d3.axisBottom()
            .scale(this.x.range([0, this.quadrantWidth()]));

        axesG.append('g')
            .attr('class', 'x axis')
            .attr('transform', () => 'translate(' + this.xStart() + ',' + this.yStart() + ')')
            .call(xAxis);
    }

    renderYAxis(axesG) {
        const yAxis = d3.axisLeft()
            .scale(this.y.range([this.quadrantHeight(), 0]));

        axesG.append('g')
            .attr('class', 'y axis')
            .attr('transform', () => 'translate(' + this.xStart() + ',' + this.yEnd() + ')')
            .call(yAxis);
    }


    renderBubbles() {
        this.data.forEach( (list, i) => {
            const bubbles = this.bodyG.selectAll('circle._' + i)
                .data(list);

            bubbles.enter()
                .append('circle')
                .merge(bubbles)
                .style('stroke', (_d,j) => this.colors(j) )
                .style('fill',   (_d,j) => this.colors(j) )
                .attr('class', 'bubble _'+i)
                .transition()
                .attr('cx', d => this.x(d.x) )
                .attr('cy', d => this.y(d.y) )
                .attr('r',  d => this.r(d.r) );
        });
    }

    render() {
        this.renderSetup();
        this.r.range([0,50]);
        this.renderBubbles();
    }

    addSeries(series) {
        this.data.push(series);
        return this;
    }
}

function randomData() {
    return Math.random() * 9;
}

const numberOfSeries = 1;
const numberOfDataPoints = 11;

let chart = new BubbleChart();
chart.x = d3.scaleLinear().domain([0,10]);
chart.y = d3.scaleLinear().domain([0,10]);
chart.r = d3.scalePow().exponent(2).domain([0,10]);

for (let i = 0; i < numberOfSeries; ++i) {
    chart.addSeries(
        d3.range(numberOfDataPoints).map(
            () => { return { x: randomData(), y: randomData(), r: randomData() }; }
        )
    );
}

chart.render();

window.update = function update() {
    chart.data.forEach(series => {
        series.forEach(d => {
            d.x = randomData();
            d.y = randomData();
            d.r = randomData();
        });
    });
    chart.render();
}
