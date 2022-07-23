<template>
  <v-dialog v-model="dialog.dVehicle" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ vehicle._id === 0 ? 'Nuevo ' : 'Editar ' }} Vehiculo
      </v-card-title>

      <v-card-text>
        <br />
        <v-form ref="form" lazy-validation>
          <v-autocomplete
            v-model="vehicle.marca"
            :items="marcas"
            :rules="[(v) => !!v || 'Marca es requerido']"
            outlined
            dense
            label="Marca"
          ></v-autocomplete>
          <v-autocomplete
            v-model="vehicle.modelo"
            :items="years"
            :rules="[(v) => !!v || 'Modelo es requerido']"
            outlined
            dense
            label="Modelo"
          ></v-autocomplete>
          <v-select
            v-model="vehicle.color"
            :items="colors"
            label="Color"
            item-text="label"
            :rules="[(v) => !!v || 'Color es requerido']"
            required
            outlined
            dense
          ></v-select>

          <v-text-field
            v-model="vehicle.asignado"
            label="Asignado"
            required
            :rules="[(v) => !!v || 'Necesita ser asignado']"
            dense
            outlined
          ></v-text-field>

          <v-checkbox
            v-model="vehicle.estado"
            label="Estado"
            required
          ></v-checkbox>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
             <v-btn color="primary" text @click="dialog.dVehicle=false,close()"> Cancelar </v-btn>
        <v-btn color="primary" text @click="save()"> Agregar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Data, defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { dialog } from '../../commons/share/state/dialog'
import { marcas, years, colors } from '../../commons/share/catalogue'

import { vehiclesService } from '../../commons/services'
import { Vehicle } from '../../commons/types/vehicles.model'
export default defineComponent({
  // middleware: "authRedirect",
  props: {
    vehicleEdit: {
      type: Object,
      required: false,
    },
  },
  setup(props: Data, { emit }) {
    const form = ref()
    const vehicle = ref<Vehicle>({
      _id: 0,
      marca: '',
      modelo: '',
      color: '',
      fechaIngreso: '',
      estado: true,
      asignado: '',
    })
    watch(
      () => dialog.dVehicle,
      () => {
        if (props.vehicleEdit._id) {
          const data = props.vehicleEdit as unknown as Vehicle
          vehicle.value = { ...data }
        }
      }
    )

    const close = () => {
      vehicle.value = {
        _id: 0,
        marca: '',
        modelo: '',
        color: '',
        fechaIngreso: '',
        estado: true,
        asignado: '',
      }
      emit('cancel')
    }
    const save = async () => {
      if (form.value.validate()) {
        if (vehicle.value._id === 0) {
          const data = { ...vehicle.value }
          delete data._id
          data.fechaIngreso = new Date().toLocaleString()
          const newData = await vehiclesService.saveOne(data)
          emit('add', newData)
          dialog.dVehicle = !dialog.dVehicle
          close()
        } else {
          await vehiclesService.updateOne(vehicle.value._id, vehicle.value)
          emit('update', vehicle.value)
          dialog.dVehicle = !dialog.dVehicle
          close()
        }
      }
    }
    return {
      form,
      vehicle,
      dialog,
      marcas,
      years,
      colors,
      save,
      close,
    }
  },
})
</script>
