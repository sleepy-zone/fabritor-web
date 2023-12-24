const BASEURL = 'https://pixabay.com/api/?key=41215817-69c7233a9ee7dd6034b07989b';

export const fetchPhotos = (type) => {
  return fetch(`${BASEURL}&image_type=${type}&per_page=14`).then((res) => {
    return res.json();
  }).then((res) => {
    return (res.hits || []).map(item => {
      return {
        ...item,
        cover: item.webformatURL
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}