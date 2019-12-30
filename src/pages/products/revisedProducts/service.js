import axios from '@/utils/request';

export async function getRevised(e) {
  const res = await axios.get(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/${e}.json`,
  );
  console.log('res', res);
  return res;
}
export async function Revised(e,params) {

  const res = await axios.put(
    `https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/${e}.json`,params
  );
  return res;
}