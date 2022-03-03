import { mount } from '@vue/test-utils'
import QuoteCard from '../QuoteCard.vue'

describe('QuoteCard', () => {
  it('renders properly', () => {
    const wrapper = mount(QuoteCard, {
      props: { selectedServiceType: 'hourly' },
    })
    expect(wrapper.text()).toContain('hourly')
  })
})
