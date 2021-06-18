const { tagsRepository } = require('../Repositories');

async function getTagsForChartByUserId(req, res, next) {
    try {
        const { id_user } = req.params;
        console.log('id: ', typeof id_user);
        const tags = await tagsRepository.findTagsForChartByUserId(id_user);
        console.log(tags);
        res.send({ tags });
    } catch (err) {
        next(err);
    }
}

async function getTagByIncidence(req, res, next) {
    try {
        const tags = await tagsRepository.findTagsByIncidence();
        res.send([
            {
                tags,
            },
        ]);
    } catch (err) {
        next(err);
    }
}
module.exports = {
    getTagsForChartByUserId,
    getTagByIncidence,
};
