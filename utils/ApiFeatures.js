const Product = require('../models/ProductModel')

module.exports = class ApiFeatures {
    constructor(mongoQuery, reqQuery) {
        this.mongoQuery = mongoQuery
        this.reqQuery = reqQuery
    }


    filter() {
        const queryObj = { ...this.reqQuery }
        // remove fields from the query object if they are not allowed to be queried by client
        const excludedFields = ["sort", "page", "limit"]

        excludedFields.forEach(field => delete queryObj[field]);


        console.log(queryObj);


        this.mongoQuery = this.mongoQuery.find(queryObj);

        return this;
    }


    paginate() {
        const page = this.reqQuery.page * 1 || 1;
        const limit = this.reqQuery.limit * 1 || 15;

        const skip = (page - 1) * limit;

        this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);

        return this;
    }
}