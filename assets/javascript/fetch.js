import { BASE_URL } from "./base.js";
import { modalOpen } from "./modal.js";
import { setupInteractions } from './nav.js';

const getData = async (url) => 
{
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        return resp.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }    
}
const getText = async (url) =>
{
    try {
        const page = await fetch(BASE_URL + url);
        if (!page.ok) throw new Error(`HTTP error! status: ${page.status}`);
        return page.text();
    } catch (error) {
        console.error('Error fetching text:', error);
        throw error;
    }
}
const getModal = async (url) => 
{
    try {
        const data = await getText(url);
        modalOpen(data);
    } catch (error) {
        console.error('Error fetching modal content:', error);
    }
}
const getPage = async (url,id,title="Template Base") => 
{
    document.getElementById(id).innerHTML = `<div class="spinner">loading</div>`;
    document.title = title;
    try {
        const data = await getText(url);
        document.getElementById(id).innerHTML = data;
        setupInteractions();
    } catch (error) {
        document.getElementById(id).innerHTML = `<p>Error loading content.</p>`;        
    }    
}
const getDetailPage = async (url) =>
{
    try {
        const data = await getData(url);
        const response = await fetch(BASE_URL + 'detail.html');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const detailPageContent = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(detailPageContent, 'text/html');
        doc.getElementById('pokemon-name').textContent = data.name;
        doc.getElementById('pokemon-id').textContent = `#${data.id}`;
        doc.getElementById('pokemon-img').src = data.sprites.other.dream_world.front_default;
        doc.getElementById('pokemon-experience').textContent = data.base_experience;
        doc.getElementById('pokemon-height').textContent = data.height;
        doc.getElementById('pokemon-weight').textContent = data.weight;
        doc.getElementById('pokemon-order').textContent = data.order;
        return modalOpen(doc.documentElement.outerHTML);        
    } catch (error) {
        console.error('Error fetching detail page content:', error);
        throw error;
    }
}

export { getPage, getData, getModal, getDetailPage };