const max =21, myData=[];

const colorScale = d3.scaleLinear()
    .domain([0, max])
    .range(["white", "#4169e1"]);

const divergingScale = function(pivot) {
    return d3.scaleLinear()
        .domain([0, pivot, max])
        .range(["white", "#4169e1", "white"])
};

for(let i=0; i<max; ++i) myData.push(i);

function render(data, scale, selector) {
    const cells = d3.select(selector).selectAll("div.cell").data(data);

    cells.enter()
        .append("div").merge(cells)
        .classed("cell", true)
        .style("display", "inline-block")
        .style("background-color", d => scale(d) )
        .text( (_d,i) => i);
}

render(myData, colorScale, "#color");
render(myData, divergingScale(5), "#color-diverge");