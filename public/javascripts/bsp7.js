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


function render(data, comparator) {
    const bars = d3.select("body")
        .selectAll("div.h-bar")
        .data(data);

    // Enter
    bars.enter()
        .append("div")
        .attr("class", "h-bar")
        .style("width", (d) => { return (+d.expense * 5) + "px"; })
        .append("span")
        .text((d) => { return d.category; });

    // Update
    d3.selectAll("div.h-bar")
        .style("width", d => (+d.expense * 5) + 'px')
        .select("span")
        .text(d => d.category);
    if (comparator) {
        bars.sort(comparator);
    }
}

function compareByExpense(a, b) { return Math.sign(b.expense - a.expense); }
function compareByCategory(a, b) { return a.category < b.category ? -1 : 1; };

render(myData);

function sort(comparator) {
    render(myData, comparator);
}

window.sort = sort;
window.compareByExpense = compareByExpense;
window.compareByCategory = compareByCategory;