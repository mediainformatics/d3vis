function render(data) {
    const bars = d3.select("#chart").selectAll("div.h-bar").data(data);

    bars.enter()
        .append("div")
        .attr("class", "h-bar")
        .style("width", d => 5 * d.expense + 'px')
        .append("span")
        .text(d => d.category);
}



async function load(fname) {
    try {
        let result = await d3.json(fname);
        render(result);
        d3.select('.control-group').remove();
    } catch (err) {
        d3.select('body')
            .append('div')
            .text(err);
    }
}

window.load = load;