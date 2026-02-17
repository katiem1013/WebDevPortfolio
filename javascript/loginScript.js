

const elements = {
  time: document.getElementById('currentTime'),
  date: document.getElementById('currentDate'),
};

function setTime(){
    const d = new Date();
    const formatter = new Intl.DateTimeFormat([], {
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
    });

    const parts = formatter.formatToParts(d);

    elements.time.innerHTML = parts.map(({type, value}) => {
        if (type === 'second') {
            return `<span class="smaller-text">${value}</span>`;
        }
        return value;
    }).join('');

    const dateFormatter = new Intl.DateTimeFormat([], {
        weekday:'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const dateParts = dateFormatter.formatToParts(d);

    elements.date.innerHTML = dateParts.map(({type, value}) => {
        return `<span class="date-text">${value}</span>`;
    }).join('');

};

setInterval(setTime, 1000);

