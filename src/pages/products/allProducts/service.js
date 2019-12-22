import axios from '@/utils/request';

export async function getProducts(params) {
  const res = await axios.get(
    'https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products.json?limit=10',
    { params },
  );
  console.log('res', res);
  return res;
}
export async function getProductsCount(params) {
  const res = await axios.get(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/count.json`,
    { params },
  );

  return res;
}

export async function removeProducts(e) {
  const res = await axios.delete(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/${e}.json`,
  );

  return res;
}
