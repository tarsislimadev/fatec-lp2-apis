const getPathName = () => '/api/v1'

const getBaseURL = () => (window.location == 'localhost:5000' ? `http://localhost:5000` : `https://redesigned-garbanzo-6ww6gqr56vw24v7-5000.app.github.dev`) + getPathName();

export const config = {
  urls: {
    dogs: () => `${getBaseURL()}/dogs`,
    dog: (id) => `${getBaseURL()}/dogs/${id}`,
  },
  params: { method: 'GET', headers: { 'Accept': 'application/json' } },
}
