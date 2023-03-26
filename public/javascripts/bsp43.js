class Pack {
    #width
    #height
    #svg
    #valueAccessor
    #nodes
    #bodyG

    constructor(w, h) {
        this.#width = w;
        this.#height = h;
        this.#svg = undefined;
        this.#valueAccessor = undefined;
        this.#nodes = undefined;
        this.#bodyG = undefined;
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
        this.#svg = svg
    }

    get svg() {
        return this.#svg;
    }

    renderCircles(nodes) {
        const circles = this.bodyG.selectAll('circle').data(nodes);

        circles.enter()
            .append('circle')
            .merge(circles)
            .transition()
            .attr('class', d => d.children ? 'parent' : 'child')
            .attr('cx', d => d.x )
            .attr('cy', d => d.y )
            .attr('r', d => d.r );

        circles.exit()
            .transition()
            .attr('r', 0)
            .remove();
    }

    renderLabels(nodes) {
        const labels = this.bodyG.selectAll('text').data(nodes);

        labels.enter()
            .append('text')
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .merge(labels)
            .transition()
            .attr('class', d => d.children ? 'parent' : 'child')
            .attr('x', d => d.x )
            .attr('y', d => d.y )
            .text( d => d.data.name );

        labels.exit().remove();
    }

    renderBody(svg) {
        if(!this.bodyG) {
            this.bodyG = svg.append('g').attr('class', 'body');
        }
        const packing = d3.pack().size([this.width, this.height]);

        const root = d3.hierarchy(this.nodes)
            .sum(this.valueAccessor)
            .sort( (a,b) => b.value - a.value );
        packing(root);
        this.renderCircles(root.descendants());
        this.renderLabels(root.descendants());
    }

    render() {
        if(!this.svg) {
            this.svg = d3.select('body').append('svg')
                .attr('width', this.width)
                .attr('height', this.height)
        }
        this.renderBody(this.svg);
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
        pack = new Pack(800, 500);
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
