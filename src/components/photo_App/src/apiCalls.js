export function getPhotos(pageNumber) {
  return fetch(`https://api.unsplash.com/photos?page=${pageNumber}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID zLVIxBK2dv_rjqrcFWzhKmdi16BCwDt4q2njXIUsQf4"
    }
  }).then(response => response.json());
}

export function searchPhotos(pageNumber, term) {
  return fetch(
    `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${term}`,
    {
      method: "GET",
      headers: {
        Authorization: "Client-ID zLVIxBK2dv_rjqrcFWzhKmdi16BCwDt4q2njXIUsQf4"
      }
    }
  ).then(response => response.json());
}
