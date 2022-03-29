import { Request, Response } from 'express'
import { buildAncestors } from '../helpers/buildAncestors';
import { slugGenerator } from '../helpers/slugGenerator'
import Menu from '../models/menu'

interface IOrderTree {
        id: string,
        name: string,
        submenu_id: string,
        submenus: any[]
    }

export default {
    create: async (req: Request, res: Response): Promise<Response> => {
        const { name } = req.body;
        
        const checkSubmenu = await Menu.findOne({ _id: req.body.submenu })
        
        let submenu = "";

        if(checkSubmenu)
            submenu = req.body.submenu;
        
        const slug = await slugGenerator(name);

        const { id } = await Menu.create({name, slug, submenu})

        if(submenu)
            buildAncestors(id, submenu);

        return res.status(201).json({
            id, name, slug
        })
    },
    getAll: async (req: Request, res: Response): Promise<Response> => {

        const menu = await Menu.find().select({
            "_id": true,
            "name": true,
            "submenu": true
        }).exec();

        const data = menu.map(el => {
            return {
                id: el._id?.toString(),
                name: el.name,
                submenu_id: el.submenu,
                submenus: []
            }
        }) as IOrderTree[];

        function orderTree(tree: IOrderTree[]) {

            let tree_ordered = [] as unknown as IOrderTree[];
            
            tree.map((item) => {
                // found the root
                if (item.submenu_id === "") {
                    tree_ordered.push(item);
                    return;
                }
                // find the parent
                let parent = tree.find((parent) => parent.id == item.submenu_id);
                // add the item the children
                parent?.submenus?.push(item);
            });
            
            return tree_ordered;
          }

        return res.status(200).json(
            orderTree(data)
        )
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        
        let err = await Menu.findByIdAndRemove(req.params.id);
        if(!err)
            await Menu.deleteMany({"ancestors._id": req.params.id});
        return res.status(200).json({
            "Response": "The tree of menus was deleted with success"
        })
    },
}
