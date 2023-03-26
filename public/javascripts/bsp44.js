class Tree {
    #width
    #height
    #margins
    #svg
    #nodes
    #bodyG
    #counter
    #duration
    #root

    constructor(w, h) {
        this.#width = w;
        this.#height = h;
        this.#margins = { top: 30, left: 120, right: 30, bottom: 30};
        this.#svg = undefined;
        this.#nodes = undefined;
        this.#bodyG = undefined;
        this.#counter = 0;
        this.#duration = 300;
        this.#root = undefined;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get margins() {
        return this.#margins;
    }

    set nodes(n) {
        this.#nodes = n;
    }

    get nodes() {
        return this.#nodes;
    }

    set counter(c) {
        this.#counter = c;
    }

    get counter() {
        return this.#counter;
    }

    get duration() {
        return this.#duration;
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

    set root(root) {
        this.#root = root;
    }

    get root() {
        return this.#root;
    }

    renderLabels(nodeEnter, nodeUpdate, nodeExit) {
        nodeEnter.append('text')
            .attr('x', d => d.children || d._children ? -10 : 10 )
            .attr('dy', '0.35em')
            .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
            .text( d => d.data.name )
            .style('fill-opacity', 1e-6);

        nodeUpdate.select('text')
            .style('fill-opacity', 1);

        nodeExit.select('text')
            .style('fill-opacity', 1e-6)
            .remove();
    }

    renderBody(svg) {
        if(!this.bodyG) {
            this.bodyG = svg.append('g')
                .attr('class', 'body')
                .attr('transform',
                    _d => 'translate('+this.margins.left+','+this.margins.top+')');
        }
        this.root = d3.hierarchy(this.nodes);
        this.render(this.root);
    }

    render(root) {
        if(!arguments.length) {
            if(!this.svg) {
                this.svg = d3.select('body').append('svg')
                    .attr('width', this.width)
                    .attr('height', this.height);
            }
            this.renderBody(this.svg);
        } else {
            const tree = d3.tree()
                .size([
                    (this.height-this.margins.top-this.margins.bottom),
                    (this.width-this.margins.left-this.margins.right)
                ]);
            tree(root);
            this.renderNodes(root);
            this.renderLinks(root);
        }
    }

    renderNodes(root) {
        const nodes = root.descendants();
        const nodeElements = this.bodyG.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++this.counter) );
        const nodeEnter = nodeElements.enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => 'translate('+d.y+','+d.x+')')
            .on('click', (_event, d) => {
                this.toggle(d);
                this.render(this.root);
            });
        nodeEnter.append('circle').attr('r', 4);

        const nodeUpdate = nodeEnter.merge(nodeElements)
            .transition().duration(this.duration)
            .attr('transform', d => 'translate('+d.y+','+d.x+')');

        nodeUpdate.select('circle')
            .style('fill', d => d._children ? 'lightsteelblue' : '#fff' );

        const nodeExit = nodeElements.exit()
            .transition().duration(this.duration)
            .attr('transform', d => 'translate('+d.y+','+d.x+')')
            .remove();

        nodeExit.select('circle')
            .attr('r', 1e-6)
            .remove();
        this.renderLabels(nodeEnter, nodeUpdate, nodeExit);
    }

    renderLinks(root) {
        const nodes = root.descendants().slice(1);
        const link = this.bodyG.selectAll('path.link')
            .data(nodes, d => d.id || (d.id = ++this.counter) );
        link.enter().insert('path', 'g')
            .attr('class', 'link')
            .merge(link)
            .transition().duration(this.duration)
            .attr('d', d => this.generateLinkPath(d, d.parent) );
        link.exit().remove();
    }

    generateLinkPath(target, source) {
        const path = d3.path();
        path.moveTo(target.y, target.x);
        path.bezierCurveTo(
            (target.y+source.y)/2, target.x,
            (target.y+source.y)/2, source.x,
            source.y, source.x
        );
        return path.toString();
    }

    toggle(d) {
        if(d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
    }
}

window.flare = async function () {
    const t = new Tree(900, 2000);
    t.nodes = await d3.json('/daten/flare.json');
    t.render();
    d3.select('div.control-group').remove();
}
