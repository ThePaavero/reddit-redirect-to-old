const App = () => {

  const currentUrl = window.location.href

  const notOnShittyNewVersion = () => {
    // return currentUrl.includes('old.') || !document.body.innerText.includes('You can always')
    return currentUrl.includes('old.') // Seems they dropped the "you can ALWAYS" element.
  }

  const init = () => {
    if (notOnShittyNewVersion()) {
      return
    }
    window.location.href = currentUrl.replace('www.', 'old.')
  }

  return {
    init
  }
}

// --------------------------------------------------------------------------------------------

chrome.extension.sendMessage({}, () => {
  const readyStateCheckInterval = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)
      App().init()
    }
  }, 10)
})
