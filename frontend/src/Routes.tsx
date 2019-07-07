import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, RouteComponentProps, withRouter } from 'react-router';
import { setupPage, normalize } from 'csstips';

import { Route } from 'components/Route';
import { Layout } from 'components/Layout';
import { PageLogin } from 'components/PageLogin';
import { PageRegister } from 'components/PageRegister';
import { PageLogout } from 'components/PageLogout';
import { PageDashboard } from 'components/PageDashboard';
import { PageUsers } from 'components/PageUsers';

// markdown pages
// import PageMarkdown from 'components/PageMarkdown';
// import TOS from 'static/markdown/TOS.md';
// import PRIVACY from 'static/markdown/PRIVACY.md';

// import 'styles/style.less';

setupPage('#root');
normalize();

type Props = RouteComponentProps<any>;

class RoutesNaked extends React.Component<Props> {
  render() {
    return (
      <Layout>
        <Switch>
          <Route
            path="/login"
            failTo="/dashboard"
            guestOnly
            exact
            component={PageLogin}
          />
          <Route path="/register" guestOnly exact component={PageRegister} />
          <Route path="/logout" guestOnly exact component={PageLogout} />
          <Route path="/users" authOnly exact component={PageUsers} />
          <Route path="/dashboard" authOnly exact component={PageDashboard} />
          {/* <Route path="/import" exact component={PageImport} />
          <Route path="/send" exact component={PageSend} />
          <Route path="/receive" exact component={PageReceive} />
          <Route path="/history" exact component={PageHistory} />
          <Route path="/addresses" exact component={PageAddresses} />

          <Route path="/tos" exact render={() => <PageMarkdown html={TOS} />} />
          <Route path="/privacy" exact render={() => <PageMarkdown html={PRIVACY} />} /> */}

          {/* <Redirect exact from="/" to="/send" /> */}

          <Route path="*" render={() => <div>Page not found</div>} />
        </Switch>
      </Layout>
    );
  }
}

export const Routes = hot(withRouter(RoutesNaked));
