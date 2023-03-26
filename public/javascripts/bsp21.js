const data = [
    { name: 'Linear' , fn: d3.easeLinear  },
    { name: 'Cubic' , fn: d3.easeCubic  },
    { name: 'CubicIn' , fn: d3.easeCubicIn  },
    { name: 'Sin', fn: d3.easeSin  },
    { name: 'SinIn' , fn: d3.easeSinIn  },
    { name: 'Exp' , fn: d3.easeExp  },
    { name: 'Circle', fn: d3.easeCircle  },
    { name: 'Back' , fn: d3.easeBack  },
    { name: 'Bounce' , fn: d3.easeBounce  },
    { name: 'Elastic' , fn: d3.easeElastic  },
    { name: 'Custom', fn: t => Math.sqrt(t)  } // in = [0,1], out = [0,1]
];

const colors = d3.scaleOrdinal(d3.schemeSet3);

d3.select('body').selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'fixed-cell')
    .style('top', (d,i) => (200 + 35*i) + 'px' )
    .style('background-color', (_d,i) => colors(i) )
    .style('color', 'black')
    .style('left', '500px')
    .text( d => d.name );

d3.selectAll('div').each( function(d) {
    d3.select(this)
        .transition().ease(d.fn)
        .duration(8000)
        .style('left', '10px');
});
