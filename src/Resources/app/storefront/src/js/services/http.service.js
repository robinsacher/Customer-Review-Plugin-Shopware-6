// XMLHttpRequest mit Standard-Headern erstellen
export function createXhr(method, url, csrfToken = null) {
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader('Accept', 'application/json');

    // CSRF-Token-Header wenn vorhanden
    if (csrfToken) {
        xhttp.setRequestHeader('X-CSRF-TOKEN', csrfToken);
    }
    return xhttp;
}