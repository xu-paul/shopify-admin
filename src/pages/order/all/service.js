import axios from '@/utils/request';

export async function getOrders(params) {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json?limit=10&status=any',{
      params  
  });}  
export async function changePages(params) {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json?limit=10',{
      params  
  });}  
export async function getOrdersCount(params) {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders/count.json?status=any',{
    params
  });}
export async function addOrders(params) {
    return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders.json`, {
      method: 'POST',
      body:{...params}
    });
  }
export async function removeOrders(params) {
    return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders/${params}.json?status=any`, {
      method: 'DELETE',
    });
  }

export async function getCheckouts() {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/checkouts.json');
}
