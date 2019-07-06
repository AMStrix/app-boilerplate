import React from 'react';

interface Props {
  error: Error;
}

export default class PageError extends React.Component<Props> {
  render() {
    const { error } = this.props;
    const emailBody = `
--------------- type comments above this line ---------------
gitHash: ${GIT_HASH}
gqlUrl: ${GQL_URL}
--------------------------- ERROR ---------------------------
${error.stack}
    `;

    // TODO: email addy
    const email = encodeURI(
      `mailto:admin@email.com?subject=Error Report&body=${emailBody}`,
    );
    return (
      <div className="PageError">
        <div>
          <h1>Uh oh.</h1>
          <p>Something unexpected has occured and we've logged the following error:</p>
          <pre>{this.props.error.toString()}</pre>
          <p>
            You may attempt to resolve the issue by reloading the page, or contact support
            to report the issue.
          </p>
          <div className="PageError-controls">
            <a href={window.location.href}>Reload</a>
            <a href={email}>Report issue</a>
          </div>
        </div>
      </div>
    );
  }
}
