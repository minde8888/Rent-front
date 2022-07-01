import api from "../api.services/instanceApi.service";
import { Products } from "./typings";


export const addProduct = async (formData: FormData): Promise<Products> => {
    console.log(Object.fromEntries(formData));
    const { data } = await api.put<Products>("products", formData);

    return data;
}