import axios from 'axios';




export const fetchData =async (method,url,baseuri,payload,token) => {
 
  let config = {
    method,
    maxBodyLength: Infinity,
    url:  `${baseuri ? baseuri : "http://localhost:5000/"}${url}`,
    headers: { 
      'Authorization': `Bearer ${token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJhdmk0MjI0NCIsInVzZXJJRCI6IjJjOGEzNGNkLWU4MWEtNDFlOC05YTlkLTFlYzdlOWM3MGFmZSIsImNvbXBhbnlJRCI6InNoYW5rYXJpbmR1c3RyaWVzNzkwMzkwNDcwOSIsImlhdCI6MTcwNzM4NTg5NX0.ymAdVrOnjlgTCC34eebwkpv9u4p-LI5uHNRFQ-eo4GQ"}`
    },
    data:payload
  };

 try {
  const res = await axios.request(config)
  return(res?.data)
 } catch (error) {
  return({error})
 }
 

}

 