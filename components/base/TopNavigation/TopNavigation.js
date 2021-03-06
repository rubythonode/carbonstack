import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as sessionActions
} from '../../../lib/redux/modules/session'
import media, { largeBreakpoint } from '../../../lib/styles/media'
import NewButton from './NewButton'
import LogoLink from './LogoLink'
import Profile from './Profile'
import SignInButton from './SignInButton'

class TopNavigation extends React.PureComponent {
  onSignInViaGithubButtonClick = () => {
    this.props.actions.requestSignIn('github')
  }

  onSignOutButtonClick = () => {
    this.props.actions.requestSignOut()
  }

  render () {
    const {
      route,
      session
    } = this.props
    const isGroupRoute = route.pathname.match(/^\/group/)

    return <nav>
      <div className='container'>
        <div className='left'>
          <LogoLink />
        </div>

        <div className='right'>
          {isGroupRoute &&
            <NewButton route={route} />
          }
          {this.props.session.user == null ||
            <Profile
              user={this.props.session.user}
              onSignOutButtonClick={this.onSignOutButtonClick}
            />
          }
          {this.props.session.user == null &&
            <SignInButton
              onClick={this.onSignInViaGithubButtonClick}
              isSigningIn={session.isSigningIn}
            />
          }
        </div>
      </div>
      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          background-color: rgba(255,255,255,0.8);
          height: 50px;
          width: 100%;
          ${media.small(`
            .hiddenSmall {
              display: none;
            }
          `)}
        }
        .container {
          width: 100%;
          max-width: ${largeBreakpoint}em;
          margin: 0 auto;
          display: flex;
        }
        .left {
          flex: 1;
        }
        .right {
          display: flex;
        }
      `}</style>
    </nav>
  }
}

const mapStateToProps = ({session, route}) => {
  return {
    session,
    route
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation)
