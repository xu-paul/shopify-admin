import axios from '@/utils/request';

export async function getCustomer(params) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/customers/${params}.json`);} 

export async function changeN(id,params) {
  return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/customers/${id}.json`,
  {
    method: 'PUT',
    data:{...params}
  }
  );} 
