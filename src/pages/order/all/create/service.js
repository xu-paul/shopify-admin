import axios from '@/utils/request';

export async function getProducts() {
  return axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products.json?limit=5');
}
export async function addOrder(params) {
  return axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json',{
    method:'POST',
    data:{...params}
  });
}