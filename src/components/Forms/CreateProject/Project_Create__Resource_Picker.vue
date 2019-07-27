<template>
    <div class="create-resource-picker">
        <v-row class="picker__inner">
            <v-col class="col-12 col-md-6 list options-list">
                <h3 class="body-1">Options</h3>
                <div class="list-content">
					<div
						v-ripple
						v-for="(item,i) in optionItems"
						:key="`list-item-${i}`"
						:id="i"
						class="list-item"
						@click="itemClick('optionItems', item.id)">
						<p>{{ item.value }}</p>
					</div>	
                </div>
            </v-col>
            <v-col class="col-12 col-md-6 list selected-list">
                <h3 class="body-1">Selected</h3>
                <div class="list-content">
					<div
						v-ripple
						v-for="(item,i) in selectedItems"
						:key="`list-item-${i}`"
						:id="i"
						class="list-item"
						@click="itemClick('selectedItems', item.id)">
						<p>{{ item.value }}</p>
					</div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  name: 'create-resource-picker',

  props: {
    items: {
      type: Array,
      required: false,
      default: () => ([])
    },
    itemsSelectedCallback: {
      type: [Function, Promise],
      required: false,
      default: null
    }
  },

  data: () => ({
    optionItems: [],
    selectedItems: []
  }),

  mounted () {
    // decouple incoming items with local items
    this.optionItems = JSON.parse(JSON.stringify(this.items))
  },

  methods: {
    itemClick (fromList, id) {
      setTimeout(() => {
        let toList = (fromList === 'optionItems')
          ? 'selectedItems' : 'optionItems'

        let index = this[fromList].findIndex(item => item.id === id)

        this[toList].push(this[fromList][index])
        this[fromList].splice(index, 1)

        this[toList].sort(function (a, b) {
          return a.id - b.id
        })

        if (this.itemsSelectedCallback) { this.itemsSelectedCallback(this.selectedItems) }
      }, 100)
    }
  }
}
</script>
