import axios from '@/utils/request';

export async function getCustomers(params) {
  return await axios('https://mirror.viralbox.org/xuzyy/admin/api/2019-10/customers.json',{
      params  
  });}  
  export async function removeCustomer(params) {
    return await axios(`https://mirror.viralbox.org/xuzyy/admin/api/2019-10/customers/${params}.json`, {
      method: 'DELETE',
    });
  }
