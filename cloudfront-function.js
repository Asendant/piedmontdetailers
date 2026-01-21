// CloudFront Function to rewrite requests and prevent redirects
// This ensures that requests to "/" or paths without extensions
// are rewritten to serve index.html directly (no redirect)

function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // If URI ends with "/", append "index.html"
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // If URI doesn't contain a dot (no file extension), treat as directory
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    
    return request;
}
