import mongoose, { model, Schema } from 'mongoose'

interface IMenu {
    _id?: string
    name: string
    submenu?: string
    ancestors?: mongoose.Schema.Types.ObjectId
    dob?: Date
}

const schema = new mongoose.Schema<IMenu>({
    name: { type: String, required: true },
    submenu: { 
        type: String
    },
    ancestors: [{
        _id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Menu",
           index: true
        },
        name: String,
        slug: String
    }],
    dob: Date,
})

export default model<IMenu>('menu', schema, 'menus')