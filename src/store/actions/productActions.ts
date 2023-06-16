import { ProductService } from '@app/services/productService';
import { toast } from 'react-toastify';

// export const getAirportActions = () => async (dispatch) => {
//     try {
//         const response = await AirportService.getAirport();
//         dispatch({type: 'END'})  
//         return response;
//     } catch (error) {
//         SweatAlert(String(error.response.data.message), 'warning')
//         dispatch({type: 'END'})  
//     }       
// }

// export const PutAirportActions = (id, data) => async (dispatch) => {
//     try {
//         const response = await AirportService.postAirport(id, data);
//         SweatAlert('Update Berhasil', 'success');
//         dispatch({type: 'END'})  
//         return response;
//     } catch (error) {
//         SweatAlert(String(error.response.data.message), 'warning')
//         dispatch({type: 'END'})  
//     }       
// }

// export const DeleteAirportActions = (id) => async (dispatch) => {
//     try {
//         const response = await AirportService.deleteAirport(id);
//         SweatAlert('Delete Berhasil', 'success');
//         dispatch({type: 'END'})  
//         return response;
//     } catch (error) {
//         SweatAlert(String(error.response.data.message), 'warning')
//         dispatch({type: 'END'})  
//     }       
// }

export const CreateProductActions = (data) => async () => {
    try {
        const response = await ProductService.createProduct(data);
        toast.success('Product is created!');
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed create product');
    }
}