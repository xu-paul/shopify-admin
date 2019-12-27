import axios from '@/utils/request';

export async function getDetailOrders(params) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders/${params}.json`);}  
  
export async function getProduct(params) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/products/${params}.json`);}  

export async function updateOrder(id,f) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/orders/${id}.json`,
  {
      method:'PUT',
      data:{...f}       
  });}  
export async function updateE(id,e) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/customers/${id}.json`,
  {
      method:'PUT',
      data:{...e}       
  });}  