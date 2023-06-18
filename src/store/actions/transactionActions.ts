import { TransactionService } from '@app/services/TransactionService';
import { toast } from 'react-toastify';

// export const UpdateProductActions = (id, data) => async () => {
//     try {
//         const response = await ProductService.editProdut(id, data);
//         toast.success('Update Produk Berhasil!');
//         return response;
//     } catch (error) {
//         toast.error(error?.response?.data?.message || 'Gagal Update Produk!');
//     }       
// }

// export const DeleteProductActions = (id) => async () => {
//     try {
//         const response = await ProductService.deleteProduct(id);
//         toast.success(response?.data?.message || 'Hapus Produk berhasil!');
//         return response;
//     } catch (error) {
//         toast.error(error?.response?.data?.message || 'Gagal Buat Produk!');
//     }       
// }

export const CreateTransactionActions = (data) => async () => {
    try {
        const response = await TransactionService.createTransaction(data);
        toast.success('Transaksi berhasil dicatat!');
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Gagal Catat Transaksi!');
    }
}