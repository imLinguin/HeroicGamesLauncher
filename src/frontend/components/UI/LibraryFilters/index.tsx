import React, { useContext } from 'react'
import ToggleSwitch from '../ToggleSwitch'
import { useTranslation } from 'react-i18next'
import LibraryContext from 'frontend/screens/Library/LibraryContext'
import { Category } from 'frontend/types'
import ContextProvider from 'frontend/state/ContextProvider'
import './index.css'

const RunnerToStore = {
  legendary: 'Epic Games',
  gog: 'GOG',
  nile: 'Amazon Games',
  sideload: 'Other',
  steam: 'Steam'
}

export default function LibraryFilters() {
  const { t } = useTranslation()
  const { platform, epic, gog, amazon, steam } = useContext(ContextProvider)
  const {
    setShowFavourites,
    setShowHidden,
    setShowInstalledOnly,
    setShowNonAvailable,
    showFavourites,
    showHidden,
    showInstalledOnly,
    showNonAvailable,
    storesFilters,
    setStoresFilters,
    platformsFilters,
    setPlatformsFilters,
    showSupportOfflineOnly,
    setShowSupportOfflineOnly
  } = useContext(LibraryContext)

  const toggleShowHidden = () => {
    setShowHidden(!showHidden)
  }

  const toggleShowNonAvailable = () => {
    setShowNonAvailable(!showNonAvailable)
  }

  const toggleOnlyFavorites = () => {
    setShowFavourites(!showFavourites)
  }

  const toggleOnlyInstalled = () => {
    setShowInstalledOnly(!showInstalledOnly)
  }

  const toggleOnlySupportOffline = () => {
    setShowSupportOfflineOnly(!showSupportOfflineOnly)
  }

  const toggleStoreFilter = (store: Category) => {
    const currentValue = storesFilters[store]
    const newFilters = { ...storesFilters, [store]: !currentValue }
    setStoresFilters(newFilters)
  }

  const togglePlatformFilter = (plat: string) => {
    const currentValue = platformsFilters[plat]
    const newFilters = { ...platformsFilters, [plat]: !currentValue }
    setPlatformsFilters(newFilters)
  }

  const setPlatformOnly = (plat: string) => {
    let newFilters = { win: false, linux: false, mac: false, browser: false }
    newFilters = { ...newFilters, [plat]: true }
    setPlatformsFilters(newFilters)
  }
  const setStoreOnly = (store: Category) => {
    let newFilters = {
      legendary: false,
      gog: false,
      nile: false,
      sideload: false,
      steam: false
    }
    newFilters = { ...newFilters, [store]: true }
    setStoresFilters(newFilters)
  }

  const toggleWithOnly = (toggle: JSX.Element, onOnlyClicked: () => void) => {
    return (
      <div className="toggleWithOnly">
        {toggle}
        <button className="only" onClick={() => onOnlyClicked()}>
          {t('header.only', 'only')}
        </button>
      </div>
    )
  }

  // t('platforms.browser', 'Browser')
  // t('platforms.linux', 'Linux')
  // t('platforms.mac', 'Mac')
  // t('platforms.win', 'Windows')
  const platformToggle = (plat: string) => {
    const toggle = (
      <ToggleSwitch
        key={plat}
        htmlId={plat}
        handleChange={() => togglePlatformFilter(plat)}
        value={platformsFilters[plat]}
        title={t(`platforms.${plat}`)}
      />
    )

    const onOnlyClick = () => {
      setPlatformOnly(plat)
    }

    return toggleWithOnly(toggle, onOnlyClick)
  }

  // t('Epic Games', 'Epic Games')
  // t('GOG', 'GOG')
  // t('Steam', 'Steam')
  // t('Amazon Games', 'Amazon Games')
  // t('Other', 'Other')
  const storeToggle = (store: Category) => {
    const toggle = (
      <ToggleSwitch
        key={store}
        htmlId={store}
        handleChange={() => toggleStoreFilter(store as Category)}
        value={storesFilters[store]}
        title={t(RunnerToStore[store])}
      />
    )
    const onOnlyClick = () => {
      setStoreOnly(store)
    }
    return toggleWithOnly(toggle, onOnlyClick)
  }

  const resetFilters = () => {
    setStoresFilters({
      legendary: true,
      gog: true,
      nile: true,
      steam: true,
      sideload: true
    })
    setPlatformsFilters({
      win: true,
      linux: true,
      mac: true,
      browser: true
    })
    setShowHidden(true)
    setShowNonAvailable(true)
    setShowFavourites(false)
    setShowInstalledOnly(false)
  }

  return (
    <div className="libraryFilters">
      <button className="selectStyle">{t('header.filters', 'Filters')}</button>
      <div className="dropdown">
        {epic.username && storeToggle('legendary')}
        {gog.username && storeToggle('gog')}
        {amazon.username && storeToggle('nile')}
        {steam.enabledUsers.length > 0 && storeToggle('steam')}
        {storeToggle('sideload')}

        <hr />

        {platformToggle('win')}
        {platform === 'linux' && platformToggle('linux')}
        {platform === 'darwin' && platformToggle('mac')}
        {platformToggle('browser')}

        <hr />

        <ToggleSwitch
          key="show-hidden"
          htmlId="show-hidden"
          handleChange={() => toggleShowHidden()}
          value={showHidden}
          title={t('header.show_hidden', 'Show Hidden')}
        />
        <ToggleSwitch
          key="show-non-available"
          htmlId="show-non-available"
          handleChange={() => toggleShowNonAvailable()}
          value={showNonAvailable}
          title={t('header.show_available_games', 'Show non-Available games')}
        />
        <ToggleSwitch
          key="only-favorites"
          htmlId="only-favorites"
          handleChange={() => toggleOnlyFavorites()}
          value={showFavourites}
          title={t('header.show_favourites_only', 'Show Favourites only')}
        />
        <ToggleSwitch
          key="only-installed"
          htmlId="only-installed"
          handleChange={() => toggleOnlyInstalled()}
          value={showInstalledOnly}
          title={t('header.show_installed_only', 'Show Installed only')}
        />
        <ToggleSwitch
          key="only-support-offline"
          htmlId="only-support-offline"
          handleChange={() => toggleOnlySupportOffline()}
          value={showSupportOfflineOnly}
          title={t(
            'header.show_support_offline_only',
            'Show offline-supported only'
          )}
        />
        <hr />
        <button
          type="reset"
          className="button is-primary"
          onClick={() => resetFilters()}
        >
          {t('header.reset', 'Reset')}
        </button>
      </div>
    </div>
  )
}
