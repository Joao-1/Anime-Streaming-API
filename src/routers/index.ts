import { Router } from 'express';
import StreamingAnime from '../controllers/streamingController';
import Animes from '../controllers/animesController';
import Tags from '../controllers/tagsController';
import Episodes from '../controllers/episodesController';
import bodyValidator from '../middlewares/bodyValidator';
import paramsValidator from '../middlewares/paramsValidator';
import queryValidator from '../middlewares/queryValidator';
import validateOneFile from '../middlewares/FileVelidator';

const routes = Router();

const streamingAnime = new StreamingAnime();
const animes = new Animes();
const episodes = new Episodes();
const tags = new Tags();
// tags
routes.post('/tags', bodyValidator, tags.create);
routes.get('/tags', tags.read);
routes.put('/tags/:name', paramsValidator, bodyValidator, tags.upload);
routes.delete('/tags/:name', tags.delete);
// animes
routes.post('/animes', validateOneFile('image', 'image/png'), bodyValidator, animes.create);
routes.get('/animes', queryValidator, animes.read);
routes.put('/animes/:id', paramsValidator, animes.upload);
routes.delete('/animes/:id', paramsValidator, animes.delete);

// episodes
routes.post('/:anime/episodes', validateOneFile('episode', 'video/mp4'), episodes.create);
routes.get('/:anime/episodes', paramsValidator, queryValidator, episodes.read);
routes.put('/:anime/episodes/:id', paramsValidator, queryValidator, episodes.upload);
routes.delete('/:anime/episodes/:id', paramsValidator, queryValidator, episodes.delete);

// streaming
routes.get('/watch/:anime/:episode', streamingAnime.create);

routes.use(async (req, res, next) => {
    res.status(404).send({ error: 'Page not found' });
});

export default routes;
