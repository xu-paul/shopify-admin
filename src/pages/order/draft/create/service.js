import axios from '@/utils/request';

export async function getProducts() {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products.json?limit=10');
}
export async function getProductsImages(products_id,image_id) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/${products_id}/images/${image_id}.json`);
} 
export async function addOrder(params) {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json',{
    method:'POST',
    data:{...params}
  });
}