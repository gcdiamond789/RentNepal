const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter property location/name'],
        trim: true,
        maxLength: [200, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter price'],
        maxLength: [10, 'Product name cannot exceed 10 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter property description'],
    },
    images: [
        {public_id : {
            type: String,
            required: true,
            
        },
        url : {
            type: String,
            required: true,
            
        }}
    ],
    category: {
        type: String,
        required: [true, 'Please select category for property'],
        enum: {
            values: [
                'For Rent',
                'For Sell',
               
            ],
            message: 'Please select correct category for property'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter property seller']
    },
    contact: {
        type: String,
        required: [true, 'Please enter property seller contact information']
    },
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);