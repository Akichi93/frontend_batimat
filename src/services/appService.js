import { v4 as uuidv4 } from 'uuid';
import { apiUrl } from '../utils/constants/apiUrl.js';
import axiosService from './axiosService.js'; // Importer AxiosService
import axios, { Axios } from 'axios';

class appService {


    // Customer
    async postCustomer(form) {
        const uuid = uuidv4();

        const newCustomerData =
        {
            firstname: form.firstname,
            lastname: form.lastname,
            phone: form.phone,
            uuidCustomer: uuid,
        };

        try {
            const updatedCustomers = await axiosService.post(apiUrl.postcustomer, newCustomerData);
            return updatedCustomers.data;
        } catch (error) {
            throw new Error("Échec de l'insertion du client");
        }
    }

    async getCustomer() {
        try {
            const response = await axiosService.get(apiUrl.getcustomer);

            return response.data;
        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération des clients" };
        }
    }

    async getCustomerByUuid(uuid) {
        try {
            const response = await axios.get(apiUrl.seteditcustomer(uuid))
            return response.data;

        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async updateCustomer(customertoedit, uuidCustomerToUpdate) {
        try {

            const newData = {
                firstname: customertoedit.firstname,
                lastname: customertoedit.lastname,
                phone: customertoedit.phone,
            };

            const response = await axios.post(apiUrl.setupdatecustomer(uuidCustomerToUpdate), newData);
            return response.data;
        } catch (error) {
            return { success: false, error: "Erreur lors de la mise à jour du client" };
        }
    }


    //Supplier
    async postSupplier(form) {
        const uuid = uuidv4();

        const newSupplierData =
        {
            name: form.name,
            email: form.email,
            phone: form.phone,
            uuidSupplier: uuid,
        };

        try {
            const updatedSuppliers = await axios.post(apiUrl.postsupplier, newSupplierData);
            return updatedSuppliers.data;
        } catch (error) {
            throw new Error("Échec de l'insertion du fournisseur");
        }
    }

    async getSupplier() {
        try {
            const response = await axios.get(apiUrl.getsupplier);

            return response.data;
        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération des fournisseurs" };
        }
    }

    async getSupplierByUuid(uuid) {
        try {
            const response = await axios.get(apiUrl.seteditsupplier(uuid))
            return response.data;

        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async updateSupplier(suppliertoedit, uuidSupplierToUpdate) {
        try {

            const newData = {
                name: suppliertoedit.name,
                email: suppliertoedit.email,
                phone: suppliertoedit.phone,
            };

            const response = await axios.post(apiUrl.setupdatesupplier(uuidSupplierToUpdate), newData);
            return response.data;
        } catch (error) {
            return { success: false, error: "Erreur lors de la mise à jour du fournisseur" };
        }
    }

    //Product
    async postProduct(form) {
        const uuid = uuidv4();

        // Get today's date in YYYYMMDD format
        let today = new Date();
        let year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, "0");
        let day = today.getDate().toString().padStart(2, "0");
        let dateDuJour = `${year}${month}${day}`;

        // Get the first two characters of the company name
        let nom = form.product_name;
        let deuxPremiersCaracteres = nom.substring(0, 2).toUpperCase();
        let internalReference = `CO-${deuxPremiersCaracteres}${dateDuJour}`;

        const newProductData =
        {
            supplier_reference: form.supplier_reference,
            barcode: form.barcode,
            designation: form.designation,
            amount: parseInt(form.amount),
            quantity: parseInt(form.quantity),
            product_name: form.product_name,
            internal_reference: internalReference,
            uuidProduct: uuid,
            supplier_id: form.supplier_id,
        };

        try {
            const updatedProducts = await axios.post(apiUrl.postproduct, newProductData);
            return updatedProducts.data;
        } catch (error) {
            throw new Error("Échec de l'insertion du produit");
        }
    }

    async getProduct() {
        try {
            const response = await axios.get(apiUrl.getproduct);

            return response.data;
        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération des fournisseurs" };
        }
    }

    async getProductByUuid(uuid) {
        try {
            const response = await axios.get(apiUrl.seteditproduct(uuid))
            return response.data;

        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async updateProduct(producttoedit, uuidProductToUpdate) {
        try {

            const newData = {
                product_name: producttoedit.product_name,
                barcode: producttoedit.barcode,
                designation: producttoedit.designation,
                supplier_reference: producttoedit.supplier_reference,
            };

            const response = await axios.post(apiUrl.setupdateproduct(uuidProductToUpdate), newData);
            return response.data;
        } catch (error) {
            return { success: false, error: "Erreur lors de la mise à jour du fournisseur" };
        }
    }

    async updateQuantity(producttoedit, uuidProductToUpdate) {
        try {

            const newData = {
                quantity: producttoedit.quantity,
            };

            const response = await axios.post(apiUrl.setupdatequantity(uuidProductToUpdate), newData);
            return response.data;
        } catch (error) {
            return { success: false, error: "Erreur lors de la mise à jour du fournisseur" };
        }
    }

    async getProductPrice(product) {
        try {
            const response = await axios.get(apiUrl.getproductprice(product));
            return response.data;

        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }

    async getProductQuantity(product) {
        try {
            const response = await axios.get(apiUrl.getproductquantity(product));
            return response.data;

        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }


    async getOrder() {
        try {
            const response = await axios.get(apiUrl.getorder);

            return response.data;
        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération des fournisseurs" };
        }
    }

    async postOrder(orderData) {
        const uuid = uuidv4();
        orderData.uuidOrder = uuid;
        try {
            const createOrder = await axios.post(apiUrl.postorder, orderData);
            return createOrder.data;
        } catch (error) {
            throw new Error("Échec de l'insertion du de la commande");
        }
    }

    async getOrderByUuid(uuid){
        try {
            const response = await axios.get(apiUrl.seteditorder(uuid))
            return response.data;

        } catch (error) {
            return { success: false, error: "Erreur lors de la récupération" };
        }
    }



}

export default new appService();
