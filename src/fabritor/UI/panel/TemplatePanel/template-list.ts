const turl = 'https://cdn.jsdelivr.net/gh/sleepy-zone/fabritor-assets/template/list_2.json';

export default function getTemplateList () {
  return fetch(`${turl}?t=${Date.now()}`)
    .then(res => res.json());
}

export async function getTemplate (url) {
  return fetch(`${url}?t=${Date.now()}`)
  .then(res => res.json());
}