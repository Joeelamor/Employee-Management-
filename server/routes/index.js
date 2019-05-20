module.exports = app => {
    app.get('/', (req, res) => {
        res.redirect('/api/users');
    });
    app.use('/api/users', require('./users'));
};