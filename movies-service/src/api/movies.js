const schemas = require("./schemas");

module.exports = (app, repository) => {

    app.get('/movies', (req, res, next) => {
        repository.getAllMovies((err, movies) => {
            if(err) return next(err);
            res.json(movies)
        })
    })

    app.get('/movies/premiers', (req, res, next) => {
        repository.getMoviePremiers((err, movies) => {
            if(err) return next(err);
            res.json(movies)
        })
    })

    app.get('/movies/:id', (req, res, next) => {
        var id = req.params.id;
        repository.getMovieById(id, (err, movie) => {
            if(err) return next(err);
            res.json(movie)
        })
    })

    app.post('/movies',(req,res, next) => {
        const validated = schemas.movieSchema.validate(req.body);
        if(validated.error) next(result.error);
        repository.addMovie(validated.value, (err, result) => {
            if(err) return next(err);
            res.json(result);
        })
    })

}