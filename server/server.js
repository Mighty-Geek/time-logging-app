const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const DATA_FILE = path.join(__dirname, 'data.json');

app.use('/', express.static(path.join(__dirname, '..', 'src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.get('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache');
        let timers = [];
        if (data) {
            timers = JSON.parse(data);
        }
        res.json(timers);
    });
});

app.post('/api/timer', (req, res) => {
    const { timer } = req.body;
    let timers = [];
    fs.readFile(DATA_FILE, (err, data) => {
        timers = JSON.parse(data);
        timers.push(timer);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 2), () => {
            res.json({ success: "timer succesfully created!" })
        });
    })
})

app.post('/api/timer/start', (req, res) => {
    const { id, start } = req.body;
    console.log('start : ' + id);
    fs.readFile(DATA_FILE, (err, data) => {
        if (data) {
            const timers = JSON.parse(data);
            // console.log(data);
            timers.forEach(t => {
                if (t.id === id) {
                    t.runningSince = start;
                }
            })

            fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 2), () => {
                res.json({
                    success: "timer started"
                });
            });
        }
    });
});

app.post('/api/timer/stop', (req, res) => {
    const { id, stop } = req.body;
    console.log('stop : ' + id);
    fs.readFile(DATA_FILE, (err, data) => {
        if (data) {
            const timers = JSON.parse(data);
            timers.forEach(t => {
                if (t.id === id) {
                    t.elapsed += stop - t.runningSince;
                    t.runningSince = null;
                }
            })

            fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 2), () => {
                res.json({ success: "timer stopped" });
            });
        }
    });
});

app.put('/api/timer', (req, res) => {
    const { timer } = req.body;
    fs.readFile(DATA_FILE, (err, data) => {
        if (data) {
            const timers = JSON.parse(data);
            timers.forEach(t => {
                if (t.id === timer.id) {
                    t.title = timer.title;
                    t.project = timer.project;
                    console.log(`found ${JSON.stringify(t, null, 2)}`);
                }
            })

            fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 2), () => {
                res.json({ success: "timer updated" });
            })
        }
    });
});

app.delete('/api/timer', (req, res) => {
    let timers = [];
    const { id } = req.body;
    console.log(id);
    fs.readFile(DATA_FILE, (err, data) => {
        timers = JSON.parse(data);
        timers = timers.filter(t => t.id !== id);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 2), () => {
            res.json({ success: "timer deleted with id : " + id });
        });
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Find the server at: http://localhost:${process.env.PORT || 8080}/`);
});