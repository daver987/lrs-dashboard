import { mount } from '@vue/test-utils'
import Alert from '../Alert.vue'

describe('Alert', () => {
  it('renders properly', () => {
    const wrapper = mount(Alert, {
      props: { message: 'Good Job' },
    })
    expect(wrapper.text()).toContain('Good Job')
  })
})
