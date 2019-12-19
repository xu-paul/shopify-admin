import axios from '@/utils/request';

export async function getProducts() {
    return axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products.json');
  }
export async function getOrders(params) {
    return axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json',{params});
  }
export async function getCheckouts() {
    return axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/checkouts.json');
  }