const Property = require('../models/property');

const addProperty = async (req, res) => {
    try{
        const {sellerId, location, area, bedrooms, bathrooms, schools, colleges} = req.body;
        if(!sellerId || !location || !area || !bedrooms || !bathrooms){
            return res.status(400).json({error: 'All fields are required'});
        }
        const newProperty = await Property.create({sellerId, location, area, bedrooms, bathrooms, schools, colleges});
        res.status(201).json({msg: 'Property added successfully', data: newProperty});
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

const getProperty = async (req, res) => {
    try{
        const properties = await Property.find();
        res.json(properties);
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

const getPropertyById = async (req, res) => {
    try{
        const sellerId = req.params.id;
        const property = await Property.find({sellerId});
        
        res.json(property);
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

const updateProperty = async (req, res) => {
    try{
        const id = req.params.id;
        const {sellerId, location, area, bedrooms, bathrooms, schools, colleges} = req.body;
        const updatedProperty = await Property.findByIdAndUpdate(id, {sellerId, location, area, bedrooms, bathrooms, schools, colleges}, {new: true});
        res.json("Property updated successfully");
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
}

const deleteProperty = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedProperty = await Property.findByIdAndDelete({_id :id});
        res.json("Property deleted successfully");
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
}


module.exports = {
    addProperty,
    getProperty,
    getPropertyById,
    updateProperty,
    deleteProperty
};