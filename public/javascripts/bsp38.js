import Chart from './chart.js';

class BarChart extends Chart {
    constructor() {
        super(600,300);
    }

    renderXAxis(axesG) {
        const xAxis = d3.axisBottom()
            .scale(this.x.range([0, this.quadrantWidth()]));

        axesG.append('g')
            .attr('class', 'axis')
            .attr('transform', () => 'translate('+this.xStart()+','+this.yStart()+')')
            .call(xAxis);
    }

    renderYAxis(axesG) {
        const yAxis = d3.axisLeft()
            .scale(this.y.range([this.quadrantHeight(), 0]));

        axesG.append('g')
            .attr('class', 'axis')
            .attr('transform', () => 'translate('+this.xStart()+','+this.yEnd()+')')
            .call(yAxis);
    }

    render() {
        const padding = 2;
        this.renderSetup();

        const bars = this.bodyG.selectAll('rect.bar')
            .data(this.data);

        bars.enter()
            .append('rect')
            .merge(bars)
            .attr('class', 'bar')
            .transition()
            .attr('x', d => this.x(d.x) )
            .attr('y', d => this.y(d.y) )
            .attr('height', d => this.yStart() - this.y(d.y) )
            .attr('width', () => Math.floor( this.quadrantWidth()/this.data.length ) - padding);
    }
}

function randomData() {
    return Math.random() * 9;
}


const numberOfDataPoints = 31;

let chart = new BarChart();
chart.x = d3.scaleLinear().domain([-1,32]);
chart.y = d3.scaleLinear().domain([0,10]);
chart.data = d3.range(numberOfDataPoints).map(i => { return { x: i, y: randomData() }; });
chart.render();

window.update = function update() {
    chart.data.forEach(b => b.y = randomData());
    chart.render();
}
