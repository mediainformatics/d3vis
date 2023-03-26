const body = d3.select('body');

const countdown = body.append('div').append('input');

countdown.attr('type', 'button')
    .attr('class', 'countdown')
    .attr('value', '0');

function countUp(target) {
    const t = d3.timer( () => {
        let value = +countdown.attr('value');
        if(value === +target) {
            t.stop();
            return true;
        }
        countdown.attr('value', ++value);
    });
}

function reset() {
    countdown.attr('value', 0);
}

window.countUp = countUp;
window.reset = reset;
