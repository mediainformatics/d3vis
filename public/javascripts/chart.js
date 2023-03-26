export default class Chart {
    #width
    #height
    #margins
    #x
    #y
    #data
    #colors
    #svg
    #bodyG

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
        this.#margins = {top: 30, left:30, right: 30, bottom: 30};
        this.#x = null;
        this.#y = null;
        this.#data = [];
        this.#colors = d3.scaleOrdinal(d3.schemeCategory10);
        this.#svg = null;
        this.#bodyG = null;
    }

    renderXAxis(axesG) {
        const xAxis = d3.axisBottom()
            .scale(this.x.range([0, this.quadrantWidth()]));

        axesG.append('g')
            .attr('class', 'x axis')
            .attr('transform', () => 'translate(' + this.xStart() + ',' + this.yStart() + ')')
            .call(xAxis);
        d3.selectAll('g.x g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -this.quadrantHeight());
    }

    renderYAxis(axesG) {
        const yAxis = d3.axisLeft()
            .scale(this.y.range([this.quadrantHeight(), 0]));

        axesG.append('g')
            .attr('class', 'y axis')
            .attr('transform', () => 'translate(' + this.xStart() + ',' + this.yEnd() + ')')
            .call(yAxis);

        d3.selectAll('g.y g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', this.quadrantWidth())
            .attr('y2', 0);
    }

    renderAxes(svg) {
        const axesG = svg.append('g').attr('class', 'axes');
        this.renderXAxis(axesG);
        this.renderYAxis(axesG);
    }

    defineBodyClip(svg) {
        const padding = 5;

        svg.append('clipPath')
            .attr('id', 'body-clip')
            .append('rect')
            .attr('x', 0 - padding)
            .attr('y', 0)
            .attr('width', this.quadrantWidth() + 2*padding)
            .attr('height', this.quadrantHeight());
    }

    renderSetup() {
        if (!this.svg) {
            this.svg = d3.select('body').append('svg')
                .attr('height', this.height)
                .attr('width', this.width);
            this.renderAxes(this.svg);
            this.defineBodyClip(this.svg);

            if (!this.bodyG) {
                this.bodyG = this.svg.append('g')
                    .attr('class', 'body')
                    .attr('transform', 'translate('
                        + this.xStart() + ',' + this.yEnd() + ')')
                    .attr('clip-path', 'url(#body-clip)');
            }
        }
        return this.svg;
    }

    xStart() {
        return this.margins.left;
    }

    yStart() {
        return this.height - this.margins.bottom;
    }

    xEnd() {
        return this.width - this.margins.right;
    }

    yEnd() {
        return this.margins.top;
    }

    quadrantWidth() {
        return this.width - this.margins.left - this.margins.right;
    }

    quadrantHeight() {
        return this.height - this.margins.top - this.margins.bottom;
    }

    get width() {
        return this.#width;
    }

    set width(w) {
        this.#width = w;
    }

    get height() {
        return this.#height;
    }

    set height(h) {
        this.#height = h;
    }

    get margins() {
        return this.#margins;
    }

    set margins(m) {
        this.#margins = m;
    }

    get colors() {
        return this.#colors;
    }

    set colors(c) {
        this.#colors = c;
    }

    get x() {
        return this.#x;
    }

    set x(x) {
        this.#x = x;
    }

    get y() {
        return this.#y;
    }

    set y(y) {
        this.#y = y;
    }

    get data() {
        return this.#data;
    }

    set data(d) {
        this.#data = d;
    }

    get bodyG() {
        return this.#bodyG;
    }

    set bodyG(bg) {
        this.#bodyG = bg;
    }

    get svg() {
        return this.#svg;
    }

    set svg(s) {
        this.#svg = s;
    }
}