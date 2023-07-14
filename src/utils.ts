import axios from "axios";

export const sendData = async (resourceUrl: string, data: object) => {
  return await fetch(resourceUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const getResponse = async (method: string, url: string, data: any) => {
  return axios({
    method,
    url,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken") as string).access}`
    },
    data
  });
}