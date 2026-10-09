import { getPage, getModal, getDetailPage } from './fetch.js';

const setupInteractions = () =>
{
    document.querySelector('body')?.addEventListener('click', e =>
    {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const { action } = btn.dataset;
        const file  = btn.href.split('#')[1];
        if (action === 'content')
        {
            location.hash = '#' + file;
            getPage(file+'.html', action, file.charAt(0).toUpperCase() + file.slice(1));
        }
        if (action === 'modal') getModal(file+'.html');
        if (action === 'detail')
        {
            e.preventDefault();
            const url = btn.dataset.url;
            getDetailPage(url);
        }
    });
}

export { setupInteractions };