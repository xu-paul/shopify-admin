import axios from '@/utils/request';

export async function getProducts() {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products.json?limit=10');
}
export async function getCustomers() {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/customers.json?limit=10');
}

export async function addOrder(params) {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json',{
    method:'POST',
    data:{...params}
  });
}