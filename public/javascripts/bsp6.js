const myData = [
    { expense: 10, category: "Retail" },
    { expense: 15, category: "Gas" },
    { expense: 30, category: "Dining" },
    { expense: 50, category: "Retail" },
    { expense: 80, category: "Gas" },
    { expense: 65, category: "Dining" },
    { expense: 55, category: "Retail" },
    { expense: 30, category: "Gas" },
    { expense: 20, category: "Dining" },
    { expense: 10, category: "Retail" },
    { expense: 8, category: "Gas" }
];


function render(data, category) {
    const bars = d3.select("body").selectAll("div.h-bar")
        .data(data);

    // Enter
    bars.enter()
        .append("div")
        .attr("class", "h-bar")
        .style("width", (d) => { return (+d.expense * 5) + "px"; })
        .append("span")
        .text((d) => { return d.category; });

    // Update
    d3.selectAll("div.h-bar").attr("class", "h-bar");
    bars.filter((d, _i) => { return d.category === category; })
        .classed("selected", true)
}

render(myData);

function select(category) {
    render(myData, category);
}

// export { select as default };
// does not work, since no import takes place, use instead:
window.select = select;
