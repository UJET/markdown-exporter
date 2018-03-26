'use babel'

import { downloadChromium, shouldDownload, deleteOldChromiumRevisions } from '../api/convert/headlessChrome'
import { notification } from '../atom'
import { PACKAGE_NAME } from '../config'

export const downloadChromiumNotification = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const revisionStatus = await shouldDownload()
      if (revisionStatus !== 0) {
        let ui
        let success = false
        let detail = ''
        let description = ''
        let started = 0

        const progressId = `${PACKAGE_NAME}-dl-progress`
        const progressBarId = `${PACKAGE_NAME}-dl-progress-bar`
        const progressValueId = `${PACKAGE_NAME}-dl-progress-value`

        const formatBytes = (bytes, decimals) => {
          if (bytes === 0) {
            return '0 Bytes'
          }
          const k = 1024
          const dm = decimals || 2
          const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
          const i = Math.floor(Math.log(bytes) / Math.log(k))
          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        }

        const download = ({ target, path }) => {
          target.blur()
          if (started === 0) {
            const progressElement = document.getElementById(progressId)
            const progressBarElement = document.getElementById(progressBarId)
            const progressValueElement = document.getElementById(progressValueId)
            const progressCallback = (downloadedBytes, totalBytes) => {
              progressValueElement.innerHTML = `${formatBytes(downloadedBytes, 1)} / ${formatBytes(totalBytes, 1)}`
              progressBarElement.setAttribute('value', downloadedBytes)
              progressBarElement.setAttribute('max', totalBytes)
              progressElement.style.display = 'block'
            }
            started = 1
            target.setAttribute('disabled', 'disabled')
            target.classList.remove('icon-cloud-download')
            target.classList.add('icon-sync')
            path.forEach((elem) => {
              if (typeof elem.classList !== 'undefined' && elem.classList.contains('has-close')) {
                const close = elem.getElementsByClassName('close')
                const closeAll = elem.getElementsByClassName('close-all')
                if (close.length) {
                  close[0].style.display = 'none'
                }
                if (closeAll.length) {
                  closeAll[0].style.display = 'none'
                }
              }
            })
            downloadChromium(progressCallback)
              .then(async ({ revision }) => {
                success = true
                ui.dismiss()
                notification(`The download is complete! You can now use ${PACKAGE_NAME} with Chromium ${revision}`, 'success')
                const old = await deleteOldChromiumRevisions()
                if (old.length) {
                  old.forEach((oldRevision) => {
                    notification(`The old Chromium revision ${oldRevision} has been removed`)
                  })
                }
              })
              .catch((e) => {
                success = false
                ui.dismiss()
                notification(e, 'error')
              })
          }
        }

        const faq = ({ target }) => {
          target.blur()
          openExternal('https://github.com/GoogleChrome/puppeteer#faq')
        }

        if (revisionStatus !== 1) {
          detail += `A new Chromium version is available for download. Please start the update to revision ${revisionStatus}.\n`
        } else {
          detail += 'Chromium is required to create image captures and PDF documents from your Markdown files.\n'
        }
        detail += `${PACKAGE_NAME} bundles Chromium to ensure that the latest features it uses are guaranteed to be available.`
        description += `<div id="${progressId}" style="display: none;">`
        description += `<progress id="${progressBarId}" class="block" style="width: 100%;"></progress>`
        description += `<span id="${progressValueId}" class="inline-block highlight-info">0 bytes / 0 bytes</span>`
        description += `</div>`

        ui = notification(detail, 'info', {
          description,
          buttons: [
            { text: 'Start Download', onDidClick: download, className: `btn btn-success icon icon-cloud-download` },
            { text: 'FAQ', onDidClick: faq, className: `btn btn-info icon icon-info` }
          ],
          dismissable: true,
          icon: 'markdown'
        })

        ui.onDidDismiss(() => {
          resolve(success)
          if (!success) {
            notification(`The download notification will reappear the next time you use ${PACKAGE_NAME}`)
          }
        })
      } else {
        resolve(true)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default downloadChromiumNotification