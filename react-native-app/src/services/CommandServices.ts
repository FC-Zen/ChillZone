import { ItemProps } from "@components/organisms";
import { useCommand } from "@contexts";

export const uploadCommand = async (command: ItemProps) => {
    // Simule une requête API
    /*
    const response = await axios.post('https://api.exemple.com/command', command);
    return response.data;
    */

    // Génère un identifiant pour la commande
    const id = Math.floor(Math.random() * 1000000000);
    const { setCommandId } = useCommand();
    setCommandId(id);
    return id;
}