import axios from '@/utils/request';
export async function getOrdersC() {
  const res = await axios.get(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders/count.json`,
  );
  console.log('res', res);
  return res.data.count;
}
export async function getProductsC() {
  const res = await axios.get(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/count.json`
  );
  console.log('res', res);
  return res.data.count; 
}
export async function getCustomersC() {
  const res = await axios.get(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/customers/count.json`
  );
  console.log('res', res);
  return res.data.count; 
}