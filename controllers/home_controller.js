exports.index = async (req, res) => {
    try {
        await res.render('home/home');
    } catch (error) {
        res.status(500).send(error)
    }
}