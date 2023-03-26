const max = 10, myData = [];

for(let i=1; i<= max; ++i) myData.push(i);

const alphabet = d3.scaleOrdinal()
    .domain(myData)
    .range(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j']);

function render(data, scale, selector) {
    const cells = d3.select(selector).selectAll("div.cell").data(data);

    cells.enter()
        .append("div")
        .classed("cell", true)
        .style("display", "inline-block")
        .style("background-color", d => scale(d).indexOf('#') >= 0 ? scale(d) : "white")
        .text( d => scale(d) );
}

function renderAll(data) {
    render(data, alphabet, "#alphabet");
    render(data, d3.scaleOrdinal(d3.schemeCategory10), "#category10");
    render(data, d3.scaleOrdinal(d3.schemePaired), "#paired");
    render(data, d3.scaleOrdinal(d3.schemeSet3), "#set3");
}

renderAll(myData)