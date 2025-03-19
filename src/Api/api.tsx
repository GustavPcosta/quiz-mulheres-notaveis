import axios from 'axios'


const api =  axios.create({
    baseURL: 'https://apis.codante.io/api/legado-feminino',
    headers: {
        'Content-Type': 'application/json',
       
        },
})


export default api