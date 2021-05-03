'use strict';
const axios = require('axios');
const RandomNumber = require('../lib/randomNumber');
const filterImage = require('../lib/filterImage');

class ImageSearchController {

    async getRandomImage (req, res, next) {
       
        const filters = filterImage(req.body);

        let url = "https://pixabay.com/api/?key="+process.env.API_KEY;
        if(filters !== "") {
            url += filters;
        }   
        
        let photo = await axios.get(url);
        if(!photo) {
            const error = new Error('No picture available');
            error.status = 404;
            next(error);
            return;
        }
  
        const idPicture = RandomNumber(1, photo.data.hits.length);      
        res.json({picture: photo.data.hits[idPicture]});
        
    }
}

module.exports = new ImageSearchController();