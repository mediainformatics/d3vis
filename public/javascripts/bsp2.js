const body = d3.select('body');

body.append("section")
    .attr("id", "section1")
    .append("div")
    .attr("class", "blue box")
    .append("p")
    .text("dynamic blue box");

body.append("section")
    .attr("id", "section2")
    .append("div")
    .attr("class", "red box")
    .append("p")
    .text("dynamic red box");
