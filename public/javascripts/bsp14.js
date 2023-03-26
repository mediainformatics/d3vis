const max = 21, myData = [];

const compoundScale = d3.scalePow()
    .exponent(2)
    .domain([0, max])
    .range([
        { color: '#add8e6', height: '15px'},
        { color: '#4169e1', height: '150px'}
    ]);

for(let i=0; i<max; ++i) myData.push(i);

function render(data, scale, selector) {
    const bars = d3.select(selector).selectAll("div.v-bar").data(data);
    bars.enter()
        .append("div")
        .classed("v-bar", true)
        .style("height", d => scale(d).height )
        .style("background-color", d => scale(d).color )
        .text( (_d,i) => i);
}

render(myData, compoundScale, '#compound');