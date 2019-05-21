module.exports = app => {
    app.get('/', (req, res) => {
        res.redirect('/api/employees');
    });
    app.use('/api/employees', require('./employees'));
};