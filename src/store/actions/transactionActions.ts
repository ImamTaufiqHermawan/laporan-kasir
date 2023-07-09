import { TransactionService } from '@app/services/TransactionService';
import { toast } from 'react-toastify';

export const UpdateTransactionActions = (id, data) => async () => {
    try {
        const response = await TransactionService.editTransaction(id, data);
        toast.success('Update Transaksi Berhasil!');
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Gagal Update Transaksi!');
    }       
}

export const DeleteTransactionActions = (id) => async () => {
    try {
        const response = await TransactionService.deleteTransaction(id);
        toast.success(response?.data?.message || 'Hapus Transaksi berhasil!');
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Gagal Hapus Transaksi!');
    }       
}

export const CreateTransactionActions = (data) => async () => {
    try {
        const response = await TransactionService.createTransaction(data);
        toast.success('Transaksi berhasil dicatat!');
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Gagal Catat Transaksi!');
    }
}