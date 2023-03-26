const data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];

function render(data) {
    const bars = d3.select("body").selectAll("div.h-bar")
        .data(data);

    // Enter
    bars.enter()
        .append("div")
        .attr("class", "h-bar")
        .merge(bars) // Enter + Update
        .style("width", (d) => { return (d * 3) + "px"; })
        .text((d) => { return d; });


    // Exit
    bars.exit().remove();
}

setInterval(() => {
    data.shift();
    data.push(Math.round(Math.random() * 100));
    render(data);
}, 1500);

render(data);