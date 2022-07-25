import { mount , createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VehicleForm from '../components/forms/VehicleForm.vue'
describe('VehicleForm', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('Form Mounted', async () => {
    const wrapper = mount(VehicleForm,{
      localVue,
      vuetify,
      propsData:{
        vehicleEdit:{
          _id: 0,
        }
      },
    })
    wrapper.vm.openDialog();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialog.dVehicle).toBe(true)
    const inputModelo =  wrapper.find('#modelo');
    expect(inputModelo.exists()).toBe(true)


    // const input = wrapper.html()
    // console.log(input)
    // console.log(wrapper.vm)
    // expect(bar.exists()).toBe(true)
    // arrayInput.map((input) => {

    //   console.log(input)
    // })
    // expect(wrapper.).toBeTruthy()
  })
})
