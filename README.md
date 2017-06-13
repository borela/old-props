Decorator for ReactJS components that saves the old properties before it gets updated.

## Installation

```sh
npm install --save old-props
```

## Usage

```js
import React, { Component } from 'react'
import oldProps from 'old-props'

@oldProps
class SomeComponent extends Component {
  render() {
    let previousProps = this.oldProps
    let currentProps = this.props
    // ...
  }
}

```
