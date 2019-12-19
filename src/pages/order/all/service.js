import axios from '@/utils/request';

export async function getOrders(params) {
  return axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json?limit=10',{
      params  
  });}  
export async function getOrdersCount() {
  return axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders/count.json?status=any'
  );}

export async function addOrders(params) {
    return axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json`, {
      method: 'POST',
      body:{...params}
    });
  }
export async function removeOrders(params) {
    return axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders/${params}.json?status=any`, {
      method: 'DELETE',
    });
  }

export async function getCheckouts() {
  return request('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/checkouts.json');
}
