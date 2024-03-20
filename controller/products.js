const Product = require("../models/productSchema");
const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({feature: false});
    res.status(200).json({data: products, nbHits: products.length});
}
const getAllProducts = async (req, res) => {
    const queryObject = {};
    const {feature, company, name, sort, fields, numericFilters} = req.query;
    if (feature) {
        queryObject.feature = (feature === 'true' ? true : false);
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'};
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq'
        };
        const reqEx = /\b(<|>|>=|<=|=)\b/g;
        let filters = numericFilters.replace(reqEx, (match) => `-${operatorMap[match]}-`);
        const options = ['rating', 'price'];
        filters = filters.split(",").forEach((item)=> {
            const [filed, operator, value] = item.split('-');
            if(options.includes(filed)){
                queryObject[filed] = {[operator]:Number(value)};
            }
        });
    }
    // console.log(queryObject);
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort('createAt')
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    const products = await result;


    res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};