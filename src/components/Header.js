/* globals $IS_DEVELOPMENT:false, $IS_STAGING:false, $BUILD_COMMIT_SHORT:false */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { makeBlogRoute } from '~/helpers/routeGen'
import useSelectorWithProps from '~/hooks/useSelectorWithProps'
import { selectCurrentUserHasScope, selectSession } from '~/store/selectors'

import Brand from '../../public/static/svg/brand.svg'
import { Nav, NavLink, SubNav } from './Nav'





// Component constants
const IS_DEV_OR_STAGING = $IS_DEVELOPMENT || $IS_STAGING
const BUILD_COMMIT_SHORT = $BUILD_COMMIT_SHORT


function SocialIcon (props) {
  const {
    href,
    title,
    ...restProps
  } = props

  return (
    <a
      className="button link"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}>
      <FontAwesomeIcon
        fixedWidth
        {...restProps} />
    </a>
  )
}


function Header () {
  const { loggedIn } = useSelector(selectSession)
  const userCanDispatch = useSelectorWithProps({ scope: 'dispatch.read' }, selectCurrentUserHasScope)

  return (
    <div id="HeaderContainer">
      <input
        aria-label="Navigation toggle"
        id="NavControl"
        type="checkbox" />

      <label className="burger button tall secondary" htmlFor="NavControl" id="Burger" title="Expand/Collapse Menu">
        <FontAwesomeIcon icon="bars" />
      </label>

      <header role="banner">
        <Link href="/">
          <a className="brand" title="Home">
            <div className="brand-animation-wrapper">
              <Brand id="brandSvg" />
            </div>
          </a>
        </Link>

        <Nav>
          <SubNav id="blog" title="Blog">
            <NavLink href="/blog">
              {'All'}
            </NavLink>

            <NavLink href={makeBlogRoute({ category: 138 })}>
              {'Stories, Art, & Toons'}
            </NavLink>
          </SubNav>
          <SubNav id="states" title="Rat Stats">
            <NavLink external href="https://grafana.fuelrats.com/d/H-iTUTPmz/public-statistics?refresh=1h&orgname=2">
              {'General'}
            </NavLink>

            <NavLink href="/leaderboard">
              {'Leaderboard'}
            </NavLink>
          </SubNav>
          <SubNav id="support" title="Support Us">
            <NavLink href="/donate">
              {'Donations'}
            </NavLink>

            <NavLink disabled external>
              {'Merch (Coming soon!)'}
            </NavLink>
          </SubNav>

          {
            loggedIn && (
              <SubNav id="ratlinks" title="Rat Links">
                {
                  userCanDispatch && (
                    <NavLink href="/dispatch">
                      {'Dispatch Board'}
                    </NavLink>
                  )
                }
                <NavLink external href="https://confluence.fuelrats.com/display/FRKB/Fuel+Rats+Knowledge+Base">
                  {'Knowledge Base'}
                </NavLink>
                <NavLink external href="https://t.fuelr.at/help">
                  {'Support Desk'}
                </NavLink>
              </SubNav>
            )
          }
        </Nav>

        <ul className="about-actions fa-ul">
          <NavLink className="button link" href="/terms-of-service">
            <FontAwesomeIcon fixedWidth icon="book" />
            {'Terms of Service'}
          </NavLink>
          <NavLink className="button link" href="/privacy-policy">
            <FontAwesomeIcon fixedWidth icon="user-secret" />
            {'Privacy Policy'}
          </NavLink>

          <NavLink className="button link" href="/acknowledgements">
            <FontAwesomeIcon fixedWidth icon="hands-helping" />
            {'Acknowledgements'}
          </NavLink>

          {
            IS_DEV_OR_STAGING && (
              <NavLink className="button link" href="/version">
                <FontAwesomeIcon fixedWidth icon="code-branch" />
                {BUILD_COMMIT_SHORT}
              </NavLink>
            )
          }
        </ul>

        <div className="social-actions">
          <SocialIcon
            href="https://www.twitter.com/FuelRats/"
            icon={['fab', 'twitter']}
            title="Fuel Rats on Twitter" />
          <SocialIcon
            href="https://www.reddit.com/r/FuelRats/"
            icon={['fab', 'reddit-alien']}
            title="Fuel Rats on Reddit" />
          <SocialIcon
            href="https://www.twitch.tv/fuelrats/"
            icon={['fab', 'twitch']}
            title="Fuel Rats on Twitch" />
          <SocialIcon
            href="https://www.github.com/FuelRats/"
            icon={['fab', 'github']}
            title="Fuel Rats on GitHub" />
          <SocialIcon
            href="https://forums.frontier.co.uk/showthread.php/150703-Out-of-Fuel-Explorer-Rescue-Service-The-Fuel-Rats"
            icon="space-shuttle"
            title="Fuel Rats on Frontier Forums"
            transform={{ rotate: -45 }} />
        </div>

        <ul className="join-actions">
          <NavLink className="button get-fuel" href="/i-need-fuel">
            {'Get Fuel'}
          </NavLink>
          {
            !loggedIn && (
              <NavLink className="button secondary" href="/register">
                {'Become a Rat'}
              </NavLink>
            )
          }
        </ul>
      </header>
    </div>
  )
}





export default Header
