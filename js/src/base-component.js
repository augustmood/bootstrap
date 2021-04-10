/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta3): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Data from './dom/data'
import {
  emulateTransitionEnd,
  execute,
  getTransitionDurationFromElement
} from './util/index'
import EventHandler from './dom/event-handler'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const VERSION = '5.0.0-beta3'

class BaseComponent {
  constructor(element) {
    element = typeof element === 'string' ? document.querySelector(element) : element

    if (!element) {
      return
    }

    this._element = element
    Data.set(this._element, this.constructor.DATA_KEY, this)
  }

  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY)
    this._element = null
  }

  _executeCallback(callback, element, isAnimated = false) {
    if (!isAnimated) {
      execute(callback)
      return
    }

    const transitionDuration = getTransitionDurationFromElement(element)
    EventHandler.one(element, 'transitionend', () => execute(callback))

    emulateTransitionEnd(element, transitionDuration)
  }

  /** Static */

  static getInstance(element) {
    return Data.get(element, this.DATA_KEY)
  }

  static get VERSION() {
    return VERSION
  }
}

export default BaseComponent
