const data = [
    { width: 10, color: 23 }, { width: 15, color: 33 }, { width: 30, color: 40 }, 
    { width: 50, color: 50 }, { width: 80, color: 60 }, { width: 65, color: 80 }, 
    { width: 55, color: 65 }, { width: 30, color: 10 }, { width: 20, color:  5 }, 
    { width: 10, color: 60 }, { width:  8, color: 90 }
];


const colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range(["#add8e6", "blue"]);

function render(data) {
    const bars = d3.select("body").selectAll("div.h-bar")
        .data(data);

    // Enter
    bars.enter()
        .append("div")
        .attr("class", "h-bar")
        .merge(bars) // Enter + Update
        .style("width", (d) => {return (d.width * 5) + "px"; })
        .style("background-color", (d) => { return colorScale(d.color); })
        .text( (d) => { return d.width; });


    // Exit
    bars.exit().remove();
}

function randomValue() {
    return Math.round(Math.random() * 100);
}
setInterval(function () {
    data.shift();
    data.push( { width: randomValue(), color: randomValue() });
    render(data);
}, 1500);

render(data);