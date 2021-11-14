module.exports = {
    asyncErrorHandle: (promise) => {
        return promise
            .then((result) => [result, null])
            .catch((error) => [null, error])
    }
}