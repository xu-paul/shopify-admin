import axios from '@/utils/request';

export async function getDraftOrders(params) {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/draft_orders.json',{
      params  
  });}  
export async function removeRule(params) {
  return axios('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return axios('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return axios('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
