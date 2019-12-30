import axios from '@/utils/request';

export  function putAdd(e) {
  const res=axios.put(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/${e.id}.json`,{"product":e}
  );
  return res;
}

export  function putVariant(e) {
 const res=axios.put(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/inventory_items/33019026931761.json`,{"inventory_item":{
      "id":33019026931761,
      "cost":"25"
    }}
  );
  return res;
}