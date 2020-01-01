import axios from '@/utils/request';

export async function getDraftOrders(params) {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/draft_orders.json',{
      params  
  });}  
  export async function removeDraftOrders(params) {
    return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/draft_orders/${params}.json`, {
      method: 'DELETE',
    });
  }

