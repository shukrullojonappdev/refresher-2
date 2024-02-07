window.onload = function (e) {
  // Check if it's a loadboard page
  if (!e.target.location.hostname.includes('relay.amazon.') && !e.target.location.pathname.includes('/loadboard/search')) return

  // Get multi work container and check if it not exists
  const multiWorkContainer = document.getElementById('multi-work-container');
  if (!multiWorkContainer) return

  // Get tab panel and check if it not exists
  const tabPanel = multiWorkContainer.querySelector('.tab-panel');
  if (!tabPanel) return

  tabPanel.onclick = e => renderControlPanel(e)
}

const renderControlPanel = (e) => {
  if (e.target.textContent.trim() === 'Load Board Home') return

  // Wait for utility bar
  let utilityBar
  let checkUtilityBar = setInterval(() => {
    // Get utility bar and check if it not exists
    utilityBar = document.getElementById('utility-bar')
    if (!utilityBar) return

    // Get default switch for refresh, check if it not exists and disable it
    const defaultSwitch = utilityBar.querySelector('.css-hkr77h')
    if (!defaultSwitch) return
    if (defaultSwitch.checked) defaultSwitch.click()

    const controlPanel = createControlPanel()
    utilityBar.children[0].prepend(controlPanel)

    clearInterval(checkUtilityBar)
  }, 150);
}

const createControlPanel = () => {
  const controlPanel = document.createElement('div')
  controlPanel.id = 'control-panel-refresher'

  controlPanel.innerHTML = `
    <div class="refresher__params">
      <div class="refresher-slider">
        <input type="range" min="1" max="100" value="50" class="refresher__slider" id="refresher-range">
        <p>Value: <span id="refresher-range-value"></span> | Time: <span id="refresher-range-time"></span></p>
      </div>
      <div class="refresher__params-row">
        <div class="refresher__params-col">
          <p class="refresher-sw">
            <label class="refresher__switch">
              <input type="checkbox">
              <span class="refresher__switch-slider round"></span>
            </label>
            <span>Show at the top</span>
          </p>
          <p class="refresher-sw">
            <label class="refresher__switch">
              <input type="checkbox">
              <span class="refresher__switch-slider round"></span>
            </label>
            <span>Easy book</span>
          </p>
        </div>
        <div class="refresher__params-col">
          <p class="refresher-sw">
            <label class="refresher__switch">
              <input type="checkbox">
              <span class="refresher__switch-slider round"></span>
            </label>
            <span>Show details</span>
          </p>
          <p class="refresher-sw">
            <label class="refresher__switch">
              <input type="checkbox">
              <span class="refresher__switch-slider round"></span>
            </label>
            <span>Auto book</span>
          </p>
        </div>
      </div>
    </div>
    <div>Btn</div>
  `
  return controlPanel
}