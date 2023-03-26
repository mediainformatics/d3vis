const max=11, myData=[];

const sizeScale = d3.scaleLinear()
    .domain([0,max])
    .range([
        "italic bold 12px/20px Georgia, serif",
        "italic bold 120px/180px Georgia, serif"
    ]);

for(let i=0; i<max; ++i) myData.push(i);

function render(data, scale, selector) {
    const cells = d3.select(selector).selectAll("div.cell").data(data);

    cells.enter()
        .append("div")
        .classed("cell", true)
        .style("display", "inline-block")
        .append("span")
        .style("font", d => scale(d) )
        .text( (_d,i) => i);
}

render(myData, sizeScale, '#font');