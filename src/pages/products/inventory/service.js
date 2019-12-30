import axios from '@/utils/request';

export async function getAllProducts() {
  const res = await axios.get(
    'https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products.json'
  );
  return res.data.products;
}

export async function getInventory(ids){
    const res = await axios.get(
        'https://mirror.viralbox.org/xuzyy/admin/api/2019-10/inventory_items.json?ids='+ids
      );
      return res.data.inventory_items;
}