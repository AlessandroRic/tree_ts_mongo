import menu from "../models/menu";

export async function buildAncestors(atual:string, parent_id: string): Promise<void> {
    let ancest = [];
    try {
        let submenu = await menu.findOne({ "_id": parent_id },{ "name": 1, "slug": 1, "ancestors": 1 }).exec();
        if( submenu ) {
            const { _id, name, slug } = submenu;
            ancest = [...submenu.ancestors];
            ancest.unshift({ _id, name, slug })
            await menu.findByIdAndUpdate(atual, { "ancestors": ancest });
        }

    } catch(e) {
        console.log(e)
    }
}