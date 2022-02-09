const Service = require('../models/service');
const formidable = require('formidable');
const fs = require('fs');

exports.createService = async (req,res) => {

    try {

        let form = new formidable.IncomingForm();
        form.keepExtensions = true

        form.parse(req, async (err, fields, file) => {

            // console.log(err,fields,file);
            
            if(err){
                return res.status(400).json({
                    error: "Problem with image"
                });
            }

            const { title, short_description, long_description } = fields

            if (!title) {
                return res.status(400).json({
                    error: "Title field is empty !"
                })
            }

            if (!short_description) {
                return res.status(400).json({
                    error: "Short Description field is empty !"
                })
            }

            if (!long_description) {
                return res.status(400).json({
                    error: "Long Description field is empty !"
                })
            }

            let service = new Service(fields);

            // handle file
            if (file.service_icon) {

                if (file.service_icon.size>3000000) {
                    return res.status(400).json({
                        error: "File size too big"
                    })
                }

                if (file.img1.size>3000000) {
                    return res.status(400).json({
                        error: "File size too big"
                    })
                }

                if (file.img2.size>3000000) {
                    return res.status(400).json({
                        error: "File size too big"
                    })
                }

                // formidable - V2

                // service_icon
                service.service_icon.data = fs.readFileSync(file.service_icon.filepath);
                service.service_icon.contentType = file.service_icon.mimetype;

                // img1
                service.img1.data = fs.readFileSync(file.img1.filepath);
                service.img1.contentType = file.img1.mimetype;

                // img2
                service.img2.data = fs.readFileSync(file.img2.filepath);
                service.img2.contentType = file.img2.mimetype;
            }

            // save to DB
            const serviceCreated = await service.save()

            if (serviceCreated) {
                res.json(serviceCreated)
            }
        })
        
    } catch (error) {
        res.status(400).json({
            error: "Saving Failed"
        })
    }
}

exports.getAllServices = async (req,res) => {

    try {

        const services = await Service.find({},'title , short_description , long_description');

        if (services) {
            return res.status(200).json(services);
        }
        
    } catch (error) {
        return res.status(400).json({
            error: "NO Services found in database"
        });
    }
}
 
