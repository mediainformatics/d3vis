const start = new Date(2022, 0, 1),
      end   = new Date(2022, 11, 31),
      range = [0, 1000],
      time  = d3.scaleTime().domain([start, end]).rangeRound(range),
      max   = 12;

const myData = [];

for(let i=0; i<max; ++i) {
    const date = new Date(start.getTime());
    date.setMonth(start.getMonth() + i);
    myData.push(date);
}

function render(data, scale, selector) {
    d3.select(selector).selectAll("div.fixed-cell")
        .data(data)
        .enter()
        .append("div")
        .classed("fixed-cell", true)
        .style("margin-left", d => scale(d)+'px')
        .html( d => {
            const format = d3.timeFormat("%d.%m.%Y");
            return format(d) + "<br>" + scale(d)+"px";
        });
}

render(myData, time, '#time')