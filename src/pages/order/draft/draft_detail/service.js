import axios from '@/utils/request';

export async function getDraftOrders(params) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/draft_orders/${params}.json`);
}

export async function getProduct(params) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/${params}.json`);
}


export async function upDraftStatus(params) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/draft_orders/${params}/complete.json`,{
    method:'PUT',
  });
}
export async function upDraftOrder(id,params) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/draft_orders/${id}.json`,{
    method:'PUT',
    data:{...params}
  });
}