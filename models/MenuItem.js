const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    taste: {
        type : String,
        enum : ['sour','sweet','spicy'],
        required : true
    },

    is_drink: {
    
        type: Boolean,
        default: false
    },

    ingredients: {
        type:[String],
        required: true
    },

    num_sales: {
        type: Number,
        default : 0
    }

})

const Menuitem = mongoose.model('MenuItem', MenuItemSchema);
module.exports = Menuitem;