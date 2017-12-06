import { h, Component, render } from 'preact';

export default class Error extends Component<any, any> {
  render() {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: 'calc(100% - 16px)',
          fontFamily:
            'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div>
          <img
            src="/img/talksearch.svg"
            style={{ display: 'inline-block', height: '3em' }}
          />
          <p>Welcome to TalkSearch</p>
        </div>
        <p>
          please provide an{' '}
          <code style={{ fontFamily: 'DejaVu, Consolas, monospace' }}>i</code>{' '}
          query string for your provided index name.
        </p>
        <p>
          If you want to sign up, please see{' '}
          <a href="https://community.algolia.com/talksearch" target="_blank">
            the main page
          </a>.
        </p>
      </main>
    );
  }
}
