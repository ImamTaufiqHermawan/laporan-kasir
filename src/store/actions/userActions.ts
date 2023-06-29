import { ProductService } from '@app/services/productService';
import { UserService } from '@app/services/userService';
import { toast } from 'react-toastify';

export const UpdateUserActions = (id, data) => async () => {
    try {
        const response = await UserService.editUser(id, data);
        toast.success('Update Akun Berhasil!');
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Gagal Update Akun!');
    }       
}

export const DeleteProductActions = (id) => async () => {
    try {
        const response = await ProductService.deleteProduct(id);
        toast.success(response?.data?.message || 'Hapus Produk berhasil!');
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Gagal Buat Produk!');
    }       
}

export const CreateUserActions = (data) => async () => {
    try {
        const response = await UserService.createUser(data);
        toast.success('Akun Pegawai berhasil dibuat!');
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Gagal Buat Akun Pegawai!');
    }
}