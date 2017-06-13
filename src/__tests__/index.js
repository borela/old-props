// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import React from 'react'
import { shallow } from 'enzyme'
import oldProps from '..'

@oldProps
class SomeComponent extends React.Component {
  render() {
    return <div>Ctrine!</div>
  }
}

const PROPERTIES_A = { a: 1 }
const PROPERTIES_B = { a: 1, b: 2 }
const PROPERTIES_C = { a: 1, b: 2, c: 3 }

describe('Decorator “oldProps” used on component without initial properties', () => {
  it('has the same constructor', () => {
    const WRAPPER = shallow(<SomeComponent/>)
    const INSTANCE = WRAPPER.instance()
    expect(Object.getPrototypeOf(INSTANCE).constructor)
      .toBe(SomeComponent)
  })

  it('saves the old properties on “oldProps” when they change', () => {
    const WRAPPER = shallow(<SomeComponent/>)
    const INSTANCE = WRAPPER.instance()

    expect(INSTANCE.oldProps)
      .toEqual(INSTANCE.props)

    WRAPPER.setProps(PROPERTIES_A)
    expect(INSTANCE.oldProps)
      .toEqual({})

    WRAPPER.setProps(PROPERTIES_B)
    expect(INSTANCE.oldProps)
      .toEqual(PROPERTIES_A)

    WRAPPER.setProps(PROPERTIES_C)
    expect(INSTANCE.oldProps)
      .toEqual(PROPERTIES_B)
  })
})

describe('Decorator “oldProps” used on component with initial properties', () => {
  it('has the same constructor', () => {
    const WRAPPER = shallow(<SomeComponent {...PROPERTIES_A}/>)
    const INSTANCE = WRAPPER.instance()
    expect(Object.getPrototypeOf(INSTANCE).constructor)
      .toBe(SomeComponent)
  })

  it('saves the old properties on “oldProps” when they change', () => {
    const WRAPPER = shallow(<SomeComponent {...PROPERTIES_A}/>)
    const INSTANCE = WRAPPER.instance()

    expect(INSTANCE.oldProps)
      .toEqual(INSTANCE.props)

    WRAPPER.setProps(PROPERTIES_B)
    expect(INSTANCE.oldProps)
      .toEqual(PROPERTIES_A)

    WRAPPER.setProps(PROPERTIES_C)
    expect(INSTANCE.oldProps)
      .toEqual(PROPERTIES_B)
  })
})