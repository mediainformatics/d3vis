class TreemapChart {
    #width
    #height
    #svg
    #valueAccessor
    #nodes
    #bodyG
    #colors
    #treemap

    constructor(w, h) {
        this.#width = w;
        this.#height = h;
        this.#svg = undefined;
        this.#valueAccessor = undefined;
        this.#nodes = undefined;
        this.#bodyG = undefined;
        this.#colors = d3.scaleOrdinal(d3.schemeSet3);
        this.#treemap = undefined;
    }

    set width(w) {
        this.#width = w;
    }

    get width() {
        return this.#width;
    }

    set height(h) {
        this.#height = h;
    }

    get height() {
        return this.#height;
    }

    set nodes(n) {
        this.#nodes = n;
    }

    get nodes() {
        return this.#nodes;
    }

    set valueAccessor(fn) {
        this.#valueAccessor = fn;
    }

    get valueAccessor() {
        return this.#valueAccessor;
    }

    set bodyG(bg) {
        this.#bodyG = bg;
    }

    get bodyG() {
        return this.#bodyG;
    }

    set svg(svg) {
        this.#svg = svg;
    }

    get svg() {
        return this.#svg;
    }

    set treemap(tm) {
        this.#treemap = tm;
    }

    get treemap() {
        return this.#treemap;
    }

    set colors(c) {
        this.#colors = c;
    }

    get colors() {
        return this.#colors;
    }

    renderLabels(cellEnter, cells) {
        cellEnter.append('text');
        cellEnter.merge(cells)
            .select('text')
            .style('font-size', 11)
            .attr('x', d => (d.x1 - d.x0)/2)
            .attr('y', d => (d.y1 - d.y0)/2)
            .attr('text-anchor', 'middle')
            .text( d => d.data.name )
            .style('opacity',  function(d) {
                d.w = this.getComputedTextLength();
                return d.w < (d.x1-d.x0) ? 1 : 0;
            });
    }

    renderBodyG(svg) {
        if(!this.bodyG) {
            this.bodyG = svg.append('g').attr('class', 'body');

            this.treemap = d3.treemap()
                .size([this.width, this.height])
                .round(true)
                .padding(1);
        }

        const root = d3.hierarchy(this.nodes)
            .sum(this.valueAccessor)
            .sort( (a,b) => b.value - a.value );

        this.treemap(root);

        const cells = this.bodyG.selectAll('g')
            .data(root.leaves(), d => d.data.name );
        this.renderCells(cells);
    }

    render() {
        if(!this.svg) {
            this.svg = d3.select('body').append('svg')
                .attr('width', this.width)
                .attr('height', this.height);
        }
        this.renderBodyG(this.svg);
    }

    renderCells(cells) {
        const cellEnter = cells.enter().append('g')
            .merge(cells)
            .attr('class', 'cell')
            .attr('transform', d => 'translate('+d.x0+','+d.y0+')');
        this.renderRect(cellEnter, cells);
        this.renderLabels(cellEnter, cells);

        cells.exit().remove();
    }

    renderRect(cellEnter, cells) {
        cellEnter.append('rect');
        cellEnter.merge(cells)
            .transition()
            .select('rect')
            .attr('width', d => d.x1 - d.x0 )
            .attr('height', d => d.y1 - d.y0 )
            .style('fill', d => this.colors(d.parent.data.name) );
    }
}

function size(d) {
    return d.size;
}

function count() {
    return 1;
}

let pack = undefined;
window.flare = async function () {
    if (!pack) {
        pack = new TreemapChart(1200, 600);
        pack.nodes = await d3.json('/daten/flare.json');
        pack.valueAccessor = size;
        d3.select('div.control-group')
            .select('button')
            .text('Flip Value vs. Count');
    } else {
        pack.valueAccessor = size === pack.valueAccessor ? count : size;
    }
    pack.render();
}
