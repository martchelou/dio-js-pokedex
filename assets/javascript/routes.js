import { getPage } from './fetch.js'

switch (location.hash)
{
    case '':
        getPage('home.html','content','Home');
        break;
    default:
        throw new Error('Eita!!! A rota não existe');
        break;
}