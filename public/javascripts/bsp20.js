let id = 0;
let myData = [];
const duration = 500, chartHeight = 200, chartWidth = 680, topMargin = 150;

for(let i=0; i<20; ++i) push(myData);

function push(data) {
    data.push( {
        id: ++id,
        value: Math.round(Math.random()*chartHeight)
    });
}

function barLeft(i) {
    return i * (30+2);
}

function barHeight(d) {
    return +d.value;
}

function render(data) {
    const selection = d3.select('div.baseline')
        .selectAll('div.v-bar')
        .data( data, d => d.id );

    // enter
    selection.enter()
        .append('div')
        .attr('class', 'v-bar')
        .style('z-index', '0')
        .style('position', 'fixed')
        .style('top', topMargin + chartHeight + 'px')
        .style('left', (_d,i) => barLeft(i+1)+'px')
        .style('height', '0px')
        .append('span');

    // update
    selection.transition().duration(duration)
        .style('top', d => topMargin + chartHeight-barHeight(d)+'px')
        .style('left', (_d,i) => barLeft(i)+'px')
        .style('height', d => barHeight(d)+'px')
        .select('span')
        .text( d => d.value);

    // exit
    selection.exit()
        .transition().duration(duration)
        .style('left', (_d,_i) => barLeft(-1)+'px')
        .remove();
}

setInterval( () => {
    myData.shift();
    push(myData);
    render(myData);
}, 2000);

function init() {
    d3.select('body')
        .append('div')
        .attr('class', 'baseline')
        .style('position', 'fixed')
        .style('z-index', '1')
        .style('top', topMargin + chartHeight  + 'px')
        .style('left', '0px')
        .style('width', chartWidth+'px');
    render(myData);
}

window.onload = init;
