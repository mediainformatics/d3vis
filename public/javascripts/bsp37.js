import Chart from './chart.js';

class LineChart extends Chart {
    #line

    constructor() {
        super(600, 250);
        this.#line = null;
    }

    get line() {
        return this.#line;
    }

    set line(line) {
        this.#line = line;
    }

    renderLines() {
        this.line = d3.line()
            .x( d => this.x(d.x) )
            .y( d => this.y(d.y) );

        const pathLines = this.bodyG.selectAll('path.line')
            .data(this.data);

        pathLines.enter()
            .append('path')
            .merge(pathLines)
            .style('stroke', (_d,i) => this.colors(i) )
            .attr('class', 'line')
            .transition()
            .attr('d', d => this.line(d) );
    }

    renderAreas() {
        const area = d3.area()
            .x( d => this.x(d.x) )
            .y0( this.yStart() )
            .y1( d => this.y(d.y) );

        const pathAreas = this.bodyG.selectAll('path.area')
            .data(this.data);

        pathAreas.enter()
            .append('path')
            .merge(pathAreas)
            .style('fill', (_d,i) => this.colors(i) )
            .attr('class', 'area')
            .transition()
            .attr('d', d => area(d) );

    }

    renderDots() {
        this.data.forEach( (list, i) => {
            const circle = this.bodyG.selectAll('circle._' + i)
                .data(list);

            circle.enter()
                .append('circle')
                .merge(circle)
                .style('stroke', () => this.colors(i) )
                .attr('class', 'dot _'+i)
                .transition()
                .attr('cx', d => this.x(d.x) )
                .attr('cy', d => this.y(d.y) )
                .attr('r',4.5);
        });
    }

    render() {
        this.renderSetup();
        this.renderLines();
        this.renderAreas();
        this.renderDots();
    }

    addSeries(series) {
        this.data.push(series);
        return this;
    }
}

function randomData() {
    return Math.random() * 9;
}

const numberOfSeries = 3;
const numberOfDataPoints = 11;




let chart = new LineChart();
chart.x = d3.scaleLinear().domain([0,10]);
chart.y = d3.scaleLinear().domain([0,10]);

for(let i = 0; i < numberOfSeries; ++i) {
    chart.addSeries(
        d3.range(numberOfDataPoints).map(
            j => { return { x: j, y: randomData() }; }
        )
    );
}

chart.render();

window.update = function update() {
    chart.data.forEach(series => {
        series.forEach(d => d.y = randomData());
    });
    chart.render();
}
