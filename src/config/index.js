const protocol     = 'http://'
const host         = 'localhost'
const pathEndPoint = 'dctb-wp-react-boilerplate/public/api/wp-json/wp'
const pathAjax     = 'dctb-wp-react-boilerplate/public/api/wp-admin/admin-ajax.php'
const version      = 'v2'

const urlEndpoint = `${protocol}${host}/${pathEndPoint}/${version}/`
const urlAjax     = `${protocol}${host}/${pathAjax}?action=`

export const endpoints = {
    'movies': `${urlEndpoint}movies`,
    'musics': `${urlEndpoint}musics`
}

export const ajax = {
    'form': `${urlAjax}send_contact`
}