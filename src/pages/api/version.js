/* globals
    $BUILD_BRANCH:false
    $BUILD_COMMIT:false
    $BUILD_DATE:false
    $BUILD_URL:false
    $NODE_VERSION:false
    $NEXT_BUILD_ID:false
*/


import pkgFile from '../../../package.json'

const BUILD_BRANCH = $BUILD_BRANCH
const BUILD_COMMIT = $BUILD_COMMIT
const BUILD_DATE = $BUILD_DATE
const BUILD_URL = $BUILD_URL
const NODE_VERSION = $NODE_VERSION
const NEXT_BUILD_ID = $NEXT_BUILD_ID

const { version: appVersion } = pkgFile




export default function version (req, res) {
  res.setHeader('Content-Type', 'application/vnd.api+json')
  res.end(JSON.stringify({
    data: {
      id: NEXT_BUILD_ID,
      type: 'frWebBuilds',
      attributes: {
        branch: BUILD_BRANCH || 'develop',
        builtOn: BUILD_DATE || null,
        builtAt: BUILD_URL || null,
        commit: BUILD_COMMIT || null,
        versions: {
          app: `v${appVersion}`,
          node: NODE_VERSION,
        },
      },
    },

  }))
}
