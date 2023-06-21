import { Product } from "../types/Product";
import { Tenant } from '../types/Tenant';

const TEMPORARYoneProduct: Product = {
    id: 1, 
    image: '/tmp/gesso.png',
    categoryName: 'Tradicional',
    name: 'Gesso', 
    price: 25.50,
    description: 'Gesso, Drywall, Granito, Piso',
}

export const useApi = (tenantSlug: string) => ({

    getTenant: async () => {
        switch (tenantSlug) {
            case 'construtech':
                return {
                    slug: 'construtech',
                    name: 'Construtech',
                    mainColor: '#082A48',
                    secondColor: '#F0F8FF'
                }
                break;
            case 'construtech2':
                return {
                    slug: 'construtech2',
                    name: 'Construtech2',
                    mainColor: '#0000FF',
                    secondColor: 'FF0000'
                }
                break;
            default: return false;
        }
    },

    getAllProducts: async () => {
        let products = [];
        for(let q = 0; q < 10; q++) {
            products.push(TEMPORARYoneProduct)
        }
        return products;
    },

    getProduct: async (id: string) => {
        return TEMPORARYoneProduct;
    }

});