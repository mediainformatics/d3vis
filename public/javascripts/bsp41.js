import Chart from './chart.js';

class StackedAreaChart extends Chart {
    #line

    constructor() {
        super(700, 350);
        this.#line = null;
    }

    get line() {
        return this.#line;
    }

    set line(line) {
        this.#line = line;
    }

    renderLines(series) {
        this.line = d3.line()
            .x( (_d,i) => this.x(i) )
            .y( d => this.y(d[1]) );

        const pathLines = this.bodyG.selectAll('path.line')
            .data(series);

        pathLines.enter()
            .append('path')
            .merge(pathLines)
            .style('stroke', (_d,i) => this.colors(i) )
            .attr('class', 'line')
            .transition()
            .attr('d', d => this.line(d) );
    }

    renderAreas(series) {
        const area = d3.area()
            .x( (_d,i) => this.x(i) )
            .y0( d => this.y(d[0]) )
            .y1( d => this.y(d[1]) );

        const pathAreas = this.bodyG.selectAll('path.area')
            .data(series);

        pathAreas.enter()
            .append('path')
            .merge(pathAreas)
            .style('fill', (_d,i) => this.colors(i) )
            .attr('class', 'area')
            .transition()
            .attr('d', d => area(d) );

    }


    render() {
        this.renderSetup();
        const stack = d3.stack()
            .keys(['value1', 'value2', 'value3'])
            .offset(d3.stackOffsetNone);
        const series = stack(this.data);
        this.renderLines(series);
        this.renderAreas(series);

    }
}

function randomData() {
    return Math.random() * 9;
}

const numberOfDataPoints = 51;

let chart = new StackedAreaChart();
chart.x = d3.scaleLinear().domain([0, numberOfDataPoints-1]);
chart.y = d3.scaleLinear().domain([0,26]);

window.update = function update() {
    chart.data = d3.range(numberOfDataPoints).map( () => {
        return { value1: randomData(), value2: randomData(), value3: randomData() };
    });

    chart.render();
}

update();