let refresherStatus = false, refreshTime = 0, sot = false, eb = false, sd = false, au = false, interval, priceChange = 0
const COLOR = '#a3cef0', NOTIFY_SOUND_SRC = chrome.runtime.getURL('assets/n.mp3'), NOTIFY_SOUND = new Audio(NOTIFY_SOUND_SRC)

window.onload = (e) => {
  // Check if it's a loadboard page
  if (!e.target.location.hostname.includes('relay.amazon.') && !e.target.location.pathname.includes('/loadboard/search')) return

  // Get multi work container and check if it not exists
  const multiWorkContainer = document.getElementById('multi-work-container');
  if (!multiWorkContainer) return

  // Get tab panel and check if it not exists 
  const tabPanel = document.getElementsByClassName('tab-panel')[0];
  const searchPanel = document.getElementsByClassName('search__panel')[0];
  const savedSearches = document.getElementsByClassName('css-1oino5a')[0];

  if (!tabPanel) {
    if (!searchPanel) return
    searchPanel.onclick = () => {
      setTimeout(() => {
        const popover = document.getElementById('popover-2')
        if (!popover) return
        popover.onclick = (e) => {
          if (e.target.textContent.includes('Load Board Home')) return
          renderControlPanel()
        }
      }, 300)
    }
    savedSearches.onclick = () => {
      setTimeout(() => {
        renderControlPanel()
      }, 300)
    }
    renderOnWindowResizeWhenSearchPanel()
    return
  }

  tabPanel.onclick = e => {
    if (e.target.textContent.trim() === 'Load Board Home') return
    renderControlPanel()
  }

  savedSearches.onclick = () => {
    setTimeout(() => {
      renderControlPanel()
    }, 300)
  }
  renderOnWindowResizeWhenTabPanel()
}

// Rerender control panel if window resized
const renderOnWindowResizeWhenTabPanel = () => {
  return window.onresize = () => {
    refresherStatus = false
    const stopBtn = document.getElementById('refresher-stop')
    const startBtn = document.getElementById('refresher-start')
    stopBtn && (stopBtn.style.display = 'none')
    startBtn && (startBtn.style.display = 'block')
    renderEB()

    const activeTab = document.getElementsByClassName('active')[0];
    if (!activeTab) {
      const searchPanel = document.getElementsByClassName('search__panel')[0];
      if (!searchPanel) return
      searchPanel.onclick = () => {
        setTimeout(() => {
          const popover = document.getElementById('popover-2')
          if (!popover) return
          popover.onclick = (e) => {
            if (e.target.textContent.includes('Load Board Home')) return
            renderControlPanel()
          }
        }, 300)
      }
      if (searchPanel.textContent.includes('Load Board Home')) return
      const controlPanel = document.getElementById('control-panel-refresher')
      if (controlPanel) return
      renderControlPanel()
      return
    }
    if (activeTab.textContent.trim() === 'Load Board Home') return
    const controlPanel = document.getElementById('control-panel-refresher')
    if (controlPanel) return
    renderControlPanel()
  }
}

const renderOnWindowResizeWhenSearchPanel = () => {
  return window.onresize = () => {
    refresherStatus = false
    const stopBtn = document.getElementById('refresher-stop')
    const startBtn = document.getElementById('refresher-start')
    stopBtn && (stopBtn.style.display = 'none')
    startBtn && (startBtn.style.display = 'block')
    renderEB()

    const activeTab = document.getElementsByClassName('active')[0];
    if (!activeTab) {
      const searchPanel = document.getElementsByClassName('search__panel')[0];
      if (!searchPanel) return
      if (searchPanel.textContent.includes('Load Board Home')) return
      const controlPanel = document.getElementById('control-panel-refresher')
      if (controlPanel) return
      renderControlPanel()
      return
    }
    const tabPanel = document.getElementsByClassName('tab-panel')[0];
    tabPanel.onclick = e => {
      if (e.target.textContent.trim() === 'Load Board Home') return
      renderControlPanel()
    }
    if (activeTab.textContent.trim() === 'Load Board Home') return
    const controlPanel = document.getElementById('control-panel-refresher')
    if (controlPanel) return
    renderControlPanel()
  }
}

const renderControlPanel = () => {
  sot = false
  eb = false
  sd = false
  au = false

  // Wait for utility bar
  let utilityBar = document.getElementById('utility-bar')
  if (!utilityBar) {
    let checkUtilityBar = setInterval(() => {
      // Get utility bar and check if it not exists
      utilityBar = document.getElementById('utility-bar')
      if (!utilityBar) return

      createControlPanel().then(res => {
        const controlPanel = res
        utilityBar.children[0].prepend(controlPanel)
        renderRefresherActionBtns()
        changeSliderValue()
        priceChangeInput()
        switchEvents()

        // Get default switch for refresh, check if it not exists and disable it
        const defaultSwitch = utilityBar.querySelector('.css-hkr77h')
        if (defaultSwitch) {
          if (defaultSwitch.ariaChecked === 'true') defaultSwitch.click()
        }
        clearInterval(checkUtilityBar)
      })
    }, 150);
  } else {
    const controlPanel = document.getElementById('control-panel-refresher')
    if (controlPanel) controlPanel.remove()
    createControlPanel().then(res => {
      const controlPanel = res
      utilityBar.children[0].prepend(controlPanel)
      renderRefresherActionBtns()
      changeSliderValue()
      priceChangeInput()
      switchEvents()

      setTimeout(() => {
        // Get default switch for refresh, check if it not exists and disable it
        const defaultSwitch = utilityBar.querySelector('.css-hkr77h')
        if (defaultSwitch) {
          if (defaultSwitch.ariaChecked === 'true') defaultSwitch.click()
        }
      }, 300)
    })
  }
}

const createControlPanel = async () => {
  const controlPanel = document.createElement('div')
  controlPanel.id = 'control-panel-refresher'
  const onBtn = chrome.runtime.getURL('assets/onBtn2.png')
  const offBtn = chrome.runtime.getURL('assets/offBtn.png')

  // Refresher params
  controlPanel.innerHTML = `
    <div class="refresher__params">
      <div class="refresher-slider">
        <input type="range" min="600" max="2400" value="300" step="100" class="refresher__slider" id="refresher-range">
        <p>Value: <span id="refresher-range-value"></span> ms</p>
      </div>
      <div class="refresher__params-row">
        <div class="refresher__params-col">
          <p class="refresher-sw">
            <label class="refresher__switch">
              <input type="checkbox">
              <span class="refresher__switch-slider round" id="sot"></span>
            </label>
            <span>Show at the top</span>
          </p>
          <p class="refresher-sw">
            <label class="refresher__switch">
              <input type="checkbox">
              <span class="refresher__switch-slider round" id="eb"></span>
            </label>
            <span>Easy book</span>
          </p>
        </div>
        <div class="refresher__params-col">
          <p class="refresher-sw">
            <label class="refresher__switch">
              <input type="checkbox">
              <span class="refresher__switch-slider round" id="sd"></span>
            </label>
            <span>Show details</span>
          </p>
          <p class="refresher-sw">
            <label class="refresher__switch">
              <input type="checkbox">
              <span class="refresher__switch-slider round" id="au"></span>
            </label>
            <span>Auto book</span>
          </p>
        </div>
      </div>
      <div style="max-width: 150px" class="css-rioogt"><div class="css-381xv2" mdn-input-box=""><div class="css-14lg5yy"><div class="css-7dv6qn"><input class="css-ayvxqa" id="price-change" type="number" placeholder="Price change"></div></div></div></div>
    </div>
    <div class="refresher__action-row">
      <img class="refresher__action-btn" id="refresher-start" src="${onBtn}" alt="start">
      <img class="refresher__action-btn" id="refresher-stop" src="${offBtn}" alt="stop">
    </div>
  `
  return controlPanel
}

// Start and stop buttons
const renderRefresherActionBtns = () => {
  const stopBtn = document.getElementById('refresher-stop')
  const startBtn = document.getElementById('refresher-start')
  const refreshButton = document.getElementsByClassName('css-q7ppch')[0]

  if (!refresherStatus) {
    stopBtn.style.display = 'none'
    startBtn.style.display = 'block'
  } else {
    stopBtn.style.display = 'block'
    startBtn.style.display = 'none'
  }

  document.onclick = (e) => {
    const refresher = document.getElementById('control-panel-refresher')
    if (!refresher) {
      setTimeout(() => {
        const utilityBar = document.getElementsByClassName('utility-bar')[0];
        if (!utilityBar) return
        renderControlPanel()
      })
    } else {
      renderEB()
    }

    if (e.target != refreshButton && e.target != refreshButton.childNodes[0] && refresherStatus) {
      clearInterval(interval)
      refresherStatus = false
      stopBtn.style.display = 'none'
      startBtn.style.display = 'block'
      return
    }
    if (e.target.id === startBtn.id) {
      refresherStatus = true
      stopBtn.style.display = 'block'
      startBtn.style.display = 'none'
      runInterval(refreshButton)
      return
    }
  }
}

const changeSliderValue = () => {
  const slider = document.getElementById("refresher-range");
  const output = document.getElementById("refresher-range-value");
  output.innerHTML = slider.value;
  refreshTime = slider.value

  slider.oninput = function () {
    output.innerHTML = this.value;
    refreshTime = this.value
  }
}

const priceChangeInput = () => {
  const priceInput = document.getElementById('price-change')
  priceInput.oninput = () => {
    priceChange = priceInput.value
  }
}

// Event listeners
const switchEvents = () => {
  const sotEl = document.getElementById('sot')
  const ebEl = document.getElementById('eb')
  const sdEl = document.getElementById('sd')
  const auEl = document.getElementById('au')
  sotEl.onclick = () => {
    sot = !sot
  }
  ebEl.onclick = () => {
    eb = !eb
    renderEB()
  }
  sdEl.onclick = () => {
    sd = !sd
  }
  auEl.onclick = () => {
    au = !au
  }
}

// Refresher main logic functions
const refreshLoads = (e) => {
  // Get refresh button and check if it not exists
  if (!e) return
  e.click()

}

const runInterval = (refreshButton) => {
  let firstTime = true
  let loads = {}
  let newLoads = {}
  const stopBtn = document.getElementById('refresher-stop')
  const startBtn = document.getElementById('refresher-start')

  if (refresherStatus) {
    interval = setInterval(async () => {
      // Checking load list in start
      const loadList = document.getElementsByClassName('load-list')[0]
      if (!loadList || loadList.length === 0) return

      // First refresh interval
      if (firstTime) {
        if (Object.entries(loads).length === 0) {
          loads = createSet(loadList)
          newLoads = {}
        }
        firstTime = false
        refreshLoads(refreshButton)
        return
      }
      const tempLoads = createSet(loadList)

      // Stop interval when loads changed
      newLoads = await getNewLoads(tempLoads, loads)
      if (Object.entries(newLoads).length > 0) {
        clearInterval(interval)
        firstTime = true
        loads = {}
        if (sot) {
          newLoadsToTop(newLoads, loadList)
        }
        if (sd) {
          renderEB()
        }
        if (au) {
          autoBook()
        }
        changeBgColorNewLoads(newLoads)
        stopBtn.style.display = 'none'
        startBtn.style.display = 'block'
        const notify = NOTIFY_SOUND.play()
        if (notify !== undefined) {
          notify.then(_ => {
            console.log('Playback started');
          }).catch(error => {
            console.log(error);
          });
        }
        return
      }

      refreshLoads(refreshButton)
    }, refreshTime)
  }
}

const createSet = (list) => {
  let loads = {}

  list.childNodes.forEach(e => {
    loads[e.childNodes[0].id.trim()] = e.getElementsByClassName('css-11tnikh')[1].textContent.trim().replace(/\$|\,/gi, '');
  })

  return loads
}

const getNewLoads = async (tempLoads, loads) => {
  if (!tempLoads || !loads) return
  let newLoads = {};
  Object.entries(tempLoads).forEach(([key, _value]) => {
    if (!(loads[`${key}`] !== undefined)) {
      newLoads[`${key}`] = tempLoads[`${key}`]
      return
    }
    if (Number(tempLoads[`${key}`]) <= Number(loads[`${key}`])) return
    const a = Number(tempLoads[`${key}`])
    const b = Number(loads[`${key}`])
    const res = a - b
    if (res < Number(priceChange)) return
    newLoads[`${key}`] = tempLoads[`${key}`]
  })
  return newLoads
}

const changeBgColorNewLoads = async (newLoads) => {
  if (!newLoads) return
  Object.entries(newLoads).forEach(([key, _value]) => {
    const load = document.getElementById(`${key}`).parentNode
    if (load) {
      load.style.backgroundColor = COLOR
    }
  })
}

const newLoadsToTop = (newLoads, loadList) => {
  if (!newLoads || !loadList || loadList.length === 0 || newLoads.size === 0) return
  Object.entries(newLoads).forEach(([key, _value]) => {
    const elem = document.getElementById(`${key}`).parentNode
    if (!elem) return
    loadList.insertBefore(elem, loadList.childNodes[0])
  })
}

const showLoadDetails = () => {
  const loadList = document.getElementsByClassName('load-list')[0]
  if (!loadList || loadList.length === 0) return
  loadList.childNodes[0].childNodes[0].click()
}

const renderEB = () => {
  eb ?
    loadsEasyBook()
    : removeEasyBookBtns()
}

const loadsEasyBook = () => {
  let loadList = document.getElementsByClassName('load-list')[0]
  if (!loadList) {
    let interval = setInterval(() => {
      loadList = document.getElementsByClassName('load-list')[0]
      if (!loadList) return
      if (loadList.length === 0) {
        clearInterval(interval)
        return
      }
      loadList.childNodes.forEach((e) => {
        const btn = createBtn()
        if (e.getElementsByClassName('ebBtn')[0]) return
        e.childNodes[0].childNodes[0].appendChild(btn)
      });
      clearInterval(interval)
    }, 150)
  } else {
    loadList.childNodes.forEach((e) => {
      const btn = createBtn()
      if (e.getElementsByClassName('ebBtn')[0]) return
      e.childNodes[0].childNodes[0].appendChild(btn)
    });
  }
}

const removeEasyBookBtns = () => {
  const loadList = document.getElementsByClassName('load-list')[0]
  if (!loadList || loadList.length === 0) return

  loadList.childNodes.forEach((e) => {
    if (!e.getElementsByClassName('ebBtn')[0]) return
    e.getElementsByClassName('ebBtn')[0].remove()
  });
}

const autoBook = () => {
  let loadList = document.getElementsByClassName('load-list')[0]
  if (!loadList) {
    let interval = setInterval(() => {
      loadList = document.getElementsByClassName('load-list')[0]
      if (!loadList) return
      if (loadList.length === 0) {
        clearInterval(interval)
        return
      }
      loadList.childNodes[0].childNodes[0].click()
      loadList.childNodes[0].childNodes[0].onclick = () => {
        let woBookButton = document.getElementsByClassName('wo-book-button')[0]
        if (!woBookButton) {
          let interval = setInterval(() => {
            woBookButton = document.getElementsByClassName('wo-book-button')[0]
            if (!woBookButton) return
            clickBookBtn(woBookButton)
            clearInterval(interval)
          })
        } else {
          clickBookBtn(woBookButton)
        }
      }
      clearInterval(interval)
    }, 150)
  } else {
    loadList.childNodes[0].childNodes[0].click()
    loadList.childNodes[0].childNodes[0].onclick = () => {
      let woBookButton = document.getElementsByClassName('wo-book-button')[0]
      if (!woBookButton) {
        let interval = setInterval(() => {
          woBookButton = document.getElementsByClassName('wo-book-button')[0]
          if (!woBookButton) return
          clickBookBtn(woBookButton)
          clearInterval(interval)
        })
      } else {
        clickBookBtn(woBookButton)
      }
    }
  }
}

const createBtn = () => {
  const ebBtn = document.createElement('button')
  ebBtn.textContent = 'EasyBook'
  ebBtn.classList.add('ebBtn')

  ebBtn.onclick = () => {
    let woBookButton = document.getElementsByClassName('wo-book-button')[0]
    if (!woBookButton) {
      let interval = setInterval(() => {
        woBookButton = document.getElementsByClassName('wo-book-button')[0]
        if (!woBookButton) return
        clickBookBtn(woBookButton)
        clearInterval(interval)
      }, 150)
    } else {
      clickBookBtn(woBookButton)
    }
  }

  return ebBtn
}

const clickBookBtn = (woBookButton) => {
  woBookButton.click()
  woBookButton.onclick = () => {
    let confirmBtn = document.getElementsByClassName('css-n0loux')[0]
    if (!confirmBtn) {
      let interval = setInterval(() => {
        confirmBtn = document.getElementsByClassName('css-n0loux')[0]
        if (!confirmBtn) return
        confirmBtn.click()
        clearInterval(interval)
      }, 150)
    } else {
      confirmBtn.click()
    }
  }
}
