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
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
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
          Please add the specific conference you want to this url (after the /)
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
