const getPathName = () => '/api/v1'

const getBaseURL = () => {
  const { hostname, port, protocol, origin } = window.location

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000' + getPathName()
  }

  if (port && port !== '5000') {
    return `${protocol}//${hostname}:5000` + getPathName()
  }

  return 'https://redesigned-garbanzo-6ww6gqr56vw24v7-5000.app.github.dev' + getPathName()
}

export const config = {
  urls: {
    dogs: () => `${getBaseURL()}/dogs`,
    dog: (id) => `${getBaseURL()}/dogs/${id}`,
  },
  params: { method: 'GET', headers: { 'Accept': 'application/json' } },
}
